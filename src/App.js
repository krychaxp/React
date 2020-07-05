import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Github from './components/Github'
import Forms from './components/Forms'
import Home from './components/Home'
import Alert from './components/Alert'
import Charts from './components/Charts'
const routes = [
    {
      path: "/",
      title:"Home",
      inList:true,
      exact: true,
      component: () => <Home />
    },
    {
      path: "/github",
      title:"Github",
      inList:true,
      component: () => <Github />
    },
    {
      path: "/forms",
      title:"Forms",
      inList:true,
      component: () => <Forms />
    },
    {
      path: "/charts",
      title:"Charts",
      inList:true,
      component: () => <Charts />
    },
    {
      path: "*",
      inList:false,
      component: () => <h3>Nie znaleziono danej strony</h3>
    }
  ];
export default function () {
    const [alertInfo, setAlertInfo] = useState(null)
    const setAlert = (a, b) => { setAlertInfo(<Alert type={a} text={b} />) }
    window.onoffline = () => setAlert('warning', 'Stracono połączenie z internetem.')
    window.ononline = () => setAlert('info', 'Ponownie połączono z internetem.')
    return (
        <Router>
            <nav>
                <ul>
                {routes.filter(v=>v.inList).map((v,i)=>
                    <li key={i}>
                        <Link to={v.path}>{v.title}</Link>
                    </li>
                )}
                </ul>
            </nav>
            <main>
                <Switch>
                {routes.map((v,i)=>
                    <Route 
                    key={i}
                    exact={v.exact} 
                    path={v.path}
                    children={v.component}
                    />
                )}
                </Switch>
            </main>
            <footer>
                &copy; Copyright Krychaxp 2020
            </footer>
            {alertInfo}
        </Router>
    );
}
/*
let { path, url } = useRouteMatch();
let { topicId } = useParams();
let location = useLocation();
*/