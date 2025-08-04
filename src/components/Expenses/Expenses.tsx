import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarOff } from "lucide-react";
import { useState } from "react";
import PostExpense from "./PostExpense";
import PutExpenses from "./PutExpenses";
import { TbPointFilled } from "react-icons/tb";
import type { Expense } from "../../types/typeExpenses";
import GenericExpenses from "../common/GenericExpenses";
import GenericEditExpenses from "../common/GenericEditExpenses";

function Expenses() {
  
  const [expenses, setExpenses] = useState<Expense>();
const [deleteItems , setDeleteItems] = useState<Expense>()


  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  const { data } = useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: () =>
      fetch("http://localhost:3000/api/expenses", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  const deleteItem = useMutation({
    mutationFn: (item: Expense) =>
      fetch(`http://localhost:3000/api/expenses/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  const [isExpensesFormOpen, setIsExpensesFormOpen] = useState(false);
  const closeExpensesForm = () => setIsExpensesFormOpen(false);


  
    const closeEditExpenses = () => {
    setExpenses(undefined);
  };



  return (
    <div className="table1 flex flex-col items-center gap-5 bg-white rounded-xl w-full  max-w-[95%] pt-5 pb-1 px-1  ">
      <GenericExpenses isOpen={isExpensesFormOpen} close={closeExpensesForm}>
        <PostExpense close={closeExpensesForm} />
      </GenericExpenses>


 <GenericEditExpenses isOpen={!!expenses} close={closeExpensesForm}>
   
    <PutExpenses  expenses={expenses}  close={closeEditExpenses} />
      </GenericEditExpenses>

      <div className="  font-medium flex items-center w-full justify-between text-[.8rem] px-5">
        <span className="text-gray-600">Expenses :</span>
        <div
          className="bg-blue-600 p-2 px-3 hover:bg-blue-700 cursor-pointer text-white rounded-4xl"
          onClick={() => setIsExpensesFormOpen(true)}
        >
          + Create New Expenses
        </div>
      </div>

      <div className=" w-full">
        {data && (
          <div className=" flex  justify-center  rounded-[.5rem]   w-full  ">
            <table className="w-full ">
              <thead className=" w-full  rounded-2xl  ">
                <tr className="text-gray-500 font-medium bg-indigo-50  text-[.8rem] ">
                  <th className="py-3 px-10 rounded-l-[.3rem] ">Description</th>
                  <th className="py-3 pl-3 pr-20">Type</th>
                  <th className="py-3 pl-3 pr-20">Amount ($)</th>
                  <th className="py-3  pr-25 ">Catygory</th>
                  <th className="py-3 px-10">Date</th>
                  <th className="py-3 px-4">Actions</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item) => (
                    <tr
                      key={item.id}
                      className="  h-[3rem]  hover:bg-gray-200 text-[.9rem] "
                    >
                      <td className="py-2 px-4 text-center font-medium rounded-l-[.3rem]">
                        {item.description}
                      </td>
                      <td className="py-2 px-4  ">
                        <span className="bg-red-100 w-22 font-medium   flex items-center justify-center  text-[.8rem]     rounded-[2rem] text-red-600">
                          <TbPointFilled size={18} />
                          SALE
                        </span>
                      </td>
                      <td className="py-2 px-4 pl-7 font-semibold text-blue-950   uppercase text-[.8rem]  ">
                        {item.amount}
                      </td>
                      <td className="py-2 px-4 pl-7 font-semibold text-blue-950   uppercase text-[.8rem]  ">
                        {item.category}
                      </td>
                      <td className="py-2 px-4 text-center font-medium rounded-l-[.3rem]">
                        {item.date}
                      </td>

                      <td
                        className="py-2 px-10 text-black/50 cursor-pointer"
                        onClick={() => setExpenses(item)}
                      >
                        Edit
                      </td>

                      <td className="py-2 px-6 relative rounded-r-[.3rem]">
                        <CalendarOff
                          strokeWidth={1}
                          size={18}
                          className="cursor-pointer"
                          onClick={() => setDeleteItems(item)}
                        />
                        {deleteItems?.id === item.id && (
                          <div className="z-10 shadow-2xs p-2 bg-gray-100 rounded-[.4rem]  flex items-center justify-center gap-2 absolute top-9 right-5">
                            <button
                              className="bg-white shadow-2xs hover:bg-gray-50 p-1 font-medium w-20 rounded-[.2rem]"
                              // onClick={() => setDeleteItem()}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-red-600 hover:bg-red-700 text-white p-1 font-medium w-20 rounded-[.2rem]"
                              onClick={() => {
                                deleteItem.mutate(item);
                                setDeleteItems(item);
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
  );
}

export default Expenses;
