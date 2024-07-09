import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";

type Props = {
  children?: ReactNode;
}
type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void 
}

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {}
}

const AuthContext = createContext <IAuthContext>(initialValue);

const AuthProvider = ({children}: Props) => {
  const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated)

  const authenticationvalues = useMemo(() => ({authenticated, setAuthenticated}),[authenticated]);
  const navigate = useNavigate();

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('user');
    const isAuthenticated = token!== undefined && token!==null;
    setAuthenticated(isAuthenticated);
    if(isAuthenticated===true){
      navigate('/homepage');
    }
    else{
      return null;
    }
  },[navigate,setAuthenticated]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={authenticationvalues}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
