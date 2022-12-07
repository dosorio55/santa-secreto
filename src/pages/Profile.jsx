import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SearchSanta from "../components/SearchSanta";
import SecretSanta from "../components/SecretSanta";
import Spinner from "../components/Spinner";
import { fetchData } from "../constants/settings";

const Profile = ({ token }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [secretSanta, setSecretSanta] = useState();
  const [randomImage, setRandomImage] = useState();
  const [showSanta, setShowSanta] = useState(false);
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
      setLoading(false);
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const serverResponse = await fetchData(null, token, "GET", "users");
      if (serverResponse.status === 200) {
        const data = await serverResponse.json();
        setAllUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSecretSante = async () => {
    try {
      const serverResponse = await fetchData(
        null,
        token,
        "POST",
        "users/getSanta"
      );
      if (serverResponse.status === 200) {
        const data = await serverResponse.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userData);
  useEffect(() => {
    setLoading(true);
    if (!token) {
      navigate("/");
      return;
    }
    getUser();
    getAllUsers().then(() => setLoading(false));
    if (userData.secretSanta?.name) {
      setSecretSanta(userData.secretSanta);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSanta = async (event) => {
    console.log(event.target.textContent);
    if (event.target.textContent === "Mostrar mi santa secreto") {
      const mySanta = allUsers.find(
        (user) => user.name === userData.secretSanta.name
      );
      setSecretSanta({ name: mySanta.name, image: mySanta.image });
      setShowSanta(true);
    } else {
      setShowSanta(true);
      const finalSanta = await getSecretSante();

      const santaImage = allUsers.find(
        (user) => user.name === finalSanta.data.name
      );
      const intervalImage = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * allUsers.length);
        setRandomImage({
          image: allUsers[randomNumber].image,
          name: allUsers[randomNumber].name,
        });
      }, 500);

      setTimeout(() => {
        clearInterval(intervalImage);
        // setShowSanta(false);
        setRandomImage(undefined);
        getUser();
        setSecretSanta({ name: finalSanta.data.name, image: santaImage.image });
      }, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center gap-10">
      <div className="flex flex-col justify-center gap-10 w-96 m-10">
        <div className="flex items-center justify-center gap-5 mb-10">
          <img
            src={userData.image}
            className="w-20 h-20 rounded-full"
            alt="profile"
          />
          <p>{userData.name}</p>
        </div>
        {!showSanta ? (
          <button
            onClick={handleSanta}
            className={`inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft active:opacity-85  ${
              !loading
                ? "bg-gradient-to-tl from-blue-600 to-cyan-400"
                : "hover:scale-102 hover:shadow-soft-xs opacity-50 cursor-not-allowed bg-gray-600"
            }`}
          >
            {userData.secretSanta?.name
              ? "Mostrar mi santa secreto"
              : "Obtener un santa secreto"}
          </button>
        ) : (
          <button
            onClick={() => {
              setShowSanta(false);
            }}
            className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft active:opacity-85 bg-gradient-to-tl from-blue-600 to-cyan-400"
          >
            Close
          </button>
        )}
        {showSanta && userData.secretSanta?.name && (
          <SecretSanta image={secretSanta?.image} name={secretSanta?.name} />
        )}
        {showSanta && !userData.secretSanta?.name && (
          <SearchSanta
            randomImage={randomImage?.image}
            name={randomImage?.name}
          />
        )}
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
