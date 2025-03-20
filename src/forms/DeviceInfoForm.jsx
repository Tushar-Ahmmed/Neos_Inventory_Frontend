import React, {useState,useEffect } from 'react';
import DeviceStore from '../store/DeviceStore';
import { useAuth } from '../contexts/AuthContext';
import DeviceInfoTabe from '../components/DeviceInfoTabe';

const DeviceInfoForm = () => {
  const {DeviceInformationRequest,DeviceInformation} = DeviceStore()
  const [messageTrigger, setMessageTrigger] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {setOptionRender} = useAuth();
  const [formData, setFormData] = useState({
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
    setHasSubmitted(true);
    await DeviceInformationRequest(localStorage.getItem("TOKEN"),formData.serial);
    setMessageTrigger((prev) => prev + 1);
  };

  useEffect(()=>{
    if(hasSubmitted && DeviceInformation){
        if(DeviceInformation.status === 'Error'){
          alert(JSON.stringify(DeviceInformation.message));
        }else{
            setOptionRender(<DeviceInfoTabe obj={DeviceInformation.data}/>);
        }
 
      setFormData({serial:""});
    }
  }
  , [messageTrigger])
 
  return (
    <form onSubmit={handleSubmit} className="max-w-1/2 mx-auto p-6 bg-[#ffffff0d] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center">Computer Information</h2>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="serial" className="block text-sm font-medium text-gray-100">Serial</label>
          <input id="serial" name="serial" type="text" required value={formData.serial} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
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

export default DeviceInfoForm;
