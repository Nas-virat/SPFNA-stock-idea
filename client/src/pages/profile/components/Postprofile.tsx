import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config/config.json';
import TextViewer from '../../../globalcomponents/RichtextComponents/TextViewer';

interface PostProps{
    id: string;
    date: any;
    status: string;
    title: string;
    details: string;
}


const Postprofile : React.FC<PostProps>= ({id, date, status, title, details}) => {

    const navigate = useNavigate();
    const postDate = new Date(date);
    const [readMore, setReadMore] = useState(true);
 
    const handleButton = () => {
        if(status === 'publish'){
            navigate('/idea/post/' + id);
        } else {
            navigate( '/idea/add/' + id);
        }
    }

    const handlePublish = () => {
        axios.put(config.API_URL + '/idea/update', {
            title: title,
            details: details,
            status: 'publish',
            ideaId: id,
          }, { withCredentials: true })
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleReadMore = () => {
        setReadMore(!readMore);
    }

    return (
        <div className="w-4/5 m-5 px-4 py-5 rounded-xl bg-white shadow-lg border-2">
            <div className="flex flex-row">
                <h3 className="self-center font-bold">{title}</h3>
                <h5 className="ml-2 self-center text-slate-600">{postDate.toLocaleString()}</h5>
            </div>
            {readMore ?
                <div className='cursor-pointer'>
                {details.length > config.MAX_LENGTH ?
                    <div>
                        <div onClick={() => navigate('/idea/post/' + id)}><TextViewer value={details.substring(0, config.MAX_LENGTH)} /></div><a className='text-blue-700 cursor-pointer' onClick={handleReadMore}>Read more</a>
                    </div>
                :
                    <div onClick={() => navigate('/idea/post/' + id)}><TextViewer value={details} /></div>
                }
                </div>
            :
                <div className='cursor-pointer'>
                <div onClick={() => navigate('/idea/post/' + id)}><TextViewer value={details} /></div><a className='text-blue-700 cursor-pointer' onClick={handleReadMore}>Read less</a>
                </div>
            }
            <div className="flex items-center">
                <h1 className="font-normal m-3">Status : {status}</h1>
                <div className={`rounded-full w-4 h-4 ${status === 'draft'?`bg-[#FA9C1B]` : `bg-[#008631]`}`}></div>
            </div>
            <button 
                className='bg-[#856dab] hover:bg-[#4a366b] text-white font-medium h-9 w-36  rounded-3xl'
                onClick={handleButton}
            >
                {status === 'draft' ? `Edit` : `Read More`}
            </button>
            {
                status === 'draft' ?
                <button 
                    className='bg-[#e4585d] hover:bg-[#c51c43] text-white font-medium h-9 w-36  rounded-3xl ml-3'
                    onClick={handlePublish}
                >
                    Publish
                </button>
                : 
                null
            }
        </div>
    )
}

export default Postprofile
