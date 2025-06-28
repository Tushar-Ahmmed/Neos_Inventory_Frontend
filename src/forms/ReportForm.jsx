import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import UserStore from '../store/UserStore';
import DeviceStore from '../store/DeviceStore';
import AccessoriesStore from '../store/AccessoriesStore';


const ReportForm = () => {
    const [MergedDeviceUsers, setMergedDeviceUsers] = useState(null)
    const [MergedAccessoriesUsers, setMergedAccessoriesUsers] = useState(null)
    const {TotalUsersRequest,AllUsers} = UserStore();
    const {AllDevices} = DeviceStore();
    const {AllAccessories} = AccessoriesStore();
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

        const filteredDeviceUsers = []
        const filteredAccessoriesUsers = []
        const testForAcc = []
        const targetUsers = AllUsers.filter(user => {
            let flag = false;
            if (user.Devices.length > 0) {
                for (const device of user.Devices) {
                    if (device.UnAssignDate === null || new Date(device.UnAssignDate) > startDate) {
                        const info = {
                            Unit: user.Unit,
                            Email: user.Email,
                            Enroll: user.Enroll,
                            Serial: device.Serial,
                            Assign_Date: device.AssignDate.toString().slice(0, 10),
                            UnAssign_Date: device.UnAssignDate ? device.UnAssignDate.toString().slice(0, 10) : 'N/A',
                        }
                        filteredDeviceUsers.push(info);
                        flag = true;
                        break; 
                    }
                }
            }

            if (user.Accessories.length > 0) {
                let userAccessories = [];
                user.Accessories.forEach(accessory => {
                    const Title = AllAccessories.find(acc => acc._id === accessory.accId)?.Title;
                    userAccessories.push(Title);
                })
                const info = {
                    Unit: user.Unit,
                    Email: user.Email,
                    Enroll: user.Enroll,
                    Accessories: userAccessories,
                }
                testForAcc.push(info);
                filteredAccessoriesUsers.push(user);
                 flag = true;
            }
            setMergedAccessoriesUsers(testForAcc)
            if (flag) {
                return user;
            }
        });

        const merged = filteredDeviceUsers.map(item => {
            const Device = AllDevices.find(device => device.Serial === item.Serial);
            return {
                ...item,
                Title: Device ? Device.Brand + Device.Model : 'Unknown Device',
                Processor: Device ? "Core " + Device.Processor : 'Unknown Processor',
                RAM: Device ? Device.RAM +" GB" : 'Unknown RAM',
            };
        })
        setMergedDeviceUsers(merged);
    };
    const handleExport = () => {            
        const rows = [];
        MergedAccessoriesUsers.forEach(item => {
        item.Accessories.forEach(accessory => {
            rows.push({
                Unit: item.Unit,
                Email: item.Email,
                Enroll: item.Enroll,
                Accessory: accessory,
            });
        });
        });

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const worksheet2 = XLSX.utils.json_to_sheet(MergedDeviceUsers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Accessories");
        XLSX.utils.book_append_sheet(workbook, worksheet2, "Devices");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(fileData, "Devices_Accessories_Report.xlsx");

    };


    return (
        <div className='grid grid-cols-1 gap-4'>
            <div className='text-gray-300 w-1/2 mx-auto border border-gray-600 shadow-lg'>
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
                            className="block w-1/2 px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#FD4075] focus:border-[#FD4075] text-gray-300 bg-transparent" 
                            required
                        /> 
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">
                            To Date:
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="block w-1/2 px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#FD4075] focus:border-[#FD4075] text-gray-300 bg-transparent" 
                            required
                        />
                    </div>
                    <div className="text-gray-300">
                        <button className='border px-2 py-1' type="submit">Generate</button>
                    </div>
                </form>
            </div>
            {MergedDeviceUsers && MergedDeviceUsers.length > 0 && (
                <div className='w-full mx-auto border border-gray-600 shadow-lg p-4'>
                    <h2 className="text-2xl font-semibold text-[#FD4075] mb-5 inline">Report Results</h2>
                    <button onClick={handleExport} className="ml-2 mb-4 px-1 py-0 bg-[#FD4075] text-white rounded-md hover:bg-[#e0356a] transition-colors"> Export Report</button>

                    <table className="min-w-full divide-y divide-gray-600 ">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Unit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Enroll</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Serial</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Processor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">RAM</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-600  text-gray-300">
                            {MergedDeviceUsers.map((user, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.Unit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.Email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.Enroll}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.Serial}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.Title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.Processor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.RAM}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}

        </div>
    );
};

export default ReportForm;