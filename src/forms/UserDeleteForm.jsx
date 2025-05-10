import React, { useEffect, useState } from 'react';

import AccessoriesStore from '../store/AccessoriesStore';
import UserStore from '../store/UserStore';

const UserDeleteForm = () => {
    const {AllAccessories,DeleteAccessoryRequest,DeleteAccessoryResponse} = AccessoriesStore();
    const {AllUsers,DeleueEmployeeRequest,DeleueEmployeeResponse} = UserStore();
    // const {AllUsers} = UserStore();

    const [selectedEmail, setSelectEmail] = useState("");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleChangeAccessory = (e) => {
  
        setSelectEmail(e.target.value)
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(`Are you sure you want to delete this Employee information?`);
        if (!isConfirmed) return;
        setHasSubmitted(true);

        const Employee = AllUsers.find((user) => user.Email === selectedEmail);
        const Accessories = Employee.Accessories;
        const Devices = Employee.Devices;

        if (Accessories.length > 0) {
            window.alert("This employee has accessories assigned. Please Unassign Accessories first.");
            setSelectEmail("");
            return;
        }
        if (Devices.length > 0) {
            let flag = 0;
            Devices.forEach((device) => {
                if (device.UnAssignDate === null) {
                    flag = 1;
                }
            });

            if (flag === 1) {
                window.alert("This employee has devices assigned. Please Unassign Devices first.");
                setSelectEmail("");
                return;
            }
        }
        await DeleueEmployeeRequest(localStorage.getItem("TOKEN"), selectedEmail);
        setSelectEmail("");
        setMessageTrigger((prev) => prev + 1);

    };

    useEffect(() => {
        if (hasSubmitted && DeleueEmployeeResponse.status === "Success") {
            AllUsers.splice(AllUsers.findIndex((user) => user.Email === selectedEmail), 1);
            setSelectEmail("");
            alert(DeleueEmployeeResponse.message);
            setHasSubmitted(false);
        }
        if (hasSubmitted && DeleueEmployeeResponse.status === "Error") {
            alert(DeleueEmployeeResponse.message);
            setHasSubmitted(false);
        }
    }   
    , [messageTrigger]);

    return (
        <div>
             <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow-md rounded-md space-y-4">
                <div className="text-gray-300">
                    <h2 className="text-2xl font-semibold text-[#FD4075] text-center mb-5">Employee Information Delete</h2>
                    <label htmlFor="Employee" className="block text-sm font-medium text-gray-300 mb-1">
                    Employee
                    </label>
                    <select
                    name="Employee"
                    id="Employee"
                    value={selectedEmail}
                    onChange={handleChangeAccessory}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:bg-[#322D3C]">
                    <option value="" disabled>Select Email</option>
                    {AllUsers && AllUsers.map((user, index) => (
                        <option key={index} value={user.Email} >
                            {user.Email}
                        </option>
                    ))}
                    </select>
                </div>
                <button type="submit" disabled={selectedEmail === ""} className={`w-full text-white border py-2 mt-4 px-4 rounded active:bg-[#372B3C] transition-colors duration-200 ${selectedEmail ? "bg-[#EC5A69] hover:bg-red-600" : "cursor-not-allowed"}  `}> 
                        Delete
                </button>
            </form>
        </div>
    );
};

export default UserDeleteForm;