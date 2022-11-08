import React from 'react';
import avatarImage from '../../../assets/profile_image.json';
import Commenticon from './Commenticon.png';
import {useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


const Ideapost = ({ideas}:any) => {

  const [showcomment, setShowcomment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const date = new Date(ideas.date);

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
        const res = await axios.post('http://localhost:5000/api/idea/addcomment', {
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
      //window.location.reload(); uncomment when reload bug is fixed
    }
  }

  const profileImage = (image: string) => {
    const imageProfile = avatarImage.find((img) => img.alt === image);
    return imageProfile?.src;
  };

  return (
    <div className='shadow-lg p-3 rounded-xl border-2 my-4'>
      <div className='flex flex-row'>
        <img className='w-12 h-12 mr-3 rounded-full' src={profileImage(ideas.user.image)} alt='profile-pic'></img>
        <p className='text-xl self-center font-semibold'>
          {ideas.user.username}
        </p>
        <p className='self-center text-slate-600 ml-1'>
          {date.toLocaleDateString()}
        </p>
      </div>
      <p className='text-l font-bold mt-2'>
        {ideas.title}
      </p>
      <p className='mt-2'>
        {ideas.details}
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
            <img className='self-center w-10 h-10 mx-3 rounded-full' src={profileImage(ideas.user.image)} alt='profile-pic'></img>
            <form className='flex flex-row w-full'>
             <input 
              className='self-center h-3/5 w-full rounded-3xl indent-6' 
              placeholder='Add a comment' 
              onChange={(e) => setNewComment(e.target.value)}
              />
            </form>
            <button 
              className='ml-5 mr-3 self-center bg-[#8236FD] hover:bg-blue-700 text-white font-bold h-3/5 w-1/6 rounded-3xl'
              onClick={handleComment}
            >
              Add Comment
            </button>
          </div>
          <div className='mt-2 border-2 border-[#B0B0B0] rounded-3xl'>
            <button className='text-black font-bold h-12 w-full rounded-3xl self-center'>View Post</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Ideapost;