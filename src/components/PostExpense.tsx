
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import z from "zod";


type Props = {
  value: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PostExpense({value} : Props) {

    const queryClient = useQueryClient()

const schema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a number greater than 0",
    }),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["food", "rent", "travel", "other", "utilities"]),
  date: z.string().min(1, "Date is required"),
});

type Expen = z.infer<typeof schema >

    const {register , handleSubmit , formState : { isSubmitting , errors}} = useForm<Expen>({
        resolver : zodResolver(schema)
    })

    const onSubmit : SubmitHandler<Expen> = async (response) => {
        await new Promise ((resolve) => setTimeout(resolve,2000))
        console.log(response)
        PostExpenses.mutate(response)
     value(false)

    }




const token = localStorage.getItem("token")
    const PostExpenses = useMutation({

        mutationFn : (response : Expen) => fetch("http://localhost:3000/api/expenses" , {
            method : "POST",
     headers : {
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
     },
     body : JSON.stringify(response)
        }).then((res) => res.json()),

        onSuccess : ()=> {
queryClient .invalidateQueries({ queryKey: ["expenses"] })
        }


    })


  return (
    <div className="fixed top-0 left-0 h-auto min-h-full z-17  w-screen  flex items-center justify-center">
    <form
     onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white  p-6 rounded-2xl shadow-lg space-y-2"
    >
        <div className="flex items-center justify-between">

      <h2 className="text-2xl font-bold text-gray-800">Expense Entry</h2>
        <IoIosClose size={30} onClick={()=> value(false)}   />
        </div>

      <div className="space-y-2  ">
        <label className="block text-sm font-medium text-gray-700 rounded-[.3rem] overflow-hidden">Category</label>
        <select
          
          {...register("category")}
          className="bg-gray-200 w-full p-1 outline-none  rounded-[.3rem] "
        >
          <option  value="food">Food</option>
          <option  value="rent">Rent</option>
          <option  value="travel">Travel</option>
          <option  value="other">Other</option>
        </select>
        <div className=" h-5 text-[.8rem] text-red-600 font-medium">

        {errors.category && <div>{errors.category.message}</div> }
         
        </div>
      </div>

       <div className="flex flex-col gap-1">
        <label className=" text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
     {...register("amount")}
          className=" p-2 border-b-2 border-gray-200 w-full outline-none"
          placeholder="Total budget amount"
        />
             <div className=" h-5 text-[.8rem] text-red-600 font-medium">

        {errors.amount && <div>{errors.amount.message}</div> }
         
        </div>
      </div>

        <label className=" text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
       {...register("description")}
          className="p-2 border-b-2 border-gray-200 w-full outline-none"
          placeholder="Amount already spent"
        />
             <div className=" h-5 text-[.8rem] text-red-600 font-medium">

        {errors.description && <div>{errors.description.message}</div> }
         
        </div>
  

   
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">DATE</label>
        <input
         {...register("date")}
          type="month"
   
          className="p-2 border-b-2 border-gray-200 w-full"
        />
             <div className="  h-5 text-[.8rem] text-red-600 font-medium">

        {errors.date && <div>{errors.date.message}</div> }
         
        </div>
      </div>

     

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        {isSubmitting ? "...saving" : "Save Budget"}
      </button>
    </form>
    </div>
  );
}
