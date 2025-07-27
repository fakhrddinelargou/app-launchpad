import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  CalendarOff} from "lucide-react";
import { useState, useEffect } from "react";
import BudgetForm from "../components/Budgets/BudGets";
import {  ResponsiveContainer } from "recharts";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area,  } from 'recharts';


import { TbPointFilled } from "react-icons/tb";
import EditBudgets from "../components/Budgets/EditBudgets";
import Expenses from "../components/Expenses/Expenses";
import type { Budget } from "../types/typeBudgets";
// import type { DashboardType } from "../types/typeDashboard";





function Dashboard() {



  
  const queryClient = useQueryClient();
  const [budget, setBudget] = useState(false);
  const [edit, setEdit] = useState(false);

  const [id, setId] = useState("");
  const [put, setPut] = useState<Budget | null>(null);

  // console.log(dataDashboard);


  const token = localStorage.getItem("token");
  const { data } = useQuery<Budget[]>({
    queryKey: ["budgets"],
    queryFn: () =>
      fetch("http://localhost:3000/api/budgets", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  const deleteItem = useMutation({
    mutationFn: (id: string) =>
      fetch(`http://localhost:3000/api/budgets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  const getDashboard = useMutation({
    mutationFn: () =>
      fetch("http://localhost:3000/api/analytics/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json()),
  });

  useEffect(() => {
    getDashboard.mutateAsync();
  }, []);



  return (
    <div className="w-[100%] h-auto mb-3 flex flex-col items-center gap-5    ">
      {edit && <EditBudgets getData={put} setEdit={setEdit} />}

      {budget && <BudgetForm setBudget={setBudget} />}

      <h1 className="font-bold text-3xl p-5 text-blue-950  border-b-1 border-gray-200 mr-auto mx-2 w-full  ">
        Dashboard
      </h1>

      <div className=" w-full h-auto flex flex-col  gap-8 items-center  ">
        <div className="table1 flex flex-col items-center gap-5 bg-white rounded-xl w-full  max-w-[95%] pt-5 pb-1 px-1  ">
          <div className="  font-medium flex items-center w-full justify-between text-[.8rem] px-5">
            <span className="text-gray-600">Budgets :</span>
            <div
              onClick={() => setBudget(true)}
              className="bg-blue-600 p-2 px-3 hover:bg-blue-700 cursor-pointer text-white rounded-4xl"
            >
              + Create New Budgets
            </div>
          </div>

          <div className=" w-full">
            {data && (
              <div className=" flex  justify-center  rounded-[.5rem]   w-full  ">
                <table className="w-full ">
                  <thead className=" w-full  rounded-2xl  ">
                    <tr className="text-gray-500 font-medium bg-indigo-50  text-[.8rem] ">
                      <th className="py-3 px-10 rounded-l-[.3rem] ">Date</th>
                      <th className="py-3 pl-3 pr-20">Type</th>
                      <th className="py-3  pr-25 ">Catygory</th>
                      <th className="py-3 px-10">Amount</th>
                      <th className="py-3 px-4">Spent</th>
                      <th className="py-3 px-10"></th>
                      <th className="py-3 px-4 rounded-r-[.3rem]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item, index: number) => (
                        <tr
                          key={item.id}
                          className="  h-[3rem]  hover:bg-gray-200 text-[.9rem] "
                        >
                          <td className="py-2 px-4 text-center font-medium rounded-l-[.3rem]">
                            {item.month}
                          </td>
                          <td className="py-2 px-4  ">
                            <span className="bg-green-100 w-22 font-medium   flex items-center justify-center  text-[.8rem]     rounded-[2rem] text-green-600">
                              <TbPointFilled size={18} />
                              Revenue
                            </span>
                          </td>
                          <td className="py-2 px-4 pl-7 font-semibold text-blue-950   uppercase text-[.8rem]  ">
                            {item.category}
                          </td>
                          <td className="py-2 px-4 text-center font-semibold">
                            {item.amount} $
                          </td>
                          <td className="py-2 px-4 text-center ">
                            {item.spent}
                          </td>

                          <td
                            className="py-2 px-10 text-black/50 cursor-pointer"
                            onClick={() => {
                              setPut(data[index]);
                              setEdit(true);
                            }}
                          >
                            Edit
                          </td>

                          <td className="py-2 px-6 relative rounded-r-[.3rem]">
                            <CalendarOff
                              strokeWidth={1}
                              size={18}
                              onClick={() => setId(item.id)}
                              className="cursor-pointer"
                            />
                            {id === item.id && (
                              <div className="z-10 shadow-2xs p-2 bg-gray-100 rounded-[.4rem]  flex items-center justify-center gap-2 absolute top-9 right-5">
                                <button
                                  className="bg-white shadow-2xs hover:bg-gray-50 p-1 font-medium w-20 rounded-[.2rem]"
                                  onClick={() => setId("")}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="bg-red-600 hover:bg-red-700 text-white p-1 font-medium w-20 rounded-[.2rem]"
                                  onClick={() => {
                                    deleteItem.mutate(item.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <Expenses />
      </div>
      <div className="flex w-full max-w-[95%] gap-5">
        <div className="flex gap-5 px-3 bg-white w-full max-w-[95%] rounded-[.3rem] ">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={
                data?.map((item) => ({
                  date: item.month,
                  value1: item.amount,
                  value2: item.spent,
                  value3: item.amount - item.spent,
                })) ?? []
              }
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
        </div>
     
      </div>
    </div>
  );
}

export default Dashboard;
