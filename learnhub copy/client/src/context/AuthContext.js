import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import { reducer } from "../state/reducers/store";
import { getData } from "../utilities/localstore";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [store, dispatch] = useReducer(reducer, { cart: [], wishList: [] });

  //checks localStorage for data
  useEffect(() => {
    async function localStorageData() {
      try {
        const _token = await getData("token");
        const _authData = await getData("authData");

        if (_token) {
          setToken(_token);
        }
        if (_authData) {
          setAuthData(_authData);
        }
      } catch (e) {
        console.log("error from storage data ", e);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    }

    localStorageData();
  }, []);

  const value = {
    loading,
    authData,
    setAuthData,
    token,
    setToken,
    store,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext, AuthProvider, useAuth };
