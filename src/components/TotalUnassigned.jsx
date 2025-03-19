import React from 'react'
import DeviceStore from '../store/DeviceStore.js'

const TotalUnassigned = () => {
    const{AllUnassignedDevices} = DeviceStore()
    return (
        <div className='w-full flex justify-center'>
            <div className="card card-border bg-[#ffffff0d] sm:w-70 md:w-75 lg:w-80 xl:w-80 2xl:w-85 text-gray-50">
                <div className="card-body">
                    <h2 className="text-2xl font-bold">Unassigned Devices</h2>
                    <h2 className="text-2xl font-bold">{AllUnassignedDevices.length}+</h2>
                </div>
            </div>
        </div>
    );
};

export default TotalUnassigned;