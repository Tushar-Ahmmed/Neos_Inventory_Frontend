import React, { useState, useEffect } from 'react';
import CategoryStore from '../store/CategoryStore';
import AccessoriesStore from '../store/AccessoriesStore';   

const CreateAccessoryForm = () => {
    const {AllCategories } = CategoryStore();
    const{CreateAccessoryRequest, CreateAccessoryResponse} = AccessoriesStore();
    const token = localStorage.getItem("TOKEN");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const [formData, setFormData] = useState({
    Cat_ID: "",
    Brand: "",
    Model:"",
    Spec: "",
    Quantity: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = async(e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(`Are you sure you want to create this accessory?`);
    if (!isConfirmed) return;

    setHasSubmitted(true);
    await CreateAccessoryRequest(token, formData);
    setMessageTrigger((prev) => prev + 1);
  };

  useEffect(() => {

    if ( hasSubmitted && CreateAccessoryResponse.status === "Success") {
        setFormData({
            Cat_ID: "",
            Brand: "",
            Model:"",
            Spec: "",
            Quantity: "",
            });
        alert(CreateAccessoryResponse.message);
        setHasSubmitted(false);
    }
    if (hasSubmitted && CreateAccessoryResponse.status === "Failed") {
        alert(CreateAccessoryResponse.message);
        setHasSubmitted(false);
    }
    if (hasSubmitted && CreateAccessoryResponse.status === "Error") {
        alert(CreateAccessoryResponse.message);
        setHasSubmitted(false);
    }
  }
  , [messageTrigger]);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow-md rounded-md space-y-4">
      <div className="text-gray-300">
        <label htmlFor="SelectCategory" className="block text-sm font-medium text-gray-300 mb-1">
          Category
        </label>
        <select
          name="Cat_ID"
          id="SelectCategory"
          value={formData.Cat_ID}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#322D3C]">
          <option value="" disabled>Select Category</option>
          {AllCategories && AllCategories.data.map((category, index) => (
            <option key={index} value={category._id} >   
                {category.Title}
            </option>
          ))}
        </select>
      </div>

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
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="text-gray-300">
        <label htmlFor="Model" className="block text-sm font-medium text-gray-300 mb-1">
          Model
        </label>
        <input
          type="text"
          name="Model"
          id="Model"
          required
          value={formData.Model}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="text-gray-300">
        <label htmlFor="Spec" className="block text-sm font-medium text-gray-300 mb-1">
          Specification
        </label>
        <input
          type="text"
          name="Spec"
          id="Spec"
          required
          value={formData.Spec}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white border py-2 px-4 rounded active:bg-[#372B3C] transition-colors">
        Submit
      </button>
    </form>
  );
};

export default CreateAccessoryForm;
