import React, { useState, useEffect } from 'react'
import { TextField, Button, Avatar } from '@material-ui/core';
import axios from 'axios'
import { Skeleton, AvatarGroup } from '@material-ui/lab'
import LanguageIcon from '@material-ui/icons/Language';
import BusinessIcon from '@material-ui/icons/Business';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
export default function () {
  const { path, url } = useRouteMatch();
  const [value, setValue] = useState('')
  return (
    <div id="github-box">
      <div className="g-searcher">
        <TextField label="Search user" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
        <Link to={`${url}/${value}`} >
          <Button variant="contained" color="primary">Search</Button>
        </Link>
      </div>
      <Switch>
        <Route exact path={path}>
          <h3>Write someone nick on github</h3>
        </Route>
        <Route path={`${path}/:userNick`}>
          <Check />
        </Route>
      </Switch>
    </div>
  )
}
const Check = () => {
  const { userNick } = useParams();
  const [output, setOutput] = useState(null);
  const [userIsFinding, setUserIsFinding] = useState(true);
  const validation = () => new Promise((resolve, reject) => {
    if (!userNick) { reject('<h3>Input can not be empty</h3>') }
    if (!/^[a-z0-9-]+$/i.test(userNick)) { reject("Input can have only \"A-z\",\"0-9\" and \"-\" characters"); }
    resolve()
  })
  const isUserExist = () => new Promise(async (resolve, reject) => {
    try {
      if (!navigator.onLine) { reject('<h3>You are offiline! Check your internet!</h3>')}
      const url = `https://api.github.com/users/${userNick}`;
      const { data } = await axios.get(url)
      const { followers_url, repos_url } = data
      const { data: followersUser } = await axios.get(followers_url);
      const { data: repositoriesUser } = await axios.get(repos_url);
      resolve([data, followersUser, repositoriesUser]);
    } catch (e) {
      reject('<h3>User not Found</h3>');
    }
  })
  useEffect(() => {
    (async () => {
      try {
        setUserIsFinding(true)
        await validation();
        const data = await isUserExist();
        setOutput(<Result userData={data} />)
      } catch (e) {
        setOutput(e)
      } finally {
        setUserIsFinding(false)
      }
    })()
  }, [userNick])
  return (userIsFinding ? <Loading /> : output)
}
const Result = (props) => {
  const { userData: [data, followersUser, repositoriesUser] } = props
  const { avatar_url, html_url, location, name, followers, public_repos, company, public_gists, bio } = data;
  return (
    <div className="g-result">
      <div className="g-user-info">
        <img className="user-logo" src={avatar_url} alt={name} />
        <h1>{name}</h1>
        {bio}
        <a className="link" href={html_url} rel="noopener noreferrer" target="_blank">
          Check profile on GitHub <ExitToAppIcon />
        </a>
        <h2>Followers ({followers})</h2>
        <AvatarGroup max={6}>
          {Array(followers).fill().map((v, i) => {
            if (i < 6 && followersUser[i]) {
              const { login, id } = followersUser[i];
              return <Avatar key={i} alt={login} src={`https://avatars2.githubusercontent.com/u/${id}`} />
            } else {
              return <Avatar key={i} />
            }
          })}
        </AvatarGroup>
        <div className="icons">
          {location ? (<div className="location"><LocationOnIcon />{location}</div>) : null}
          {company ? (<div className="company"><BusinessIcon />{company}</div>) : null}
        </div>
        <h2>Repositiories ({public_repos})</h2>
        <h2>Gits ({public_gists})</h2>
      </div>
      <div className="g-repositories">
        {repositoriesUser.map((v, i) => {
          const { html_url, name, description, created_at, updated_at, language, license, homepage } = v;
          const days = Math.round((Date.now() - new Date(updated_at).getTime()) / 1000 / 60 / 60 / 24);
          const create = new Date(created_at).toLocaleDateString();
          return (
            <div key={i}>
              <a href={html_url} rel="noopener noreferrer" title={name} target="_blank" className="name">
                {name}
              </a>
              <div className="descr">{description}</div>
              <div className="icons">
                <div><span className="ico" />&nbsp;{language || "No language"}</div>
                {license ? <div>License: {license.name}</div> : ''}
                {homepage ? <div className="website">
                  <a href={homepage} rel="noopener noreferrer" key={i} title={homepage} target="_blank">
                    <LanguageIcon />{homepage.match(/[a-z0-9-.]+/g)[1]}
                  </a>
                </div> : ''}
                <div>Updated {days} days ago</div>
                <div>Created in {create}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
const Loading = () => {
  return (
    <div className="g-result">
      <div className="g-user-info">
        <Skeleton variant="rect" width={400} height={400} />
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="text" width={250} height={30} />
        <Skeleton variant="text" width={200} height={50} />
        <Skeleton variant="text" width={250} height={70} />
        <Skeleton variant="text" width={250} height={30} />
        <Skeleton variant="text" width={200} height={50} />
      </div>
      <div className="g-repositories">
        {Array(6).fill().map((v, i) => {
          const rand1 = Math.floor(Math.random() * 100) + 100
          const rand2 = Math.floor(Math.random() * 100) + 150
          return (<div key={i}>
            <Skeleton variant="text" width={rand1} height={40} />
            <Skeleton variant="text" width={rand2} height={20} />
            <div className="icons">
              {Array(5).fill().map((v, i) => {
                const rand = Math.floor(Math.random() * 100) % 50 + 50
                return (<Skeleton key={i} variant="text" width={rand} height={20} />)
              })}
            </div>
          </div>)
        })}
      </div>
    </div>
  );
}