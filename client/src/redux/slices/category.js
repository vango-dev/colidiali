import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';

import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
};

const slice = createSlice({
  name: 'category',
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

    // GET CATEGORIES
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload.categories;
    },

    // GET CATEGORY
    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.category = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
// export const { clearPage } = slice.actions;

// -------------------------------------------------------------------------
export function getTransporterCategories() {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get(`/api/categories`, {
        withCredentials: true,
      });
      dispatch(slice.actions.getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

// -------------------------------------------------------------------------
export function addTransporterCategory(newCategory) {
  return async () => {
    dispatch(slice.actions.startLoading());
    const response = await axios.post('/api/categories/new', newCategory, {
      withCredentials: true,
    });
    dispatch(slice.actions.getCategoriesSuccess(response.data));
    try {
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// -------------------------------------------------------------------------
export function deleteTransporterCategory(categoryId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.delete(
        `/api/categories/${categoryId}/delete`,
        {
          withCredentials: true,
        }
      );
      dispatch(slice.actions.getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// -------------------------------------------------------------------------
export function updateTransporterCategory(categoryId, updatedCategory) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.put(
        `/api/categories/${categoryId}/update`,
        updatedCategory,
        {
          withCredentials: true,
        }
      );
      dispatch(slice.actions.getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
