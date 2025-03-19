import React from 'react'
import UserStore from '../store/UserStore'

const TotalUsers = () => {
    const{AllUsers} = UserStore()
    return (
        <div className='w-full flex justify-center'>
            <div className="card card-border bg-[#ffffff0d] sm:w-70 md:w-75 lg:w-80 xl:w-80 2xl:w-85 text-gray-50">
                <div className="card-body">
                    <h2 className="text-2xl font-bold">Total Users</h2>
                    <h2 className="text-2xl font-bold">{AllUsers.length}+</h2>
                </div>
            </div>
        </div>
    );
};

export default TotalUsers;