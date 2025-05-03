import React, { useEffect, useState } from 'react';

import AccessoriesStore from '../store/AccessoriesStore';
import _ from 'lodash';

const AccessoryUpdateForm = () => {
    const {AllAccessories,UpdateAccessoryResponse,UpdateAccessoryRequest} = AccessoriesStore();
    const [accessorySelected, setAccessorySelected] = useState(false);
    const [selectedAccessoryID, setSelectAccessoryID] = useState("");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        Brand: "",
        Quantity: "",
        Title: "",
    });
    const [oldFormData, setOldFormData] = useState({
        Brand: "",
        Quantity: "",
        Title: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));    
    }
    
    const handleChangeAccessory = (e) => {
        setSelectAccessoryID(e.target.value);
        const selectedAccessory = AllAccessories.find(accessory => accessory._id === e.target.value);
        if (selectedAccessory) {
            setFormData({
                Brand: selectedAccessory.Brand,
                Quantity: selectedAccessory.Quantity,
                Title:selectedAccessory.Title,
            });
            setOldFormData({
                Brand: selectedAccessory.Brand,
                Quantity: selectedAccessory.Quantity,
                Title:selectedAccessory.Title,
            });
        } else {
            setFormData({
                Brand: "",
                Quantity: "",
                Title: "",
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(`Are you sure you want to update this accessory?`);
        if (!isConfirmed) return;

        const equalityCheck = _.isEqual(formData, oldFormData);
        if (equalityCheck) {
            alert("No changes made to the accessory data.");
            return;
        }

        await UpdateAccessoryRequest(localStorage.getItem("TOKEN"), selectedAccessoryID, formData);
        setHasSubmitted(true);
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
        if (hasSubmitted && UpdateAccessoryResponse.status === "Success") {
            alert(UpdateAccessoryResponse.message);
            setHasSubmitted(false);
            setSelectAccessoryID("");
            setAccessorySelected(false);
            setFormData({
                Brand: "",
                Quantity: "",
                Title: "",
                });
        }
        if (hasSubmitted && UpdateAccessoryResponse.status === "Error") {
            alert(UpdateAccessoryResponse.message);
            setHasSubmitted(false);
        }
    }   
    , [messageTrigger]);

    return (
        <div>
             <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow-md rounded-md space-y-4">
                <h2 className="text-2xl font-semibold text-[#FD4075] text-center mb-5">Update Accessory</h2>
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
                            <label htmlFor="Brand" className="block text-sm font-medium text-gray-300 mb-1">
                            Brand
                            </label>
                            <input
                            type="text"
                            name="Brand"
                            id="Brand"
                            required
                            value={formData.Brand}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            />
                        </div>
                        <div className="text-gray-300">
                            <label htmlFor="Quantity" className="block text-sm font-medium text-gray-300 mb-1">
                            Quantity
                            </label>
                            <input
                            type="number"
                            name="Quantity"
                            id="Quantity"
                            required
                            value={formData.Quantity}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            />
                        </div>
                        <div className="text-gray-300">
                            <label htmlFor="Quantity" className="block text-sm font-medium text-gray-300 mb-1">
                            Title
                            </label>
                            <input
                            type="text"
                            name="Title"
                            id="Title"
                            required
                            value={formData.Title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white border py-2 mt-4 px-4 rounded active:bg-[#372B3C] transition-colors">
                            Submit
                        </button>
                    </div>
                )}

                


            </form>
        </div>
    );
};

export default AccessoryUpdateForm;