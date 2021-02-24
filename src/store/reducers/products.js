import * as actionTypes from "../actions";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.value
      };
    default:
      return state;
  }
};

export default reducer;
