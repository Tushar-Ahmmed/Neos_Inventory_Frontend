import React, { useState,useEffect } from 'react';
import DeviceStore from '../store/DeviceStore';

const ComputerForm = () => {

  const {AddNewComputerRequest, AddNewComputer} = DeviceStore()
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    Type: '',
    Brand: '',
    Model: '',
    Serial: '',
    Vendor: '',
    Processor: '',
    GHz: '',
    Gen: '',
    RAM: '',
    BUS: '',
    Screen: '',
    Storage_Type: '',
    Storage_Size: '',
    Condition: '',
    Warentty_Policy: '',
    purchase_date: '',
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
    setHasSubmitted(true);
    await AddNewComputerRequest(localStorage.getItem("TOKEN"),formData);
    setMessageTrigger((prev) => prev + 1);
  };

  useEffect(()=>{
    if(hasSubmitted && AddNewComputer){
      alert(AddNewComputer.message)
    }
    if(AddNewComputer.status === "Success" ){
      setFormData({
        Type: '',
        Brand: '',
        Model: '',
        Serial: '',
        Vendor: '',
        Processor: '',
        GHz: '',
        Gen: '',
        RAM: '',
        BUS: '',
        Screen: '',
        Storage_Type: '',
        Storage_Size: '',
        Condition: '',
        Warentty_Policy: '',
        purchase_date: '',
      });
    }
  }
  , [messageTrigger])

  return (
    <form onSubmit={handleSubmit} className="max-w-full mx-auto p-6 bg-[#ffffff0d] rounded-lg shadow-lg text-gray-100">
        <h2 className="text-2xl font-semibold text-gray-100 text-center">Add New Computer</h2>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="Type" className="block text-sm font-medium text-gray-100">Type</label>
          <select
            id="Type"
            name="Type" required
            value={formData.Type}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]">
            <option value="" disabled selected>Select Type</option>
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="Brand" className="block text-sm font-medium text-gray-100">Brand</label>
          <input
            id="Brand"
            name="Brand"
            type="text" required
            value={formData.Brand}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>

        <div className="flex-1">
          <label htmlFor="Model" className="block text-sm font-medium text-gray-100">Model</label>
          <input
            id="Model"
            name="Model"
            type="text" required
            value={formData.Model}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>

      </div>

      {/* Another row of two inputs */}
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="Serial" className="block text-sm font-medium text-gray-100">Serial</label>
          <input id="Serial" name="Serial" type="text" required value={formData.Serial} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>

        <div className="flex-1">
          <label htmlFor="Vendor" className="block text-sm font-medium text-gray-100">Vendor</label>
          <input id="Vendor" name="Vendor" type="text" value={formData.Vendor} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>

        <div className="flex-1">
          <label htmlFor="Processor" className="block text-sm font-medium text-gray-100">Processor</label>
          <select
            id="Processor" name="Processor" required value={formData.Processor} onChange={handleChange}className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"
          >
            <option value="" disabled selected>Select Processor</option>
            <option value="Celeron">Celeron</option>
            <option value="i3">i3</option>
            <option value="i5">i5</option>
            <option value="i7">i7</option>
            <option value="i9">i9</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="GHz" className="block text-sm font-medium text-gray-100">GHz</label>
          <input
            id="GHz"
            name="GHz"
            type="number" required
            value={formData.GHz}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>
      </div>

      {/* Continue using flex for other rows */}
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="Gen" className="block text-sm font-medium text-gray-100">Generation</label>
          <input
            id="Gen"
            name="Gen"
            type="number" required
            value={formData.Gen}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>

        <div className="flex-1">
          <label htmlFor="RAM" className="block text-sm font-medium text-gray-100">RAM (GB)</label>
          <input
            id="RAM"
            name="RAM"
            type="number" required
            value={formData.RAM}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>

        <div className="flex-1">
          <label htmlFor="BUS" className="block text-sm font-medium text-gray-100">BUS Speed</label>
          <input
            id="BUS"
            name="BUS"
            type="number" required
            value={formData.BUS}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>

      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="Screen" className="block text-sm font-medium text-gray-100">Screen Size (Inches)</label>
          <input
            id="Screen"
            name="Screen"
            type="number" required
            value={formData.Screen}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>

        <div className="flex-1">
          <label htmlFor="Storage_Type" className="block text-sm font-medium text-gray-100">Storage Type</label>
          <select id="Storage_Type" name="Storage_Type" required value={formData.Storage_Type} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]">
            <option value="" disabled selected>Select Storage Type</option>
            <option value="HDD">HDD</option>
            <option value="SSD">SSD</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="Storage_Size" className="block text-sm font-medium text-gray-100">Storage Size (GB)</label>
          <input id="Storage_Size" name="Storage_Size" type="number" required value={formData.Storage_Size} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]"/>
        </div>

      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="Condition" className="block text-sm font-medium text-gray-100">Condition</label>
          <select id="Condition"
            name="Condition" required value={formData.Condition} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]">
            <option value="" disabled selected>Select Condition</option>
            <option value="New">New</option>
            <option value="Fresh">Fresh</option>
            <option value="Usable">Usable</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="Warentty_Policy" className="block text-sm font-medium text-gray-100">Warranty Policy</label>
          <select id="Warentty_Policy" name="Warentty_Policy" value={formData.Warentty_Policy} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:bg-[#2e3c48]">
            <option value="" disabled selected>Select Warranty</option>
            <option value="1 Year">1 Year</option>
            <option value="1.5 Years">1.5 Years</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
          </select>
        </div>

        <div className="flex-1">
            <label htmlFor="purchase_date" className="block text-sm font-medium text-gray-100">Purchase Date</label>
            <input id="purchase_date" name="purchase_date" type="date" value={formData.purchase_date} onChange={handleChange}className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
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

export default ComputerForm;
