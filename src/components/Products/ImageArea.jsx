import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

const ImageArea = () => {
  return (
    <div>
      <div className='u-text-right'>
        <span>Add Product Image</span>
        <IconButton>
          <label>
            <AddPhotoAlternateIcon />
            <input className='u-display-none' type='file' id='image' />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea
