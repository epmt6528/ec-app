import React, { useCallback, useState } from 'react'
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../reducks/products/operations'
import ImageArea from '../components/Products/ImageArea'

const ProductEdit = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [images, setImages] = useState([]),
    [price, setPrice] = useState('')

  const inputName = useCallback(
    (event) => {
      setName(event.target.value)
    },
    [setName]
  )

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value)
    },
    [setDescription]
  )

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value)
    },
    [setPrice]
  )

  const categories = [
    { id: 'tops', name: 'Tops' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'pants', name: 'Pants' },
  ]

  const genders = [
    { id: 'all', name: 'All' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
    { id: 'unisex', name: 'Unisex' },
  ]

  return (
    <section>
      <h2 className='u-text__headline u-text-center'>Add/Edit Product</h2>
      <div className='c-section-container'>
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'Product Name'}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={'text'}
        />

        <TextInput
          fullWidth={true}
          label={'Product Description'}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
          type={'text'}
        />

        <SelectBox
          label={'Category'}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />

        <SelectBox
          label={'Gender'}
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        />

        <TextInput
          fullWidth={true}
          label={'Price'}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={'number'}
        />

        <div className='module-spacer--mediun' />
        <div className='center'>
          <PrimaryButton
            label={'Save'}
            onClick={() =>
              dispatch(
                saveProduct(name, description, category, gender, price, images)
              )
            }
          />
        </div>
      </div>
    </section>
  )
}

export default ProductEdit
