import React from 'react'
import axios from 'axios';
import config from '../../../config/config.json';
import { useNavigate } from 'react-router-dom';

const Draft = (data:any) => {
    const date = new Date(data.data.date);
    const navigate = useNavigate();

    const handleDraft = () => {
        navigate('/admincontrol/' + data.data._id);
        window.location.reload();
    }

    const handlePublish = () => {
        axios.put(config.API_URL + `/admin/update`, {
            title: data.data.title,
            details: data.data.details,
            status:  'publish',
            announceID: data.data._id
          }, {withCredentials: true})
        .then(res => {
            console.log(res);
            //window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

  return (
    <div>
        <p className='font-bold text-lg'>{data.data.title} <span className='text-sm font-normal text-slate-600 ml-2'>{date.toLocaleString()}</span></p>
        <p className='text-base mt-3'>{data.data.details}</p>
        
        <div className='mt-5 flex flex-row w-full items-end justify-between'>
            <div className="flex items-center">
                <h1 className="font-normal m-3">Draft</h1>
                <div className="rounded-full w-4 h-4 bg-[#FA9C1B]"></div>
            </div>
            <div className='flex items-center'>
                <button 
                    className='bg-[#856dab] hover:bg-[#4a366b] text-white font-medium h-10 w-28 rounded-full mr-3'
                    onClick={handleDraft}
                >
                    Edit
                </button>
                <button 
                    className='bg-[#E56B6F] hover:bg-[#D75B5F] text-white font-bold w-28 h-10 rounded-full mr-3'
                    onClick={handlePublish}
                >
                    Publish
                </button>
            </div>
        </div>
    </div>
  )
}

export default Draft