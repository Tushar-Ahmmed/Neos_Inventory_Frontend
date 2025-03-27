import React, { use, useState } from "react";
import AccessoriesStore from "../store/AccessoriesStore";
import UserStore from './../store/UserStore';


const AssignInventory = () => {
  const { AllAccessories } = AccessoriesStore();
  const { AllUsers } = UserStore();
  const [user, setUser] = useState("");
  const [items, setItems] = useState([""]);
  const [addmore, setAddmore] = useState(false);

  const handleUserChange = (value) => {
    setUser(value);
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    setAddmore(true);
  };

  const handleAddMore = () => {
    setItems([...items, ""]);
  };
  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    if(newItems.length === 0) {
      setAddmore(false);
      setItems([""]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    console.log(items);
    // const AccessoryIds = items.map((item) => item._id);
    // console.log(AccessoryIds);
    // console.log(user);
    // console.log(items);
    // console.log(AllUsers);
    // console.log(AllAccessories);
  }

  return (
    <div className="p-6 max-w-5/6 mx-auto text-gray-200">
      <h2 className="text-xl font-bold mb-4">Assign Accessories</h2>

      <div className="max-w-1/3">
        <label htmlFor="email" className="block mb-2">User Email</label>
        <input list="users" id="email" name="email" className="w-full p-2 border rounded-md mb-2 bg-[#322D3C]" onChange={(e) => handleUserChange(e.target.value)} value={user} />
        <datalist id="users">
          {AllUsers.map((user, index) => (
            <option key={index} value={user.Email} />
          ))}
        </datalist>
        
      </div>

      <div className="grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index}>
            <select className="w-full p-2 border rounded-md bg-[#302F3E] mb-2"onChange={(e) => handleItemChange(index, e.target.value)} value={item}>
              <option selected disabled value="">Select Item</option>
              {AllAccessories.map((accessory, index) => (
                <option key={index} value={accessory._id}>{`${accessory.Brand} ${accessory.Category.Title}`}</option>
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
        <input onClick={handleSubmit} type="submit" value="Submit" className=" border mx-4 p-2  rounded-md hover:bg-[#3A112E] active:bg-[#243540]" />
      )}
    </div>
  );
};

export default AssignInventory;
