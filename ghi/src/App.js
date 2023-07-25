import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import LoginForm from "./LoginForm.js";
import AccountForm from "./AccountForm.js";
import PeerList from "./PeerList.js";
import PeerButton from "./PeerButton.js";
import PeerForm from "./PeerForm.js";
import AccountInfo from "./AccountInfo.js";
import EditTags from "./EditTags.js";
import Nav from "./Nav.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import AccountUpdate from "./AccountUpdate.js";
import MatchView from "./MatchView.js";
import InboxPage from "./Messages/InboxPage.js";
import "./Messages/styles.css";
import PeerConnectionList from "./PeerConnectionList.js";

function App() {
  const [error, setError] = useState(null);
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <div className="grid">
            <Nav />
            <main className="main-content">
              <Routes>
                <Route exact path="/login" element={<LoginForm />}></Route>
                <Route exact path="/register" element={<AccountForm />}></Route>
                <Route exact path="/inbox" element={<InboxPage />}></Route>
                <Route exact path="/peers" element={<PeerList />}></Route>
                <Route exact path="/connections" element={<PeerButton />}></Route>
                <Route
                  exact
                  path="/connections/create"
                  element={<PeerForm />}
                ></Route>
                <Route exact path="/matches" element={<MatchView />}></Route>
                <Route exact path="/info" element={<AccountInfo />}></Route>
                <Route exact path="/update" element={<AccountUpdate />}></Route>
                <Route exact path="/edit_tags" element={<EditTags />}></Route>
                <Route exact path="/peer_connections" element={<PeerConnectionList />}></Route>
              </Routes>
              <ErrorNotification error={error} />
              {/* <Construct info={launchInfo} /> */}
            </main>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
