import React, { useReducer, createContext } from 'react';

export const HardwareContext = createContext();

const initialState = {
  rois: [],
  aprs: [],
  projs: [],
  currentApr: { apr: '', proj: '', dir: '' },
  workStations: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SETROIS': {
      return {
        ...state,
        rois: action.payload
      };
    }
    case 'SETAPRS': {
      return {
        ...state,
        aprs: [...state.aprs.filter(a => a.roi !== action.payload.roi), action.payload]
      };
    }
    case 'SETPROJS': {
      return {
        ...state,
        projs: [...state.projs.filter(p => p.apr !== action.payload.apr), action.payload]
      };
    }
    case 'SETWS': {
      return {
        ...state,
        workStations: action.payload
      };
    }
    default:
      throw new Error();
  }
}

export const HardwareContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <HardwareContext.Provider value={[state, dispatch]}>
      {children}
    </HardwareContext.Provider>
  );
};