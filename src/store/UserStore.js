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
    }

}))


export default UserStore;