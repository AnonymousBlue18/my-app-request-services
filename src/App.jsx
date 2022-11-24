import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase'
import Inicio from './components/Inicio'
import Admin from './components/Admin'
import Login from './components/Login'
import Navbar from './layout/Navbar'
import './App.css';
import './estilos.css';


import Tres from './images/3.gif';

const App = () => {

    const [firebaseUser, setFirebaseuser] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                setFirebaseuser(user);
            } else {
                setFirebaseuser(null);
            }
        });
    }, [])

    return firebaseUser !== false ? (
        <div className="">
            <Router>
                <div className=''>

                    <Navbar firebaseUser={firebaseUser} />
                    <Routes>
                        <Route path='/' element={<Inicio />} />
                        <Route path='admin' element={<Admin />} />
                        <Route path='login' element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </div>
    ) :
        (<img src={Tres} alt="loading" className='tamaño-img' />);
}

export default App;