import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { lang, availableLang } from "../config";
import { Button } from "@material-ui/core";
import content from "./content.js";
import styles from "./index.module.scss";
export default function () {
  const changeLanguage = (a) => {
    window.localStorage.lang = a;
    window.location.reload();
  };
  return (
    <Router>
      <header className={styles.header}>
        <Route path="/(.+)">
          <Link to="/">
            <Button variant="contained" color="primary">
              {content.backButton[lang]}
            </Button>
          </Link>
        </Route>
        <div></div>
        <div>
          {availableLang.map((v, i) => (
            <Button
              key={i}
              variant={v === lang ? "contained" : "outlined"}
              color="primary"
              onClick={() => changeLanguage(v)}
            >
              {v.toUpperCase()}
            </Button>
          ))}
        </div>
      </header>
      <Switch>
        <Route exact={true} path="/">
          <nav className={styles.nav}>
            {content.routing.map(({ title }, i) => (
              <Link key={i} to={"/" + title[lang].toLowerCase()}>
                <span>{title[lang]}</span>
              </Link>
            ))}
          </nav>
        </Route>
        <Route></Route>
      </Switch>
      <main className={styles.main}>
        <Switch>
          {content.routing.map((v, i) =>
            Object.entries(v.title).map((va, j) => (
              <Route
                key={i * va.length + j}
                path={"/" + va[1].toLowerCase()}
                children={v.component}
              />
            ))
          )}
          <Route path="/(.+)">
            <h3>{content.pageNot[lang]}</h3>
          </Route>
        </Switch>
      </main>
      <footer className={styles.footer}>
        &copy; Copyright <a href="https://krychaxp.pl">Krychaxp 2020</a>
      </footer>
    </Router>
  );
}
/*
let { path, url } = useRouteMatch();
let { topicId } = useParams();
let location = useLocation();  useLocation(),useRouteMatch(),useParams()
*/
