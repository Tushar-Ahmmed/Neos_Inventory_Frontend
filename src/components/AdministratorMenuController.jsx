import React, { useState } from 'react'


const AdministratorMenuComponent = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState)
      }
    return (
        <div className="parent-div relative w-full p-1 bg-gray-100 border border-gray-300 overflow-hidden rounded mb-2">
            <button className="dropdown-btn p-2 bg-[#428BCA] text-white text-left rounded-md" onClick={toggleDropdown}>Administrator Menu</button>
        
            <div className={`dropdown-items mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-[#000000]`} id="dropdown">
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Create Administrator</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Update Profile</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Find Administrator</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Update Other Administrator</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Password Change</div>
            </div>
        </div>
    )
}

export default AdministratorMenuComponent;