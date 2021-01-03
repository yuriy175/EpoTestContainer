import React, { useReducer, createContext } from 'react';
import { AppModeJournal, AppModeHardware, AppModeMiniViewer } from './constants'

export const JournalContext = createContext();

const initialState = {
  studyInWork: {},
  studies: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SETSTUDIES': {
      return {
        ...state,
        studies: action.payload
      };
    }
    case 'SETSTUDYINWORK': {
      return {
        ...state,
        studyInWork: action.payload
      };
    }
    default:
      throw new Error();
  }
}

export const JournalContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <JournalContext.Provider value={[state, dispatch]}>
      {children}
    </JournalContext.Provider>
  );
};