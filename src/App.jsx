import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/homepage/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'

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
                    <Route
                        path='/login'
                        element={<Login setUser={setUser} />}
                    />
                </Routes>
            </Router>
        </>
    )
}

export default App
