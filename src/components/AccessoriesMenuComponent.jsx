import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AssignInventory from './AccessoriesRelated/AssignInventory';
import UnassignAccessories from './AccessoriesRelated/UnassignAccessories';
import CreateAccessoryForm from '../forms/CreateAccessoryForm';
import AccessoryUpdateForm from '../forms/AccessoryUpdateForm';
import AccessoryDeleteForm from '../forms/AccessoryDeleteForm';
import IncreaseQuantityForm from '../forms/IncreaseQuantityForm';
import DecreaseAccessoryForm from '../forms/DecreaseAccessoryForm';


const AccessoriesMenuComponent = () => {
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
            <button className="dropdown-btn px-2 py-0.5 bg-transparent border-gradient text-gray-300 text-left" onClick={toggleDropdown}>Accessories Menu</button>
        
            <div className={`dropdown-items mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-gray-100`} id="dropdown">
                <div onClick={()=>{clicked(<CreateAccessoryForm/>)}} className="dropdown-item cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Add New Accessory</div>
                <div onClick={()=>{clicked(<AccessoryUpdateForm/>)}} className="dropdown-item cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Update Accessory</div>
                <div onClick={()=>{clicked(<AccessoryDeleteForm/>)}} className="dropdown-item cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Delete Accessory</div>
                <div onClick={() => clicked(<AssignInventory/>)} className="dropdown-item cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Assign Accessory</div>
                <div onClick={() => clicked(<UnassignAccessories/>)} className="dropdown-item cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Un-Assign Accessory</div>
                <div onClick={()=>{clicked(<IncreaseQuantityForm/>)}} className="dropdown-item cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Increase Quantity</div>
                <div onClick={()=>{clicked(<DecreaseAccessoryForm/>)}} className="dropdown-item cursor-pointer hover:bg-gray-500 active:bg-[#db6d67be]">Decrease Quantity</div>
            </div>
        </div>
    )
}

export default AccessoriesMenuComponent;