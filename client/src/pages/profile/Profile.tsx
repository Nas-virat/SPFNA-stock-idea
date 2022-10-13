import React from 'react'

import Postprofile from './Postprofile'

import myphoto from '../../assets/handsomeboy.jpg'

import Layout from '../../globalcomponents/Layout'


const Profile : React.FC = () => {

  return (
    
	<Layout>
		<div className="flex items-center">
			<div className="w-60 m-7">
				<img className="rounded-full" src={myphoto} alt='myphoto' width="150" height="200"></img>
			</div>
			<div className="m-14">
				<h1 className="mt-3 font-semibold text-3xl">Nasvirat</h1>
				<h3 className="mt-3 font-normal text-xl">Rank #30</h3>
				<div className="flex">
					<button className='mt-3 bg-[#355070] hover:bg-[#579ef5] text-white font-medium h-9 w-32  rounded-3xl'>Create Post</button>
				</div>
			</div>
		</div>
		<div className="post ml-14">
			<Postprofile status="draft"/>
			<Postprofile status="publish"/>
			<Postprofile status="draft"/>
			<Postprofile status="publish"/>
			<Postprofile status="draft"/>
			<Postprofile status="publish"/>
		</div>
	</Layout>

  )
}

export default Profile
