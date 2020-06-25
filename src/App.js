import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Github from './components/Github'
import Forms from './components/Forms'
import Home from './components/Home'

export default function App() {
    return (
        <Router>
            <header>
            </header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/github">Github</Link>
                    </li>
                    <li>
                        <Link to="/forms">Forms</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/github">
                        <Github />
                    </Route>
                    <Route path="/forms">
                        <Forms />
                    </Route>
                </Switch>
            </main>
            <footer>
                &copy; Copyright Krychaxp 2020
            </footer>
        </Router>
    );
}