import React, { useEffect, useState } from 'react';
import UserStore from '../store/UserStore';

const UpdateUserInfoForm = () => {
    const { AllUsers} = UserStore();
    const [userEmail,setUserEmail] = useState("");
    const [userInfo, setUserInfo] = useState();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    }

    const changeOption = (e)=>{
        setUserEmail(e.target.value);
    }
    const findUser = (e) => {
        e.preventDefault()
        const selectedUser = AllUsers.find((user)=> user.Email === userEmail);
        if (selectedUser) {
            const {Email,Full_Name,Enroll,Unit,Department,Designation,Phone} = selectedUser;
            setUserInfo({Email,Full_Name,Enroll,Unit,Department,Designation,Phone});
                    
            alert(`User Found: ${selectedUser.Email}`);
             
        } else {
            alert('User not found');
        }
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const phoneNumbers = value.split(',').map((num) => num.trim());
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            Phone: phoneNumbers,
        }));
    };

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo);
        }
    }, [userInfo]);

    return (
        <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-1 '>
                <form onSubmit={findUser} className="max-w-[350px] p-6 rounded-md space-y-4">
                    <div className="text-gray-300">
                        <label htmlFor="SelectUser" className="block text-sm font-medium text-gray-300 mb-1">
                            User
                        </label>
                        <select id="SelectUser" name="SelectUser" value={userEmail} onChange={changeOption} className=" w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]">
                            <option disabled value="">Select User</option>
                            {
                                AllUsers.length > 0 ? AllUsers.map((user, index) => (
                                    <option key={index} value={user.Email}>
                                        {user.Email}
                                    </option>
                                )) : <option value="">No Users Found</option>
                            }
                        </select>
                    </div>
                    <button type="submit" className=" text-white border py-1 px-2 rounded active:bg-[#372B3C] transition-colors">Find User</button>
                </form>
            </div>

             {userInfo && (
                <div className='col-span-2 border border-gray-300 rounded-md'>
                <form className="max-w-full p-6 rounded-md space-y-4">
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <div className="text-gray-300">
                                <label htmlFor="SelectUser" className="block text-sm font-medium text-gray-300 mb-1">
                                    Email
                                </label>
                                <input type="text" id="Email" name="Email" value={userInfo?.Email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]" placeholder="Email" required />
                            </div>
                        </div>

                        <div className="flex-1 text-gray-300">
                            <label htmlFor="Enroll" className="block text-sm font-medium text-gray-100">Enroll</label>
                            <input
                                id="Enroll"
                                name="Enroll"
                                type="number" required
                                value={userInfo?.Enroll}
                                onChange={handleChange}
                                 placeholder="Enroll"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]"/>
                        </div>
                    </div>

                    {/* Two inputs per row */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <div className="text-gray-300">
                                <label htmlFor="Full_Name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Full_Name
                                </label>
                                <input type="text" id="Full_Name" name="Full_Name" value={userInfo?.Full_Name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]" placeholder="Full Name" required />
                            </div>
                        </div>

                        <div className="flex-1 text-gray-300">
                            <label htmlFor="Unit" className="block text-sm font-medium text-gray-100">Unit</label>
                            <input
                                id="Unit"
                                name="Unit"
                                type="text" required
                                value={userInfo?.Unit}
                                onChange={handleChange}
                                placeholder="Unit"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]"/>
                        </div>
                    </div>

                    {/* Two inputs per row */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <div className="text-gray-300">
                                <label htmlFor="Department" className="block text-sm font-medium text-gray-300 mb-1">
                                Department
                                </label>
                                <input type="text" id="Department" name="Department" value={userInfo?.Department} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]" placeholder="Department" required />
                            </div>
                        </div>

                        <div className="flex-1 text-gray-300">
                            <label htmlFor="Designation" className="block text-sm font-medium text-gray-100">Designation</label>
                            <input
                                id="Designation"
                                name="Designation"
                                type="text" required
                                value={userInfo?.Designation}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]"/>
                        </div>
                    </div>
                    {/* Two inputs per row */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <div className="text-gray-300">
                                <label htmlFor="Phone" className="block text-sm font-medium text-gray-300 mb-1">
                                Phone
                                </label>
                                <input type="text" id="Phone" name="Phone" value={userInfo?.Phone[0]} onChange={handlePhoneChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]" placeholder="Phone" required />
                            </div>
                        </div>
                        {
                            userInfo.Phone.length > 1 && (
                                <div className="flex-1">
                                    <div className="text-gray-300">
                                        <label htmlFor="Phone" className="block text-sm font-medium text-gray-300 mb-1"> Alternative Phone </label>
                                        <input type="text" id="Phone" name="Phone" value={userInfo?.Phone[1]} onChange={handlePhoneChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]" placeholder="Alternative Phone" required />
                                    </div>
                                </div>
                            )
                        }

                        <div className="flex-1 text-gray-300">
                            <label htmlFor="Designation" className="block text-sm font-medium text-[#253440]">{"."}</label>
                            <button type="submit" className="w-full text-white border py-2 px-4 rounded active:bg-[#372B3C] transition-colors">Update User Info</button>
                        </div>
                    </div>




                    
                </form>
            </div>
             )}         
            
        </div>
    );
};

export default UpdateUserInfoForm;