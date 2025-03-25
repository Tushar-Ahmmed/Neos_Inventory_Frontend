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
            set({AddNewComputer:res.data})
        }
    },

    AssignDeviceMessage:"",
    AssignDeviceRequest: async(token,formData)=>{
        let res = await axios.patch('/api/assigndevice',formData, {
            headers: {
              'authorization': token,
            }
          })
        if(res){
            set({AssignDeviceMessage:res.data.message})
        }
    },

    UnAssignDeviceMessage:"",
    UnAssignDeviceRequest: async(token,serial)=>{
        let res = await axios.patch(`/api/unassigndevice/${serial}`,{}, {
          headers: {
            'authorization': token,
          },
        });
        if(res){
            set({UnAssignDeviceMessage:res.data.message})
        }
    },

    DeviceInformation:{},
    DeviceInformationRequest: async(token,serial)=>{
        let res = await axios.get(`/api/deviceinfo/${serial}`, {
          headers: {
            'authorization': token,
          },
        });
        if(res){
            set({DeviceInformation:res.data})
        }
    },

    DeviceUpdateMesage:"",
    DeviceUpdateRequest: async(token,formData)=>{
        let res = await axios.patch(`/api/updatedevice/${formData.Serial}`, formData, {
          headers: {
            'authorization': token,
          },
        });
        if(res){
            set({DeviceUpdateMesage:res.data.message})
        }
    },
    DeviceDeleteMessage:"",
    DeviceDeleteRequest: async(token,serial)=>{
        let res = await axios.delete(`/api/deletedevice/${serial}`, {
          headers: {
            'authorization': token,
          },
        });
        if(res){
            set({DeviceDeleteMessage:res.data.message})
        }
    },

}))


export default DeviceStore;