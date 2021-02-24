import * as actionTypes from "../actions";

const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CART:
      return {
        ...state,
        cart: action.value
      };
    default:
      return state;
  }
};

export default reducer;
