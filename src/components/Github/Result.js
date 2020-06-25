import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import { Paper, Snackbar, Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Skeleton from '@material-ui/lab/Skeleton';
import LanguageIcon from '@material-ui/icons/Language';
import BusinessIcon from '@material-ui/icons/Business';
const Result = (props) => {
    const { searching, value,setSearching } = props;
    const [result, setResult] = useState('');
    const [open, setOpen] = useState(false)
    const [alertInfo, setAlertInfo] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('info')
    const whileFinding = () => {
        return (
            <Paper elevation={3} id="skeleton">
                <Skeleton variant="rect" width={300} height={300} />
                <Skeleton variant="rect" width={250} height={100} />
                <Skeleton variant="rect" width={document.body.offsetWidth * 0.9} height={500} />
            </Paper>
        )
    }
    const validation = () => new Promise((resolve, reject) => {
        if (!value) reject("Input can not be empty")
        if (!/^[a-z0-9-]+$/i.test(value)) reject("Input can have only \"A-z\",\"0-9\" and \"-\" characters");
        resolve()
    })
    const whenSuccess = ([data, followersUser, repositoriesUser]) => {
        const { avatar_url, html_url, location, name, followers, public_repos,company,public_gists,bio } = data;
        return (
            <div id="result">
                <div id="user-info">
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
                <div id="repositories">
                    {repositoriesUser.map((v, i) => {
                        const { html_url, name, description, created_at, updated_at, language, license, homepage } = v;
                        const days = Math.round((Date.now() - new Date(updated_at).getTime()) / 1000 / 60 / 60 / 24);
                        const create = new Date(created_at).toLocaleDateString();
                        return (
                            <div>
                                <a href={html_url} rel="noopener noreferrer" key={i} title={name} target="_blank" className="name">
                                    {name}
                                </a>
                                <div className="descr">{description}</div>
                                <div className="icons">
                                    <div><span />&nbsp;{language || "No language"}</div>
                                    {license ? <div>License: {license.name}</div> : ''}
                                    {homepage ? <div>
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
    const submitFunction = async () => new Promise((resolve, reject) => {
        setTimeout(async () => {
            const url = `https://api.github.com/users/${value}`;
            try {
                const { data } = await axios.get(url)
                const { followers_url, repos_url } = data
                const { data: followersUser } = await axios.get(followers_url);
                const { data: repositoriesUser } = await axios.get(repos_url);
                resolve([data, followersUser, repositoriesUser]);
            } catch (e) { reject('Not Found'); }
        }, 500)
    })
    useEffect(() => {
        if (!searching) { return }
        (async () => {
            try {
                setOpen(true);
                await validation()
                setResult(whileFinding());
                setAlertSeverity('info')
                setAlertInfo(`Searching ...`);
                const data = await submitFunction();
                setResult(whenSuccess(data));
                setOpen(false);
            } catch (e) {
                setResult(null)
                setAlertSeverity('error')
                setAlertInfo(e);
            }finally{
                setSearching(false)
            }
        })()
    }, [searching])
    return (
        <>
            {result}
            <Snackbar open={open} onClose={() => { setOpen(false) }}>
                <Alert onClose={() => { setOpen(false) }} severity={alertSeverity} variant="filled" elevation={6}>
                    {alertInfo}
                </Alert>
            </Snackbar>
        </>
    );
}
export default Result