import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHeader from './components/AdminHeader';


function App() {
  return (
    <>
      <Router>

        <div className='container'>

          <Routes>
            <Route path='/admin/*' element={<AdminHeader />} />
            <Route path='*' element={<Header />} />
          </Routes>
          <Routes>
            {/* admin routes */}

            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />


          {/* </Routes>

          <Routes> */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<UserProfile />} />



          </Routes>

        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
