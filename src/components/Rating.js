import React from 'react'

export default function Rating() {
    let stars = [1,2,3,4,5]
  return (
    <div>
      {stars.map(star => <span key={star}>{star}</span>)}
    </div>
  )
}
