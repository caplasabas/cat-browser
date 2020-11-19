import { SET_BREED } from "../actionTypes";

const initialState = {
  breed: null,
};

function reducers (state = initialState, action) {
  console.log(action);
  
  switch (action.type) {
    case SET_BREED: {
      console.log('yes');
      
      const { breed } = action.payload;
      return { breed };
    }
    default:
      return state;
  }
}

export default reducers;