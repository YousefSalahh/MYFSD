import Router from 'next/router'
import { useEffect } from 'react'

export default function X() {

    useEffect(() => {
        const {pathname} = Router
        if(pathname == '/' ){
            Router.push('/transactions/Fooo')
        }
      });

    return (
        <h1>test page</h1>
    )
}