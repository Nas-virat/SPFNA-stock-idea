import React from "react";
import Chartport from "../../portfolio/components/Chartport";
import { Link } from "react-router-dom";

interface RanklistProps {
  rank: number;
  firstname: string;
  lastname: string;
  totalpl: number;
  image: string;
}

const Ranklist: React.FC<RanklistProps> = ({
  rank,
  firstname,
  lastname,
  totalpl,
  image,
}) => {
  return (
    <div className="cursor-pointer w-full h-40 border-[#A88DEB] border-2 rounded-2xl flex flex-row p-5 mb-5 items-center justify-bewteen">
      <div className="flex flex-row items-center w-[200rem]">
        <p className="font-bold text-5xl text-purple-900 px-12">{rank}</p>
        <Link to="/otherport">
          <img src={image} alt="profile-img" className="rounded-full w-32 h-32" />
        </Link>
        <p className="font-medium text-3xl text-purple-900 px-12">
          <Link to="/otherport">{firstname} {lastname}</Link>
        </p>
      </div>
      <div className="">
        <Chartport labels={['red', 'blue','yellow']} data ={[300,50,100]} backgroundColor={['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)']}/>
      </div>
      {totalpl > 0 ? (
        <p className="font-bold text-5xl text-green-600 px-12">+{totalpl}%</p>
      ) : (
        <p className="font-bold text-5xl text-red-500 px-12">{totalpl}%</p>
      )}
    </div>
  );
};

export default Ranklist;
