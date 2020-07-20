import React from "react";
import { Avatar } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import LanguageIcon from "@material-ui/icons/Language";
import BusinessIcon from "@material-ui/icons/Business";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styles from "./index.module.scss";
export default (props) => {
  const {
    userData: [data, followersUser, repositoriesUser],
  } = props;
  const {
    avatar_url,
    html_url,
    location,
    name,
    followers,
    public_repos,
    company,
    public_gists,
    bio,
  } = data;
  return (
    <div className={styles.result}>
      <div className={styles.userInfo}>
        <img className={styles.u_logo} src={avatar_url} alt={name} />
        <h1>{name}</h1>
        {bio}
        <a
          className={styles.u_link}
          href={html_url}
          rel="noopener noreferrer"
          target="_blank"
        >
          Check profile on GitHub <ExitToAppIcon />
        </a>
        <h2>Followers ({followers})</h2>
        <AvatarGroup max={6}>
          {Array(followers)
            .fill()
            .map((v, i) => {
              if (i < 6 && followersUser[i]) {
                const { login, id } = followersUser[i];
                return (
                  <Avatar
                    key={i}
                    alt={login}
                    src={`https://avatars2.githubusercontent.com/u/${id}`}
                  />
                );
              } else {
                return <Avatar key={i} />;
              }
            })}
        </AvatarGroup>
        <div className={styles.u_icons}>
          {location && (
            <div className={styles.u_location}>
              <LocationOnIcon />
              {location}
            </div>
          )}
          {company && (
            <div>
              <BusinessIcon />
              {company}
            </div>
          )}
        </div>
        <h2>Repositiories ({public_repos})</h2>
        <h2>Gits ({public_gists})</h2>
      </div>
      <div className={styles.repo}>
        {repositoriesUser.map((v, i) => {
          const {
            html_url,
            name,
            description,
            created_at,
            updated_at,
            language,
            license,
            homepage,
          } = v;
          const days = Math.round(
            (Date.now() - new Date(updated_at).getTime()) / 1000 / 60 / 60 / 24
          );
          const create = new Date(created_at).toLocaleDateString();
          return (
            <div key={i}>
              <a
                href={html_url}
                rel="noopener noreferrer"
                title={name}
                target="_blank"
                className={styles.r_name}
              >
                {name}
              </a>
              <div>{description}</div>
              <div className={styles.r_icons}>
                <div>
                  <span className={styles.r_ico} />
                  &nbsp;{language || "No language"}
                </div>
                {license ? <div>License: {license.name}</div> : ""}
                {homepage ? (
                  <div className={styles.r_website}>
                    <a
                      href={homepage}
                      rel="noopener noreferrer"
                      key={i}
                      title={homepage}
                      target="_blank"
                    >
                      <LanguageIcon />
                      {homepage.match(/[a-z0-9-.]+/g)[1]}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                <div>Updated {days} days ago</div>
                <div>Created in {create}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
