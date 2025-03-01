import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Logout = () => {
    const {logout} = useAuth()
    const signout = ()=>{
    logout()
    }
    return (
        <div>
            <button onClick={signout} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Logout</button>
        </div>
    );
};

export default Logout;