import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import CreateCategoryForm from '../forms/CreateCategoryForm.jsx'
import UpdateCategoryForm from '../forms/UpdateCategoryForm.jsx'
import DeleteCategoryForm from '../forms/DeleteCategoryForm.jsx'


const CategoryMenuComponent = () => {
     const [isOpen, setIsOpen] = useState(false)
    const {setOptionRender} = useAuth()

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState)
      }
    const clicked = (RednerData)=>{
        setOptionRender(RednerData)
    }
    return (
        <div className="parent-div relative w-full p-1 bg-[#fafafa11] overflow-hidden rounded mb-2">
            <button className="dropdown-btn px-2 py-0.5 bg-transparent border-gradient text-gray-300 text-left" onClick={toggleDropdown}>Category Menu</button>
        
            <div className={`dropdown-items mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-gray-200`} id="dropdown">
                <div className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">All Categories</div>
                <div onClick={()=>{clicked(<CreateCategoryForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Add New Category</div>
                <div onClick={()=>{clicked(<UpdateCategoryForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Update Category</div>
                <div onClick={()=>{clicked(<DeleteCategoryForm/>)}} className="dropdown-item bg-transparent cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Delete Category</div>
            </div>
        </div>
    )
}

export default CategoryMenuComponent;