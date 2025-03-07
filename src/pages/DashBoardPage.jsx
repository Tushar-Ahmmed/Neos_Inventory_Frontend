import React, { useEffect } from 'react'
import Layout from '../layouts/Layout'
import DashboardSkeleton from '../skeletons/DashboardSkeleton'
import TotalDevices from '../components/TotalDevices'
import TotalUnassigned from '../components/TotalUnassigned'
import TotalUsers from '../components/TotalUsers.jsx'
import UserStore from '../store/UserStore.js'
import DeviceStore from '../store/DeviceStore.js'

const DashBoardPage = () => {
    const {TotalUsersRequest,AllUsers} = UserStore()
    const{AllDevicesRequest,AllDevices,AllUnassignedDeviceRequests, AllUnassignedDevices} = DeviceStore()

    const token = localStorage.getItem("TOKEN")
    useEffect(()=>{
        (async()=>{
         await TotalUsersRequest(token)
         await AllDevicesRequest(token)
         await AllUnassignedDeviceRequests(token)
        })()
      },[])

    return (
        <Layout>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                    {(AllUsers.length < 0)?<DashboardSkeleton/> :<TotalUsers/>}
                    {(AllDevices.length < 0)?<DashboardSkeleton/> :<TotalDevices/>}
                    {(AllUnassignedDevices.length < 0)?<DashboardSkeleton/> :<TotalUnassigned/>}
                </div>
        </Layout>
    );
};

export default DashBoardPage;