import React from 'react'

import Sidebar from './Sidebar'
import { ChildProps } from '../interface/ChildProps'

const Layout: React.FC<ChildProps> = ({children}) => {
  return (
    <div>
      <div className="fixed">
        <Sidebar/>
      </div>
      <div className="ml-72">
        {children}
      </div>
    </div>
  )
}

export default Layout