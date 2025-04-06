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

}))


export default AccessoriesStore;