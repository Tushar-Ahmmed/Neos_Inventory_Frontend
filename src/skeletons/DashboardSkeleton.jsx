import React from 'react'
import ImagePlaceHolder from '../assets/images/loading.json'
import Lottie from 'lottie-react'

const DashboardSkeleton = () => {
    return (
        <div className="card card-border bg-white-300 sm:w-70 md:w-75 lg:w-80 xl:w-80 2xl:w-85 place-items-center">
            <div className="card-body">
               <Lottie className="w-25" animationData={ImagePlaceHolder} loop={true}/>
            </div>
        </div>
    );
};

export default DashboardSkeleton;