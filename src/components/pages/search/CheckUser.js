import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loading as Load } from "../../utils";
import Result from "./Result";
import Loading from "./Loading";
export default () => {
  const { userNick } = useParams();
  const [output, setOutput] = useState(null);
  const [userIsFinding, setUserIsFinding] = useState(true);
  const validation = () =>
    new Promise((resolve, reject) => {
      if (!userNick) {
        reject("<h3>Input can not be empty</h3>");
      }
      if (!/^[a-z0-9-]+$/i.test(userNick)) {
        reject('Input can have only "A-z","0-9" and "-" characters');
      }
      resolve();
    });
  const isUserExist = () =>
    new Promise(async (resolve, reject) => {
      try {
        if (!navigator.onLine) {
          reject("<h3>You are offiline! Check your internet!</h3>");
        }
        const url = `https://api.github.com/users/${userNick}`;
        const { data } = await axios.get(url);
        const { followers_url, repos_url } = data;
        const { data: followersUser } = await axios.get(followers_url);
        const { data: repositoriesUser } = await axios.get(repos_url);
        resolve([data, followersUser, repositoriesUser]);
      } catch (e) {
        reject("<h3>User not Found</h3>");
      }
    });
  const setUser = async () => {
    try {
      setUserIsFinding(true);
      await validation();
      const data = await isUserExist();
      setOutput(<Result userData={data} />);
    } catch (e) {
      setOutput(e);
    } finally {
      setUserIsFinding(false);
    }
  };
  useEffect(() => {
    setUser();
  }, []);
  return (
    <>
      {userIsFinding ? <Loading /> : output}
      <Load open={userIsFinding} />
    </>
  );
};
