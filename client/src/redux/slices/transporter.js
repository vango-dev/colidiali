import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';

import axios from '../../utils/axios';

// ----------------------------------------------------------------------
const LIMIT = 5;

const initialState = {
  isLoading: false,
  error: null,
  transporters: [],
  transporter: null,
  activePage: 1,
  totalTransporters: 0,
  activeStep: 0,
};

const slice = createSlice({
  name: 'transporter',
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

    // GET TRANSPORTERS
    getTransportersSuccess(state, action) {
      state.isLoading = false;
      state.transporters = [
        ...state.transporters,
        ...action.payload.transporters,
      ];
      state.totalTransporters = action.payload.total;
      state.activePage = state.activePage + 1;
    },

    // SET TRANSPORTER
    setTransporter(state, action) {
      return {
        ...state,
        transporter: action.payload,
      };
    },

    // CLEAR TRANSPORTER
    clearTransporter(state) {
      return {
        ...state,
        transporter: null,
      };
    },

    onBackStep(state) {
      state.activeStep -= 1;
    },

    onNextStep(state) {
      state.activeStep += 1;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setTransporter, clearTransporter, onNextStep, onBackStep } =
  slice.actions;

// -------------------------------------------------------------------------
export function getTransporters(data, activePage) {
  const { departure, destination, date } = data;
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/transporters/list`, {
        params: { departure, destination, date, page: activePage, size: LIMIT },
      });
      dispatch(slice.actions.getTransportersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// -------------------------------------------------------------------------
