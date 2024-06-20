import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/homepage/Home'
import Signup from './pages/signup/Signup'
import Dashboard from './components/Dashboard';
import UserDetails from './components/UserDetails';
import AddTask from './components/AddTask';

function App() {
    const [user, setUser] = useState({}) 

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/signup'
                        element={<Signup />}
                    />
                   <Route path='/dashboard' 
                          element={<Dashboard />} />
                <Route path='/user/:userId' 
                          element={<UserDetails />} />
                <Route path='/add-task' 
                           element={<AddTask />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
