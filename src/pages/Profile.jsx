import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { fetchData } from "../constants/settings";

const Profile = ({ token }) => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const serverResponse = await fetchData(
        null,
        token,
        "GET",
        "users/userById"
      );
      console.log(serverResponse);
      if (serverResponse.status === 200) {
        const data = await serverResponse.json();
        console.log("dentro del login", data);
        setUserData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSanta = () => {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center flex-col gap-10">
      <div>
        <div className="flex items-center gap-5">
          <img
            src={userData.image}
            className="w-20 h-20 rounded-full"
            alt="profile"
          />
          <p>{userData.name}</p>
        </div>
        <button
          onClick={handleSanta}
          className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Mostrar mi santa secreto
        </button>
        <div className="flex flex-col gap-5">
          <Spinner size={"medium"} />
          <p>Estamos escogiendo tu SANTA SECRETO</p>
        </div>
        <div className="bg-slate-400 w-96 relative rounded-lg p-6">
          <p className="absolute top-0 left-5">Mensaje de mi santa secreto</p>
          <p>bla bla bla</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          logout
        </button>
      </div>
      <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
        <div className="absolute top-0 w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
          <img
            src="https://images.unsplash.com/photo-1609759843758-bf8cc831c13a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="chrismas"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
