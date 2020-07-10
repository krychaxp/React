import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Github from "./components/Github.js";
import Forms from "./components/Forms.js";
import Home from "./components/Home.js";
import Alert from "./assets/Alert.js";
import Charts from "./components/Charts.js";
import Images from "./components/Images.js";
import Table from "./components/Table.js";
const routes = [
  {
    path: "/",
    title: "Home",
    exact: true,
    component: <Home />,
  },
  {
    path: "/github",
    title: "Github",
    component: <Github />,
  },
  {
    path: "/forms",
    title: "Forms",
    component: <Forms />,
  },
  {
    path: "/charts",
    title: "Charts",
    component: <Charts />,
  },
  {
    path: "/images",
    title: "Images",
    component: <Images />,
  },{
    path: "/table",
    title: "Table",
    component: <Table />,
  },
  {
    path: "*",
    component: <h3>Nie znaleziono danej strony</h3>,
  },
];
export default function () {
  const [alertInfo, setAlertInfo] = useState(null);
  const setAlert = (a, b) => setAlertInfo(<Alert type={a} text={b} />);
  window.onoffline = () => setAlert("warning", "Stracono połączenie z internetem.");
  window.ononline = () => setAlert("info", "Ponownie połączono z internetem.");
  return (
    <Router>
      <nav>
        <ul>
          {routes
            .filter(v=> v.title)
            .map(({ path, title }, i) => (
              <li key={i}>
                <Link to={path}>{title}</Link>
              </li>
            ))}
        </ul>
      </nav>
      <main>
        <Switch>
          {routes.map(({ exact, path, component }, i) => (
            <Route key={i} exact={exact} path={path} children={component} />
          ))}
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
