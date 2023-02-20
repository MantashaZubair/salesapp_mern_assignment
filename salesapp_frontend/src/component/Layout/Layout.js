import React from 'react'
import Header from './Header'
import { Toaster} from 'react-hot-toast';
const Layout = (props) => {
  return (
    <>
        <Header/>
        <main>
        <Toaster />
            {props.children}
        </main>
    </>
  )
}

export default Layout