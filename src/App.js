import './App.css';
import Routes from '../src/pages/Routes'
import AuthContextProvider from './contexts/AuthContext';
function App() {
  return (
    <>
    <AuthContextProvider>
    <Routes />
    </AuthContextProvider>
    </>
  );
}

export default App;
