import React, {useState,useEffect } from 'react';
import DeviceStore from '../store/DeviceStore';

const AssignDeviceForm = () => {
    const {AssignDeviceRequest,AssignDeviceMessage} = DeviceStore();
      const [messageTrigger, setMessageTrigger] = useState(0);
      const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    serial: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to assign this item?");
    if (!isConfirmed) return;
    setHasSubmitted(true);
    await AssignDeviceRequest(localStorage.getItem("TOKEN"),formData);
    setMessageTrigger((prev) => prev + 1);
  };

  useEffect(()=>{
    if(hasSubmitted && AssignDeviceMessage){
      alert(AssignDeviceMessage);
      setFormData({email: '', serial: ''});
    }
  }
  , [messageTrigger])

  return (
    <form onSubmit={handleSubmit} className="max-w-1/2 mx-auto p-6 bg-[#ffffff0d] rounded-lg shadow-lg text-gray-100">
        <h2 className="text-2xl font-semibold text-center">Assign Computer</h2>
      {/* Using Flexbox to arrange two inputs in a row */}
      <div className="flex space-x-4 mb-4">

        <div className="flex-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-100">E-Mail</label>
          <input required 
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
      </div>

      {/* Another row of two inputs */}
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="serial" className="block text-sm font-medium text-gray-100">Serial</label>
          <input id="serial" name="serial" type="text" required value={formData.serial} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 "/>
        </div>
      </div>

      <div className="flex space-x-4 mb-2">
        <div className="flex-1">
        <button type="submit" className="w-full py-2 bg-[#ffffff0d] text-white rounded-md shadow-md hover:bg-[#ffffff75] focus:outline-none">
          Submit
        </button>
        </div>
      </div>
    </form>
  );
};

export default AssignDeviceForm;
