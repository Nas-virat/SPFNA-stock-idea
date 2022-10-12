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
    <div>
		<div className="m-4 flex">
			<img className="rounded-full" src={myphoto} alt='myphoto' width="150" height="200"></img>
			<div className="left selection m-5">
				<h1 className="font-semibold text-2xl">Nasvirat</h1>
				<h3 className="font-normal text-lg">Rank #30</h3>
				<div className="flex">
					<Button fn={test} text="createpost" color="#355070"/>
					<Button fn={test2} text="mypost" color="#8236FD"/>
				</div>
			</div>
		</div>
		<div className="post ml-14">
			<Postprofile status="draft"/>
			<Postprofile status="publish"/>
		</div>
	</div>
  )
}

export default Profile
