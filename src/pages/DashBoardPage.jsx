import React from 'react';
import Layout from '../layouts/Layout';
import DashboardSkeleton from '../skeletons/DashboardSkeleton';

const DashBoardPage = () => {
    return (
        <Layout>
            <h1 className='text-3xl' >Dhas boaded</h1>
            <div className='bg-[#428BCA]'>dssdfdsf</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
                <div class="card card-border bg-base-300 sm:w-70 md:w-75 lg:w-80 xl:w-80 2xl:w-85">
                    <div class="card-body">
                        <h2 class="card-title">Total Device</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    </div>
                </div>
                <div class="card card-border bg-base-300 sm:w-70 md:w-75 lg:w-80 xl:w-90 2xl:w-85">
                    <div class="card-body">
                        <h2 class="card-title">Total Users</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    </div>
                </div>
                <div class="card card-border bg-base-300 sm:w-70 md:w-75 lg:w-80 xl:w-80 2xl:w-85">
                    <div class="card-body">
                        <h2 class="card-title">Unassigned Devices</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    </div>
                </div>
                <div class="card card-border bg-base-300 sm:w-70 md:w-75 lg:w-80 xl:w-80 2xl:w-85">
                    <div class="card-body">
                        <h2 class="card-title">Card Title</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    </div>
                </div>
                
            </div>
            {<DashboardSkeleton/>}
        </Layout>
    );
};

export default DashBoardPage;