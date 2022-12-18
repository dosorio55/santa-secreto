import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import addAvagar from "../assets/addAvatar.png";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { fetchData } from "../constants/settings";

const initialState = {
  name: "",
  password: "",
  repeatPassword: "",
  image: "",
};

const Register = ({ setToken, users, alert, setAlert, loadingNames }) => {
  const [formValue, setFormValue] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleChangeImage = (event) => {
    setLoading(true);
    if (imageError) {
      setImageError(false);
    }
    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = async () => {
        const imageBase64 = reader.result;
        setFormValue((prevState) => ({ ...prevState, image: imageBase64 }));
      };
    }
    setLoading(false);
  };

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    if (error) {
      seterror(false);
    }
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (formValue.password !== formValue.repeatPassword) {
        seterror(true);
        throw Error("Las contraseñas no coinciden, inténtalo de nuevo");
      } else if (!formValue.image) {
        setImageError(true);
        throw Error("Por favor selecciona una imagen de perfil");
      }
      const serverResponse = await fetchData(
        formValue,
        null,
        "POST",
        "users/register"
      );
      if (serverResponse.status === 200) {
        const data = await serverResponse.json();
        localStorage.setItem(
          "token",
          JSON.stringify({ token: data.data.token })
        );
        setToken(data.data.token);
        navigate("/profile");
      } else if (serverResponse.status === 500) {
        seterror(true);
        navigate("login");
        throw Error("Este usuario ya está registrado, por favor haz login");
      } else {
        throw Error("Ha ocurrido un error de servidor, inténtelo más tarde");
      }
    } catch (error) {
      setAlert({
        active: true,
        message: error.message,
      });
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {alert.active &&
        createPortal(
          <Alert alert={alert} setAlert={setAlert} />,
          document.getElementById("overlays")
        )}
      <div className="flex justify-center align-middle w-screen min-h-screen ">
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 sm:w-11/12 w-11/12 my-auto flex flex-col gap-6"
        >
          {loadingNames ? (
            <Spinner size={"medium"} />
          ) : (
            <>
              <div
                className={`w-full mb-8 ${
                  imageError && "border-2 border-rose-600"
                }`}
              >
                <label
                  htmlFor="add-image"
                  className="flex justify-center items-center gap-5 cursor-pointer"
                >
                  <img
                    src={formValue.image || addAvagar}
                    className={`w-20 h-20 ${formValue.image && "rounded-full"}`}
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
              <div className="flex sm:flex-row flex-col justify-center items-center gap-5">
                <button
                  type="submit"
                  className={`inline-block sm:w-auto w-full px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft active:opacity-85  ${
                    error || loading
                      ? "hover:scale-102 hover:shadow-soft-xs opacity-50 cursor-not-allowed bg-gray-600"
                      : "bg-gradient-to-tl from-blue-600 to-cyan-400"
                  }`}
                  disabled={loading}
                >
                  {!loading ? "Registrar" : <Spinner />}
                </button>
                <p>
                  Ya posees una cuenta,{" "}
                  <Link to={"/login"} className="font-semibold ">
                    Login
                  </Link>
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
