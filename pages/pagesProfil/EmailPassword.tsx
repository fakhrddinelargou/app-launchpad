import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm, type SubmitHandler } from "react-hook-form"




function EmailPassword(){

type FieldData = {
    email : string 
    password : string
}

const {register , handleSubmit , formState : {isSubmitting}} = useForm<FieldData>()

const token = localStorage.getItem('token')

    const putData = useMutation({
 
         mutationFn : (response : FieldData)=> fetch("http://localhost:3000/api/user/profile" ,{
             method : "PUT",
               headers: {
     "Content-Type": "application/json",
     "Authorization": `Bearer ${token}`
   },
             body:JSON.stringify({
                 email : response?.email,
                 password : response?.password
             })
             
         }).then((res) => res.json()),
     
 
 
     })

     const {data } = useQuery<FieldData>({
            queryKey : ["user"],
            queryFn : () => fetch("http://localhost:3000/api/user/profile" , {
                method : "GET",
                headers:{
       Authorization: `Bearer ${token}`,
                }
            }).then(res => res.json())
        })
    

     const   onSubmit : SubmitHandler<FieldData> = async  (response) => {

        await new Promise ((resolve) => setTimeout(resolve,2000))
            putData.mutate(response)
        }

    console.log(data)


    return (
        <div className=" flex items-center justify-center w-[80%] h-full ">
<form className="flex flex-col gap-8 w-[60%]" onSubmit={handleSubmit(onSubmit)}> 
<label>
<p>Email</p>
<input {...register("email")} className="border-b-1 border-gray-200 w-full p-2 outline-none" type="email" defaultValue={data?.email} />
</label>
<label>
<p>Password</p>
<input {...register("password")} className="border-b-1 border-gray-200 w-full p-2 outline-none" type="password" defaultValue={data?.password} />
</label>
<button type="submit" className="ml-auto font-medium text-[.9rem] text-gray-500 ">{isSubmitting ? "...Updating" : "Edait"}</button>

</form>
        </div>
    )
}


export default EmailPassword