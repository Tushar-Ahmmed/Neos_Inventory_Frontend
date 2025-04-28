import React, { useEffect, useState,useRef } from 'react';
import UserStore from '../store/UserStore';
import _ from 'lodash';


const AddEmployeeDescriptions = () => {
    const { AllUsers, UpdateUserRequest, UpdateUserResponse} = UserStore();
    const [userEmail,setUserEmail] = useState("");
    const [userInfo, setUserInfo] = useState();
    const [userDescription, setUserDescription] = useState({
        DC_Logon_Name: "",
        join_date: "",
        "3cx": "",
        Mail_Box_Type: "",
        Mail_Box_Database: "",
        Office: "",
        Country: "",
        Reports_To: "",
        OS_Type: "",
        OS_Family: "",
        OS_License: "",
        Licenses: [],
        Printer_Access: "",
        Wifi_Access: "",
        VPN_Access: "",
        USB_Permission: "",
        MFA_Status: "",
    });
    const [alterNativePhone, setAlterNativePhone] = useState(false);
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const AllLicenses = ["Microsoft 365 F1", "Microsoft 365 E1", "Business Premium", "Microsoft 365 Business Standard", "Microsoft 365 Business Premium"];




    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDescription((prevUserDescription) => ({
            ...prevUserDescription,
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
            setPreviousUserInfo({Email,Full_Name,Enroll,Unit,Department,Designation,Phone});      
            alert(`User Found: ${selectedUser.Email}`);

             
        } else {
            alert('User not found');
        }
    };



    const handleUpdateSubmit = async(e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(`Are you sure you want to update this user?`);
        if (!isConfirmed) return;

        console.log(userDescription);
    }

    useEffect(() => {
        if (messageTrigger && UpdateUserResponse.status === "Success") {
            alert(UpdateUserResponse.message);
            setUserInfo();
            setUserEmail("");
            setAlterNativePhone(false);
            setPreviousUserInfo({});
            setMessageTrigger(0);
        }
        if (messageTrigger && UpdateUserResponse.status === "Error") {
            alert(UpdateUserResponse.message);
            setUserInfo();
            setUserEmail("");
            setAlterNativePhone(false);
            setPreviousUserInfo({});
            setMessageTrigger(0);
        }
    }, [messageTrigger]);

    const alternativeToggle = () => {
        setAlterNativePhone(!alterNativePhone);
        if(userInfo.Phone.length === 2){
            userInfo.Phone = userInfo.Phone.filter((phone)=> phone !== "");
        }

    };
  
  // handleLicenseChange for Licenses (comma separated input)
  const handleLicenseChange = (license) => {
    if (userDescription.Licenses.includes(license)) {
        setUserDescription((prev)=>{
            return {
                ...prev,
                Licenses: userDescription.Licenses.filter((item) => item !== license)
            }
        });
        // setSelectedLicenses((prev) => prev.filter((item) => item !== license));
    }
    else {
        setUserDescription((prev) =>{
            return {
                ...prev,
                Licenses: [...userDescription.Licenses, license]
            }
        });
    }
  };

    

    return (
        <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-1 text-gray-300'>
                <form onSubmit={findUser} className="max-w-[350px] p-6 rounded-md space-y-4 ">
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

             {1 && (
                <div className='col-span-2 border border-gray-300 rounded-md'>
                <form onSubmit={handleUpdateSubmit} className="max-w-full p-4 rounded-md space-y-3 text-gray-300">
                    {/* First Row */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="DC_Logon_Name" className="block text-sm font-medium text-gray-300 mb-1">DC Logon Name</label>
                        <input type="text" id="DC_Logon_Name" name="DC_Logon_Name" value={userDescription?.DC_Logon_Name} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="join_date" className="block text-sm font-medium text-gray-300 mb-1">Join Date</label>
                        <input type="date" id="join_date" name="join_date" value={userDescription?.join_date} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="3cx" className="block text-sm font-medium text-gray-300 mb-1">3CX Extension</label>
                        <input type="number" id="3cx" name="3cx" value={userDescription?.["3cx"]} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required />
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="Mail_Box_Type" className="block text-sm font-medium text-gray-300 mb-1">Mail Box Type</label>
                        <select id="Mail_Box_Type" name="Mail_Box_Type" value={userDescription?.Mail_Box_Type} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
                            <option value="">Select</option>
                            <option value="Cloud">Cloud</option>
                            <option value="On-premises">On-premises</option>
                        </select>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="Mail_Box_Database" className="block text-sm font-medium text-gray-300 mb-1">Mail Box Database</label>
                        <input type="text" id="Mail_Box_Database" name="Mail_Box_Database" value={userDescription?.Mail_Box_Database} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="Office" className="block text-sm font-medium text-gray-300 mb-1">Office</label>
                        <input type="text" id="Office" name="Office" value={userDescription?.Office} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="Country" className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                        <input type="text" id="Country" name="Country" value={userDescription?.Country} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="Reports_To" className="block text-sm font-medium text-gray-300 mb-1">Reports To</label>
                        <input type="email" id="Reports_To" name="Reports_To" value={userDescription?.Reports_To} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="OS_Type" className="block text-sm font-medium text-gray-300 mb-1">OS Type</label>
                        <select id="OS_Type" name="OS_Type" value={userDescription?.OS_Type} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
                            <option value="">Select</option>
                            <option value="Windows">Windows</option>
                            <option value="Linux">Linux</option>
                            <option value="macOS">macOS</option>
                        </select>
                        </div>
                    </div>

                    {/* Fourth Row */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="OS_Family" className="block text-sm font-medium text-gray-300 mb-1">OS Family</label>
                        <input type="text" id="OS_Family" name="OS_Family" value={userDescription?.OS_Family} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="OS_License" className="block text-sm font-medium text-gray-300 mb-1">OS License</label>
                        <input type="text" id="OS_License" name="OS_License" value={userDescription?.OS_License} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className='block'>License</label>
                            <input type="button" onClick={()=>{setShowOptions(!showOptions)}} value="Click to Select Licenses" className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
                            {showOptions && (
                                <div className="absolute bg-gray-800 rounded-md p-2 mt-1 z-10 overflow-y-auto max-h-60 max-w-full">
                                        {AllLicenses.map((license) => (
                                            <label key={license} className="flex items-center p-2" >
                                                <input checked={userDescription?.Licenses?.includes(license)} onChange={()=>{handleLicenseChange(license)}} className='mr-2' type="checkbox" name={license} id={license}/>
                                                {license}
                                            </label>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Fifth Row */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {[
                        { id: "Printer_Access", label: "Printer Access" },
                        { id: "Wifi_Access", label: "WiFi Access" },
                        { id: "VPN_Access", label: "VPN Access" }
                        ].map(({ id, label }) => (
                        <div key={id} className="flex-1 min-w-[150px]">
                            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
                            <select id={id} name={id} value={userDescription?.[id]} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                            </select>
                        </div>
                        ))}
                    </div>

                    {/* Sixth Row */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="USB_Permission" className="block text-sm font-medium text-gray-300 mb-1">USB Permission</label>
                        <select id="USB_Permission" name="USB_Permission" value={userDescription?.USB_Permission} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                        <label htmlFor="MFA_Status" className="block text-sm font-medium text-gray-300 mb-1">MFA Status</label>
                        <select id="MFA_Status" name="MFA_Status" value={userDescription?.MFA_Status} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
                            <option value="">Select</option>
                            <option value="Enforced">Enforced</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                        </div>
                        <div className="flex-1 min-w-[150px] flex items-end">
                        <button type="submit" className="w-full text-white border py-2 px-4 rounded active:bg-[#372B3C] transition-colors">Update Info</button>
                        </div>
                    </div>
                </form>

            </div>
             )}         
            
        </div>
    );
};

export default AddEmployeeDescriptions;