function SeeMore({ operaIsChecked, websitesIsChecked, handleLoadMore }) {
  let buttonText = 'projects'
  if (!operaIsChecked) buttonText = 'websites'
  if (!websitesIsChecked) buttonText = 'operas'

  return (
    <div className="container pt5">
      <button onClick={handleLoadMore} className="link">
        See more {buttonText}
      </button>
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'

export default SeeMore
