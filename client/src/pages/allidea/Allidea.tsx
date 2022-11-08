import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ideapost from './components/Ideapost';
import Searchicon from './components/Searchicon.png';
import BacktoTop from './components/BacktoTop.jpg';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Layout from '../../globalcomponents/Layout';

import config from '../../config/config.json';

const Allidea = () => {
  const navigate = useNavigate();
  const [showbutton, setShowbutton] = useState(false)
  const [ideas, setIdeas] = useState([]);

  const getAllIdeas = () => {
    axios.get(config.API_URL + '/idea/all', { withCredentials: true })
    .then(res => {
      console.log(res.data);
      setIdeas(res.data.ideas);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => { 
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowbutton(true);
      } else {
        setShowbutton(false);
      }
    });
    getAllIdeas();
  }, []);

  // This function will scroll the window to the top of the page
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
        {
          ideas && ideas.map((ideas, index) => {
            return(
              <Ideapost ideas={ideas} key={index}/>
            )
          })
        }
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