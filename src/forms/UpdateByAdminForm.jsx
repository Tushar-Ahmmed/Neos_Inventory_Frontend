import React, { useEffect, useState } from "react";

import AdminStore from "../store/AdminStore";
import _ from "lodash";

const UpdateByAdminForm = () => {
    const {GetAllAdminResponse,UpdateByAdminRequest,UpdateByAdminResponse} = AdminStore()
    const [hasSubmitted, setHassubmitted] = useState(false)
    const [messageTrigger, setMessageTrigger] = useState(0)
    const [AdminEmail, setAdminEmail] = useState("")
    const [Admin, setAdmin] = useState({})
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeAdmin = (e)=>{
    setAdminEmail(e.target.value)
    let adminInfo = GetAllAdminResponse.data.find((admin)=>admin.email === e.target.value)
    if(adminInfo){
        const {name,email,password,role}= adminInfo
        setFormData((prev)=>({...prev, ... {name,email,password,role}}))
        setAdmin( {...{name,email,password,role}})
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const Equals = _.isEqual(Admin, formData);
    if(Equals){
        alert("No change made");
        return;
    }
    const isConfirm = window.confirm("Are you sure you want to Update the adminitrator?")
    if(!isConfirm){
        return;
    }
    setHassubmitted(true)
    await UpdateByAdminRequest(localStorage.getItem("TOKEN"),AdminEmail,formData)
    setMessageTrigger((prev)=>prev+1)
    
  };
  useEffect(()=>{
    if(hasSubmitted && UpdateByAdminResponse.status === "Success"){
        alert(UpdateByAdminResponse.message)
        setFormData({
                name: "",
                email: "",
                password: "",
                role: "",
        });
        setAdminEmail("")
        setHassubmitted(false)
    }
    if(hasSubmitted && UpdateByAdminResponse.status === "Error"){
        alert(UpdateByAdminResponse.message)
    }

  },[messageTrigger])

  return (
    <div className="flex items-center justify-center bg-transparent">
        {AdminEmail === ""&&(<div className="text-gray-300">
                    <label htmlFor="SelectAccessory" className="block text-sm font-medium text-gray-300 mb-1">
                    Admin
                    </label>
                    <select
                    name="Accessory"
                    id="SelectAccessory"
                    value={AdminEmail}
                    onChange={handleChangeAdmin}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:bg-[#322D3C]">
                    <option value="" disabled>Select Admin</option>
                    {GetAllAdminResponse.data && GetAllAdminResponse.data.map((admin, index) => (
                        <option key={index} value={admin.email} >
                            {admin.name}
                        </option>
                    ))}
                    </select>
                </div>)}
        {AdminEmail != ""&&(<form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-md shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-[#FD4075] text-center">Update Admin</h2>
            <div>
            <label className="block text-white mb-1">Name</label>
            <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none"
                placeholder="Enter name"
            />
            </div>

            <div>
            <label className="block text-white mb-1">Email</label>
            <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none"
                placeholder="Enter email"
            />
            </div>

            <div>
            <label className="block text-white mb-1">Password</label>
            <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                pattern ={`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$`}
                minLength={8}
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none"
                placeholder="*****"
                autoComplete="password"
            />
            </div>

            <div>
            <label className="block text-white mb-2">Role</label>
            <div className="flex gap-4 text-white">
                <label className="flex items-center">
                <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                    className="mr-2"
                />
                Admin
                </label>
                <label className="flex items-center">
                <input
                    type="radio"
                    name="role"
                    value="super admin"
                    checked={formData.role === "super admin"}
                    onChange={handleChange}
                    className="mr-2"
                />
                Super Admin
                </label>
            </div>
            </div>

            <button
            type="submit"
            className="w-full py-2 px-4 text-white border font-semibold rounded hover:bg-[#39112E] active:bg-[#394953] transition"
            >
            Submit
            </button>
        </form>)}
    </div>
  );
};

export default UpdateByAdminForm;
