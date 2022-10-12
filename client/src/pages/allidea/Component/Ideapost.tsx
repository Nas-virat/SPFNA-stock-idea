import React from 'react';
import handsomeboy from '../../../assets/handsomeboy.jpg';
import Commenticon from './Commenticon.png';
import {useState} from 'react';

const Comment = () => {
  return(
    <div className='h-14 flex-auto flex-row mt-3 rounded-3xl'>
      <img className='self-center w-10 h-10 mx-3 rounded-full' src={handsomeboy} alt='profile-pic'></img>
      <div className='ml-3'>
        <p className='text-l font-semibold mt-2'>
          Meaw Tom
        </p>
        <p className='-mt-1'>
          Badddd
        </p>
      </div>
    </div>
  )
}

const Ideapost = () => {

  const [showcomment, setShowcomment] = useState(false);
  const [morecomment, setMorecomment] = useState(false);

  return (
    <div className='shadow-lg p-3 rounded-xl border-2 my-4'>
      <div className='flex-auto flex-row'>
        <img className='w-12 h-12 mr-3 rounded-full' src={handsomeboy} alt='profile-pic'></img>
        <p className='text-xl self-center font-semibold'>
          Meaw Nine
        </p>
        <p className='self-center text-slate-600 ml-1'>
          : oct 12, 2021
        </p>
      </div>
      <p className='text-l font-bold mt-2'>
        sit amet consectetur adipisicing elit. 
        Necessitatibus incidunt, iusto, ducimu
      </p>
      <p className='mt-2'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Necessitatibus incidunt, iusto, ducimus molestias provident 
        libero accusamus praesentium doloribus nostrum. Necessitatibus 
        incidunt, iusto, ducimus molestias provident 
        libero accusamus praesentium doloribus nostrum.
      </p>
      <div className='flex-auto flex-row mt-2 '>
        <div onClick ={() => setShowcomment(!showcomment)}>
          <img className='w-6 h-6 cursor-pointer' src={Commenticon} alt='profile-pic'></img>
        </div>
        <p className='ml-3 self-center text-slate-600'>4</p>
      </div>
      {showcomment && 
        <div className='flex-auto flex-col mt-2'>
          <div className='h-14 flex-auto flex-row mt-3 bg-[#F2F2F2] rounded-3xl'>
            <img className='self-center w-10 h-10 mx-3 rounded-full' src={handsomeboy} alt='profile-pic'></img>
            <input className='self-center h-3/5 w-4/5 rounded-3xl indent-6' placeholder='Add a comment' />
            <button className='ml-5 mr-3 self-center bg-[#8236FD] hover:bg-blue-700 text-white font-bold h-3/5 w-1/6 rounded-3xl'>Add Comment</button>
          </div>
          <Comment/>
          <div>
          {!morecomment &&
            <div className='mt-2 border-2 border-[#B0B0B0] rounded-3xl'>
              <button className='text-black font-bold h-12 w-full rounded-3xl self-center' onClick ={() => setMorecomment(!morecomment)}>View More Comment</button>
            </div>
          }
          {morecomment &&
            <div>
              <Comment/>
              <Comment/>
              <div className='mt-2 border-2 border-[#B0B0B0] rounded-3xl'>
                <button className='text-black font-bold h-12 w-full rounded-3xl self-center' onClick ={() => setMorecomment(!morecomment)}>Close</button>
              </div>
            </div>
          }
          </div>
        </div>
      }
    </div>
  )
}

export default Ideapost;