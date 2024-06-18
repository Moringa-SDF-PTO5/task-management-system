import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/homepage/Home'
import Signup from './pages/signup/Signup'

function App() {
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
                </Routes>
            </Router>
        </>
    )
}

export default App
