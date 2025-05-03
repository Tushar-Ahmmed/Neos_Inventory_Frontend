import React, { useEffect, useState } from 'react';

import AccessoriesStore from '../store/AccessoriesStore';

const IncreaseQuantityForm = () => {
    const {AllAccessories,IncreaseQuantityResponse,IncreaseQuantityRequest} = AccessoriesStore();
    const [accessorySelected, setAccessorySelected] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [selectedAccessoryID, setSelectAccessoryID] = useState("");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleChange = (e) => {
        setQuantity(e.target.value);  
    }
    
    const handleChangeAccessory = (e) => {
        setSelectAccessoryID(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(`Are you sure you want to increase this accessory?`);
        if (!isConfirmed) return;
        setHasSubmitted(true);
        await IncreaseQuantityRequest(localStorage.getItem("TOKEN"), selectedAccessoryID, quantity);
        setMessageTrigger((prev) => prev + 1);
    };

    useEffect(() => {
        if(selectedAccessoryID !== ""){
            setAccessorySelected(true);
        }
        else{
            setAccessorySelected(false);
        }
        
    }
    , [selectedAccessoryID]);

    useEffect(() => {
        if (hasSubmitted && IncreaseQuantityResponse.status === "Success") {
            alert(IncreaseQuantityResponse.message);
            setHasSubmitted(false);
            setSelectAccessoryID("");
            setQuantity("");
        }
        if (hasSubmitted && IncreaseQuantityResponse.status === "Error") {
            alert(IncreaseQuantityResponse.message);
            setHasSubmitted(false);
        }
    }   
    , [messageTrigger]);

    return (
        <div>
             <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow-md rounded-md space-y-4">
                <h2 className="text-2xl font-semibold text-[#FD4075] text-center mb-5">Increase Accessory</h2>
                <div className="text-gray-300">
                    <label htmlFor="SelectAccessory" className="block text-sm font-medium text-gray-300 mb-1">
                    Accessory
                    </label>
                    <select
                    name="Accessory"
                    id="SelectAccessory"
                    value={selectedAccessoryID}
                    onChange={handleChangeAccessory}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:bg-[#322D3C]">
                    <option value="" disabled>Select Accessory</option>
                    {AllAccessories && AllAccessories.map((accessory, index) => (
                        <option key={index} value={accessory._id} >
                            {accessory.Brand} {accessory.Title}
                        </option>
                    ))}
                    </select>
                </div>
                {accessorySelected && (
                    <div className='border border-[#ffffff] p-2 rounded-md bg-[#253540]'>
                        <div className="text-gray-300">
                            <label htmlFor="Quantity" className="block text-sm font-medium text-gray-300 mb-1">
                            Additional Quantity
                            </label>
                            <input
                            type="number"
                            name="Quantity"
                            id="Quantity"
                            required
                            value={quantity}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            />
                        </div>
                        <button type="submit" disabled={quantity === ""} className={`w-full text-white border py-2 mt-4 px-4 rounded active:bg-[#372B3C] transition-colors duration-200 ${quantity ? "" : "cursor-not-allowed"}  `}>
                            Increase
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default IncreaseQuantityForm;