import React, { useEffect } from 'react';
import UserStore from '../store/UserStore';


const ReportForm = () => {
    const {TotalUsersRequest,AllUsers} = UserStore();
    useEffect(() => {
        (
            async () => {
                await TotalUsersRequest(localStorage.getItem("TOKEN"));
            }
        )()
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const startDate = new Date(formData.get('startDate'));
        const endDate = new Date(formData.get('endDate'));
        // Add your logic to handle the report generation here
        const targetUsers = AllUsers.filter(user => {
            // Terget is filter those users who have been assigned devices or accessories within the date range.
            let flag = false;
            if (user.Devices.length > 0) {
                user.Devices.forEach(device => {
                    if(device.UnAssignDate === null){
                        const deviceAssignDate = new Date(device.AssignDate);
                        if (deviceAssignDate >= startDate && deviceAssignDate <= endDate) {
                            flag = true;
                        }
                    }
                });
            }

            if (user.Accessories.length > 0) {
                user.Accessories.forEach(accessory => {
                    const accessoryAssignDate = new Date(accessory.Assign_Date);
                    if (accessoryAssignDate >= startDate && accessoryAssignDate <= endDate) {
                        flag = true;
                    }
                });
            }
            if (flag) {
                return user;
            }
        });
        console.log('Filtered Users:', targetUsers);
    };
    return (
        <div className='grid grid-cols-1 gap-4'>
            <div className='text-gray-300 w-1/2'>
                <form onSubmit={handleSubmit} className="p-6 rounded-md space-y-4 ">
                    <div className="text-gray-300">
                        <h2 className="text-2xl font-semibold text-[#FD4075] mb-5">Report</h2>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">
                            From Date:
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#FD4075] focus:border-[#FD4075] text-gray-300 bg-transparent" 
                            required
                        /> 
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">
                            To Date:
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#FD4075] focus:border-[#FD4075] text-gray-300 bg-transparent" 
                            required
                        />
                    </div>
                    <div className="text-gray-300">
                        <button className='border px-2 py-1' type="submit">Generate</button>
                    </div>
                </form>
            </div>       
        </div>
    );
};

export default ReportForm;