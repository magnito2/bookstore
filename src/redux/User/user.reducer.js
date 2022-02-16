import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  resetPasswordSuccess: false,
  userErr: [],
  isLoading: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErr: [],
        isLoading: false
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case userTypes.CHECK_USER_SESSION:
    case userTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isLoading: true
      }
    case userTypes.STOP_LOADING:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
};

export default userReducer;
