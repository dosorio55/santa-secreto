import profile from "../assets/profile-blank.png";

const SecretSanta = ({ image, name }) => {
  console.log(image);
  return (
    <div className="flex gap-5 flex-col text-center">
      <p>Tu santa secreto es</p>
      <div className="flex items-center justify-center gap-5 mb-10">
        <img
          src={image === "imagen.test" ? profile : image}
          className="w-20 h-20 rounded-full"
          alt="profile"
        />
        <p>{name}</p>
      </div>
    </div>
  );
};

export default SecretSanta;
