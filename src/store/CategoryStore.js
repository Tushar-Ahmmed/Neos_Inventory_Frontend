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
    },

}))


export default CategoryStore;