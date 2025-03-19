import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ComputerForm from '../forms/ComputerForm';
import AssignDeviceForm from '../forms/AssignDeviceForm';
import UnAssignDeviceForm from '../forms/UnAsignDeviceForm';



const DeviceMenuComponent = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {setOptionRender} = useAuth()

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState)
      }

    const clicked = (RednerData)=>{
        setOptionRender(RednerData)
    }

    return (
        <div className="parent-div relative w-full p-1 bg-gray-100 border border-gray-300 overflow-hidden rounded mb-2">
            <button className="dropdown-btn p-2 bg-[#428BCA] text-white text-left rounded-md" onClick={toggleDropdown}>Device Menu</button>
        
            <div className={`dropdown-items mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-[#000000]`} id="dropdown">
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">All Computers</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Computer Information</div>
                <div onClick={() => clicked(<ComputerForm/>)}  className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Add New Computer</div>
                <div onClick={() => clicked(<AssignDeviceForm/>)} className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Assign Computer</div>
                <div onClick={() => clicked(<UnAssignDeviceForm/>)} className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Un-Assign Computer</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Update Computer's Information</div>
                <div className="dropdown-item bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-300">Delete Computer</div>
            </div>
        </div>
    )
}

export default DeviceMenuComponent;