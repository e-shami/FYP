import React, {useContext} from 'react'
import {SessionContext, SessionData} from "../Context/SessionContext";
import StoreSessionData from "../others/SessionStorage";

const SignOut = () => {
  const  SESSION = useContext(SessionContext);
  StoreSessionData(null);
  window.location.replace('/login');
  SESSION.setUserData(SessionData);
  return (
    <div>SignOut</div>
  )
}

export default SignOut