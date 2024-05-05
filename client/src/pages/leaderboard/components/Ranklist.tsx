import React, { useState, useEffect } from "react";
import Chartport from "../../portfolio/components/Chartport";
import { useNavigate } from "react-router-dom";
import profileImage from "../../../function/profileImage";
import { AuthContext } from '../../../context/AuthProvider'

import backgroundColor from '../../../config/chartconfig';
import chartFunction from '../../../function/chartfunction';

import { RanklistProps } from "../../../interface/Rank";

const Ranklist: React.FC<RanklistProps> = ({
  id,
  rank,
  dataChart,
  user,
  totalpl,
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
  }, [dataChart]);

  const viewPort = () => {
    if (user === username) {
      navigate(`/myport`);
    }
    else {
      navigate(`/otherport/` + id);
    }
  }
  
  return (
    <div className="cursor-pointer w-full h-40 border-[#A88DEB] border-2 rounded-2xl flex flex-row p-5 mb-5 items-center justify-bewteen" onClick={viewPort}>
      <div className="flex flex-row items-center w-[200rem]">
        <p className="font-bold text-5xl text-purple-900 px-12">{rank}</p>
        <img src={profileImage(image)} alt="profile-img" className="rounded-full w-[128px] h-[128px]" />
        <p className="font-medium text-3xl text-purple-900 px-12">
          @{user}
        </p>
      </div>
      <div className="flex items-center">
        <div className="h-[128px] w-[248px] hidden 2xl:inline-block">
          <Chartport labels={labels} data ={data} backgroundColor={backgroundColor}/>
        </div>
        {totalpl === 200000 ? <p className="font-bold text-4xl text-slate-400 px-12 w-[270px] overflow-hidden">{((totalpl-200000)/200000*100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%</p>
        :
        <>
          {totalpl >= 200000 ? (
            <p className="font-bold text-4xl text-green-600 w-[270px] overflow-hidden">+{((totalpl-200000)/200000*100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%</p>
          ) : (
            <p className="font-bold text-4xl text-red-500 w-[270px] overflow-hidden">-{((200000-totalpl)/200000*100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%</p>
          )}
        </>}
      </div>
    </div>
  );
};

export default Ranklist;
