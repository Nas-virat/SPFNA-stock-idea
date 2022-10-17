import React from "react";

import {Link} from "react-router-dom";

interface ToprankProps {
  rank: number;
  firstname: string;
  lastname: string;
  totalpl: number;
  image: string;
}

const Topleader: React.FC<ToprankProps> = ({
  rank,
  firstname,
  lastname,
  totalpl,
  image,
}) => {
  return (
    <div className="cursor-pointer w-fit h-96 bg-[#A88DEB] rounded-2xl flex flex-col p-5 grow mx-3">
      <Link to="/otherport">
      <img
        src={image}
        alt="profile-img"
        className="rounded-full w-48 h-48 mx-auto"
      />
      <div className="flex flex-row mx-auto">
        <p className="font-bold text-9xl text-white mr-3">{rank}</p>
        <div className="mt-3">
          <p className="font-semibold text-2xl text-white">{firstname}</p>
          <p className="font-semibold text-2xl text-white">{lastname}</p>
          {totalpl > 0 ? (
            <p className="font-bold text-6xl text-green-600">+{totalpl}%</p>
          ) : (
            <p className="font-bold text-6xl text-red-500">{totalpl}%</p>
          )}
        </div>
      </div>
      </Link>
    </div>
  );
};

export default Topleader;
