import { useQuery } from "@tanstack/react-query";

type FieldValues = {
  email: string;
  password: string;
firstName : string;
lastName : string;

};

const Profil =  ()=>{

    const token = localStorage.getItem('token')

    const {data } = useQuery<FieldValues>({
        queryKey : ["user"],
        queryFn : () => fetch("http://localhost:3000/api/user/profile" , {
            method : "GET",
            headers:{
   Authorization: `Bearer ${token}`,
            }
        }).then(res => res.json())
    })

    console.log(data)


    return <div className=" w-screen  h-screen flex items-center justify-center">
<div className="bg-white w-[35%] flex flex-col gap-8 items-center shadow-gray-200 p-5 py-10 shadow-sm rounded-[.5rem]">
      <img className="rounded-full w-25 mb-5" src="https://ui-avatars.com/api/?name=Demo+User&size=150" alt="" />
  
<div className=" w-full flex items-center text-gray-700">First Name : <div className="font-medium text-black  w-[50%] text-end ">{data?.firstName}</div></div>
<div className=" w-full flex items-center text-gray-700">Last Name : <div className="font-medium text-black  w-[50%] text-end ">{data?.lastName}</div></div>
<div className=" w-full flex items-center text-gray-700">Email : <div className="  font-medium text-black  w-[75%] text-end ">{data?.email}</div></div>
<div className=" w-full flex items-center text-gray-700">Password : <div className="font-medium text-black  w-[50%] text-end ">{data?.password}</div></div>

</div>
    

    </div>
}


export default Profil;