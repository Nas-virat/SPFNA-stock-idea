import React from 'react'

import Sidebar from './Sidebar'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const Layout = ({children}:Props) => {
  return (
    <div className="flex">
      <div className="mt-32 mr-8">
        <Sidebar/>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Layout