import * as actionTypes from "../actions";

const initialState = {
  token: '',
  user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.value.token,
        user: action.value.user
      };
    case actionTypes.LOGOUT:
        return {
          ...state,
          token: '',
          user: null
        };
    default:
      return state;
  }
};

export default reducer;
