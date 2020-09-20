import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setDogs } from "./reducer";

import "./App.css";

export const App = () => {
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();

  const fetchDogs = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random/3");
      const json = await response.json();
      dispatch(setDogs(json.message));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDog = async (index) => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const json = await response.json();
      const newDogs = dogs.slice();
      newDogs[index] = json.message;
      dispatch(setDogs(newDogs));
    } catch (error) {
      console.error(error);
    }
  };

  const mutateDog = async (index) => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const json = await response.json();
      dogs[index] = json.message;
      dispatch(setDogs(dogs));
    } catch (error) {
      console.error(error);
    }
  };

  const dogList = React.useMemo(
    () =>
      (dogs || []).map((dog, index) => (
        <div className="item" key={index}>
          <img src={dog} alt="dog" />
          <p>{dog}</p>
          <button onClick={() => fetchDog(index)}>Update dog</button>
          <button onClick={() => mutateDog(index)}>Mutate dog</button>
        </div>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dogs]
  );

  React.useEffect(() => {
    fetchDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{dogList}</div>;
};

export default App;
