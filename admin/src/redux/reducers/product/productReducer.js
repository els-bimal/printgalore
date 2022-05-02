import { UPDATE_SEARCH_ITEMS } from './../../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  items: [],
};

export default (state = INIT_STATE, action) => {
  console.log('Item-->|')
  console.log(action);
  switch (action.type) {
    case UPDATE_SEARCH_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    default:
      return state;
  }
};
