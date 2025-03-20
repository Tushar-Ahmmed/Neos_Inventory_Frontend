import React from 'react';

const DeviceInfoTabe = ({obj}) => {
    return (
        <div className="max-w-full mx-auto p-6 bg-transparent shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Computer's Information</h2>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(obj).map(([key, value], index) => (
            <div key={index} className="flex flex-col justify-center bg-gray-transparent p-3 rounded-md shadow-md">
              <span className="font-medium text-gray-100">{key}</span>
              <span className="text-gray-300">{JSON.stringify(value)}</span>
            </div>
          ))}
        </div>
      </div>
    );
};

export default DeviceInfoTabe;