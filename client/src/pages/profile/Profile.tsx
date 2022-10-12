import React from 'react'

import Button from '../../globalcomponents/Button'

import Postprofile from './Postprofile'

import myphoto from '../../assets/handsomeboy.jpg'
const Profile = () => {

  const test= () =>{
	console.log("thank you");
  }
  const test2= () =>{
	console.log("t");
  }

  return (
    <>
		<div className="m-4 flex items-center">
			<div className="w-60 m-7">
				<img className="rounded-full" src={myphoto} alt='myphoto' width="150" height="200"></img>
			</div>
			<div className="m-14">
				<h1 className="mt-3 font-semibold text-3xl">Nasvirat</h1>
				<h3 className="mt-3 font-normal text-xl">Rank #30</h3>
				<div className="flex">
					<Button fn={test} text="createpost" color="#355070"/>
					<Button fn={test2} text="mypost" color="#8236FD"/>
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
	</>
  )
}

export default Profile
