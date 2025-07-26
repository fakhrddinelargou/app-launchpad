import { useQuery } from "@tanstack/react-query";
import { TbPointFilled } from "react-icons/tb";

function Notifications() {
  type Notification = {
    id: number;
    title: string;
    description: string;
    type: string;
    time: string;
    read: boolean;
    image: string;
  };

  const { data } = useQuery<Notification[]>({
    queryKey: ["notification"],

    queryFn: () =>
      fetch("./src/db.json", {
        method: "GET",
      }).then((res) => res.json()),
  });

  return (
    <div className="w-[80%] h-full  px-10">
      <h1 className="text-2xl font-bold mr-auto py-5   ">Notification</h1>
      <div className="w-full h-full bg-gray-100 rounded-[.8rem] flex flex-col gap-6 p-5 overflow-auto ">
        <span className="text-[.9rem] font-medium text-gray-600">Today</span>
        <div>
          {data &&
            data.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 text-[.9rem] border-y-1 border-gray-200 py-2"
                >
                  <img
                    src={item.image}
                    alt="profile"
                    className="w-10 rounded-[.4rem]"
                  />
                  <div>
                    <p>{item.description}</p>
                    <div className="font-light text-gray-500">{item.time}</div>
                  </div>
                  {!item.read && (
                    <div className="ml-auto pr-5 ">
                      <TbPointFilled className=" text-red-600" size={20} />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
