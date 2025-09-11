import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';

import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  futurDepartures: [],
  AllFuturDepartures: [],
  AllPastDepartures: [],
  pastDepartures: [],
  departure: null,
  currentPage: 1,
  totalFuturPages: 1,
  totalPastPages: 1,
};

const slice = createSlice({
  name: 'departure',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET DEPARTURES
    getDeparturesSuccess(state, action) {
      state.isLoading = false;
      state.futurDepartures = action.payload.futurDepartures || [];
      state.pastDepartures = action.payload.pastDepartures || [];
      state.currentPage = Number(action.payload.currentPage) || 1;
      state.totalFuturPages = action.payload.totalFuturPages || 0;
      state.totalPastPages = action.payload.totalPastPages || 0;
      state.AllFuturDepartures = action.payload.AllFuturDepartures || [];
      state.AllPastDepartures = action.payload.AllPastDepartures || [];
    },

    // GET DEPARTURE
    getDepartureSuccess(state, action) {
      state.isLoading = false;
      state.departure = action.payload;
    },

    clearPage(state) {
      state.isLoading = false;
      state.currentPage = 1;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { clearPage } = slice.actions;

// -------------------------------------------------------------------------
export function getDepartures(data) {
  const { departure, destination = '0', date = '0' } = data;
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get(
        `/api/departures/${departure}/${destination}/${date}`,
        {
          withCredentials: true,
        }
      );
      dispatch(slice.actions.getDeparturesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

// -------------------------------------------------------------------------
export function getTransporterDepartures(page = 1) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get(`/api/departures?page=${page}`, {
        withCredentials: true,
      });
      dispatch(slice.actions.getDeparturesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

// -------------------------------------------------------------------------
export function addTransporterDeparture(newDeparture) {
  return async () => {
    dispatch(slice.actions.startLoading());
    const response = await axios.post('/api/departures/new', newDeparture, {
      withCredentials: true,
    });
    dispatch(slice.actions.getDeparturesSuccess(response.data));
    try {
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// -------------------------------------------------------------------------
export function deleteTransporterDeparture(departureId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.delete(
        `/api/departures/${departureId}/delete`,
        {
          withCredentials: true,
        }
      );
      dispatch(slice.actions.getDeparturesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// -------------------------------------------------------------------------
export function updateTransporterDeparture(departureId, updatedDeparture) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.put(
        `/api/departures/${departureId}/update`,
        updatedDeparture,
        {
          withCredentials: true,
        }
      );
      dispatch(slice.actions.getDeparturesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// -------------------------------------------------------------------------

export function getTransporterNextDeparture() {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get(`/api/departures/next/departure`, {
        withCredentials: true,
      });
      dispatch(slice.actions.getDepartureSuccess(response.data.nextDeparture));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

// -------------------------------------------------------------------------
