import convertService from 'services/retriever.service';
import {
  RETRIEVE_REQUEST,
  RETRIEVE_SUCCESS,
  RETRIEVE_FAILURE,
} from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const retrieveProducts = (data) => async (dispatch) => {
  dispatch({
    type: RETRIEVE_REQUEST,
  });

  try {
    const queryObject = {
      keywords: data.keywords,
      price_max: data.priceMax,
      price_min: data.priceMin,
      sorting: data.sorting,
    };

    const { products } = await convertService.retrieveProducts(queryObject);

    if (products) {
      dispatch({
        type: RETRIEVE_SUCCESS,
        payload: { products: products || [] },
      });
    }

    dispatch({
      type: RETRIEVE_FAILURE,
    });
  } catch (e) {
    dispatch({
      type: RETRIEVE_FAILURE,
    });

    throw e;
  }
};
