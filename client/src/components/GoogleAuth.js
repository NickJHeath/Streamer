import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = () => {
  let auth = useRef(null);
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon"> </i>Sign out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui red google button">
          <i className="google icon"> </i>Sign in with Google
        </button>
      );
    }
  };

  const onAuthChange = useCallback(
    (isSignedIn) => {
      if (isSignedIn) {
        dispatch(signIn(auth.current.currentUser.get().getId()));
      } else {
        dispatch(signOut());
      }
    },
    [dispatch]
  );

  const onSignInClick = () => {
    auth.current.signIn();
  };

  const onSignOutClick = () => {
    auth.current.signOut();
  };

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, [onAuthChange]);

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
