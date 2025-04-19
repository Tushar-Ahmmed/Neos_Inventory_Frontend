import axios from "axios"
import {create} from 'zustand'

const AccessoriesStore = create((set)=>({
    AllAccessories:[],
    AllAccessoriesRequest: async(token)=>{
        let res = await axios.get('/api/allaccessories', {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({AllAccessories:res.data['data']})
        }
    },
    AssignAccessoriesResponse:[],
    AssignAccessoriesRequest: async(token, accessoriesIDsArray, Email)=>{
        let res = await axios.patch(`/api/assignaccessory/${Email}`,{"AccessoryIds":accessoriesIDsArray}, {
            headers: {
              'authorization': token,
            }
          })
        if(res){
            set({AssignAccessoriesResponse:res.data})
        }
    },

    CreateAccessoryResponse:[],
    CreateAccessoryRequest: async(token, accessory)=>{
        let res = await axios.post(`/api/createaccessory/`,accessory, {
            headers: {
              'authorization': token,
            }
          })
        if(res){
            set({CreateAccessoryResponse:res.data})
        }
    },

    UpdateAccessoryResponse:{},
    UpdateAccessoryRequest: async(token, accessoryId, formData)=>{
        let res = await axios.patch(`/api/updateaccessory/${accessoryId}`,formData, {
            headers: {
              'authorization': token,
            }
          })
        if(res){
            set({UpdateAccessoryResponse:res.data})
        }
    },

   DeleteAccessoryResponse:{},
   DeleteAccessoryRequest: async(token, accessoryId)=>{
        let res = await axios.delete(`/api/deleteaccessory/${accessoryId}`, {
            headers: {
              'authorization': token,
            }
          })
        if(res){
            set({DeleteAccessoryResponse:res.data})
        }
    },

   IncreaseQuantityResponse:{},
   IncreaseQuantityRequest: async(token, accessoryId,quantity)=>{
        let res = await axios.patch(`/api/increaseaccessory/${accessoryId}/${quantity}`,{}, {
            headers: {
              'authorization': token,
            }
          })
        if(res){
            set({IncreaseQuantityResponse:res.data})
        }
    },

   DecreaseQuantityResponse:{},
   DecreaseQuantityRequest: async(token, accessoryId,quantity)=>{
        let res = await axios.patch(`/api/decreaseaccessory/${accessoryId}/${quantity}`,{}, {
            headers: {
              'authorization': token,
            }
          })
        if(res){
            set({DecreaseQuantityResponse:res.data})
        }
    },

}))


export default AccessoriesStore;