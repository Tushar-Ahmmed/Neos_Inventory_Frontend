import React from 'react'
import AccessoriesStore from './../store/AccessoriesStore'

const AccessoriesComponent = () => {
    const{AllAccessories} = AccessoriesStore()
    return (

        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {
                    AllAccessories.map((item, index)=>{
                        return(
                            <div key={index} className="bg-red-50 card card-border bg-white-300 w-full place-items-center">
                                <div className="card-body">
                                    <h2 className="card-title">{item.Title}</h2>
                                    <h2 className="card-title">Quantity:{item.Quantity} </h2>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AccessoriesComponent;