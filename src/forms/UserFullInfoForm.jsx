import React, { useState,useEffect, use } from 'react';
import UserStore from '../store/UserStore';
import AccessoriesStore from '../store/AccessoriesStore';
const UserFullInfoForm = () => {
    const { AllUsers,GetUserFullInfoRequest,GetUserFullInfoResponse} = UserStore();
    const {AllAccessories} = AccessoriesStore();

    const [userEmail, setUserEmail] = React.useState("");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [UserDevices, setUserDevices] = useState([]);
    const [UserAccessories, setUserAccessories] = useState([]);
    const [UserDescription, setUserDescription] = useState({});
    const [UserInfo, setUserInfo] = useState({});

    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showUserDevices, setShowUserDevices] = useState(false);
    const [showUserAccessories, setShowUserAccessories] = useState(false);
    const [showUserDescription, setShowUserDescription] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleUserChange = (value) => {
        setUserEmail(value);
    }

    const findUser = async (e) => {
        e.preventDefault();
        await GetUserFullInfoRequest(localStorage.getItem("TOKEN"), userEmail)
        setMessageTrigger((prev)=> prev+1)
        setHasSubmitted(true);

    }
    useEffect(() => {
        if(GetUserFullInfoResponse.status === "Success" && hasSubmitted){
            const { Devices: User_Devices, Accessories: User_Accessories, User_Des: User_Description, ...User_Info } = GetUserFullInfoResponse.data[0];
            setUserDevices(User_Devices);
            setUserAccessories(User_Accessories);
            setUserDescription(User_Description);
            setUserInfo(User_Info);

            setShowUserInfo(true);
            setShowUserDescription(true);
            setShowUserDevices(true);
            setShowUserAccessories(true);
        }
        else if(GetUserFullInfoResponse.status === "Failed" && hasSubmitted){

            setShowUserInfo(false);
            setShowUserDescription(false);
            setShowUserDevices(false);
            setShowUserAccessories(false);

            let userData = AllUsers.find((user) => user.Email === userEmail);
            const { Devices: User_Devices, Accessories: User_Accessories, ...User_Info } = userData;
            const {Email,Enroll,Full_Name,Unit,Department,Designation,Phone} = User_Info
            setUserInfo({Email,Enroll,Full_Name,Unit,Department,Designation,Phone});
            setShowUserInfo(true);

            if(User_Devices.length > 0){
                setShowUserDevices(true);
                setUserDevices(User_Devices);
            }
            else{
                setShowUserDevices(false);
                setUserDevices([]);
            }

            if(User_Accessories.length > 0){
                const Accessories = AllAccessories.filter((accessory) => User_Accessories.includes(accessory._id));
                setShowUserAccessories(true);
                setUserAccessories(Accessories);
            }
            else{
                setShowUserAccessories(false);
                setUserAccessories([]);
            }
        }
        else if(GetUserFullInfoResponse.status === "Error" && hasSubmitted){
            alert("Error Occured")
            setShowUserDescription(false);
            setShowUserDevices(false);
            setShowUserAccessories(false);
        }
    }, [messageTrigger]);


    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='w-full flex flex-col items-center justify-center'>
                <form onSubmit={findUser} className="max-w-2/6 p-0 rounded-md ">
                    <h2 className="text-2xl font-semibold text-[#FD4075] text-center mb-5">User Full Information</h2>
                    <div className="text-gray-300">
                        <input required list="users" id="email" name="email" className="p-0 border rounded-md mb-2 mr-2 bg-[#322D3C] text-sm" onChange={(e) => handleUserChange(e.target.value)} value={userEmail} />
                        <datalist id="users">
                            {AllUsers.map((user, index) => (
                            <option key={index} value={user.Email} />
                            ))}
                        </datalist>
                        <button type="submit" className="bg-gradient-to-r from-[#FF9154] to-[#E1346F] text-white py-0 px-2 rounded active:bg-[#372B3C] active:border transition-colors">Find User</button>
                    </div>
                </form>
            </div> 

            {showUserInfo && hasSubmitted && (
                <div className='w-full flex flex-col mb-4'>
                <div className="text-gray-300">
                    <h2 className="text-xl font-bold  mb-4">User's Basic Information</h2>
                    <table className="min-w-full bg-transparent border overflow-hidden">
                        <tbody className="text-gray-300">
                            {Object.entries(UserInfo).map(([key, value]) => (
                                key !== "Phone"?(
                                    <tr key={key} className="hover:bg-[#372B3C] transition-colors duration-200">
                                    <td className="py-0 px-4 border">{key}</td>
                                    <td className="py-0 px-4 border">{value}</td>
                                </tr>
                                ):(
                                    <tr key={key} className="hover:bg-[#372B3C] transition-colors duration-200">
                                    <td className="py-0 px-4 border">{key}</td>
                                    <td className="py-0 px-4 border">{value.join(", ")}</td>
                                </tr>
                                )
                                
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )}

            {showUserDescription && hasSubmitted && (
                <div className='w-full flex flex-col mb-4'>
                    <div className="text-gray-300">
                        <h2 className="text-xl font-bold mb-4">User's Description</h2>
                        <table className="min-w-full bg-transparent border overflow-hidden">
                            <tbody className="text-gray-300">
                                {Object.entries(UserDescription).map(([key, value]) => (
                                    <tr key={key} className="hover:bg-[#372B3C] transition-colors duration-200">
                                        <td className="py-0 px-4 border">{key}</td>
                                        <td className="py-0 px-4 border">{value != null?value.toString():value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) }

            {showUserAccessories && hasSubmitted && (
                <div className='w-full flex flex-col mb-4'>
                    <div className="text-gray-300">
                    <h2 className="text-xl font-bold mb-4">User's Accessories</h2>
                    <table className="min-w-full bg-transparent border overflow-hidden">
                        <tbody className="text-gray-300">
                        {UserAccessories.map((accessory, index) => (
                            <tr key={index} className="hover:bg-[#372B3C] transition-colors duration-200">
                            {index === 0 && (
                                <td rowSpan={UserAccessories.length} className="py-0 px-4 border">
                                Accessories
                                </td>
                            )}
                           
                            <td className="py-0 px-4 border">{accessory.Title}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            )}

            {showUserDevices && hasSubmitted && (
                <div className='w-full'>
                    <div className="text-gray-300">
                        <h2 className="text-xl font-bold mb-4">User's Devices</h2>
                            <div className='flex flex-wrap gap-y-4'>
                            {UserDevices.map((device, index) => (
                                <div key={index} className="card card-dash w-1/4">
                                    <div className="px-2 py-2">
                                        <h2 className="card-title">Serial: {device.Serial}</h2>
                                        <p>Assign Date: {" "}{device.AssignDate.slice(0, 10)}</p>
                                        <p>Un-Assign Date: {" "} {device.UnAssignDate != null?device.UnAssignDate.slice(0, 10):""}</p>
                                    </div>
                                </div>
                            ))}
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserFullInfoForm;