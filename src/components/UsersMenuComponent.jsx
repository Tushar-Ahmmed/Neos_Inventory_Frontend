import React, { useState } from 'react'


const UsersMenuComponent = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState)
      }
    return (
        <div className="parent-div relative w-full p-1 bg-[#fafafa11] overflow-hidden rounded mb-2">
            <button className="dropdown-btn px-2 py-0.5 bg-transparent border-gradient-reverse text-gray-300 text-left" onClick={toggleDropdown}>User Menu</button>
        
            <div className={`dropdown-items mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-gray-100`} id="dropdown">
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">All Users</div>
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Add New User</div>
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Update User Info</div>
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Add User Description</div>
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Update User Description</div>
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Get User Info</div>
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">User's Full Info</div>
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Delete User</div>
            </div>
        </div>
    )
}

export default UsersMenuComponent;