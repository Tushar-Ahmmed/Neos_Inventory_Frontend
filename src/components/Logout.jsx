import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Logout = () => {
    const {logout} = useAuth()
    const signout = ()=>{
    logout()
    }
    return (
        <div>
            <button onClick={signout} title="Logout" type="button" className="inline-flex items-center justify-center transition-all duration-200 ease-in-out px-4 py-1.5 text-xs font-medium bg-gradient-to-r from-[#FF9154] to-[#E1346F] text-white duration-3000 hover:bg-gradient-to-l hover:from-rose-600 hover:to-rose-500 rounded-md cursor-pointer"><div className="flex items-center gap-2"><span className="">Sign Out</span></div></button>
        </div>
    );
};

export default Logout;