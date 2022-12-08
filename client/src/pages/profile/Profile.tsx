import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import profileImage from '../../function/profileImage'
import { AuthContext } from '../../context/AuthProvider'
import LoadingPage from '../../globalcomponents/waiting';
import Postprofile from './components/Postprofile';

import Layout from '../../globalcomponents/Layout'
import axios from 'axios'
import config from '../../config/config.json';


const Profile : React.FC = () => {

	const navigate = useNavigate();
	const { username, img } = useContext(AuthContext);
	const [loading, setLoading] = React.useState(true);
	const [ideas, setIdeas] = React.useState([
		{
			_id: '',
			title: '',
			details: '',
			date: '',
			status: '',
		}
	]);

	const getIdeaByUser = async () => {
		await axios.get(config.API_URL + `/idea/userpost`, { withCredentials: true })
		.then(res => {
			console.log(res.data);
			setIdeas(res.data.ideas);
			setLoading(false);
			})
			.catch(err => {
			console.log(err);
			})
		}

	useEffect(() => {
		getIdeaByUser();
	},[]);

	return (
		<Layout>
			<div className="flex items-center h-56">
				<div className="w-auto mx-7 ml-20">
					<img className="rounded-full" src={profileImage(img)} alt='myphoto' width="150" height="200"></img>
				</div>
				<div className="m-14">
					<h1 className="mt-3 font-bold text-3xl">@{username}</h1> 
					<div className="flex">
						<button id='create-post' onClick={()=> navigate('/idea/add')} className='mt-3 bg-[#355070] hover:bg-[#579ef5] text-white font-medium h-9 w-32  rounded-3xl'>Create Post</button>
					</div>
				</div>
			</div>
			{loading ? <LoadingPage /> 
			: 
			<div>
				{ideas && 
					ideas.map((ideas, index: number) => {
					return(
						<Postprofile 
							id={ideas._id} 
							date={ideas.date}
							status={ideas.status} 
							title={ideas.title} 
							details={ideas.details} 
							key={index}
						/>
					)})
				}
				{ideas.length === 0 && 
					<div className="text-bold mt-24 ml-56 text-3xl text-slate-400">No Post Made</div>
				}
			</div>
			}
		</Layout>
)
}

export default Profile
