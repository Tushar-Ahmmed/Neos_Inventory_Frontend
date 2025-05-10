import React, { useEffect, useState } from 'react';

import AccessoriesStore from '../store/AccessoriesStore';

const AccessoryDeleteForm = () => {
    const {AllAccessories,DeleteAccessoryRequest,DeleteAccessoryResponse} = AccessoriesStore();
    const [selectedAccessoryID, setSelectAccessoryID] = useState("");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleChangeAccessory = (e) => {
        setSelectAccessoryID(e.target.value);
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(`Are you sure you want to delete this accessory?`);
        if (!isConfirmed) return;
        setHasSubmitted(true);
        await DeleteAccessoryRequest(localStorage.getItem("TOKEN"), selectedAccessoryID);
        setSelectAccessoryID("");
        setMessageTrigger((prev) => prev + 1);

    };

    useEffect(() => {
        if (hasSubmitted && DeleteAccessoryResponse.status === "Success") {
            AllAccessories.splice(AllAccessories.findIndex((accessory) => accessory._id === selectedAccessoryID), 1);
            setSelectAccessoryID("");
            alert(DeleteAccessoryResponse.message);
            setHasSubmitted(false);
        }
        if (hasSubmitted && DeleteAccessoryResponse.status === "Error") {
            alert(DeleteAccessoryResponse.message);
            setHasSubmitted(false);
        }
    }   
    , [messageTrigger]);

    return (
        <div>
             <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow-md rounded-md space-y-4">
                <div className="text-gray-300">
                    <h2 className="text-2xl font-semibold text-[#FD4075] text-center mb-5">Accessory Delete</h2>
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
                <button type="submit" disabled={selectedAccessoryID === ""} className={`w-full text-white border py-2 mt-4 px-4 rounded active:bg-[#372B3C] transition-colors duration-200 ${selectedAccessoryID ? "bg-[#EC5A69] hover:bg-red-600" : "cursor-not-allowed"}  `}> 
                        Delete
                </button>
            </form>
        </div>
    );
};

export default AccessoryDeleteForm;