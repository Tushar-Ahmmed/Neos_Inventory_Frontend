import React, { useState } from "react";
import DeleteBtnSm from "../buttons/DeleteBtnSm";

const AssignInventory = () => {
  const [user, setUser] = useState("");
  const [items, setItems] = useState([""]);

  const handleUserChange = (value) => {
    setUser(value);
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleAddMore = () => {
    setItems([...items, ""]);
  };

  return (
    <div className="p-6 max-w-5/6 mx-auto">
      <h2 className="text-xl font-bold mb-4">Assign Accessories</h2>
      <div className="">
        <select 
          className="w-full p-2 border rounded-md mb-2" 
          onChange={(e) => handleUserChange(e.target.value)}
          value={user}
        >
          <option value="">Select User</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
        </select>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index} className="">
            <select 
              className="w-full p-2 border rounded-md" 
              onChange={(e) => handleItemChange(index, e.target.value)}
              value={item}
            >
              <option value="">Select Item</option>
              <option value="item1">Item 1</option>
              <option value="item2">Item 2</option>
            </select>
          </div>
        ))}
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleAddMore} >
        Add More
      </button>
      <DeleteBtnSm/>
    </div>
  );
};

export default AssignInventory;