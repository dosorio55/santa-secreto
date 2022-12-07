import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { fetchData } from "../constants/settings";

const Profile = ({ token }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [showSanta, setShowSanta] = useState(false)
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const serverResponse = await fetchData(
        null,
        token,
        "GET",
        "users/userById"
      );
      if (serverResponse.status === 200) {
        const data = await serverResponse.json();
        setUserData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const serverResponse = await fetchData(
        null,
        token,
        "GET",
        "users"
      );
      if (serverResponse.status === 200) {
        const data = await serverResponse.json();
        console.log(data);
        setAllUsers(data)
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
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSanta = () => {
    setShowSanta(true)
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center gap-10">
      <div className="flex flex-col justify-center gap-10 m-10">
        <div className="flex items-center justify-center gap-5 mb-10">
          <img
            src={userData.image}
            className="w-20 h-20 rounded-full"
            alt="profile"
          />
          <p>{userData.name}</p>
        </div>
        <button
          onClick={handleSanta}
          className={`inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft active:opacity-85  ${
            !loading
              ? "bg-gradient-to-tl from-blue-600 to-cyan-400"
              : "hover:scale-102 hover:shadow-soft-xs opacity-50 cursor-not-allowed bg-gray-600"
          }`}
        >
          {userData.hasSanta
            ? "Mostrar mi santa secreto"
            : "Obtener un santa secreto"}
        </button>
        {showSanta && <div className="flex flex-col gap-5">
          <Spinner size={"medium"} />
          <p>Estamos escogiendo tu SANTA SECRETO</p>
        </div>}
        <div className="bg-slate-400 w-96 relative rounded-lg p-6">
          <p className="absolute top-0 left-5">Mensaje de mi santa secreto</p>
          <p>bla bla bla</p>
        </div>

        <div className="text-center">
          <button
            className={`inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft active:opacity-85  ${
              !loading
                ? "bg-gradient-to-tl from-blue-600 to-cyan-400"
                : "hover:scale-102 hover:shadow-soft-xs opacity-50 cursor-not-allowed bg-gray-600"
            }`}
            onClick={handleLogout}
            disabled={loading}
          >
            {!loading ? "Logout" : <Spinner />}
          </button>
        </div>
      </div>
      <div className="h-screen justify-self-end md:inline hidden">
        <img
          className="h-full"
          src="https://images.unsplash.com/photo-1609759843758-bf8cc831c13a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="chrismas"
        />
      </div>
    </div>
  );
};

export default Profile;
