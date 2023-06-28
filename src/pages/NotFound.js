import React from 'react'
import HelmetTitle from '../components/HelmetTitle'

export default function NotFound({msg, mt}) {
  return (
    <div className='container not-found' style={{marginTop: `${mt || "200px"}`}}>
      <HelmetTitle title="Tech-Shop | Not Found" />
      <h1>{msg}</h1>
    </div>
  )
}
