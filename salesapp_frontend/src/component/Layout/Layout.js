import React from 'react'
import Header from './Header'
import {Helmet} from "react-helmet"
import { Toaster} from 'react-hot-toast';
const Layout = (props) => {
  return (
    <> 
       <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
            </Helmet>
        <Header/>
        <main>
        <Toaster />
            {props.children}
        </main>
    </>
  )
}
Layout.defaultProps={
  tilte:"Sales App"
}

export default Layout