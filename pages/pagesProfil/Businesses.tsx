import { CalendarDays } from "lucide-react"
import {  IoIosArrowRoundUp, IoMdArrowDropdown } from "react-icons/io"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";





type FieldBus ={

    name : string 
    total : string
    pors : string
    description : string


}





const data : FieldBus[] = [
    {name : "Average Lifetime Value" , total :" $2,692" , pors : "$12" , description : "vs previous 30 days"},
        {name : "Win Rate" , total : "10.2% ", pors : "0.8%", description : "vs previous 30 days"},
            {name : "Visitor to Load Ratio" , total : "92:1" , pors : "13%" , description : "vs previous 30 days"},
                {name : "Lead to Win Ratio" , total : "5:1" , pors : "7%" , description : "vs previous 30 days"}



]

function Businesses(){

    const dataa = [
  { name: "Jan", CPM: 2400, CPP: 2200 },
  { name: "Feb", CPM: 2700, CPP: 2500 },
  { name: "Mar", CPM: 2000, CPP: 2800 },
  { name: "Apr", CPM: 2780, CPP: 3200 },
  { name: "May", CPM: 1890, CPP: 2500 },
  { name: "Jun", CPM: 2390, CPP: 2200 },
  { name: "Jul", CPM: 3490, CPP: 3000 },
];

    return (
           <div className="w-[80%] h-full bg-gray-100 px-10">
            <h1 className="text-2xl font-bold mr-auto py-5   ">Businesses</h1>

            <div className="flex mb-4 gap-3">
                <div className="flex flex-col bg-white rounded-[.2rem] shadow-2xs p-1 pl-2 w-[30%]">
                    <span className="text-[.7rem] text-gray-500 font-medium">Auto date range</span>
                    <span className="text-[.9rem] font-medium flex items-center gap-1">    <CalendarDays size={18} className="text-gray-500" />This Month</span>
                </div>
                 <div className="flex flex-col bg-white rounded-[.2rem] relative shadow-2xs p-1 pl-2 w-[20%]">
                    <span className="text-[.7rem] text-gray-500 font-medium">Services</span>
                    <span className="text-[.9rem] font-medium">All</span>
                                        <IoMdArrowDropdown size={20} className="absolute right-1 top-4 text-gray-500  " />
                </div>
                 <div className="flex flex-col bg-white rounded-[.2rem] relative shadow-2xs p-1 pl-2 w-[20%]">
                    <span className="text-[.7rem] text-gray-500 font-medium">Posts</span>
                    <span className="text-[.9rem] font-medium">All</span>
                    <IoMdArrowDropdown size={20} className="absolute right-1 top-4 text-gray-500  " />
                </div>
            </div>
            <div className="dad flex gap-4 ">
   
 {data && data.map((item , index) => (
    <div key={index} className="bg-white p-5 rounded-xl shadow-2xs w-[25%]">
        <h2 className="text-gray-600 text-[.9rem] mb-5">{item.name}</h2>
        <div className="flex  flex-col items-center">
            <span className="font-bold text-4xl pb-1">{item.total}</span>
            <span className="text-green-600 flex items-center"><IoIosArrowRoundUp size={20} className="text-green-600" />{item.pors}</span>
            <p className="text-[.7rem] text-gray-600 pt-8">{item.description}</p>
        </div>
      
    </div>
 ))}
  
</div>
       <div className="mt-2">
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">CPM vs. CPP</h2>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={dataa}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="CPM" stroke="#007BFF" />
          <Line type="monotone" dataKey="CPP" stroke="#28a745" />
        </LineChart>
      </ResponsiveContainer>
    </div>
        </div>
            </div>
    )
}


export default Businesses



