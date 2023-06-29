import React, { useEffect } from 'react'
import HelmetTitle from '../components/HelmetTitle'
import { useLocation } from 'react-router-dom';

export default function NotFound({msg, mt}) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className='container not-found' style={{marginTop: `${mt || "200px"}`}}>
      <HelmetTitle title="Tech-Shop | Not Found" />
      <h1>{msg}</h1>
    </div>
  )
}
