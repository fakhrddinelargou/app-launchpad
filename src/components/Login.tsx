import {  useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

type FieldValues = {
  email: string;
  password: string;
};

const Login = () => {


  // const getData  = useQuery<FieldValues>({
  //   queryKey : ["user"],
  //   queryFn : () => fetch("http://localhost:3000/api/auth/login").then((res) => res.json())
  // })

  const { register , handleSubmit } = useForm<FieldValues>();
  
  const onSubmit : SubmitHandler<FieldValues> = (data) => {

    creatNewLogin.mutate(data)
    return data
    

  }



  const creatNewLogin = useMutation({
    mutationFn : (data : FieldValues) => fetch("http://localhost:3000/api/auth/login" , {
      method : "POST",
      body : JSON.stringify(data),
       headers: { "Content-Type": "application/json" }
    }).then(res => res.json()), 
     onSuccess: (data) => {
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
    },
    
  })

if (creatNewLogin.data?.error) {
  alert(creatNewLogin.data.error);
}


  return (
    <div className="w-screen bg-[#f1f5f9] h-screen flex items-center justify-center">
      <form className=" bg-white rounded-[.5rem] w-[35%] h-[45vh] shadow-gray-200 shadow-sm"  onSubmit={handleSubmit(onSubmit)} >
        <input {...register("email")} type="email" placeholder="demo@example.com" />
        <input {...register("password")} type="password" placeholder="password123" />
        <button type="submit">Login</button>
      </form>
     
    </div>
  );
};

export default Login;
