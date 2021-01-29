import React, { useReducer, createContext } from 'react';

export const PrintContext = createContext();

const initialState = {
  printedImage: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SETPRINTEDIMAGE': {
      return {
        ...state,
        printedImage: state.printedImage + 1//action.payload
      };
    }
    default:
      throw new Error();
  }
}

export const PrintContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <PrintContext.Provider value={[state, dispatch]}>
      {children}
    </PrintContext.Provider>
  );
};