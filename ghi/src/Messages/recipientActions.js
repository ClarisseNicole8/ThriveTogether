// Action Types
export const SET_RECIPIENT = 'SET_RECIPIENT';

// Action Creator
export const setRecipient = (recipient) => ({
    type: 'SET_RECIPIENT',
    payload: recipient
})
