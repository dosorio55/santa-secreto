import React from "react";
import Spinner from "./Spinner";

const SearchSanta = ({ randomImage, name }) => {
  return (
    <div className="flex gap-5 flex-col text-center">
      <div className="flex items-center justify-center gap-5 mb-10">
        <img
          src={randomImage}
          className="w-20 h-20 rounded-full"
          alt="profile"
        />
        <p>{name}</p>
      </div>
      <Spinner size={"medium"} />
      <p>Estamos escogiendo tu SANTA SECRETO...</p>
    </div>
  );
};

export default SearchSanta;
