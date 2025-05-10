import React, { useState } from 'react'
import CreateAdminForm from '../forms/CreateAdminForm'
import { useAuth } from '../contexts/AuthContext'
import UpdateProfileForm from '../forms/UpdateProfileForm'
import UpdateByAdminForm from '../forms/UpdateByAdminForm'


const AdministratorMenuComponent = () => {
    const {setOptionRender} = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState)
      }
      const clicked = (RednerData)=>{
        setOptionRender(RednerData)
    }
    return (
        <div className="parent-div relative w-full p-1 parent-div relative w-full p-1 bg-[#fafafa11] overflow-hidden rounded mb-2">
            <button className="dropdown-btn px-2 py-0.5 bg-transparent border-gradient-reverse text-gray-300 text-left" onClick={toggleDropdown}>Administrator Menu</button>
        
            <div className={`dropdown-items mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-gray-100`} id="dropdown">
                <div onClick={()=>{clicked(<CreateAdminForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Create Administrator</div>
                <div onClick={()=>{clicked(<UpdateProfileForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Update Profile</div>
                <div onClick={()=>{clicked(<UpdateByAdminForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Update Other Administrator</div>
            </div>
        </div>
    )
}

export default AdministratorMenuComponent;