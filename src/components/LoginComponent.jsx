import axios from 'axios';
import React, { useState } from 'react';



const LoginComponent = () => {
    let [FormObj, SetFormObj] = useState({email:"", password:""})
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);
    let [result, setResult] = useState("");


    const onChangeHandler = (property, value)=>{
        SetFormObj(prevObj=>({
            ...prevObj,
            [property]:value

        }))
        
        
    }
   
    const FormSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await axios.post("/api/login", FormObj, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            

            if(response.data.status === "success"){
                setResult(response.data.token);
            }
            else{
                alert(response.data.message);
            }         
            
          } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
            console.error("Login error:", error);
          } finally {
            setLoading(false);
            SetFormObj({ email: "", password: "" });
          }
    }

    return (
        <div>
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-12/12">
                        <div className="bg-[#428BCA] text-white h-screen p-4 flex flex-wrap justify-center items-center ">
                            <div className="bg-[#fafafa] text-[#000000] py-10 w-150 rounded-md transition-transform duration-700 transform hover:scale-106">
                                <form onSubmit={FormSubmit} className="max-w-sm mx-auto">
                                    <div className="mb-5">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                        </label>
                                        <input value={FormObj.email} onChange={(e)=>{onChangeHandler("email", e.target.value )}} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="example@neoscoder.com" required/>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your password
                                        </label>
                                        <input value={FormObj.password} onChange={(e)=>{onChangeHandler("password", e.target.value )}} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        />
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="text-white bg-[#428BCA] hover:bg-[#308ad9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default LoginComponent;