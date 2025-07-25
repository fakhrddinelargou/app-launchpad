import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import { useNavigate } from "react-router-dom";
import { CircleAlert } from 'lucide-react';
import { useState } from "react";

type FieldValues = z.infer <typeof schema>
const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password:z.string().min(8 , "The password field is required").max(30 , "The password field is required"),
  firstName : z.string().min(5,"This field is required"),
  lastName : z.string().min(5,"This field is required"),
  acceptTerm : z.boolean()

});




const Register = () => {

const navigate = useNavigate()
const [error,setError] = useState(false)

const handleLogin = () =>{
    navigate("/Login")
}
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    resolver :zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
   const response = await creatNewLogin.mutateAsync(data);


  if (response.error) {
setError(true)

setTimeout(()=>{
  setError(false)
  
},2000)
  
  }else{
    navigate("/Login")

  }


  };





  const creatNewLogin = useMutation({
    mutationFn: (data: FieldValues) =>
      fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
    },
  });


  return (
    <div className="w-screen bg-[#f1f5f9] h-screen flex items-center justify-center">
     {error && ( 
     <div className="top-20  border-1 border-gray-200  flex items-center justify-center bg-gray-200  w-[20%]  rounded-xl absolute h-30">
      <span className="text-xl font-medium  ">User already exists</span>
     </div>
     )}
    
      <form
        className=" flex flex-col pt-5 px-10 bg-white rounded-[.5rem] w-[35%] shadow-gray-200 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-3xl font-bold pb-5 text-center">CREATE ACCOUNT</h3>
          <div className="flex gap-3   ">
              <label className="mb-4 w-full">
          <p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> First Name
          </p>
          <input
            {...register("firstName")}
            className="outline-none pl-2 shadow-gray-200 shadow-sm border-1 border-gray-300 rounded-[.25rem] py-2 w-full"
            type="text"
            placeholder="e.g. john"
          />
          <div className="pl-1 pt-1 h-[3vh] text-[.8rem] text-red-600">
            {errors.firstName && <div className="flex items-center gap-1"><CircleAlert size={17}/>{errors.firstName.message}</div>}
          </div>
        </label>
          <label className="mb-4 w-full">
          <p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> Last Name
          </p>
          <input
            {...register("lastName")}
            className="outline-none pl-2 shadow-gray-200 shadow-sm border-1 border-gray-300 rounded-[.25rem] py-2 w-full"
            type="text"
            placeholder="e.g. Smith"
          />
          <div className="pl-1 pt-1 h-[3vh] text-[.8rem] text-red-600">
            {errors.lastName && <div className="flex items-center gap-1"><CircleAlert size={17}/>{errors.lastName.message}</div>}
          </div>
        </label>
          </div>
        <label className="mb-4">
          <p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> Email
          </p>
          <input
            {...register("email")}
            className="outline-none pl-2 shadow-gray-200 shadow-sm border-1 border-gray-300 rounded-[.25rem] py-2 w-full"
            type="email"
            placeholder="demo@example.com"
          />
          <div className="pl-1 pt-1 h-[3vh] text-[.8rem] text-red-600">
            {errors.email && <div className="flex items-center gap-1"><CircleAlert size={17}/>{errors.email.message}</div>}
          </div>
        </label>
          <label className="mb-4">
          <p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> Password
          </p>
          <input
            {...register("password")}
            className="outline-none pl-2 shadow-gray-200 shadow-sm border-1 border-gray-300 rounded-[.25rem] py-2 w-full"
            type="password"
            placeholder="password123"
          />
          <div className="pl-1 pt-1 h-[3vh] text-[.8rem] text-red-600   ">

            {errors.password && (
              <div className="flex items-center gap-1"><CircleAlert size={17}/>{errors.password.message}</div>
            )}
          </div>
        </label>
        <label className="text-[.7rem] flex gap-1 py-2 pb-3 pl-1">

<input type="checkbox" {...register("acceptTerm",{required:true})} />
<p className={`${errors.acceptTerm ?  "text-red-600" : " " }`}>I agree all statements in Terms of servise</p>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer bg-blue-800 transition-colors text-white py-2 rounded-[.25rem]  hover:bg-blue-900"
        >
          {isSubmitting ? "Loading..." : "Sing Up"}
        </button>
        <div className="text-[.7rem] text-center pt-5 pb-6  w-full text-gray-700">
          Have already an account?
          <span onClick={handleLogin} className="font-medium text-black cursor-pointer">
           Login here
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
