import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ideapost from './Component/Ideapost';
import Searchicon from './Component/Searchicon.png';
import BacktoTop from './Component/BacktoTop.jpg';
import {useState, useEffect} from 'react';

import Layout from '../../globalcomponents/Layout';


  // This function will scroll the window to the top 

const Allidea = () => {
  const navigate = useNavigate();
  const [showbutton, setShowbutton] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowbutton(true);
      } else {
        setShowbutton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  }

  const handlePostidea = () => {
    navigate('/idea/post');
  }

  return (
    <Layout>
      <div className="w-4/5">
        <p className='text-3xl font-bold pt-4'>Idea Space</p>
        <div className='flex flex-row justify-between h-12 my-4'>
          <div className='flex flex-row border-solid border-8 h-full w-4/5 rounded-3xl mr-4'>
            <img className='m-1 ml-2' src={Searchicon} alt='search icon'></img> 
            <input className='h-full w-4/5 rounded-3xl pl-4' placeholder='Search by Keyword' />
            <button className='bg-[#856dab] hover:bg-[#4a366b] text-white font-bold h-full w-1/5 rounded-3xl'>Search</button>
          </div>
          <button 
            className='bg-[#856dab] hover:bg-[#4a366b] text-white font-bold h-full w-1/6 rounded-3xl border-8 ml-3'
            onClick={handlePostidea}
          >
            Create Post
          </button>
        </div>
        <Ideapost/>
        <Ideapost/>
        <Ideapost/>
        <Ideapost/>
        <Ideapost/>
        <Ideapost/>
        <Ideapost/>
        <Ideapost/>
        <Ideapost/>
        <Ideapost/>
        <Ideapost/>
        {showbutton && 
          <div className='rounded-full fixed bottom-16 right-16 h-16 w-16' onClick={scrollToTop}>
            <img src={BacktoTop} alt='back to top'></img>
          </div>
        }
      </div>
    </Layout>
  )
}

export default Allidea;