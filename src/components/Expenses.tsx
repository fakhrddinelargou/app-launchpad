import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarOff, Plus } from "lucide-react";
import { useState } from "react";
import PostExpense from "./PostExpense";




 type Expense = {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category: "food" | "rent" | "travel" | "other" | "utilities";
  date: string; // ISO date string (e.g., "2024-01-10")
  createdAt: string;
  updatedAt: string;
};



function Expenses(){

const [id , setId] = useState("")
const [value,setValue] = useState(false)
const queryClient = useQueryClient()
// const [put , setPut] = useState("")
    const token = localStorage.getItem('token')
const {data} = useQuery<Expense[]>({

queryKey : ["expenses"],
  queryFn : () => fetch ("http://localhost:3000/api/expenses" , {
method : "GET",
headers : {
  "Content-type" : "application/json",
  "Authorization" : `Bearer ${token}`
}
  }).then((res) => res.json())

})

const deleteItem = useMutation({
  mutationFn : ()=> fetch(`http://localhost:3000/api/expenses/${id}` , {
    method : "DELETE" ,
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  }).then((res) => res.json()),
  onSuccess : ()=>{
queryClient.invalidateQueries({queryKey:["expenses"]})
  }
})


console.log(data)

    return(
        <div>
            {value && 
            <PostExpense  setValue={setValue}  />
            
            }
  {data && <div className='relative flex  justify-center p-2 rounded-[.5rem] shadow-2xs mb-5 bg-gray-50 '>
    <table className=''>
 <Plus onClick={()=> setValue(true)} className="absolute right-3 top-3 " />
 
         <thead className=" w-full border-b-1 border-gray-200">
        <tr className='text-gray-600 font-medium'>
          <th className="py-3  text-start ">Description</th>
          <th className="py-3  px-10">Amount ($)</th>
          <th className="py-3 px-10 ">Category</th>
          <th className="py-3 px-10">Date</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>
<tbody >
    
   {data && data.map((item) => (
     <tr key={item.id} className="  py-5  hover:bg-gray-200 ">
              <td className="py-2 text-start  ">{item.description}</td>
              {/* <td className="py-2 px-4"><span className='bg-green-600 text-[.8rem] p-1 rounded-[.2rem] text-white'>Revenue</span></td> */}
              <td className="py-2 px-4 text-center  font-bold "><span className='text-[.8rem] font-medium'>$</span>{item.amount}</td>
              <td className="py-2 px-4 text-center uppercase font-medium ">{item.category}</td>
              <td className="py-2 px-4 text-center">{item.date}</td>

                  <td className="py-2 px-10 text-black/50 cursor-pointer"  >
Edit
        </td>

              <td className="py-2 px-6 relative">
               <CalendarOff  strokeWidth={1} size={18} onClick={() => setId(item.id)} className='cursor-pointer' />
{id === item.id  &&
  <div className='z-10 shadow-2xs p-2 bg-gray-100 rounded-[.4rem]  flex items-center justify-center gap-2 absolute top-9 right-5'>
  <button className='bg-white shadow-2xl hover:bg-gray-100 p-1 rounded-[.2rem]'>Cancel</button>
  <button className='bg-red-600 hover:bg-red-700 text-white p-1 rounded-[.2rem]' onClick={()=> deleteItem.mutate()} >Delete</button>

</div>
}

</td>  
            </tr>
   ))}

      
</tbody>
   </table>
  </div>}
</div>
    )
}


export default Expenses