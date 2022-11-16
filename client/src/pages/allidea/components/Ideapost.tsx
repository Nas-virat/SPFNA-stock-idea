import React, { useState } from 'react';
import Commenticon from '../../../assets/Commenticon.png';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthProvider'
import profileImage from '../../../function/profileImage';

import config from '../../../config/config.json';
import { useNavigate } from 'react-router-dom';

const Ideapost  = ({ideas}:any) => {
  const navigate = useNavigate();
  const { img } = React.useContext(AuthContext)
  const [showcomment, setShowcomment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const date = new Date(ideas.date);
  const [readMore, setReadMore] = useState(true);
  const MAX_LENGTH = 250;

  const handleComment = async () => {
    if(newComment === ''){
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in some of the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      try {
        const res = await axios.post(config.API_URL +'/idea/addcomment', {
          commentBody: newComment,
          ideaId: ideas._id,
        }, { withCredentials: true });
        if (res.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'You have successfully commented!',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
          })
          .then(() => {
            window.location.reload();
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch(err){
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    }
  }
  
  const viewPost = () => {
    navigate('/idea/post/' + ideas._id);
  }
  
  const handleKeypress = (e:any) => {
    if (e.key === "Enter") {
      handleComment();
    }
  };

  const handleReadMore = () => {
    setReadMore(!readMore);
  }

  return (
    <div className='shadow-lg p-3 rounded-xl border-2 my-4' >
      <div className='flex flex-row cursor-pointer' onClick={viewPost}>
        <img className='w-12 h-12 mr-3 rounded-full' src={profileImage(ideas.user.image)} alt='profile-pic'></img>
        <p className='text-xl self-center font-semibold'>
          {ideas.user.username}
        </p>
        <p className='self-center text-slate-600 ml-2'>
          {date.toLocaleString()}
        </p>
      </div>
      <p className='text-l font-bold mt-2 cursor-pointer' onClick={viewPost}>
        {ideas.title}
      </p>
      <p className='mt-2 cursor-pointer'>
      {readMore ?
        <div>
          {ideas.details.length > MAX_LENGTH ?
            <div>
              {`${ideas.details.substring(0, MAX_LENGTH)}...`}<a className='text-blue-700 cursor-pointer' onClick={handleReadMore}>Read more</a>
            </div>
          :
            <p>{ideas.details}</p>
          }
        </div>
      :
        <p>{`${ideas.details}  `}<a className='text-blue-700 cursor-pointer' onClick={handleReadMore}>Read less</a></p>
      }
      </p>
      <div className='flex flex-row mt-2 '>
        <div onClick ={() => setShowcomment(!showcomment)}>
          <img className='w-6 h-6 cursor-pointer' src={Commenticon} alt='profile-pic'></img>
        </div>
        <p className='ml-3 self-center text-slate-600'>{ideas.comment.length}</p>
      </div>
      {showcomment && 
        <div className='flex flex-col mt-2'>
          <div className='h-14 flex flex-row mt-3 bg-[#F2F2F2] rounded-3xl'>
            <img className='self-center w-10 h-10 mx-3 rounded-full' src={profileImage(img)} alt='profile-pic'></img>
            <form className='flex flex-row w-full'>
             <input 
              className='self-center h-3/5 w-full rounded-3xl indent-6' 
              placeholder='Add a comment' 
              onChange={(e) => setNewComment(e.target.value)}
              onKeyUp={handleKeypress}
              />
            </form>
            <button 
              className='ml-5 mr-3 self-center bg-[#8236FD] hover:bg-blue-700 text-white font-bold h-3/5 w-1/6 rounded-3xl'
              onClick={handleComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default Ideapost;