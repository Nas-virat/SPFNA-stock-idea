import React, { useEffect, useState } from 'react'
import Layout from '../../globalcomponents/Layout';
import profileImage from '../../function/profileImage';
import { AuthContext } from '../../context/AuthProvider';
import Commenticon from '../../assets/Commenticon.png';
import axios from 'axios';
import config from '../../config/config.json';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingPage from '../../globalcomponents/waiting';

const Comment = ({comment}:any) => {

  const date = new Date(comment.commentDate);

  return(
    <div className='flex flex-row mt-3 rounded-3xl '>
      <img className='self-center w-10 h-10 mx-3 rounded-full' src={profileImage(comment.commentUser.image)} alt='profile-pic'></img>
      <div className='ml-3'>
        <div className='flex flex-row items-center'>
          <p className='text-l font-semibold mt-2'>
            {comment.commentUser.username}
          </p>
          <p className='text-sm text-gray-500 ml-2 mt-2'>
            {date.toLocaleString()}
          </p>
        </div>
        <p className='-mt-1'>
          {comment.commentBody}
        </p>
      </div>
    </div>
  )
}

const Viewpost = () => {
  
  const { id } = useParams();
  const { img } = React.useContext(AuthContext)
  const [idea, setIdea] = useState(
    {
      title: 'title',
      details: 'details',
      date: 'date',
      user: {
        username: 'name',
        image: 'image'
      },
      comment: [
        {
          commentUser: {
            username: 'name',
            image: 'image'
          },
          commentBody: 'commentBody',
          date: 'date'
        }
      ]
    }
  );
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<any>();
  const [loading, setLoading] = useState(true);
  const date = new Date(idea.date);

  const getSingleIdea = () => {
    axios.get(config.API_URL + '/idea/post/' + id, { withCredentials: true })
    .then(res => {
      console.log(res.data);
      setIdea(res.data.idea);
      setComments(res.data.idea.comment);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
    })
  }

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
          ideaId: id,
        }, { withCredentials: true });
        if (res.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'You have successfully commented!',
            icon: 'success',
            timer: 1000,
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

  useEffect(() => {
    getSingleIdea();
  }, []);

  const handleKeypress = (e:any) => {
    if (e.key === "Enter") {
      handleComment();
    }
  };

  return (
    <Layout>
      <div className="w-4/5">
      <p className='text-3xl font-bold pt-4 mb-4'>View Post</p>
      {loading ? <LoadingPage /> 
      :
        <div className='shadow-lg p-3 rounded-xl border-2'>
          <div className='flex flex-row '>
            <img className='w-12 h-12 mr-3 rounded-full' src={profileImage(idea.user.image)} alt='profile-pic'></img>
            <p className='text-xl self-center font-semibold'>
              {idea.user.username}
            </p>
            <p className='self-center text-slate-600 ml-2'>
              {date.toLocaleString()}
            </p>
          </div>
          <p className='text-l font-bold mt-2'>
            {idea.title}
          </p>
          <p className='mt-2'>
            {idea.details}
          </p>
          <div className='flex flex-row mt-2 '>
            <img className='w-6 h-6 cursor-pointer' src={Commenticon} alt='profile-pic'></img>
            <p className='ml-3 self-center text-slate-600'>{idea.comment.length}</p>
          </div>
            <div className='flex flex-col mt-2'>
              <div className='h-14 flex flex-row mt-3 bg-[#F2F2F2] rounded-3xl'>
                <img className='self-center w-10 h-10 mx-3 rounded-full' src={profileImage(img)} alt='profile-pic'></img>
                <form className='flex flex-row w-full'>
                <input 
                  className='self-center h-3/5 w-full rounded-3xl indent-6' 
                  placeholder='Add a comment' 
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeypress}
                  />
                </form>
                <button 
                  className='ml-5 mr-3 self-center bg-[#8236FD] hover:bg-blue-700 text-white font-bold h-3/5 w-1/6 rounded-3xl'
                  onClick={handleComment}
                >
                  Add Comment
                </button>
              </div>
              {
                comments && comments.map((comment: any, index: any) => {
                  return(
                    <Comment comment={comment} key={index} />
                  )
                })
              }
            </div>
        </div>
      }
      </div>
    </Layout>
  )
}

export default Viewpost