import { QueryClient, QueryClientProvider } from 'react-query'
import SnackbarProvider from './shared/components/Contexts/SnackbarProvider';
import AuthProvider from './shared/components/Contexts/AuthProvider';
import AppRouters from './App/AppRoutes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/User/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});

function App() {
  /*const [count, setCount] = useState(0)

  useEffect(()=>{
    fetch('http://localhost:7241/api/user/login').then((response)=>response.json()).then((response)=>{
      console.log('response',response)
    });
  })
 */
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <AuthProvider>
          <AppRouters />
        </AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  )
}
export default App
