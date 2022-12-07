import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { fetchData } from "../constants/settings";

const initialState = {
  name: "",
  password: "",
};

const Login = ({ setToken, users }) => {
  const [formValue, setFormValue] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const serverResponse = await fetchData(
        formValue,
        null,
        "POST",
        "users/login"
      );
      if (serverResponse.status === 200) {
        const data = await serverResponse.json();
        localStorage.setItem(
          "token",
          JSON.stringify({ token: data.data.token })
        );

        setToken(data.data.token);
        navigate("/profile");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center align-middle w-screen min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 sm:w-11/12 w-11/12 my-auto flex flex-col gap-10"
      >
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
        <div className="flex sm:flex-row flex-col justify-center items-center gap-5">
          <button
            type="submit"
            className={`inline-block sm:w-auto w-full px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft active:opacity-85  ${
              !loading
                ? "bg-gradient-to-tl from-blue-600 to-cyan-400"
                : "hover:scale-102 hover:shadow-soft-xs opacity-50 cursor-not-allowed bg-gray-600"
            }`}
            disabled={loading}
          >
            {!loading ? "Login" : <Spinner />}
          </button>
          <p>
            No tienes una cuenta,{" "}
            <Link to={"/"} className="font-semibold ">
              REGÍSTRATE
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
