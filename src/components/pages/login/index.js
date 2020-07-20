import React, { useState} from "react";
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
    console.log("Xddxdx", response, !response.status);
    if (response.status) return;
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
  const logoutFB = (e) => {
    console.log(e);
    setUserFB({});
  };
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_Google_clientId}
        //   render={renderProps => (
        //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
        //   )} my style button
        onSuccess={successGoogle}
        onFailure={failGoogle}
        // isSignedIn={false}
        // cookiePolicy={"single_host_origin"}
      />
      <br />
      <br />
      <GoogleLogout
        clientId={process.env.REACT_APP_Google_clientId}
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
        appId={process.env.REACT_APP_FB_appId}
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
      <br />
      <button onClick={logoutFB}>Logout</button>
      <div>
        icon: <img src={UserFB.icon || "/favicon.ico"} alt="icon" />
        <br />
        name: <span>{UserFB.name}</span>
        <br />
        e-mail:{UserFB.email}
      </div>
      <div style={{ fontSize: "80px", color: "red" }}>
        <DiReact />
        <FaNpm />
      </div>
    </>
  );
}
