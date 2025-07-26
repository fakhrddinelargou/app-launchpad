import { useMutation } from "@tanstack/react-query"
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";




function ResetPassword(){

    const [showPass , setShowPass] = useState(false)


    const navigate = useNavigate()

    type FieldData = {
        password : string;
        newPassword : string ;
    }


    const {register , handleSubmit , watch , formState : {errors , isSubmitting}} = useForm<FieldData>()
const password = watch("password")
    const token = localStorage.getItem('token')
    const resetToken = localStorage.getItem('resetToken')


    const CreatNewPassWord = useMutation({

        mutationFn : (data : FieldData) => fetch("http://localhost:3000/api/auth/reset-password",{
            method : "POST",
            body : JSON.stringify({
              "token": resetToken, 
              "newPassword": data.newPassword,
    }),

                    headers:{
                     "Content-Type": "application/json",
   Authorization: `Bearer ${token}`,
}

}).then((res) => res.json()),

onSuccess : () =>{
 
  

    navigate("/login");
  
}
    }) 


    const onSubmit : SubmitHandler<FieldData> = async (data) =>{
        try{
        
            const response = await CreatNewPassWord.mutateAsync(data)
            return response

        }catch(error){
               console.error("Error while sending forgot-password request:", error);
        }

    }

return (

        <div className="w-screen  h-screen flex items-center justify-center ">

        
  
   <form
        className=" flex flex-col py-5 px-10 bg-white rounded-[.5rem] w-[35%] shadow-gray-200 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-3xl font-bold pb-2 "> Reset Your Password</h3>
    
        <label className="mb-4">
          <p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> New Password
          </p>
          <p className="relative">
            {showPass ?
<Eye className=" absolute right-2.5 top-2.5  " size={20} strokeWidth={1.5} color="gray" onClick={()=> setShowPass(false)} />
        : 
<EyeClosed  className=" absolute right-2.5 top-2.5  " size={20} strokeWidth={1.5} color="gray" onClick={()=> setShowPass(true)}  />
        }
          <input
            {...register("password",{
                required:"Pssword Is Required", 
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                },
            })}
            
            className="pl-2 shadow-gray-200 shadow-sm border-1 border-gray-300 rounded-[.25rem] py-2 w-full outline-none"
            type={showPass ? "text" : "password"}
            placeholder="Password123"
            />
            </p>
          <div className="pl-1 h-[3vh] text-[.8rem] text-red-600">
            {errors.password && <div>{errors.password.message}</div>}
          </div>
        </label>
        
        <label className="mb-4">
          <p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> Confirm
          </p>
          <input
            {...register("newPassword",{
                required:"Password Is Required", 
            validate : (value) => {
                if(value != password){
                    return "Email Is Required"
                }else{
                    return true
                }
            }
            })}
            
            className="pl-2 shadow-gray-200 shadow-sm border-1 border-gray-300 rounded-[.25rem] py-2 w-full outline-none"
            type="password"
            placeholder="Password123"
          />
          <div className="pl-1 h-[3vh] text-[.8rem] text-red-600">
            {errors.newPassword && <div>{errors.newPassword.message}</div>}
          </div>
        </label>
       
          
       

        <button
    
          type="submit"

          className="w-full cursor-pointer bg-blue-800 transition-colors text-white py-2 rounded-[.25rem]  hover:bg-blue-900"
          >
        {isSubmitting ? "...Loading" : "Creat New Password" }
        </button>


        {/* <div className=" h-[10vh] mt-5 border-t-1 border-gray-200  flex items-center justify-end gap-2 text-[.8rem] text-gray-600  ">
           <Link to={"/login"}>
            <button className="cursor-pointer hover:underline  "  >Login</button>
           </Link>

           <Link to={"/register"}>
            <button className="cursor-pointer hover:underline  "  >Register</button>
           </Link>

        </div>
        */}
      </form>

    </div>
)
}


export default ResetPassword

