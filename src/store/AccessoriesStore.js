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

}))


export default AccessoriesStore;