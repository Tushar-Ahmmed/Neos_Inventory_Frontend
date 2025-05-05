import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import CategoryStore from '../store/CategoryStore.js';


const DeleteCategoryForm = () => {
    const {AllCategories,DeleteCategoryResponse,DeleteCategoryRequest} = CategoryStore()
    const [catId,setCatId] = useState("");

    const [messageTrigger, setMessageTrigger] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const changeOption = (e)=>{
        const id = e.target.value
        setCatId(id);

    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("Submitted")
        const confirms = window.confirm("Are you sure that you want to Delete category ? ")
        if(!confirms){
            return;
        }
        setHasSubmitted(true)
        await DeleteCategoryRequest(localStorage.getItem("TOKEN"),catId)
        setMessageTrigger((prev)=>(prev+1))
    }

    useEffect(()=>{
        if(hasSubmitted && messageTrigger && DeleteCategoryResponse.status === "Success"){
            alert(DeleteCategoryResponse.message);
            setHasSubmitted(false);
            setCatId("");
        }
        if(hasSubmitted && messageTrigger && DeleteCategoryResponse.status === "Error"){
            alert(DeleteCategoryResponse.message)
        }
    },[messageTrigger])
  

    return (
        <div className='grid grid-cols-1 gap-4'>
            <div className='text-gray-300 w-1/2'>
                <form onSubmit={handleSubmit} className="p-6 rounded-md space-y-4 ">
                    <div className="text-gray-300">
                        <h2 className="text-2xl font-semibold text-[#FD4075] mb-5">Delete Category</h2>
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
                        <button className='border px-2 py-1' type="submit">Delete Category</button>
                    </div>
                    )}                    
                </form>
            </div>       
        </div>
    );
};

export default DeleteCategoryForm;