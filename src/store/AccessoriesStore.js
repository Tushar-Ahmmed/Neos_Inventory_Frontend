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

    AssignAccessoriesResponse:{},
    AssignAccessoriesRequest: async(token,userEmail,AccessoryIds)=>{
      console.log('Called');
      console.log(userEmail);
      console.log(AccessoryIds);      
        let res = await axios.patch(`/api/assignaccessory/${userEmail}`,{"AccessoryIds":AccessoryIds}, {
            headers: {
              'authorization': token,
            }
          })
        set({AssignAccessoriesResponse:res.data})
    },

}))




export default AccessoriesStore;