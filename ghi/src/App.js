import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import LoginForm from "./LoginForm.js";
import AccountForm from "./AccountForm.js";
import AccountInfo from "./AccountInfo.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
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
        setLaunchInfo(data.launch_details);
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
          <Routes>
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/register" element={<AccountForm />}></Route>
            <Route exact path="/info" element={<AccountInfo />}></Route>
          </Routes>
          <ErrorNotification error={error} />
          <Construct info={launchInfo} />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
