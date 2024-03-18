// import {
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   useRef,
// } from "react";
// import PropTypes from "prop-types";

// const HANDLERS = {
//   INITIALIZE: "INITIALIZE",
//   SIGN_IN: "SIGN_IN",
//   SIGN_OUT: "SIGN_OUT",
// };

// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
// };

// const handlers = {
//   [HANDLERS.INITIALIZE]: (state, action) => {
//     const user = action.payload;

//     return {
//       ...state,
//       ...// if payload (user) is provided, then is authenticated
//       (user
//         ? {
//             isAuthenticated: true,
//             isLoading: false,
//             user,
//           }
//         : {
//             isLoading: false,
//           }),
//     };
//   },
//   [HANDLERS.SIGN_IN]: (state, action) => {
//     const user = action.payload;

//     return {
//       ...state,
//       isAuthenticated: true,
//       user,
//     };
//   },
//   [HANDLERS.SIGN_OUT]: (state) => {
//     return {
//       ...state,
//       isAuthenticated: false,
//       user: null,
//     };
//   },
// };

// const reducer = (state, action) =>
//   handlers[action.type] ? handlers[action.type](state, action) : state;

// // The role of this context is to propagate authentication state through the App tree.

// export const AuthContext = createContext({ undefined });

// export const AuthProvider = (props) => {
//   const { children } = props;
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const initialized = useRef(false);

//   const initialize = async () => {
//     // Prevent from calling twice in development mode with React.StrictMode enabled
//     if (initialized.current) {
//       return;
//     }

//     initialized.current = true;

//     let isAuthenticated = false;

//     try {
//       isAuthenticated =
//         window.sessionStorage.getItem("authenticated") === "true";
//     } catch (err) {
//       console.error(err);
//     }

//     if (isAuthenticated) {
//       const user = {
//         id: "5e86809283e28b96d2d38537",
//         avatar: "/assets/avatars/avatar-anika-visser.png",
//         name: "Anika Visser",
//         identifier: "anika.visser@devias.io",
//       };

//       dispatch({
//         type: HANDLERS.INITIALIZE,
//         payload: user,
//       });
//     } else {
//       dispatch({
//         type: HANDLERS.INITIALIZE,
//       });
//     }
//   };

//   useEffect(
//     () => {
//       initialize();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   const signIn = async (identifier, password) => {
//     if (identifier !== "demo@devias.io" || password !== "Password123!") {
//       throw new Error("Please check your identifier and password");
//     }

//     try {
//       window.sessionStorage.setItem("authenticated", "true");
//     } catch (err) {
//       console.error(err);
//     }

//     const user = {
//       id: "5e86809283e28b96d2d38537",
//       avatar: "/assets/avatars/avatar-anika-visser.png",
//       name: "Anika Visser",
//       identifier: "anika.visser@devias.io",
//     };

//     dispatch({
//       type: HANDLERS.SIGN_IN,
//       payload: user,
//     });
//   };

//   const signUp = async (identifier, name, password) => {
//     throw new Error("Sign up is not implemented");
//   };

//   const signOut = () => {
//     dispatch({
//       type: HANDLERS.SIGN_OUT,
//     });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,

//         signIn,
//         signUp,
//         signOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };

// export const AuthConsumer = AuthContext.Consumer;

// export const useAuthContext = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Importez Axios ou la bibliothèque HTTP de votre choix
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
      try {
        const response = await axios.get(`${requete.admin}/admin_verify_token`);
        const userInfo = response.data;
        console.log(userInfo);
         const user = {
        id: userInfo.admin._id,
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: userInfo.admin.name,
        role: userInfo.admin.role,
      };
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
        // console.log(user);
      } catch (error) {
        console.log(error);
      }

    
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

      const response = await axios.get(`${requete.admin}/admin_verify_token`, {
        withCredentials: true,
      });
      const userInfo = await response.data;
      console.log(userInfo);
      const user = {
        id: userInfo.admin._id,
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: userInfo.admin.name,
       role: userInfo.admin.role, 
      };
      console.log(user);

      window.sessionStorage.setItem("authenticated", "true");

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.message);
    }
  };

  // ... Le reste de votre code reste inchangé ...
  const signUp = async (identifier, name, password) => {
    throw new Error("Sign up is not implemented");
  };


  const signOut = async () => {
    try {
      const response = await axios.post(
        `${requete.admin}/logout_admin`// Utilisez l'API pour gérer la déconnexion côté serveur
      );

      if (response.status === 200) {
        // Effacer les données d'authentification côté client
        window.sessionStorage.removeItem("authenticated");
        // Mettre à jour l'état de l'authentification
        dispatch({
          type: HANDLERS.SIGN_OUT,
        });
      
      } else {
        console.error("Failed to sign out:", response.data.message);
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
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
