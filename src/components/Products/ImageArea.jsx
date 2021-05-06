import React, { useCallback } from 'react'
import { storage } from '../../firebase/index'

import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import ImagePreview from './ImagePreview'

const ImageArea = (props) => {
  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm('Do you want to delete this image?')
      if (!ret) {
        return false
      } else {
        const newImages = props.images.filter((image) => image.id !== id)
        props.setImages(newImages)
        return storage.ref('images').child(id).delete()
      }
    },
    [props.images]
  )

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files
      let blob = new Blob(file, { type: 'image/jpg' })

      // Generate random 16 digits strings
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')

      const uploadRef = storage.ref('images').child(fileName)
      const uploadTask = uploadRef.put(blob)

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL }
          props.setImages((prevState) => [...prevState, newImage])
        })
      })
    },
    [props.setImages]
  )

  return (
    <div>
      <div className='p-grid__list-images'>
        {props.images.length > 0 &&
          props.images.map((image) => (
            <ImagePreview
              id={image.id}
              path={image.path}
              key={image.id}
              delete={deleteImage}
            />
          ))}
      </div>
      <div className='u-text-right'>
        <span>Add Product Image</span>
        <IconButton>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className='u-display-none'
              type='file'
              id='image'
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea
