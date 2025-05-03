import React, { useState,useEffect } from "react";
import AccessoriesStore from "../../store/AccessoriesStore";
import UserStore from '../../store/UserStore';


const AssignInventory = () => {
  const { AllAccessories,AssignAccessoriesRequest,AssignAccessoriesResponse} = AccessoriesStore();
  const { AllUsers } = UserStore();
  const [user, setUser] = useState("");
  const [items, setItems] = useState([""]);
  const [addmore, setAddmore] = useState(false);
  const [messageTrigger, setMessageTrigger] = useState(false);
  const [clickTrigger, setClickTrigger] = useState(0);
  const [localAccessories, setLocalAccessories] = useState(AllAccessories);

  const handleUserChange = (value) => {
    setUser(value);
  };

  const handleItemChange = (index, value) => {

    if(items.includes(value)) {
      alert("Item already selected");
      return;
    }
    let updatedAccessories = localAccessories
    const objectIndex = updatedAccessories.findIndex((obj) => obj._id === value);
    updatedAccessories[objectIndex].Quantity -= 1; // Update quantity immutably
    setLocalAccessories(updatedAccessories); // Update state with new accessories array
      
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    setAddmore(true);
  };

  const handleAddMore = () => {
    setItems([...items, ""]);
  };
  const handleDeleteItem = (index) => {
    const value = items[index];
    let updatedAccessories = localAccessories
    const objectIndex = updatedAccessories.findIndex((obj) => obj._id === value);
    updatedAccessories[objectIndex].Quantity += 1; // Update quantity immutably
    setLocalAccessories(updatedAccessories); // Update state with new accessories array


    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    if(newItems.length === 0) {
      setAddmore(false);
      setItems([""]);
    }
  };

  const handleSubmit = async() => {
    const isConfirmed = window.confirm(`Are you sure you want to Assign ${items.length ==1 ? "This" : "These"} item?`);
    if (!isConfirmed) return;
    await AssignAccessoriesRequest( localStorage.getItem("TOKEN"), items,user)
    setMessageTrigger(true);
    setClickTrigger(clickTrigger + 1);
    setItems([""]);
    setUser("");
    setAddmore(false);
  }

  useEffect(() => {
    if (messageTrigger) {
      if (AssignAccessoriesResponse.status === "Success") {
        alert("Accessories assigned successfully");
      } else {
        alert(JSON.stringify(AssignAccessoriesResponse));
      }
      setMessageTrigger(false);
    }
}, [clickTrigger]);


  return (
    <div className="p-6 max-w-5/6 mx-auto text-gray-200">
      <h2 class="text-2xl font-semibold text-[#FD4075] text-center mb-5">Assign Accessories</h2>
      <div className="mb-4"></div>
      <div className="max-w-1/3">
        <label htmlFor="email" className="block mb-2">User Email</label>
        <input required list="users" id="email" name="email" className="w-full border rounded-md mb-2 bg-[#322D3C]" onChange={(e) => handleUserChange(e.target.value)} value={user} />
        <datalist id="users">
          {AllUsers.map((user, index) => (
            <option key={index} value={user.Email} />
          ))}
        </datalist>
        
      </div>

      <div className="grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index}>
            <select  disabled={user === ""} className={`w-full border rounded-md bg-[#302F3E] mb-2`} onChange={(e) => handleItemChange(index, e.target.value)} value={item}>
              <option disabled value="">Select Item</option>
              {localAccessories.map((accessory, index) => (
                <option key={index} value={accessory._id} disabled={accessory.Quantity <= 0} >{`${accessory.Brand} ${accessory.Title} ${accessory.Quantity}`} </option>
              ))}
            </select>
            {item && (
              <button className="mt-2 p-1 bg-[#EC5A69] text-white rounded-md hover:bg-red-600" onClick={() => handleDeleteItem(index)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      {addmore && (
        <button
          className="mt-4 p-2 bg-transparent border text-white rounded-md hover:bg-[#3A112E] active:bg-[#243540]" onClick={handleAddMore}>
          Add More
        </button>
      )}

      {addmore && (
        <input disabled={(user === "" || items[0] === "") } onClick={handleSubmit} type="submit" value="Submit" className=" border mx-4 p-2  rounded-md hover:bg-[#3A112E] active:bg-[#243540]" />
      )}
    </div>
  );
};

export default AssignInventory;
