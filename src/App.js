import './App.css';
import Routes from '../src/pages/Routes'
import AuthContextProvider from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <AuthContextProvider>
    <Routes />
    <ToastContainer />
    </AuthContextProvider>
    </>
  );
}

export default App;
