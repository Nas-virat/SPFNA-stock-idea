import React from "react";
import profileImage from '../../../function/profileImage';
import {useNavigate} from "react-router-dom";
import Chartport from "../../portfolio/components/Chartport";
import { AuthContext } from '../../../context/AuthProvider'

interface ToprankProps {
  id: string;
  rank: number;
  user: string;
  totalpl: number;
  image: string;
}

const Topleader: React.FC<ToprankProps> = ({
  id,
  rank,
  user,
  totalpl,
  image,
}) => {

  const navigate = useNavigate();
  const { username }  = React.useContext(AuthContext)

  const viewPort = () => {
    if (user === username) {
      navigate(`/myport`);
    }
    else {
      navigate(`/otherport/` + id);
    }
  }

  return (
    <div className="cursor-pointer w-fit h-96 bg-[#A88DEB] rounded-2xl flex flex-col p-5 grow mx-3" onClick={viewPort}>
      <div className=" flex flex-col items-center">
        <div className="flex items-center">
          <img
            src={profileImage(image)}
            alt="profile-img"
            className="rounded-full w-48 h-48 mx-auto"
          />
          <div className="h-[128px] w-[248px] hidden 2xl:inline-block overflow-hidden ml-3">
            <Chartport labels={['red', 'blue','yellow']} data ={[300,50,100]} backgroundColor={['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)']}/>
          </div>
        </div>
        <div className="flex flex-row mx-auto items-center">
          <p className="font-bold text-9xl text-white mr-3">{rank}</p>
          <div className="mt-3">
            <p className="font-semibold text-2xl text-white">@{user}</p>
            {totalpl > 0 ? (
              <p className="font-bold text-6xl text-green-600">+{totalpl}%</p>
            ) : (
              <p className="font-bold text-6xl text-red-500">{totalpl}%</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topleader;
