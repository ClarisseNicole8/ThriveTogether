from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from ..queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
    AccountUpdate,
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", tags=["Accounts"], response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts/{account_id}", tags=["Accounts"], response_model=AccountOut)
async def get_account_info(
    account_id: int,
    accounts: AccountQueries = Depends(),
):
    account = accounts.get_account_info(account_id)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account not found",
        )
    return account


@router.put("/api/accounts/{account_id}", tags=["Accounts"], response_model=AccountUpdate)
async def update_account_info(
    account_id: int,
    info: AccountUpdate,
    accounts: AccountQueries = Depends(),
):
    account = accounts.get_account_info(account_id)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account not found",
        )
    updated_account = accounts.update(account_id, info)
    return updated_account
