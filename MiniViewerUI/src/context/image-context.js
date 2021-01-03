import React, { useReducer, createContext } from 'react';

export const ImageContext = createContext();

const initialState = {
  patients: [],
  imageInfo: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'SETDICOMDIR': {
        return {
          ...state,
          patients: action.payload
        };
      }
    case 'SETPATIENTS': {
      const newPatient = action.payload[0];
      const patient = state.patients.filter(p => p.Id === newPatient.Id)[0];
      const untouchedPatients = state.patients.filter(p => p.Id !== newPatient.Id);

      let patients = state.patients;
      //new patient
      if (state.patients.length === 0 || !patient) {
        patients = [...state.patients, newPatient];
      }
      //known patient
      else {
        const newStudies = newPatient.Studies.filter(s => patient.Studies.every(e => s.Id !== e.Id));
        const hasChangesInOldStudies = newPatient.Studies.some(s => patient.Studies.some(e => s.Id === e.Id));
        if (hasChangesInOldStudies) {
          for (let i = 0; i < patient.Studies.length; ++i) {
            const oldStudy = patient.Studies[i];
            const newOldStudy = newPatient.Studies.filter(s => s.Id === oldStudy.Id)[0];
            if (newOldStudy) {
              const newSeries = newOldStudy.Series.filter(s => oldStudy.Series.every(e => s.Id !== e.Id));
              const hasChangesInOldSeries = newOldStudy.Series.some(s => oldStudy.Series.some(e => s.Id === e.Id));
              if (hasChangesInOldSeries) {
                for (let i = 0; i < oldStudy.Series.length; ++i) {
                  const oldSeries = oldStudy.Series[i];
                  const newOldSeries = newOldStudy.Series.filter(s => s.Id === oldSeries.Id)[0];
                  if (newOldSeries) {
                    oldSeries.Images = oldSeries.Images.concat(newOldSeries.Images);
                  }
                }
              }
              oldStudy.Series = oldStudy.Series.concat(newSeries);
            }
          }
        }

        patient.Studies = patient.Studies.concat(newStudies);
      }

      return {
        ...state,
        patients: patients
      };
    }
    case "SETIMAGEINFO":
      {
        return {
          ...state,
          imageInfo: action.payload
        };
      }

    default:
      throw new Error();
  }
}

export const ImageContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <ImageContext.Provider value={[state, dispatch]}>
      {children}
    </ImageContext.Provider>
  );
};