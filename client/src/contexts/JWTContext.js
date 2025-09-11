import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  error: null,
  user: null,
  userInfo: null,
  companyInfo: null,
  socialAccounts: null,
  key: null,
  transporterPhoto: null,
  profilGallery: [],
  transporterCompanyPhotos: [],
  verificationResponse: null,
  trajectories: [],
  totalPages: null,
  currentPage: null,
  totalTrajectories: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  VERIFY_PHONE: (state, action) => {
    const { response } = action.payload;
    return {
      ...state,
      verificationResponse: response,
    };
  },

  LOGIN: (state, action) => {
    const { transporter } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user: transporter,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),

  REGISTER: (state, action) => {
    const { transporter } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user: transporter,
    };
  },

  HAS_ERROR: (state, action) => {
    return {
      ...state,
      error: action.payload,
    };
  },

  ADD_USER_INFO: (state, action) => {
    const {
      fName,
      lName,
      email,
      phone,
      address,
      country,
      password,
      companyName,
      transporterPhoto,
    } = action.payload;

    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        fName,
        lName,
        email,
        phone,
        address,
        country,
        password,
        companyName,
        transporterPhoto,
      },
    };
  },

  ADD_COMPANY_INFO: (state, action) => {
    const {
      transportType,
      companyName,
      companyEmail,
      companyActivity,
      companyAddress,
      companyCountry,
      companyObservation,
    } = action.payload;

    return {
      ...state,
      companyInfo: {
        ...state.companyInfo,
        transportType,
        companyName,
        companyEmail,
        companyActivity,
        companyAddress,
        companyCountry,
        companyObservation,
      },
    };
  },

  ADD_SOCIAL_ACCOUNTS: (state, action) => {
    const {
      transporterFacebook,
      transporterInstagram,
      transporterWhatsApp,
      transporterWebsite,
    } = action.payload;

    return {
      ...state,
      socialAccounts: {
        ...state.socialAccounts,
        transporterFacebook,
        transporterInstagram,
        transporterWhatsApp,
        transporterWebsite,
      },
    };
  },

  ADD_TRANSPORTER_PHOTO: (state, action) => {
    return {
      ...state,
      transporterPhoto: action.payload,
    };
  },

  ADD_TRANSPORTER_COMPANY_PHOTOS: (state, action) => {
    return {
      ...state,
      transporterCompanyPhotos: [
        ...state.transporterCompanyPhotos,
        action.payload,
      ],
    };
  },

  ADD_TRANSPORTER_GALLERY_PHOTOS: (state, action) => {
    return {
      ...state,
      profilGallery: action.payload,
    };
  },

  ADD_KEY: (state, action) => {
    return {
      ...state,
      key: action.payload,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------
AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        // const accessToken = window.localStorage.getItem('accessToken');

        // if (accessToken && isValidToken(accessToken)) {
        //   setSession(accessToken);
        const response = await axios.get('/api/transporters/profile/detail', {
          withCredentials: true,
        });

        const { transporter } = response.data;

        if (transporter) {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: transporter._doc,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            transporter: null,
          },
        });
      }
    };

    initialize();
  }, []);

  // ----------------------------------------------------------------------
  async function verifyPhoneNumber(phone) {
    const response = await axios.post(
      '/api/transporters/verify',
      { phone },
      {
        widthCredentials: true,
      }
    );
    dispatch({
      type: 'VERIFY_PHONE',
      payload: { verificationResponse: response },
    });
  }

  // ----------------------------------------------------------------------

  async function registerUser(user) {
    const response = await axios.post('/api/transporters/new', user, {
      withCredentials: true,
    });
    const { transporter } = response.data;
    dispatch({ type: 'REGISTER', payload: { transporter } });
  }
  // ----------------------------------------------------------------------
  async function addUserInfo(data) {
    dispatch({ type: 'ADD_USER_INFO', payload: data });
  }
  // ----------------------------------------------------------------------
  async function addCompanyInfo(data) {
    dispatch({ type: 'ADD_COMPANY_INFO', payload: data });
  }
  // ----------------------------------------------------------------------
  async function addSocialAccounts(data) {
    dispatch({ type: 'ADD_SOCIAL_ACCOUNTS', payload: data });
  }
  // ----------------------------------------------------------------------
  async function updateUser(updatedUser) {
    try {
      const response = await axios.put(
        '/api/transporters/profile/update',
        updatedUser,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: 'LOGIN',
        payload: { transporter: response.data.transporter },
      });
    } catch (error) {
      console.log('🚀 ~ updateUser ~ error:', error);
    }
  }
  // ----------------------------------------------------------------------
  async function loginUser(phone, password) {
    const response = await axios.post(
      '/api/transporters/login',
      { phone, password },
      {
        withCredentials: true,
      }
    );
    const {
      transporter,

      accessToken,
      refreshToken,
    } = response.data;
    dispatch({
      type: 'LOGIN',
      payload: {
        transporter,

        accessToken,
        refreshToken,
      },
    });
  }
  // ----------------------------------------------------------------------
  async function addKey(data) {
    dispatch({
      type: 'ADD_KEY',
      payload: data,
    });
  }
  // ----------------------------------------------------------------------
  async function setTransporterPhoto(photoUrl) {
    dispatch({
      type: 'ADD_TRANSPORTER_PHOTO',
      payload: photoUrl,
    });
  }
  // ----------------------------------------------------------------------
  async function setTransporterCompanyPhotos(photos) {
    dispatch({
      type: 'ADD_TRANSPORTER_COMPANY_PHOTOS',
      payload: photos,
    });
  }
  // ----------------------------------------------------------------------
  async function setProfilGallery(photos) {
    dispatch({
      type: 'ADD_TRANSPORTER_GALLERY_PHOTOS',
      payload: photos,
    });
  }
  // ----------------------------------------------------------------------
  async function logout() {
    await axios.delete('/api/sessions', {
      withCredentials: true,
    });
    dispatch({ type: 'LOGOUT' });
  }
  // ----------------------------------------------------------------------
  async function updateUserParameter(updatedUser) {
    const response = await axios.put(
      '/api/transporters/profile/update/parameter',
      updatedUser,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: 'LOGIN',
      payload: { transporter: response.data.transporter },
    });
  }
  // ----------------------------------------------------------------------
  async function deleteTransporter(updatedUser) {
    const response = await axios.delete('/api/transporters', {
      data: updatedUser,
      withCredentials: true,
    });

    if (response.status === 200) {
      dispatch({ type: 'LOGOUT' });
    }
  }
  // ----------------------------------------------------------------------

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        registerUser,
        addUserInfo,
        addCompanyInfo,
        addSocialAccounts,
        updateUser,
        updateUserParameter,
        loginUser,
        logout,
        addKey,
        setTransporterPhoto,
        setTransporterCompanyPhotos,
        setProfilGallery,
        verifyPhoneNumber,
        deleteTransporter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ----------------------------------------------------------------------

export { AuthContext, AuthProvider };
