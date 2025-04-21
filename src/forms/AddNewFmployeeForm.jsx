import React, { useEffect, useState } from 'react';
import UserStore from '../store/UserStore';

const AddNewFmployeeForm = () => {
    const { AddUserResponseRequest, AddUserResponse } = UserStore();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [messageTrigger, setMessageTrigger] = useState(0);

    const [formData, setFormData] = useState({
        Enroll: '',
        Email: '',
        Full_Name: '',
        Unit: '',
        Department: '',
        Designation: '',
        Phone: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle phone fields by detecting the index from the name attribute
    if (name.startsWith('Phone[')) {
      const index = parseInt(name.match(/\[(\d+)\]/)[1]);
      const newPhones = [...formData.Phone];
      newPhones[index] = value;
  
      setFormData((prev) => ({
        ...prev,
        Phone: newPhones,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(`Are you sure you want to add this employee?`);
    if (!isConfirmed) return;
    setIsSubmitted(true);
    await AddUserResponseRequest(localStorage.getItem("TOKEN"), formData);
    setMessageTrigger((prev) => prev + 1);

  };

  useEffect(() => {
    if (isSubmitted && AddUserResponse.status === "Success") {
      alert(AddUserResponse.message);
      setIsSubmitted(false);
      setFormData({
        Enroll: '',
        Email: '',
        Full_Name: '',
        Unit: '',
        Department: '',
        Designation: '',
        Phone: [],
      });
    }
    if (isSubmitted && AddUserResponse.status === "Error") {
      alert(AddUserResponse.message);
      setIsSubmitted(false);
    }
  }, [messageTrigger]);

  return (
    <form
    onSubmit={handleSubmit}
    className="max-w-4xl mx-auto p-6 bg-transparent rounded-2xl space-y-4 text-white"
  >
    <h2 className="text-3xl font-bold mb-6 text-center">Employee Info Form</h2>

    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 font-semibold">Enroll</label>
        <input
          type="number"
          name="Enroll"
          required
          value={formData.Enroll}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-white rounded-lg text-white placeholder-white"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Full Name</label>
        <input
          type="text"
          name="Full_Name"
          required
          value={formData.Full_Name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-white rounded-lg text-white placeholder-white"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          name="Email"
          required
          value={formData.Email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-white rounded-lg text-white placeholder-white"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Unit</label>
        <input
          type="text"
          name="Unit"
          required
          value={formData.Unit}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-white rounded-lg text-white placeholder-white"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Department</label>
        <input
          type="text"
          name="Department"
          required
          value={formData.Department}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-white rounded-lg text-white placeholder-white"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Designation</label>
        <input
          type="text"
          name="Designation"
          required
          value={formData.Designation}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-transparent border border-white rounded-lg text-white placeholder-white"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Phone</label>
        <input
  type="text"
  name="Phone[0]"
  required
  pattern="[0-9]{11}"
  value={formData.Phone[0] || ''}
  onChange={handleChange}
  className="w-full px-4 py-2 bg-transparent border border-white rounded-lg text-white placeholder-white"
/>
      </div>
      <div className={`${formData.Phone[0]=== undefined ||formData.Phone[0] === "" ?"hidden" : ""}`} >
        <label className="block mb-1 font-semibold">Alternative Phone</label>
        <input
  type="text"
  name="Phone[1]"
  required
  pattern="[0-9]{11}"
  value={formData.Phone[1] || ''}
  onChange={handleChange}
  className="w-full px-4 py-2 bg-transparent border border-white rounded-lg text-white placeholder-white"
/>
      </div>

      <div>
        <label className="block mb-1 font-semibold"></label>
        <button type="submit" className="mt-6 w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition">Submit</button>
      </div>
    </div>


  </form>
  );
};

export default AddNewFmployeeForm;