import { useNavigate, useRouteError } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleHome = () => {
    if (token) {
      return navigate("/analytics/dashboard");
    }
    return navigate("/login");
  };

  const error = useRouteError();

  console.error(error);

  function isErrorWithMessage(
    error: unknown
  ): error is { statusText?: string; message?: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      ("statusText" in error || "message" in error)
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-purple-600 ">
      <div id="error-page" className="flex flex-col items-start gap-5">
        <h1 className="lg:text-6xl font-bold text-2xl text-white">Oops!</h1>
        <p className="text-xl text-white">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-3xl text-white">
          {isErrorWithMessage(error) && (error.statusText || error.message)}
        </p>
        <div
          className=" mt-5  px-5 py-2 bg-white rounded-md hover:bg-gray-100"
          onClick={handleHome}
        >
          Home
        </div>
      </div>
    </div>
  );
}
