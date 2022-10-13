import React from 'react'
interface PostProps{
    status: "draft" | "publish";
}


const Postprofile : React.FC<PostProps>= ({status}) => {
 

    return (
        <div className="w-4/5 m-5 px-4 py-5 rounded-lg bg-white shadow-lg">
            <h3 className="font-bold">Topic</h3>
            <p className="font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit autem vel ipsum, temporibus 
            similique quo non asperiores rerum? Architecto iste incidunt quisquam commodi esse mollitia nesciunt ex, 
            excepturi itaque qui.
            </p>
            <div className="flex items-center">
                <h1 className="font-normal m-3">Status : {status}</h1>
                <div className={`rounded-full w-4 h-4 ${status === 'draft'?`bg-[#FA9C1B]` : `bg-[#008631]`}`}></div>
            </div>
            <button className='bg-[#856dab] hover:bg-[#4a366b] text-white font-medium h-9 w-36  rounded-3xl'>{status === 'draft' ? `Edit` : `Read More`}</button>
        </div>
    )
}

export default Postprofile
