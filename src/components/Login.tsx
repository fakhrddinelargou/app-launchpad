import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import { Link, useNavigate } from "react-router-dom";


type FieldValues = z.infer <typeof schema>
const schema = z.object({
  email: z.string().email(),
  password:z.string().min(8).max(30)
});
const Login = () => {
  // const getData  = useQuery<FieldValues>({
  //   queryKey : ["user"],
  //   queryFn : () => fetch("http://localhost:3000/api/auth/login").then((res) => res.json())
  // })
  const navigate = useNavigate()
const handleRegister = ()=>{
navigate("/register")
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
    creatNewLogin.mutate(data);
    navigate("/profil")
    return data;
  };

  const creatNewLogin = useMutation({
    mutationFn: (data: FieldValues) =>
      fetch("http://localhost:3000/api/auth/login", {
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

  if (creatNewLogin.data?.error) {
    alert(creatNewLogin.data.error);
  }

  return (
    <div className="w-screen  h-screen flex items-center justify-center">
      <form
        className=" flex flex-col pt-5 px-10 bg-white rounded-[.5rem] w-[35%] shadow-gray-200 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-3xl font-bold pb-5">Login</h3>
        <label className="mb-4">
          <p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> Email
          </p>
          <input
            {...register("email", {
              required: "fdjfkdsjfdk",
            })}
            className="pl-2 shadow-gray-200 shadow-sm border-1 border-gray-300 rounded-[.25rem] py-2 w-full"
            type="email"
            placeholder="demo@example.com"
          />
          <div className="pl-1 h-[3vh] text-[.8rem] text-red-600">
            {errors.email && <div>{errors.email.message}</div>}
          </div>
        </label>
        <label className="mb-4">
          <p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> Password
          </p>
          <input
            {...register("password", {
              required: "djasifjsais",
            })}
            className="pl-2 shadow-gray-200 shadow-sm border-1 border-gray-300 rounded-[.25rem] py-2 w-full"
            type="password"
            placeholder="password123"
          />
          <div className="pl-1 h-[3vh] text-[.8rem] flex justify-between ">
            <div className="text-gray-500 text-[.6rem] pt-1 cursor-pointer hover:underline">
              Forgot Password?
            </div>
            {errors.password && (
              <div className="text-red-600 pr-1">{errors.password.message}</div>
            )}
          </div>
        </label>

        <button
    
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-blue-800 transition-colors text-white py-2 rounded-[.25rem]  hover:bg-blue-900"
          >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
          
        <div className="text-[.7rem] text-center pt-5 pb-6  w-full text-gray-700">
          NewUser?
          <Link to={"/register"}>
          <span onClick={handleRegister}  className="font-medium text-black cursor-pointer">
            Register
          </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
