import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Auth from './pages/Auth';
import Register from './pages/Register';
import Main from './pages/Main';
import RequireAuth from './components/hocs/RequireAuth';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import RequireUnauth from './components/hocs/RequireUnauth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          path='/'
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path='/auth'
          element={
            <RequireUnauth>
              <Auth />
            </RequireUnauth>
          }
        />
        <Route
          path='/register'
          element={
            <RequireUnauth>
              <Register />
            </RequireUnauth>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
