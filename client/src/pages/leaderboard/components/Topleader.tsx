import React, {useState,useEffect} from "react";
import profileImage from '../../../function/profileImage';
import {useNavigate} from "react-router-dom";
import Chartport from "../../portfolio/components/Chartport";
import { AuthContext } from '../../../context/AuthProvider';

import backgroundColor from '../../../config/chartconfig';
import chartFunction from '../../../function/chartfunction';

interface ToprankProps {
  id: string;
  rank: number;
  user: string;
  dataChart: any;
  pl : number;
  image: string;
}

const Topleader: React.FC<ToprankProps> = ({
  id,
  rank,
  user,
  dataChart,
  pl,
  image,
}) => {

  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const navigate = useNavigate();
  const { username }  = React.useContext(AuthContext)

  useEffect(() => {
    const { labels, data} = chartFunction(dataChart);
    setLabels(labels);
    setData(data);
  }, []);

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
            <Chartport labels={labels} data ={data} backgroundColor={backgroundColor}/>
          </div>
        </div>
        <div className="flex flex-row mx-auto items-center">
          <p className="font-bold text-9xl text-white mr-3">{rank}</p>
          <div className="mt-3">
            <p className="font-semibold text-2xl text-white">@{user}</p>
            {pl === 200000 ? <p className="font-bold text-4xl text-slate-400 px-12 w-[270px] overflow-hidden">{((pl-200000)/200000*100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%</p>
            :
            <>
              {pl >= 200000 ? (
                <p className="font-bold text-5xl text-green-600 w-[270px] overflow-hidden">+{((pl-200000)/200000*100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%</p>
              ) : (
                <p className="font-bold text-5xl text-red-500 w-[270px] overflow-hidden">-{((200000-pl)/200000*100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%</p>
              )}
            </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topleader;
