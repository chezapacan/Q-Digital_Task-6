import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Auth from './pages/Auth';
import Input from './components/UI/Input/Input';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* <Route path='/' element={} /> */}
        <Route path='/auth' element={<Auth />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
