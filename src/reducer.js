const SET_DOG = "SET_DOG";

export const setDogs = (dogs) => ({ type: SET_DOG, dogs });

export default function dogReducer(state = { dogs: null }, action) {
  switch (action.type) {
    case SET_DOG:
      const newState = {
        ...state,
        dogs: action.dogs
      };
      console.log(JSON.stringify(newState.dogs, null, 1));
      return newState;
    default:
      return state;
  }
}
