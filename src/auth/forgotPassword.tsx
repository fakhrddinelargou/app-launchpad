
import { useMutation } from "@tanstack/react-query";

import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";







const ForgotPassword =  ()=>{
const navigate = useNavigate()



type FieldData = {
    email : string;
}



const token = localStorage.getItem('token') 

const validePassword = useMutation({
    
    
    mutationFn : (data : FieldData) => fetch("http://localhost:3000/api/auth/forgot-password" , {
        method : "POST",
        
        headers:{
                     "Content-Type": "application/json",
   Authorization: `Bearer ${token}`,
},
body : JSON.stringify(data),



}).then((res) => res.json()),

onSuccess : (response) =>{

    if(response.message){
        navigate("/login")
    }

        window.localStorage.setItem("resetToken", response.resetToken);
      

}

})





const {register , handleSubmit , formState : {errors}} = useForm<FieldData>()

const onSubmit : SubmitHandler<FieldData> = async (data) => {
     try {
    const response = await validePassword.mutateAsync(data);
   
    if (response.message) {
      navigate("/reset-password");
    }
  } catch (error) {
    console.error("Error while sending forgot-password request:", error);
  }
}




    return (
        <div className="w-screen  h-screen flex items-center justify-center ">

        
  
   <form
        className=" flex flex-col py-5 px-10 bg-white rounded-[.5rem] w-[35%] shadow-gray-200 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-3xl font-bold pb-2 ">Password Reset</h3>
        <p className="text-[.7rem] pb-5">Provide the email address associated with your account to recover your password</p>
        <label className="mb-4">
          <p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> Email
          </p>
          <input
            {...register("email",{
                required:"Email Is Required",
            
                validate : (value) =>{

                    if(!value.includes("@gmail.com") ){
                        return "Email Is Required"
                    }else{
                        return true
                    }
                }
            
            })}
            
            className="pl-2 shadow-gray-200 shadow-sm border-1 border-gray-300 rounded-[.25rem] py-2 w-full outline-none"
            type="email"
            placeholder="demo@example.com"
          />
          <div className="pl-1 h-[3vh] text-[.8rem] text-red-600">
            {errors.email && <div>{errors.email.message}</div>}
          </div>
        </label>
       

        <button
    
          type="submit"

          className="w-full cursor-pointer bg-blue-800 transition-colors text-white py-2 rounded-[.25rem]  hover:bg-blue-900"
          >
         Reset Password
        </button>
        <div className=" h-[10vh] mt-5 border-t-1 border-gray-200  flex items-center justify-end gap-2 text-[.8rem] text-gray-600  ">
           <Link to={"/login"}>
            <button className="cursor-pointer hover:underline  "  >Login</button>
           </Link>

           <Link to={"/register"}>
            <button className="cursor-pointer hover:underline  "  >Register</button>
           </Link>

        </div>
       
      </form>

    </div>
    
    )


}


export default ForgotPassword;