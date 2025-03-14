import axios from "axios"
import {create} from 'zustand'

const DeviceStore = create((set)=>({
    AllDevices:[],
    AllDevicesRequest: async(token)=>{
        let res = await axios.get('/api/alldevices', {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({AllDevices:res.data['data']})
        }
    },

    AllUnassignedDevices:[],
    AllUnassignedDeviceRequests: async(token)=>{
        let res = await axios.get('/api/allunassigedndevices', {
            headers: {
              'authorization': token,
            }
          })
        if(res.data['status'] === 'Success'){
            set({AllUnassignedDevices:res.data['data']})
        }
    },



    AddNewComputer:"",
    AddNewComputerRequest: async(token,newDevice)=>{
        let res = await axios.post('/api/adddevice',newDevice, {
            headers: {
              'authorization': token,
            }
          })
        if(res){
            set({AddNewComputer:res.data.message})
        }
    },

}))


export default DeviceStore;