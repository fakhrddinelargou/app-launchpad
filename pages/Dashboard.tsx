import { Bell, ChevronLast, LifeBuoy, MessagesSquare, Server, ShoppingCart } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


function Dashboard() {
  const data = [
  { date: '2010-03', value1: 2000, value2: 1000, value3: 500 },
  { date: '2010-06', value1: 4000, value2: 2000, value3: 1000 },
  { date: '2010-12', value1: 6000, value2: 2500, value3: 1500 },
  { date: '2011-03', value1: 8000, value2: 3000, value3: 2000 },
  { date: '2011-06', value1: 7000, value2: 3500, value3: 2200 },
  { date: '2011-12', value1: 15000, value2: 5000, value3: 3000 },
  { date: '2012-03', value1: 10000, value2: 4000, value3: 2500 },
  { date: '2012-06', value1: 8500, value2: 3000, value3: 2000 },
];

  return <div className="w-[87%] h-[92vh] px-1 bg-white">

<h1 className="font-bold text-3xl p-5 text-blue-950  border-b-1 border-gray-200 ">Dashboard</h1>

<div className="flex gap-3  p-3 ">
  <div className="bg-blue-600 p-[.2rem] rounded-[.5rem] w-full">
    <div className="flex justify-between items-center text-white p-5 ">
<MessagesSquare color="#ffffff" size={60} />
<div className="flex flex-col items-center gap-2 text-4xl">
  26
  <span className="text-[.7rem]">
    New Comments!
  </span>
</div>
    </div>
<div className="text-[.9rem] flex bg-white p-2 justify-between items-center text-blue-600 rounded-b-[.5rem]">
  View Details 
  <span><ChevronLast color="#ffffff" size={15} className="bg-blue-600 rounded-full "   /></span>
</div>
  </div>
    <div className="bg-green-600 p-[.2rem] rounded-[.5rem] w-full">
    <div className="flex justify-between items-center text-white p-5 ">
<Server color="#ffffff" size={60} />

<div className="flex flex-col items-center gap-2 text-4xl">
  12
  <span className="text-[.7rem]">
    New Tasks!
  </span>
</div>
    </div>
<div className="text-[.9rem] flex bg-white p-2 justify-between items-center text-green-600 rounded-b-[.5rem]">
  View Details 
  <span><ChevronLast color="#ffffff" size={15} className="bg-green-600 rounded-full "   /></span>
</div>
  </div>
    <div className="bg-yellow-500 p-[.2rem] rounded-[.5rem] w-full">
    <div className="flex justify-between items-center text-white p-5 ">
<ShoppingCart  color="#ffffff" size={60} />
<div className="flex flex-col items-center gap-2 text-4xl">
  124
  <span className="text-[.7rem]">
    New Orders!
  </span>
</div>
    </div>
<div className="text-[.9rem] flex bg-white p-2 justify-between items-center text-yellow-500 rounded-b-[.5rem]">
  View Details 
  <span><ChevronLast color="#ffffff" size={15} className="bg-yellow-500 rounded-full "   /></span>
</div>
  </div>
    <div className="bg-red-600 p-[.2rem] rounded-[.5rem] w-full">
    <div className="flex justify-between items-center text-white p-5 ">
<LifeBuoy  color="#ffffff" size={60} />
<div className="flex flex-col items-center gap-2 text-4xl">
  13
  <span className="text-[.7rem]">
    Support Teckets!
  </span>
</div>
    </div>
<div className="text-[.9rem] flex bg-white p-2 justify-between items-center text-red-600 rounded-b-[.5rem]">
  View Details 
  <span><ChevronLast color="#ffffff" size={15} className="bg-red-600 rounded-full "   /></span>
</div>
  </div>
</div>
<div className="flex gap-5 px-3">

  <ResponsiveContainer width="60%" height={250} >
    <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="value1" stackId="1" stroke="#8884d8" fill="url(#color1)" />
      <Area type="monotone" dataKey="value2" stackId="1" stroke="#82ca9d" fill="url(#color2)" />
      <Area type="monotone" dataKey="value3" stackId="1" stroke="#ffc658" fill="url(#color3)" />
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






