import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import AddNewFmployeeForm from '../forms/AddNewFmployeeForm';
import UpdateUserInfoForm from '../forms/UpdateUserInfoForm';
import AddEmployeeDescriptions from '../forms/AddEmployeeDescriptions';
import UpdateUserDescriptionForm from '../forms/UpdateUserDescriptionForm';
import UserFullInfoForm from '../forms/UserFullInfoForm';


const UsersMenuComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {setOptionRender} = useAuth();

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
      }
      const clicked = (RednerData)=>{
        setOptionRender(RednerData)
    }
    return (
        <div className="parent-div relative w-full p-1 bg-[#fafafa11] overflow-hidden rounded mb-2">
            <button className="dropdown-btn px-2 py-0.5 bg-transparent border-gradient-reverse text-gray-300 text-left" onClick={toggleDropdown}>User Menu</button>
        
            <div className={`dropdown-items mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-gray-100`} id="dropdown">
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">All Users</div>
                <div onClick={()=>{clicked(<AddNewFmployeeForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Add New User</div>
                <div onClick={()=>{clicked(<UpdateUserInfoForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Update User Info</div>
                <div onClick={()=>{clicked(<AddEmployeeDescriptions/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Add User Description</div>
                <div onClick={()=>{clicked(<UpdateUserDescriptionForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Update User Description</div>
                <div  className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Get User Info</div>
                <div onClick={()=>{clicked(<UserFullInfoForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">User's Full Info</div>
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Delete User</div>
            </div>
        </div>
    )
}

export default UsersMenuComponent;