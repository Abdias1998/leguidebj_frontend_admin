import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { requete } from "src/env/requete";
axios.defaults.withCredentials = true;
const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  USERS: "USERS",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.USERS]: (state, action) => {
    const users = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      users,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      // Si la connexion réussit, effectuez une requête pour récupérer les données de l'utilisateur
      const response = await axios.get(`${requete.admin}/admin_verify_token`);
      const userInfo = response.data;
      console.log(userInfo);
      const user = {
        id: userInfo.user._id,
        avatar: "/assets/logos/logo.jpg",
        name: userInfo.user.name,
        identifier: userInfo.user.role,
      };
      console.log(user);
      // const user = {
      //   id: "5e86809283e28b96d2d38537",
      //   avatar: "/assets/logos/logo.jpg",
      //   name: "Anika Visser Abdias",
      //   identifier: "anika.visser@devias.io",
      // };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const signIn = async (identifier, password) => {
    // if (identifier !== "demo@devias.io" || password !== "Password123!") {
    //   throw new Error("Please check your identifier and password");
    // }

    try {
      // Effectuez une requête pour vérifier les identifiants de connexion
      const login = await axios.post(
        `${requete.admin}/login_admin_role`,
        {
          identifier,
          password,
        },
        { withCredentials: true }
      );
      console.log(login.data);
      const response = await axios.get(`${requete.admin}/admin_verify_token`);
      const userInfo = response.data;
      console.log(userInfo);
      const user = {
        id: userInfo.user._id,
        avatar: "/assets/logos/logo.jpg",
        name: userInfo.user.pseudo,
        identifier: userInfo.user.pseudo,
      };
      console.log(user);
      window.sessionStorage.setItem("authenticated", "true");
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  // ... Le reste de votre code reste inchangé ...
  const signUp = async (identifier, name, password) => {
    throw new Error("Sign up is not implemented");
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
