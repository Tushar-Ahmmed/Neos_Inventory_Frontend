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

    AddNewEmployeeResponse:{},
    AddNewEmployeeRequest: async(token,formData)=>{
      
        let res = await axios.post(`/api/adduser`, formData, {
            headers: {
              'authorization': token,
            }
          })
          
        if(res.data['status'] === 'Success'){
            set({AddNewEmployeeResponse:res.data});            
        }
        else{
          set({AddNewEmployeeResponse:res.data})
        }
    },

    AddUserDescriptionResponse:{},
    AddUserDescriptionRequest: async(token, email, formData)=>{
      
        let res = await axios.post(`/api/adduserdescription/${email}`, formData, {
            headers: {
              'authorization': token,
            }
          })
          
        if(res.data['status'] === 'Success'){
            set({AddUserDescriptionResponse:res.data});            
        }
        else{
          set({AddUserDescriptionResponse:res.data})
        }
    },


    UpdateUserResponse:{},
    UpdateUserRequest: async(token,user, formData)=>{
      
        let res = await axios.put(`/api/updateuser/${user}`, formData, {
            headers: {
              'authorization': token,
            }
          })
          
        if(res.data['status'] === 'Success'){
            set({UpdateUserResponse:res.data});            
        }
        else{
          set({UpdateUserResponse:res.data})
        }
    },

    UpdateUserDescriptionResponse:{},
    UpdateUserDescriptionRequest: async(token, user, formData)=>{
      
        let res = await axios.put(`/api/updateuserdescription/${user}`, formData, {
            headers: {
              'authorization': token,
            }
          })
          
        if(res.data['status'] === 'Success'){
            set({UpdateUserDescriptionResponse:res.data});            
        }
        else{
          set({UpdateUserDescriptionResponse:res.data})
        }
    },

    GetUserDescriptionResponse:{},
    GetUserDescriptionRequest: async(token,userId)=>{
      
        let res = await axios.get(`/api/finduserdescription/${userId}`, {
            headers: {
              'authorization': token,
            }
          })
          
        if(res.data['status'] === 'Success'){
            set({GetUserDescriptionResponse:res.data});
            return res.data;           
        }
        else{
          set({GetUserDescriptionResponse:res.data})
          return res.data;
        }
    },


    GetUserFullInfoResponse:{},
    GetUserFullInfoRequest: async(token,email)=>{
      
        let res = await axios.get(`/api/userfullinfo/${email}`, {
            headers: {
              'authorization': token,
            }
          })
  
        if(res.data['status'] === 'Success'){
            set({GetUserFullInfoResponse:res.data});       
        }
        else{
          set({GetUserFullInfoResponse:res.data})

        }
    },


    DeleueEmployeeResponse:{},
    DeleueEmployeeRequest: async(token,email)=>{
      
        let res = await axios.delete(`/api/deleteuser/${email}`, {
            headers: {
              'authorization': token,
            }
          })
  
        if(res.data['status'] === 'Success'){
            set({DeleueEmployeeResponse:res.data});       
        }
        else{
          set({DeleueEmployeeResponse:res.data})

        }
    },


}))


export default UserStore;