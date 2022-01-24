import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { auth, handleUserProfile, GoogleProvider } from "../../firebase/utils";

import userTypes from './user.types';

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS 
})

export const signInUser = ({ email, password }) => async dispatch => {

    try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true
        })
  
      } catch (error) {
        //console.log(error)
      }
}

export const signUpUser = ({ displayName, email, password, confirmPassword}) => async dispatch => {
   if (password !== confirmPassword) {
      const err = ["Password don't Match"];
      dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: err
      });
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await handleUserProfile(user, { displayName });
      dispatch({
        type: userTypes.SIGN_UP_SUCCESS,
        payload: true
      });

    } catch (err) {
      console.log(err);
    }
}

export const resetPassword = ({email}) => async dispatch => {
  const config = {
    url: "http://localhost:3000/login",
  };

  try {
      await sendPasswordResetEmail(auth, email, config)
      .then(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true
        });
      })
      .catch(() => {
        const err = ["Email Not Found, please try again"];
        dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: err
        });
      });
  } catch (error) {
    //console.log(error)
  }

}

export const signInWithGoogle = () => async dispatch => {
  try{
    await signInWithPopup(auth, GoogleProvider)
    .then((res) => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
      })
    })
  } catch(error){
    console.log(error)
  }
}