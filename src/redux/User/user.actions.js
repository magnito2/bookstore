import userTypes from './user.types';

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS 
})


export const emailSignInStart = userCredential => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredential
});

export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS
});

export const signUpUserStart = userCredential => ({
  type: userTypes.SIGN_UP_USER_START, 
  payload: userCredential
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START
});

export const userError = error => ({
  type: userTypes.USER_ERROR,
  payload: error
});

export const resetPasswordStart = userCredential => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredential
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
  
})