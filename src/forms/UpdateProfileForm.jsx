import axios from 'axios';
import React, { useEffect,useState } from 'react';
import AdminStore from '../store/AdminStore';



const UpdateProfileForm = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [messageTrigger, setMessageTrigger] = useState(0)
  const {GetAllAdminResponse,UpdateAdminRequest,UpdateAdminResponse} = AdminStore()
  const [formData, setFormData] = useState({
      name:""
    })
const handleChange = (e)=>{
const {name,value} = e.target
  setFormData((prev)=>({
    ...prev,
    [name]:value
  }))

}
const handleSubmit = async(e)=>{
  e.preventDefault()
  const isConfirm = window.confirm("Are you sure, you want to chage the name?")
  if(!isConfirm){
    return
  }
  setHasSubmitted(true)
  await UpdateAdminRequest(localStorage.getItem("TOKEN"),formData)
  setMessageTrigger((prev)=>prev+1)
}
useEffect(()=>{
    (async()=>{
        const response = await axios.get("http://localhost:4999/api/getadminemail", {
        headers: {
          'authorization': localStorage.getItem("TOKEN"),
        }
      })
        if(response.status === 200){       
        const user = GetAllAdminResponse.data.find((admin)=>admin.email === response.data)
        if(user){
          setFormData({name:user.name})
        }
        }
    })()
},[])

useEffect(()=>{
  if(hasSubmitted && UpdateAdminResponse.status === "Success"){
    alert(UpdateAdminResponse.message)
    setFormData({name:""})
    setHasSubmitted(false)
  }
  if(hasSubmitted && UpdateAdminResponse.status === "Error"){
    alert(UpdateAdminRequest.message)
  }
},[messageTrigger])

    return (
      <div className="flex items-center justify-center bg-transparent">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-md shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-[#FD4075] text-center">Update Admin Name</h2>

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
        <button type="submit"
          className="w-full py-2 px-4 text-white border font-semibold rounded hover:bg-[#39112E] active:bg-[#394953] transition" >
          Submit
        </button>
      </form>
    </div>
    );
};

export default UpdateProfileForm;