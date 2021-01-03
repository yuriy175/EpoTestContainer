import React, { useReducer, createContext } from 'react';
import {SetMiniViewerServiceAddress} from '../workers/miniViewerWorker'
import {SetJournalServiceAddress} from '../workers/journalWorker'
import {SetHardwareServiceAddress} from '../workers/hardwareWorker'
import {SetImageManipulationServiceAddress} from '../workers/imageWorker'
import { AppModeJournal, AppModeHardware, AppModeMiniViewer, AppModeImage } from './constants'

export const StateContext = createContext();

const initialState = {
  miniViewerServiceUrl: 'http://localhost:51975',
  journalServiceUrl: 'http://localhost:5002',
  hardwareServiceUrl: 'http://localhost:5007',
  imageServiceUrl: 'http://localhost:5007',
  appMode: AppModeJournal,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SETAPPMODE': {
      return {
        ...state,
        appMode: action.payload
      };
    }
    case 'SETMINIVIEWERSERVICEURL': {
      Worker.SetServiceAddress(initialState.miniViewerServiceUrl);
      return {
        ...state,
        miniViewerServiceUrl: action.payload
      };
    }
    default:
      throw new Error();
  }
}

export const StateContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  SetMiniViewerServiceAddress(initialState.miniViewerServiceUrl);
  SetJournalServiceAddress(initialState.journalServiceUrl);
  SetHardwareServiceAddress(initialState.hardwareServiceUrl);
  SetImageManipulationServiceAddress(initialState.imageServiceUrl);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};