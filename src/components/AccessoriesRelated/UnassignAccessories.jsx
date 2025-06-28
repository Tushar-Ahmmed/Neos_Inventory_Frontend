import React, { use } from 'react';
import { useState, useEffect } from 'react';
import UserStore from '../../store/UserStore';
import axios from 'axios';

const UnassignAccessories = () => {
    const [email, setEmail] = useState("");
    const {user, userRequest} = UserStore();
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [accessories, setAccessories] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showButton, setShowButton] = useState(false);
   

    const searchUser = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        await userRequest(localStorage.getItem("TOKEN"), email);
        setMessageTrigger((prev) => prev + 1);
    }
      useEffect(()=>{
        if(hasSubmitted && user){ 
          if(user.status === "Success"){

            if(user.data.Accessories.length === 0){
                alert("This user has no accessories assigned");
                setShowButton(false);
                setAccessories([]);

            }
            else{
                (async()=>{
                    const accessoriesIds = user.data.Accessories.map((item) => item.accId);
                    let response = await axios.get(`http://localhost:4999/api/accessoriesdetails/${accessoriesIds}`, {
                        headers: {
                            'authorization': localStorage.getItem("TOKEN"),
                        }

                    })
                    if(response.data['status'] === 'Success'){
                        setAccessories(response.data['data'])
                    }
                    else{
                        setAccessories([])
                    }              

                })()
            }
          setEmail("");
        }
      }
    }
      , [messageTrigger])

        // Handle checkbox change
      const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) => {
          if (prevSelectedIds.includes(id)) {
            // If already selected, remove the id
            return prevSelectedIds.filter((itemId) => itemId !== id);
          } else {
            // If not selected, add the id
            return [...prevSelectedIds, id];
          }
        });
      };

      useEffect(() => {
        if (selectedIds.length > 0) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }, [selectedIds]);

    return (
        <div className="bg-transparent text-white">
            
            <div className="p-6 rounded-2xl shadow-md flex space-x-4 text-white">
                <form action="" method="post" onSubmit={searchUser}>
                    <input required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="text-[#fafafa] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                    <input type="submit" className=" border text-white px-6 py-2 rounded-lg hover:bg-[#38132E] active:bg-[#352C3C] mx-2" value="Srarch" />
                </form>                
            </div>
            {/* Display the user object after form submission */}
            {hasSubmitted && user.status==="Success" && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">{user.data.Full_Name}</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {accessories.map((item, index) => (
                            <div key={index} className="flex flex-col justify-center bg-gray-transparent p-3 rounded-md shadow-md">
                                <div className="flex items-center">
                                    {/* Checkbox next to brand + title */}
                                    <input
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange(item._id)}
                                    checked={selectedIds.includes(item._id)}
                                    className="mr-2"/>
                                    <span className="font-medium text-gray-100">{item.Brand} {item.Title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showButton && (
                        <button
                            className= {` mt-4 p-2 bg-transparent border text-white rounded-md hover:bg-[#3A112E] active:bg-[#243540] ${selectedIds.length === 0 ? "cursor-not-allowed" : ""}`}
                            disabled={selectedIds.length === 0}
                            onClick={async () => {
                                const isConfirmed = window.confirm("Are you sure you want to unassign these accessories?");
                                if (!isConfirmed) return;
                                await axios.patch(`http://localhost:4999/api/unassignaccessory/${user.data["_id"]}`, {AccessoryIds:selectedIds}, {
                                    headers: {
                                        'authorization': localStorage.getItem("TOKEN"),
                                    }
                                })
                                .then((response) => {
                                    if(response.data['status'] === "Success"){
                                        let newAccessories = accessories.filter((item) => !selectedIds.includes(item._id));
                                        setAccessories(newAccessories);
                                        setSelectedIds([]);
                                        setShowButton(false);
                                        alert("Accessories unassigned successfully")
                                    }else{
                                        alert(JSON.stringify(response.data))
                                    }
                                })
                            }}>
                            Unassign Accessories
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UnassignAccessories;