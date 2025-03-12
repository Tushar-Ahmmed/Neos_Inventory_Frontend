import React, { useEffect } from 'react'
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

import {Link} from "react-router-dom"

const DashBoardPage = () => {
    const {TotalUsersRequest,AllUsers} = UserStore()
    const{AllDevicesRequest,AllDevices,AllUnassignedDeviceRequests, AllUnassignedDevices} = DeviceStore()
    const{AllAccessoriesRequest,AllAccessories} = AccessoriesStore()

    const token = localStorage.getItem("TOKEN")
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
                    {(AllUsers.length < 0)?<DashboardSkeleton/> :<TotalUsers/>}
                    {(AllDevices.length < 0)?<DashboardSkeleton/> :<TotalDevices/>}
                    {(AllUnassignedDevices.length < 0)?<DashboardSkeleton/> :<TotalUnassigned/>} 
                </div>

                {/* Menu */}

                <div className="container mx-auto p-4">
                <div className="flex flex-wrap">
                        {/* 20% width div */}
                        <div className="w-full sm:w-1/5 bg-[#428BCA] p-4 text-gray-100">
                        <div class="parent-div relative w-64 p-4 bg-gray-100 border border-gray-300 overflow-hidden">
  <button class="dropdown-btn w-full py-2 bg-blue-500 text-white text-left rounded-md" onclick="toggleDropdown()">Dropdown</button>
  <div class="dropdown-items mt-2 hidden overflow-y-auto max-h-0 transition-all duration-300 ease-in-out" id="dropdown">
    <div class="dropdown-item p-2 bg-gray-200 border border-gray-300 cursor-pointer hover:bg-gray-300">Item 1</div>
    <div class="dropdown-item p-2 bg-gray-200 border border-gray-300 cursor-pointer hover:bg-gray-300">Item 2</div>
    <div class="dropdown-item p-2 bg-gray-200 border border-gray-300 cursor-pointer hover:bg-gray-300">Item 3</div>
    <div class="dropdown-item p-2 bg-gray-200 border border-gray-300 cursor-pointer hover:bg-gray-300">Item 4</div>
    <div class="dropdown-item p-2 bg-gray-200 border border-gray-300 cursor-pointer hover:bg-gray-300">Item 5</div>
  </div>
</div>
                        </div>


                        {/* 80% width div */}
                        <div className="w-full sm:w-4/5 bg-[#D1FADF] p-4">
                        <p>This is the 80% width div.</p>
                        </div>
                    </div>
                </div>




                {/* END Menu */}
                {(AllAccessories.length <0)?<AccessoriesSkeleton/>:<AccessoriesComponent/>}

        </Layout>
    );
};

export default DashBoardPage;