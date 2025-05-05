import React, { useEffect, useState } from 'react';
import UserStore from '../store/UserStore';
import _ from 'lodash';
import CategoryStore from '../store/CategoryStore';


const UpdateCategoryForm = () => {
    const {AllCategories,UpdateCategorRequest,UpdateCategoryResponse} = CategoryStore()
    const [catId,setCatId] = useState("");
    const [formData, setFormFata]=useState({
        Title:"",
    })
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false)




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFata((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const changeOption = (e)=>{
        const id = e.target.value
        setCatId(id);
        const {Title:title} = AllCategories.data.find((cat)=>cat._id === id)
        if(title){
            setFormFata({Title:title})
        }

    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const confirms = window.confirm("Are you sure that you want to chage the category title? ")
        if(!confirms){
            return;
        }
        setHasSubmitted(true)
        await UpdateCategorRequest(localStorage.getItem("TOKEN"),formData,catId)
        setMessageTrigger((prev)=>(prev+1))
    }

    useEffect(()=>{
        if(hasSubmitted && messageTrigger && UpdateCategoryResponse.status === "Success"){
            alert(UpdateCategoryResponse.message);
            setHasSubmitted(false);
            setCatId("");
        }
        if(hasSubmitted && messageTrigger && UpdateCategoryResponse.status === "Error"){
            alert(UpdateCategoryResponse.message)
        }
    },[messageTrigger])
  

    return (
        <div className='grid grid-cols-1 gap-4'>
            <div className='text-gray-300 w-1/2'>
                <form onSubmit={handleSubmit} className="p-6 rounded-md space-y-4 ">
                    <div className="text-gray-300">
                        <h2 className="text-2xl font-semibold text-[#FD4075] mb-5">Update Category Title</h2>
                        <label htmlFor="SelectUser" className="block text-sm font-medium text-gray-300 mb-1">
                            Choose Category
                        </label>
                        <select id="SelectUser" name="SelectUser" value={catId} onChange={changeOption} className=" w-3/4 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:bg-[#322D3C]">
                            <option disabled value="">Select Category</option>
                            {
                                AllCategories.data.length > 0 ? AllCategories.data.map((Cat, index) => (
                                    <option key={index} value={Cat._id}>
                                        {Cat.Title}
                                    </option>
                                )) : <option value="">No Users Found</option>
                            }
                            
                        </select>
                    </div>
                    {catId != "" && (
                    <div className="text-gray-300">
                        <label htmlFor="SelectUser" className="block text-sm font-medium text-gray-300 mb-1">
                            Edit Title
                        </label>
                        <input type="text" name="Title" id="Title" className='px-1' value={formData.Title} onChange={handleChange} />
                        <input type="submit" value="Update Category" className='border ml-5 px-1 active:bg-[#E84C6C]' />
                    </div>
                    )}                    
                </form>
            </div>       
        </div>
    );
};

export default UpdateCategoryForm;