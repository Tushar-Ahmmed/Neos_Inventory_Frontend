import React from 'react'
import DeviceStore from '../store/DeviceStore';

const TotalDevices = () => {
    const {AllDevices} = DeviceStore()
    return (
        <div className='w-full flex justify-center'>
            <div className="card card-border bg-gradient-to-l from-[#FF9154] to-[#E1346F] sm:w-70 md:w-75 lg:w-80 xl:w-80 2xl:w-85 text-gray-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold">Total Device</h2>
                    <h2 className="text-2xl font-bold">{AllDevices.length}+</h2>
                </div>
            </div>
        </div>
    );
};

export default TotalDevices;