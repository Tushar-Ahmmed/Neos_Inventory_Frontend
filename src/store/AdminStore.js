import axios from "axios"
import {create} from 'zustand'

const AdminStore = create((set)=>({
    CreateAdminResponse:{},
    CreateAdminRequest: async(token,formData)=>{
        let res = await axios.post('/api/createadmin', formData, {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({CreateAdminResponse:res.data})
        }
        else{
          set({CreateAdminResponse:res.data})
        }
    },


}))


export default AdminStore;