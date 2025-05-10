import axios from "axios"
import {create} from 'zustand'

const AdminStore = create((set)=>({
    FindAdminResponse:{},
    FindAdminRequest: async(token,email)=>{
        let res = await axios.get(`/api/findadmin${email}`, {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({FindAdminResponse:res.data})
        }
        else{
          set({FindAdminResponse:res.data})
        }
    },

    GetAllAdminResponse:{},
    GetAllAdminRequest: async(token)=>{
        let res = await axios.get(`/api/alladmins`, {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({GetAllAdminResponse:res.data})
        }
        else{
          set({GetAllAdminResponse:res.data})
        }
    },

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


    UpdateAdminResponse:{},
    UpdateAdminRequest: async(token,formData)=>{
        let res = await axios.patch('/api/editprofile', formData, {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({UpdateAdminResponse:res.data})
        }
        else{
          set({UpdateAdminResponse:res.data})
        }
    },

    UpdateByAdminResponse:{},
    UpdateByAdminRequest: async(token,email,formData)=>{
        let res = await axios.put(`/api/updatebysuperadmin/${email}`, formData, {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({UpdateByAdminResponse:res.data})
        }
        else{
          set({UpdateByAdminResponse:res.data})
        }
    },


}))


export default AdminStore;