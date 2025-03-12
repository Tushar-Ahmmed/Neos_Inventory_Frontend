import React from 'react'
import ImagePlaceHolder from '../assets/images/loading.json'
import Lottie from 'lottie-react'
const AccessoriesSkeleton = () => {
    return (
        <div className='grid grid-cols-1 my-5 bg-gray-200'>
            <div className="card card-border bg-white-300 w-full place-items-center">
                <div className="card-body">
                <Lottie className="w-25" animationData={ImagePlaceHolder} loop={true}/>
                </div>
            </div>
        </div>
    );
};

export default AccessoriesSkeleton;