import { useMutation, useQuery } from "@tanstack/react-query";

import { useForm, type SubmitHandler } from "react-hook-form";
import LogOut from "../../src/components/LogOut";


type FieldValues = {
  email: string;
  password: string;
firstName : string;
lastName : string;
avatar : string;
country : string
city : string
};

function ProfileInfo(){


    const { register, handleSubmit , formState : {isSubmitting} } = useForm<FieldValues>();
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



    const putProfile = useMutation({

        mutationFn : (response : FieldValues)=> fetch("http://localhost:3000/api/user/profile" ,{
            method : "PUT",
              headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
            body:JSON.stringify({
                firstName : response?.firstName,
                lastName : response?.lastName
            })
            
        }).then((res) => res.json()),
    


    })



    const onSubmit : SubmitHandler<FieldValues> = async (response) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
      
        putProfile.mutate(response)
    }

    return(
       <div className="w-[80%]  h-full px-10 relative">

            <h1 className="text-2xl font-bold py-5">Personal Information</h1>
        
        
        <div className="border-y-1 border-gray-200 h-[25vh] flex items-center">
            <img className="w-30 rounded-full" src="./profile.png" alt="avatar" />

        </div>
        <form className="py-5 flex flex-col gap-5"  onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-8">
<label className="w-full">
<p className="text-[.9rem] font-medium pb-2">
            First Name
          </p>
                <input className="border-1 border-gray-300 p-3 w-full rounded-4xl" {...register("firstName")} type="text" defaultValue={data?.firstName} />
</label>
<label className="w-full">
<p className="text-[.9rem] font-medium pb-2">
            <span className="text-red-600">*</span> Last Name
          </p>
                <input className="border-1 border-gray-300  p-3 w-full rounded-4xl" {...register("lastName")}  type="text" defaultValue={data?.lastName} />
</label>
                
            </div>
                        <div className="flex gap-8">
<label className="w-full">
<p className="text-[.9rem] font-medium pb-2">
            Country
          </p>
                <input className="border-1 border-gray-300 p-3 w-full rounded-4xl" {...register("country")} type="text" defaultValue="morocco" />
</label>
<label className="w-full">
<p className="text-[.9rem] font-medium pb-2">
         City
          </p>
                <input className="border-1 border-gray-300  p-3 w-full rounded-4xl" {...register("city")}  type="text" defaultValue="casablanca" />
</label>
                
            </div>


            <button type="submit" className="text-[.9rem] font-medium text-green-700 pr-5 absolute right-7 top-6 ">{isSubmitting ? "...saving change" : "save"}</button>
        </form>
        <LogOut />
       </div>
    )
}

export default ProfileInfo;

