import React, { useState, useEffect } from 'react';
import CategoryStore from '../store/CategoryStore';

const CreateCategoryForm = () => {
    const {CreateCategorRequest,CreateCategoryResponse } = CategoryStore();
    const token = localStorage.getItem("TOKEN");
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const [formData, setFormData] = useState({
        Title: "",
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
    const isConfirmed = window.confirm(`Are you sure you want to create this Category?`);
    if (!isConfirmed) return;    
    setHasSubmitted(true);
    await CreateCategorRequest(token,formData)
    setMessageTrigger((prev) => prev + 1);
  };

  useEffect(() => {

    if ( hasSubmitted && CreateCategoryResponse.status === "Success") {
        setFormData({
            Title: "",
        });
        alert(CreateCategoryResponse.message);
        setHasSubmitted(false);
    }
    if (hasSubmitted && CreateCategoryResponse.status === "Failed") {
        alert(CreateCategoryResponse.message);
        setHasSubmitted(false);
    }
    if (hasSubmitted && CreateCategoryResponse.status === "Error") {
        alert(CreateCategoryResponse.message);
        setHasSubmitted(false);
    }
  }
  , [messageTrigger]);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow-md rounded-md space-y-4">
      <h2 className="text-2xl font-semibold text-[#FD4075] text-center">Create Category</h2>


      <div className="text-gray-300">
        <label htmlFor="Brand" className="block text-sm font-medium text-gray-300 mb-1">
          Category Title
        </label>
        <input
          type="text"
          name="Title"
          id="Title"
          required
          value={formData.Title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder='Write Category Title Here'
        />
      </div>

      <button
        type="submit"
        className="w-full text-white border py-2 px-4 rounded active:bg-[#372B3C] transition-colors">
        Create
      </button>
    </form>
  );
};

export default CreateCategoryForm;
