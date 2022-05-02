import { UPDATE_SEARCH_ITEMS } from './../../../@jumbo/constants/ActionTypes';

export const setProductItems = item => {
  return dispatch => {
    dispatch({
      type: UPDATE_SEARCH_ITEMS,
      payload: item,
    });
  };
};

