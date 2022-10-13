import React from 'react'

import Sidebar from './Sidebar'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div>
      <div className="fixed mt-32">
        <Sidebar/>
      </div>
      <div className="ml-72">
        {children}
      </div>
    </div>
  )
}

export default Layout