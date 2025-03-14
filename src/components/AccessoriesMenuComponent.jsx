import React, { useState } from 'react'


const AccessoriesMenuComponent = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState)
      }
    return (
        <div className="parent-div relative w-full p-1 bg-gray-100 border border-gray-300 overflow-hidden rounded mb-2">
            <button className="dropdown-btn p-2 bg-[#428BCA] text-white text-left rounded-md" onClick={toggleDropdown}>Accessories Menu</button>
        
            <div className={`dropdown-items mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-[#000000]`} id="dropdown">
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">All Accessories</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Accessory Information</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Add New Accessory</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Update Accessory</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Delete Accessory</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Assign Accessory</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Un-Assign Accessory</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Increase Quantity</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Decrease Quantity</div>
            </div>
        </div>
    )
}

export default AccessoriesMenuComponent;