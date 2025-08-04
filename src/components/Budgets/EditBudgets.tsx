import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import z from "zod";
type Budget = {
  id: string;
  userId: string;
  category: "food" | "rent" | "travel" | "other";
  amount: number;
  month: string;
  spent: number;
  createdAt: string;
  updatedAt: string;
};

interface EditBudgetProps {
  budget?: Budget;

  close: () => void;
}

function EditBudgets({ budget, close }: EditBudgetProps) {
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  const editData = useMutation({
    mutationFn: (response: Budget) =>
      fetch(`http://localhost:3000/api/budgets/${budget?.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(response),
      }).then((res) => res.json()),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  const schema = z.object({
    category: z.enum(["food", "rent", "travel", "other"], {
      required_error: "Category is required",
    }),
    amount: z
      .string()
      .min(1, "Amount is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a number greater than 0",
      }),
    month: z
      .string()
      .regex(/^\d{4}-\d{2}$/, { message: "Month must be in YYYY-MM format" }),

    spent: z
      .string()
      .min(1, "Amount is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Spent must be a non-negative number",
      }),
  });

  type Budget = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Budget>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: budget?.category,
      amount: String(budget?.amount),
      month: budget?.month,
      spent: String(budget?.spent),
    },
  });

  const onSubmit: SubmitHandler<Budget> = async (response) => {
   await editData.mutateAsync(response);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white  p-6 rounded-2xl shadow-lg space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Budget Entry</h2>
        <IoIosClose size={30} onClick={close} />
      </div>

      <div className="space-y-2  ">
        <label className="block text-sm font-medium text-gray-700 rounded-[.3rem] overflow-hidden">
          Category
        </label>
        <select
          {...register("category")}
          className="bg-gray-200 w-full p-2 outline-none  rounded-[.3rem] "
        >
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>
        <div className=" h-5 text-[.8rem] text-red-600 font-medium">
          {errors.category && <div>{errors.category.message}</div>}
        </div>
      </div>
      <div className="flex  gap-4">
        <div className="flex flex-col gap-3">
          <label className=" text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            {...register("amount")}
            className=" p-2 border-b-2 border-gray-200 w-full outline-none"
            placeholder="Total budget amount"
          />
          <div className=" h-5 text-[.8rem] text-red-600 font-medium">
            {errors.amount && <div>{errors.amount.message}</div>}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className=" text-sm font-medium text-gray-700">Spent</label>
          <input
            type="number"
            {...register("spent")}
            className="p-2 border-b-2 border-gray-200 w-full outline-none"
            placeholder="Amount already spent"
          />
          <div className=" h-5 text-[.8rem] text-red-600 font-medium">
            {errors.spent && <div>{errors.spent.message}</div>}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Month</label>
        <input
          {...register("month")}
          type="month"
          className="p-2 border-b-2 border-gray-200 w-full"
        />
        <div className="  h-5 text-[.8rem] text-red-600 font-medium">
          {errors.month && <div>{errors.month.message}</div>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 flex items-center justify-center  rounded-xl hover:bg-blue-700 transition"
      >
        {!isSubmitting ? (
          "save"
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            saving
          </div>
        )}
      </button>
    </form>
  );
}

export default EditBudgets;
