import './App.css';
import Routes from '../src/pages/Routes'
import AuthContextProvider from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import AuthContextProvider2 from './contexts/AuthContext2';
function App() {
  return (
    <>
    <AuthContextProvider2>
    <AuthContextProvider>
    <Routes />
    <ToastContainer />
    </AuthContextProvider>
    </AuthContextProvider2>
    </>
  );
}

export default App;
