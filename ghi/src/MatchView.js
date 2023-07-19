import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext, useToken } from "@galvanize-inc/jwtdown-for-react";

const MatchView = () => {
  const [matches, setMatches] = useState("");
  const [userData, setUserData] = useState("");
  const [userTags, setUserTags] = useState([]);
  const [tagToSearch, setTagToSearch] = useState("");
  const { token } = useAuthContext();
  let carouselCounter = 0;

  useEffect(() => {
    async function getUserData() {
      let url = `${process.env.REACT_APP_API_HOST}/token`;
      let response = await fetch(url, {
        credentials: "include",
      });
      let data = await response.json();

      if (response.ok) {
        setUserData(data.account);
      } else {
        console.log("User data could not be fetched");
      }
    }

    getUserData();
  }, []);

  useEffect(() => {
    async function getUserTags() {
      let url = `${process.env.REACT_APP_API_HOST}/api/tags/${userData["username"]}`;
      let response = await fetch(url, {
        credentials: "include",
      });
      let data = await response.json();

      if (response.ok) {
        setUserTags(data.tags);
      } else {
        console.log("Error! Tags not found.");
      }
    }

    getUserTags();
  }, [userData]);

  async function handleSubmit(event) {
    event.preventDefault();
    let url = `${process.env.REACT_APP_API_HOST}/api/matches/${tagToSearch}`;
    let response = await fetch(url, {
      credentials: "include",
    });
    let data = await response.json();

    if (response.ok) {
      setMatches(data);
    } else {
      console.log("Error!!! Matches not found.");
    }
  }

  function handleTagToSearchChange(event) {
    const value = event.target.value;
    setTagToSearch(value);
  }

  return (
    <div>
      <div className="card text-bg-light mb-3">
        <h5 className="card-header">Matching</h5>
        <form onSubmit={handleSubmit} id="match-tag">
          <div className="card-body"> Your current tags are:</div>
          <div className="d-flex mb-3">
            <select
              onChange={handleTagToSearchChange}
              value={tagToSearch}
              required
              name="tag_to_search"
              id="tag_to_search"
              className="form-select"
            >
              <option value="">Choose a tag</option>
              {userTags.map((tag) => {
                let matchTag = Object.entries(tag);
                return (
                  <option
                    key={matchTag[0][0] + matchTag[0][1]}
                    value={matchTag[0][1]}
                  >
                    {matchTag[0][1]}
                  </option>
                );
              })}
            </select>
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
        {matches != "" ? (
          <div>
            <div
              id="carouselExampleControls"
              className="carousel carousel-dark slide"
              data-bs-ride="false"
              data-bs-interval="false"
            >
              <div className="carousel-inner">
                {matches.matches
                  .filter((match) => match.username !== userData.username)
                  .map((match) => {
                    carouselCounter += 1;
                    return (
                      <div
                        className={`carousel-item ${
                          carouselCounter == 1 ? "active" : ""
                        }`}
                        key={`${match.id} + ${match.username}`}
                      >
                        <div className="card text-bg-light mb-3">
                          <h5 className="card-header">
                            <Link to={`${match.profile_link}`}>
                              {match.username}
                            </Link>
                          </h5>
                          <div className="card-body">
                            <img src={`${match.profile_image}`}></img>
                            <h6>Gender:</h6>
                            <span>{match.gender}</span>
                            <h6>Pronouns:</h6>
                            <span>{match.pronouns}</span>
                            <h6>About Me:</h6>
                            <span>{match.about_me}</span>
                            <h6>Tags:</h6>
                            {match.tags.map((tag) => {
                              return <span key={`${tag} + 1`}> {tag} </span>;
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="card text-bg-light mb-3">
            <div className="card-header">Select a tag to start matching!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchView;
