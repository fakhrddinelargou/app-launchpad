
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { Bell, CalendarOff } from 'lucide-react';
import {  useState } from 'react';
import BudgetForm from '../src/components/BudGets';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import EditBudgets from '../src/components/EditBudgets';
import Expenses from '../src/components/Expenses';


function Dashboard() {


const queryClient = useQueryClient()
const [budget , setBudget] = useState(false)
const [edit , setEdit] = useState(false)

const [id , setId] = useState("")
const [put , setPut] = useState("")

console.log(put)
// const [delet , setDelet] = useState(false)


console.log(id )

const token = localStorage.getItem('token')
const {data} = useQuery<Budget[]>({

queryKey : ["budgets"],
  queryFn : () => fetch ("http://localhost:3000/api/budgets" , {
method : "GET",
headers : {
  "Content-type" : "application/json",
  "Authorization" : `Bearer ${token}`
}
  }).then((res) => res.json())

})

const deleteItem = useMutation({
  mutationFn : ()=> fetch(`http://localhost:3000/api/budgets/${id}` , {
    method : "DELETE" ,
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  }).then((res) => res.json()),
  onSuccess : ()=>{
queryClient.invalidateQueries({queryKey:["budgets"]})
  }
})







  type Budget = {
  id: string;
  userId: string;
  category: string;
  amount: number;
  month: string; 
  spent: number;
  createdAt: string; 
  updatedAt: string; 
};

console.log(data)


  return <div className="w-[87%] h-auto min-h-[92vh]  bg-white px-4">



 {edit && < EditBudgets getId={put} setEdit={setEdit} /> }

{budget && <BudgetForm  setBudget = {setBudget} />}


<h1 className="font-bold text-3xl p-5 text-blue-950  border-b-1 border-gray-200 mb-4 ">Dashboard</h1>

<div className=' w-full h-auto'>
<div className=' border-b-1 border-gray-200 mb-2 font-medium flex items-center p-1 justify-between text-[.8rem]'>
  <span className='text-gray-600'>Recent Activity</span>
  <div onClick={()=> setBudget(true)} className='bg-blue-600 p-2 hover:bg-blue-700 cursor-pointer text-white rounded-[.2rem]'>+ Create New Budgets</div>
</div>

<div>
  {data && <div className=' flex  justify-center p-2 rounded-[.5rem] shadow-2xs mb-5 bg-gray-50 '>
    <table className=''>

 
         <thead className=" w-full border-b-1 border-gray-200">
        <tr className='text-gray-600 font-medium'>
          <th className="py-3 px-10 ">DATE</th>
          <th className="py-3 pl-3 pr-20">TYPE</th>
          <th className="py-3 pl-3 pr-25 ">CATEGORY</th>
          <th className="py-3 px-10">AMOUNT</th>
          <th className="py-3 px-4">SPENT</th>
        </tr>
      </thead>
<tbody >
    
   {data && data.map((item) => (
     <tr key={item.id} className="  py-5  hover:bg-gray-200 ">
              <td className="py-2 px-4 text-center ">{item.month}</td>
              <td className="py-2 px-4"><span className='bg-green-600 text-[.8rem] p-1 rounded-[.2rem] text-white'>Revenue</span></td>
              <td className="py-2 px-4 font-medium uppercase ">{item.category}</td>
              <td className="py-2 px-4 text-center font-bold"><span className='text-[.8rem] font-medium'>$</span>{item.amount}</td>
              <td className="py-2 px-4 text-center">{item.spent}</td>

                  <td className="py-2 px-10 text-black/50 cursor-pointer" onClick={() => {setPut(item.id); setEdit(true)}} >
Edit
        </td>

              <td className="py-2 px-6 relative">
               <CalendarOff  strokeWidth={1} size={18} onClick={() => setId(item.id)} className='cursor-pointer' />
{id === item.id  &&
  <div className='z-10 shadow-2xs p-2 bg-gray-100 rounded-[.4rem]  flex items-center justify-center gap-2 absolute top-9 right-5'>
  <button className='bg-white shadow-2xl hover:bg-gray-100 p-1 rounded-[.2rem]' onClick={() => setId("")}>Cancel</button>
  <button className='bg-red-600 hover:bg-red-700 text-white p-1 rounded-[.2rem]'  onClick={() => {setId(item.id); deleteItem.mutate();}}>Delete</button>

</div>
}

</td>  
            </tr>
   ))}

      
</tbody>
   </table>
  </div>}
</div>

<Expenses/>

</div>

<div className="flex gap-5 px-3 ">

<ResponsiveContainer width="100%" height={250}>
  <AreaChart
    data={data?.map((item) => ({
      date: item.month,
      value1: item.amount,
      value2: item.spent,
      value3: item.amount - item.spent,
    })) ?? []}
    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="date" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Area
      type="monotone"
      dataKey="value1"
      name="Budget"
      stackId="1"
      stroke="#8884d8"
      fill="url(#color1)"
    />
    <Area
      type="monotone"
      dataKey="value2"
      name="Spent"
      stackId="1"
      stroke="#82ca9d"
      fill="url(#color2)"
    />
    <Area
      type="monotone"
      dataKey="value3"
      name="Remaining"
      stackId="1"
      stroke="#ffc658"
      fill="url(#color3)"
    />
  </AreaChart>
</ResponsiveContainer>

  <div className="w-[40%] h-[45vh] bg-gray-100 rounded-[.5rem] overflow-hidden ">
  <span className="text-gray-500 text-[.8rem] flex gap-1 p-2 bg-gray-300 ">
  <Bell color="gray" size={18} />  Notification Panel
  </span>
  <div className="w-full h-full p-2">

  </div>
  </div>
</div>


  </div>;
}

export default Dashboard;







