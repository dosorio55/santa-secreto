import { useState } from "react";
import { useNavigate } from "react-router";
import addAvagar from "../assets/addAvatar.png";
import { fetchData } from "../constants/settings";
import { users } from "../settings/constants";

const initialState = {
  name: "",
  password: "",
  repeatPassword: "",
  image: "",
};

const Login = ({ setToken }) => {
  const [formValue, setFormValue] = useState(initialState);
  const navigate = useNavigate();

  const handleChangeImage = (event) => {
    // setLoading(true);
    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = async () => {
        const imageBase64 = reader.result;
        console.log(imageBase64);
        setFormValue((prevState) => ({ ...prevState, image: imageBase64 }));
      };
    }
    // setLoading(false);
  };

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const serverResponse = await fetchData(formValue, null, "POST", "users");
      if (serverResponse.status === 200) {
        const data = await serverResponse.json();
        localStorage.setItem(
          "token",
          JSON.stringify({ token: data.data.token })
        );

        setToken(data.data.token);
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-1/2 sm:w-11/12 w-11/12 my-auto flex flex-col gap-6"
    >
      <div className="w-full mb-8">
        <label
          htmlFor="add-image"
          className="flex justify-center items-center gap-5 cursor-pointer"
        >
          <img
            src={formValue.image || addAvagar}
            className="w-20 h-20 rounded-full"
            alt="profile"
          />
          Agregar foto
        </label>
        <input
          type="file"
          onChange={handleChangeImage}
          name="add-image"
          id="add-image"
          className="hidden"
          required
        />
      </div>
      <label
        htmlFor="users"
        className="blocktext-sm font-medium text-gray-900 dark:text-white"
      >
        <p className="mb-3">Danos tu Nombre</p>
        <select
          name="name"
          value={formValue.name}
          onChange={handleFormChange}
          id="users"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Selecciona tu nombre</option>
          {users.map(({ name }, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <div className="relative z-0 w-full group">
        <input
          type="password"
          name="password"
          id="password"
          placeholder=" "
          onChange={handleFormChange}
          value={formValue.password}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          onChange={handleFormChange}
          value={formValue.repeatPassword}
          type="password"
          name="repeatPassword"
          id="floating_repeat_password"
          placeholder=" "
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm password
        </label>
      </div>
      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
