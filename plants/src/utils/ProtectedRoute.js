import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={() => {
        if(localStorage.getItem('token') === null) {
            return <Redirect to='/' />
        } else 
            return <Component />
    }} />
}

export default ProtectedRoute;