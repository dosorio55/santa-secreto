import { useEffect, useState } from "react";
import { fetchData } from "../constants/settings";

const Profile = ({ token }) => {
  const [userData, setUserData] = useState({});
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
    getUser();
  }, []);

  return (
    <div className="items-center">
      <img
        src={userData.image}
        className="w-20 h-20 rounded-full"
        alt="profile"
      />
      <p>{userData.name}</p>
      <button>Logout</button>
    </div>
  );
};

export default Profile;
