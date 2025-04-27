import React, { useEffect, useState,useRef } from 'react';
import UserStore from '../store/UserStore';
import _ from 'lodash';

const AddEmployeeDescriptions = () => {
    const { AllUsers, UpdateUserRequest, UpdateUserResponse} = UserStore();
    const [userEmail,setUserEmail] = useState("");
    const [userInfo, setUserInfo] = useState();
    const [previousUserInfo, setPreviousUserInfo] = useState();
    const [alterNativePhone, setAlterNativePhone] = useState(false);
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [newUser, setNewUser] = useState();




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
            setPreviousUserInfo({Email,Full_Name,Enroll,Unit,Department,Designation,Phone});      
            alert(`User Found: ${selectedUser.Email}`);

             
        } else {
            alert('User not found');
        }
    };

    const handlePhoneChange = (e, index) => {
        const { value } = e.target;
        setUserInfo((prevUserInfo) => {
            let updatedPhone = [...prevUserInfo.Phone]; // clone to maintain immutability
            updatedPhone[index] = value;
            if(value === ""){
                updatedPhone = updatedPhone.filter((phone)=> phone !== "");
            }
            return {
                ...prevUserInfo,
                Phone: updatedPhone,
            };
        });
    };

    const handleUpdateSubmit = async(e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(`Are you sure you want to update this user?`);
        if (!isConfirmed) return;
        const isEqual = _.isEqual(userInfo, previousUserInfo);

        if (isEqual) {
            alert("No changes made to the user info.");
            return;
        }
        await UpdateUserRequest(localStorage.getItem("TOKEN"),userEmail, userInfo);
        setMessageTrigger((prev) => prev + 1);
        setAlterNativePhone(!alterNativePhone);
        setUserInfo()
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

    // handleBooleanChange for fields like Printer_Access, Wifi_Access, etc.
const handleBooleanChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value === "true", // Converts string "true"/"false" into boolean true/false
    }));
  };
  
  // handleLicenseChange for Licenses (comma separated input)
  const handleLicenseChange = (e) => {
    const { value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      Licenses: value.split(',').map(item => item.trim()).filter(item => item !== ""), 
    }));
  };

    

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

             {1 && (
                <div className='col-span-2 border border-gray-300 rounded-md'>
                <form className="max-w-full p-4 rounded-md space-y-3">
  {/* First Row */}
  <div className="flex flex-wrap gap-2 mb-3">
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="DC_Logon_Name" className="block text-sm font-medium text-gray-300 mb-1">DC Logon Name</label>
      <input type="text" id="DC_Logon_Name" name="DC_Logon_Name" value={newUser?.DC_Logon_Name} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="join_date" className="block text-sm font-medium text-gray-300 mb-1">Join Date</label>
      <input type="date" id="join_date" name="join_date" value={newUser?.join_date} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="3cx" className="block text-sm font-medium text-gray-300 mb-1">3CX Extension</label>
      <input type="number" id="3cx" name="3cx" value={newUser?.["3cx"]} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required />
    </div>
  </div>

  {/* Second Row */}
  <div className="flex flex-wrap gap-2 mb-3">
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="Mail_Box_Type" className="block text-sm font-medium text-gray-300 mb-1">Mail Box Type</label>
      <select id="Mail_Box_Type" name="Mail_Box_Type" value={newUser?.Mail_Box_Type} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
        <option value="">Select</option>
        <option value="Cloud">Cloud</option>
        <option value="On-premises">On-premises</option>
      </select>
    </div>
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="Mail_Box_Database" className="block text-sm font-medium text-gray-300 mb-1">Mail Box Database</label>
      <input type="text" id="Mail_Box_Database" name="Mail_Box_Database" value={newUser?.Mail_Box_Database} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="Office" className="block text-sm font-medium text-gray-300 mb-1">Office</label>
      <input type="text" id="Office" name="Office" value={newUser?.Office} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
    </div>
  </div>

  {/* Third Row */}
  <div className="flex flex-wrap gap-2 mb-3">
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="Country" className="block text-sm font-medium text-gray-300 mb-1">Country</label>
      <input type="text" id="Country" name="Country" value={newUser?.Country} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="Reports_To" className="block text-sm font-medium text-gray-300 mb-1">Reports To</label>
      <input type="email" id="Reports_To" name="Reports_To" value={newUser?.Reports_To} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="OS_Type" className="block text-sm font-medium text-gray-300 mb-1">OS Type</label>
      <select id="OS_Type" name="OS_Type" value={newUser?.OS_Type} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
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
      <input type="text" id="OS_Family" name="OS_Family" value={newUser?.OS_Family} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="OS_License" className="block text-sm font-medium text-gray-300 mb-1">OS License</label>
      <input type="text" id="OS_License" name="OS_License" value={newUser?.OS_License} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
    </div>
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="Licenses" className="block text-sm font-medium text-gray-300 mb-1">Licenses (comma separated)</label>
      <input type="text" id="Licenses" name="Licenses" value={newUser?.Licenses?.join(", ") || ""} onChange={handleLicenseChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" />
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
        <select id={id} name={id} value={newUser?.[id]} onChange={handleBooleanChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
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
      <select id="USB_Permission" name="USB_Permission" value={newUser?.USB_Permission} onChange={handleBooleanChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
        <option value="">Select</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="MFA_Status" className="block text-sm font-medium text-gray-300 mb-1">MFA Status</label>
      <select id="MFA_Status" name="MFA_Status" value={newUser?.MFA_Status} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:bg-[#322D3C]" required>
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