import axios from "axios"
import {create} from 'zustand'

const CategoryStore = create((set)=>({
    AllCategories:[],
    AllCategoriesRequest: async(token)=>{
        let res = await axios.get('/api/allcategories', {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({AllCategories:res.data})
        }
        else{
          set({AllCategories:res.data})
        }
    },

    CreateCategoryResponse:[],
    CreateCategorRequest: async(token,formData)=>{
        let res = await axios.post('/api/createcategory', formData, {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({CreateCategoryResponse:res.data})
        }
        else{
          set({CreateCategoryResponse:res.data})
        }
    },


    UpdateCategoryResponse:{},
    UpdateCategorRequest: async(token,formData,catId)=>{
        let res = await axios.put(`/api/updatecategory/${catId}`, formData, {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({UpdateCategoryResponse:res.data})
        }
        else{
          set({UpdateCategoryResponse:res.data})
        }
    },
    DeleteCategoryResponse:{},
    DeleteCategoryRequest: async(token,catId)=>{
        let res = await axios.delete(`/api/deletecategory/${catId}`, {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({DeleteCategoryResponse:res.data})
        }
        else{
          set({DeleteCategoryResponse:res.data})
        }
    },

}))


export default CategoryStore;