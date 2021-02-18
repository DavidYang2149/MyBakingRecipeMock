import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  setUser,
  clearUser,
} from '../../redux/user';
import { auth, provider } from '../../services/firebase';

const HeaderContainer = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  const {
    displayName,
  } = user;

  const signInWithGoogle = async () => {
    const result = await auth.signInWithPopup(provider);
    // setUser(result.user.email);
    // setUser(result.user.displayName);
    if (result) {
      dispatch(setUser({ name: 'userId', value: result.user.email }));
      dispatch(setUser({ name: 'displayName', value: result.user.displayName }));
    }
  };

  const signOut = async () => {
    await auth.signOut();
    dispatch(clearUser());
  };
  return (
    <nav>
      <Link to="/">Home</Link>
      <h1>My Baking Recipe</h1>
      {
        displayName
          ? (
            <>
              <p>
                Welcome,
                &nbsp;
                {displayName}
              </p>
              <button type="button" onClick={signOut}>Logout</button>
            </>
          ) : <button type="button" onClick={signInWithGoogle}>Sign in</button>
      }
    </nav>
  );
};

export default HeaderContainer;