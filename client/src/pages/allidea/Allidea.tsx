import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ideapost from './components/Ideapost';
import { BiSearchAlt } from "react-icons/bi";
import BacktoTop from './components/BacktoTop.jpg';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Layout from '../../globalcomponents/Layout';
import Search from '../../globalcomponents/Search';
import config from '../../config/config.json';
import LoadingPage from '../../globalcomponents/waiting';

const Allidea = () => {
  const navigate = useNavigate();
  const [showbutton, setShowbutton] = useState(false)
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

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

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
        <div className='flex flex-row justify-between h-[3.25rem] my-4'>
          <div className='flex flex-row border-solid border-8 h-full w-4/5 rounded-3xl mr-4 bg-gray-200'>
            <div className='my-auto mx-2 '>
              <BiSearchAlt size="24px" />
            </div>
            <Search 
              placeholder='Enter your Keyword' 
              options={
                        ideas.map((ideas:any) => 
                          ({
                            label: ideas.title,
                            value: ideas._id
                         })
                      )
                      }
              link='/idea/post/'
            />
          </div>
          <button 
            className='bg-[#856dab] hover:bg-[#4a366b] text-white font-bold h-full w-1/6 rounded-3xl border-8 ml-3'
            onClick={handlePostidea}
          >
            Create Post
          </button>
        </div>
        {loading ? <LoadingPage /> 
          : 
          <div>{
            ideas && ideas.map((ideas, index) => {
              return(
                <Ideapost ideas={ideas} key={index}/>
              )
            })
          }
          </div>
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