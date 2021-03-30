import React from 'react'
import { Redirect } from 'react-router-dom'

import Hero from '../components/Hero'

const NotFound = ({location}) => (
    <div>
        <Hero title="404 Página no encontrada" redirect="true"></Hero>
    </div>
)


export default NotFound