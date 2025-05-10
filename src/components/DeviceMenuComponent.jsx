import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ComputerForm from '../forms/ComputerForm';
import AssignDeviceForm from '../forms/AssignDeviceForm';
import UnAssignDeviceForm from '../forms/UnAsignDeviceForm';
import DeviceInfoForm from '../forms/DeviceInfoForm';
import ComputerUpdateForm from '../forms/ComputerUpdateForm';
import ComputerDeleteForm from '../forms/ComputerDeleteForm';



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
        <div className="parent-div relative w-full p-1 parent-div relative w-full p-1 bg-[#fafafa11] overflow-hidden rounded mb-2">
            <button className="dropdown-btn px-2 py-0.5 bg-transparent border-gradient-reverse text-gray-300 text-left" onClick={toggleDropdown}>Device Menu</button>
        
            <div className={`dropdown-items mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-fray-200 bg-transparent`} id="dropdown">
                <div onClick={() => clicked(<DeviceInfoForm/>)} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Computer Information</div>
                <div onClick={() => clicked(<ComputerForm/>)}  className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Add New Computer</div>
                <div onClick={() => clicked(<AssignDeviceForm/>)} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Assign Computer</div>
                <div onClick={() => clicked(<UnAssignDeviceForm/>)} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Un-Assign Computer</div>
                <div onClick={() => clicked(<ComputerUpdateForm/>)} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Update Computer's Information</div>
                <div onClick={() => clicked(<ComputerDeleteForm/>)} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Delete Computer</div>
            </div>
        </div>
    )
}

export default DeviceMenuComponent;