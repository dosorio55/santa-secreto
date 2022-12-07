const SecretSanta = ({ image, name }) => {
  return (
    <div className="flex gap-5 flex-col text-center">
      <p>Tu santa secreto es</p>
      <div className="flex items-center justify-center gap-5 mb-10">
        <img src={image} className="w-20 h-20 rounded-full" alt="profile" />
        <p>{name}</p>
      </div>
    </div>
  );
};

export default SecretSanta;
