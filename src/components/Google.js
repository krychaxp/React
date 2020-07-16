import React, { useState, useEffect } from "react";
import { GoogleLogout, GoogleLogin } from "react-google-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookLogin from "react-facebook-login";
import { DiReact } from "react-icons/di";
import { FaNpm } from "react-icons/fa";
export default function Google() {
  const [UserGoogle, setUserGoogle] = useState({});
  const [UserFB, setUserFB] = useState({});
  const failGoogle = (response) => {
    console.log("failGoogle", response);
    alert("nie udało się zalogować");
  };
  const successFB = (response) => {
    console.log("Xddxdx",response,!response.status)
    if(response.status)return
    const { name, email, picture } = response;
    setUserFB({
      name: name,
      email: email,
      icon: picture.data.url,
    });
  };
  const successGoogle = (response) => {
    const { email, name, imageUrl } = response.profileObj;
    setUserGoogle({
      name: name,
      email: email,
      icon: imageUrl,
    });
    alert("Pomyślnie zalogowano google");
  };
  const logoutGoogle = (response) => {
    alert("Pomyślnie wylogowano");
    setUserGoogle({});
  };
  return (
    <>
      <GoogleLogin
        clientId="965500718724-s0jg5bdi7aed0lvcts2ks02ad8mcvv0s.apps.googleusercontent.com"
        //   render={renderProps => (
        //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
        //   )} my style button
        onSuccess={successGoogle}
        onFailure={failGoogle}
        isSignedIn={true}
      />
      <br />
      <br />
      <GoogleLogout
        clientId="965500718724-s0jg5bdi7aed0lvcts2ks02ad8mcvv0s.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logoutGoogle}
      />
      <div>
        icon: <img src={UserGoogle.icon || "/favicon.ico"} alt="icon" />
        <br />
        name: <span>{UserGoogle.name}</span>
        <br />
        e-mail:{UserGoogle.email}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <FacebookLogin
        appId="981341145633931"
        fields="name,email,picture"
        callback={successFB}
        scope="public_profile, email, user_birthday"
        // icon="fa-facebook"
        // cssClass="my-facebook-button-class"
        // render={(renderProps) => (
        //   <button onClick={renderProps.onClick}>
        //     This is my custom FB button
        //   </button>
        // )}
      />
      <div>
        icon: <img src={UserFB.icon || "/favicon.ico"} alt="icon" />
        <br />
        name: <span>{UserFB.name}</span>
        <br />
        e-mail:{UserFB.email}
      </div>
      <div style={{fontSize:'80px',color:'red'}}><DiReact/><FaNpm/></div>
    </>
  );
}
