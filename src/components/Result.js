import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import { Paper, Snackbar, Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Skeleton from '@material-ui/lab/Skeleton';
const Result = (props) => {
    const { searching, value } = props;
    const [result, setResult] = useState('');
    const [open, setOpen] = useState(false)
    const [alertInfo, setAlertInfo] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('info')
    const whereFinding = () => {
        setResult(
            <Paper elevation={3} className="m-10 p-10 flex-center--column">
                <Skeleton variant="rect" width={300} height={300} className="m-10" />
                <Skeleton variant="rect" width={250} height={100} className="m-10" />
                <Skeleton variant="rect" width={document.body.offsetWidth * 0.9} height={500} className="m-10" />
            </Paper>
        )
    }
    const validation = () => new Promise((resolve, reject) => {
        if (!value) reject("Input can not be empty")
        if (!/^[a-z0-9-]+$/i.test(value)) reject("Input can have only \"A-z\",\"0-9\" and \"-\" characters");
        resolve()
    })
    const submitFunction = () => new Promise((resolve, reject) => {
        setTimeout(async () => {
            const url = `https://api.github.com/users/${value}`;
            try {
                const { data } = await axios.get(url)
                const { avatar_url, html_url, location, name, followers_url, repos_url, followers, public_repos } = data
                const { data: followersUser } = await axios.get(followers_url);
                const { data: repositoriesUser } = await axios.get(repos_url);
                setResult(
                    <Paper elevation={3} className="m-10 p-10 flex-center--column">
                        <Paper className="m-10 p-10 flex-center--column">
                            <h1>{name}</h1>
                            <img src={avatar_url} width="200" alt={name} />
                            {location ? (<div className="flex-center"><LocationOnIcon />{location}</div>) : null}
                            <a className="flex-center" href={html_url} rel="noopener noreferrer" target="_blank">Check profile on GitHub <ExitToAppIcon /></a>
                        </Paper>
                        <Paper className="m-10 p-10 flex-center--column">
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
                        </Paper>
                        <Paper className="m-10 p-10 flex-center--column">
                            <h2>Repositiories ({public_repos})</h2>
                            <div id="repositories" className="flex-center--column--stretch">
                                {repositoriesUser.map((v, i) => {
                                    const { html_url, name, description, created_at, updated_at, language } = v
                                    return (
                                        <a href={html_url} rel="noopener noreferrer" key={i} title={name} target="_blank" className="flex-center--column">
                                            <h1>{name}<br />{language}</h1>
                                            <div>{description}</div>
                                            <div>Created at: {created_at.replace(/T|Z/g, " ")}</div>
                                            <div>Last updated at: {updated_at.replace(/T|Z/g, " ")}</div>
                                        </a>
                                    )
                                })}
                            </div>
                        </Paper>
                    </Paper>
                )
                resolve()
            } catch (e) { reject('Not Found'); }

        }, 500)
    })
    useEffect(() => {
        if (!searching) { return }
        const search = async () => {
            try {
                setOpen(true);
                await validation()
                whereFinding();
                setAlertSeverity('info')
                setAlertInfo(`Searching ...`);
                await submitFunction()
                setOpen(false);
            } catch (e) {
                setResult('')
                setAlertSeverity('error')
                setAlertInfo(e);
            }
        };
        search();
    }, [searching])
    return (
        <React.Fragment>
            {result}
            <Snackbar open={open} onClose={() => { setOpen(false) }}>
                <Alert onClose={() => { setOpen(false) }} severity={alertSeverity} variant="filled" elevation={6}>
                    {alertInfo}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}
export default Result