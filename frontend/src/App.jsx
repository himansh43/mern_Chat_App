
import './App.css'
import Login from './pages/login/login'
import Signup from './pages/signup/Signup'
import HomePage from './pages/home/HomePage'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import { Routes,Route } from 'react-router-dom'
import Toaster from 'react-hot-toast'

function App() {

	const { authUser } = useAuthContext();
	return (
		<div >
			<Routes>
			<Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/Login"} />} />
				<Route path='/Homepage' element={authUser ? <HomePage /> : <Navigate to={"/Login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/Homepage' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/Homepage' /> : <Signup />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App
