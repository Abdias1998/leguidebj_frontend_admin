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
  let cookieIdentified = null
    try {
      // isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }
      
      // Récupérer la valeur de l'ID à partir du cookie "userId"
      const userId = getCookie('userId');
      cookieIdentified = userId
      // Utilisez l'ID récupéré selon vos besoins
      console.log(userId); 
    } catch (err) {
      console.error(err);
    }
  
    if (cookieIdentified) {
      // Si l'utilisateur est authentifié, récupérez son ID depuis le sessionStorage
      window.sessionStorage.setItem("authenticated", "true");
  
      // Utilisez l'ID de l'utilisateur pour récupérer ses informations depuis le backend
      try {
        const response = await axios.get(`${requete.admin}/admin_profil_info/${cookieIdentified}`, {
          withCredentials: true,
        });
  
        const userInfo = response.data.message;
        const user = {
          id: userInfo._id,
          avatar: "/assets/avatars/avatar-anika-visser.png",
          name: userInfo.name,
          role: userInfo.role,
        };
  
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user,
        });
      } catch (error) {
        console.error(error);
        throw new Error(error.response.data.message);
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
    try {
      const login = await axios.post(`${requete.admin}/login_admin_role`, {
        identifier,
        password,
      });
  
      if (login.status === 200) {

        const token = login.data.id;
     console.log(token);
      // Stocker l'ID de l'utilisateur dans un cookie
      document.cookie = `userId=${token}; path=/; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)};`;

        // Diviser le token en ses trois parties distinctes
        const parts = token.split('.');
        
        // La partie du corps (payload) est encodée en base64, donc nous devons la décoder
        const decodedPayload = atob(parts[1]);
        
        // Convertir la chaîne JSON décodée en objet JavaScript
        const payloadObj = JSON.parse(decodedPayload);
        
        // Extraire l'ID de l'objet payload
        const userId = payloadObj.id;
        
        // console.log(userId); // Cela devrait afficher l'ID extrait du token JWT
        

        const response = await axios.get(`${requete.admin}/admin_profil_info/${userId}`, {
          withCredentials: true,
        });
  
        const userInfo = response.data.message;
        const user = {
          id: userInfo._id,
          avatar: "/assets/avatars/avatar-anika-visser.png",
          name: userInfo.name,
          role: userInfo.role,
        };
  
        // // Stocker l'ID de l'utilisateur dans le sessionStorage
        // window.sessionStorage.setItem("userId", userInfo._id);
        window.sessionStorage.setItem("authenticated", "true");
  
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user,
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.message ?error.response.data.message : error.message);
    }
  };
  

  // ... Le reste de votre code reste inchangé ...
  const signUp = async (identifier, name, password) => {
    throw new Error("Sign up is not implemented");
  };


  const signOut = async () => {
    try {


     
        // Effacer les données d'authentification côté client
        window.sessionStorage.removeItem("authenticated");
        window.sessionStorage.removeItem("userId");
        // Mettre à jour l'état de l'authentification
        dispatch({
          type: HANDLERS.SIGN_OUT,
        });
      
   
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
