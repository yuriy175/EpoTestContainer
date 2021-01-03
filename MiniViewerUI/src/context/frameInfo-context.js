import React, { useReducer, createContext } from 'react';

export const FrameInfoContext = createContext();

const initialState = {
    frameNumber: 0
  };

function reducer(state, action) {
  switch (action.type) {    
    case "SETFRAMENUMBER":
      {
        return {
          ...state,
          frameNumber: action.payload
        };
      }

    default:
      throw new Error();
  }
}

export const FrameInfoContextProvider = props => {  
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <FrameInfoContext.Provider value={[state, dispatch]}>
      {children}
    </FrameInfoContext.Provider>
  );
};