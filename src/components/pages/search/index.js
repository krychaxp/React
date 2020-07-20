import React, { useState} from "react";
import { TextField, Button } from "@material-ui/core";
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import styles from "./index.module.scss";
import CheckUser from './CheckUser'
export default function () {
  const { path, url } = useRouteMatch();
  const [value, setValue] = useState("");
  return (
    <>
      <div className={styles.searcher}>
        <TextField
          label="Search user"
          variant="outlined"
          onChange={(e) => setValue(e.target.value)}
        />
        <Link to={`${url}/${value}`}>
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Link>
      </div>
      <Switch>
        <Route exact path={path}>
          <h3>Write someone nick on github</h3>
        </Route>
        <Route path={`${path}/:userNick`}>
          <CheckUser />
        </Route>
      </Switch>
    </>
  );
}

