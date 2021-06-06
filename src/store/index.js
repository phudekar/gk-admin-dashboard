import React, { createContext, useReducer } from 'react';
import reducers from '../reducers';

/* State */
const initialState = {};
for (let k in reducers) {
  if (typeof (reducers[k]) === 'function') {
    initialState[k] = reducers[k](undefined, "");
  }
}
export const store = createContext(initialState);
const { Provider } = store;
const localState = {};

/* Privates */
const initialize = ({ state, dispatch }) =>
  Object.assign(localState, { state, dispatch });

/* Exports */
export const dispatch = (...props) => localState.dispatch && localState.dispatch(...props);

export const getState = () => localState.state;

export const StateProvider = ({ children, value }) => {
  const [state, dispatch] = useReducer((state, action) => {
    console.log(action);
    const s = { ...state }
    for (let k in reducers) {
      s[k] = reducers[k](s[k], action);
    }
    return s;
  }, value || initialState);

  initialize({ state, dispatch });
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
