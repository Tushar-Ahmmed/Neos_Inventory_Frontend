import axios from "axios"
import {create} from 'zustand'

const UserStore = create((set)=>({
    AllUsers:[],
    TotalUsersRequest: async(token)=>{
        let res = await axios.get('/api/allusers', {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({AllUsers:res.data['data']})
        }
    },

    user:{},
    userRequest: async(token,email)=>{
      
        let res = await axios.get(`/api/userinfo/${email}`, {
            headers: {
              'authorization': token,
            }
          })
          
        if(res.data['status'] === 'Success'){
            set({user:res.data});            
        }
        else{
          set({user:res.data})
        }
    },

    AddUserResponse:{},
    AddUserResponseRequest: async(token,formData)=>{
      
        let res = await axios.post(`/api/adduser`, formData, {
            headers: {
              'authorization': token,
            }
          })
          
        if(res.data['status'] === 'Success'){
            set({AddUserResponse:res.data});            
        }
        else{
          set({AddUserResponse:res.data})
        }
    },


}))


export default UserStore;