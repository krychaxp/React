import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alert from "./assets/Alert.js";
import { globals } from "./assets/globals.js";
import { Helmet } from "react-helmet";
import { Button } from "@material-ui/core";
export default function () {
  const [alertInfo, setAlertInfo] = useState(null);
  const setAlert = (a, b) => setAlertInfo(<Alert type={a} text={b} />);
  window.onoffline = () =>
    setAlert("warning", "Stracono połączenie z internetem.");
  window.ononline = () => setAlert("info", "Ponownie połączono z internetem.");
  const { routes } = globals;
  return (
    <Router>
      <main>
        <Switch>
          <Route exact={true} path="/">
            <nav>
              {routes.map(({ path, title }, i) => (
                <Link key={i} to={path}>
                  <span>{title}</span>
                </Link>
              ))}
            </nav>
          </Route>
          {routes.map(({ path, component, title }, i) => (
            <Route key={i} path={path}>
              <Helmet>
                <title>{title} - Krychaxp React App</title>
              </Helmet>
              <div id="back-box">
                <Link to="/">
                  <Button variant="contained" color="primary">
                    Back
                  </Button>
                </Link>
              </div>
              {component}
            </Route>
          ))}
          <Route path="*">
            <Helmet>
              <title>Page not Found</title>
            </Helmet>
            <h3>Nie znaleziono danej strony</h3>
          </Route>
        </Switch>
      </main>
      <footer>&copy; Copyright Krychaxp 2020</footer>
      {alertInfo}
    </Router>
  );
}
/*
let { path, url } = useRouteMatch();
let { topicId } = useParams();
let location = useLocation();
*/
