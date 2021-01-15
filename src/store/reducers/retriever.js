import {
  RETRIEVE_REQUEST,
  RETRIEVE_SUCCESS,
  RETRIEVE_FAILURE,
} from '../actionTypes';

const INITIAL_STATE = {
  isRetrieving: false,
  products: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_REQUEST:
      return {
        ...state,
        isRetrieving: true,
      };
    case RETRIEVE_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        isRetrieving: false,
      };
    case RETRIEVE_FAILURE:
      return {
        ...state,
        isRetrieving: false,
      };

    default:
      return state;
  }
};
