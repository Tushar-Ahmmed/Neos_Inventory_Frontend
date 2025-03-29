import React, { useEffect} from 'react'
import Layout from '../layouts/Layout'
import DashboardSkeleton from '../skeletons/DashboardSkeleton'
import TotalDevices from '../components/TotalDevices'
import TotalUnassigned from '../components/TotalUnassigned'
import TotalUsers from '../components/TotalUsers.jsx'
import UserStore from '../store/UserStore.js'
import DeviceStore from '../store/DeviceStore.js'
import AccessoriesStore from '../store/AccessoriesStore.js'
import AccessoriesSkeleton from './../skeletons/AccessoriesSkeleton'
import AccessoriesComponent from './../components/AccessoriesComponent'
import DeviceMenuComponent from '../components/DeviceMenuComponent.jsx'
import AccessoriesMenuComponent from '../components/AccessoriesMenuComponent.jsx'
import UsersMenuComponent from '../components/UsersMenuComponent.jsx'
import CategoryMenuComponent from '../components/CategoryMenuComponent.jsx'
import AdministratorMenuComponent from '../components/AdministratorMenuController.jsx'

import { useAuth } from '../contexts/AuthContext';


const DashBoardPage = () => {
    const {TotalUsersRequest,AllUsers} = UserStore()
    const{AllDevicesRequest,AllDevices,AllUnassignedDeviceRequests, AllUnassignedDevices} = DeviceStore()
    const{AllAccessoriesRequest,AllAccessories} = AccessoriesStore()
    const token = localStorage.getItem("TOKEN")
    const {optionRender} = useAuth()

    useEffect(()=>{
        (async()=>{
         await TotalUsersRequest(token)
         await AllDevicesRequest(token)
         await AllUnassignedDeviceRequests(token)
         await AllAccessoriesRequest(token)
        })()
      },[])


    return (
        <Layout>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                    {(AllUsers.length <= 0)?<DashboardSkeleton/> :<TotalUsers/>}
                    {(AllDevices.length <= 0)?<DashboardSkeleton/> :<TotalDevices/>}
                    {(AllUnassignedDevices.length <= 0)?<DashboardSkeleton/> :<TotalUnassigned/>} 
                </div>

                {/* Menu */}

                <div className="container mx-auto p-4 bg-[#ffffff0d]">
                <div className="flex flex-wrap">
                        <div className="w-full bg-transparent sm:w-1/5 p-4 text-gray-100 h-[600px] overflow-y-scroll">
                          <DeviceMenuComponent/>
                          <AccessoriesMenuComponent/>
                          <UsersMenuComponent/>
                          <CategoryMenuComponent/>
                          <AdministratorMenuComponent/>
                        </div>
                        <div className="w-full sm:w-4/5 bg-transparent p-4">
                            {optionRender}
                        </div>
                    </div>
                </div>

                {/* END Menu */}
                {(AllAccessories.length <=0)?<AccessoriesSkeleton/>:<AccessoriesComponent/>}
        </Layout>
    );
};

export default DashBoardPage;