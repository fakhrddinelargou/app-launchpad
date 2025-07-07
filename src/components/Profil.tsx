import { useQuery } from "@tanstack/react-query";

type FieldValues = {
  email: string;
  password: string;
};

const Profil =  ()=>{

    const token = localStorage.getItem('token')

    const {data , isLoading} = useQuery<FieldValues>({
        queryKey : ["user"],
        queryFn : () => fetch("http://localhost:3000/api/user/profile" , {
            method : "GET",
            headers:{
   Authorization: `Bearer ${token}`,
            }
        }).then(res => res.json())
    })

    console.log(data);
    if(isLoading){
        <p>Loading...</p>
    }

    return <div>
        <img src="https://ui-avatars.com/api/?name=Demo+User&size=150" alt="" />

      <span>{data?.email}</span>

    </div>
}


export default Profil;