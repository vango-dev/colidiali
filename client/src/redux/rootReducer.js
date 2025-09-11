import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import transporterReducer from './slices/transporter';
import departureReducer from './slices/departure';
import categoryReducer from './slices/category';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

// const productPersistConfig = {
//   key: 'product',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['sortBy', 'checkout'],
// };

const rootReducer = combineReducers({
  transporter: transporterReducer,
  departure: departureReducer,
  category: categoryReducer,
});

export { rootPersistConfig, rootReducer };
