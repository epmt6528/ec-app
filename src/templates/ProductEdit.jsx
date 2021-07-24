import React, { useCallback, useState, useEffect } from 'react'
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../reducks/products/operations'
import ImageArea from '../components/Products/ImageArea'
import { db } from '../firebase'
import SetSizeArea from '../components/Products/SetSizeArea'

const ProductEdit = () => {
  const dispatch = useDispatch()
  let id = window.location.pathname.split('/product/edit')[1]

  if (id !== '') {
    id = id.split('/')[1]
  }

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [categories, setCategories] = useState([]),
    [gender, setGender] = useState(''),
    [images, setImages] = useState([]),
    [price, setPrice] = useState(''),
    [sizes, setSizes] = useState([])

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

  const genders = [
    { id: 'all', name: 'All' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
    { id: 'unisex', name: 'Unisex' },
  ]

  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data()
          setImages(data.images)
          setName(data.name)
          setDescription(data.description)
          setCategory(data.category)
          setGender(data.gender)
          setPrice(data.price)
          setSizes(data.sizes)
        })
    }
  }, [id])

  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list = []
        snapshots.forEach((snapshot) => {
          const data = snapshot.data()
          list.push({ id: data.id, name: data.name })
        })
        setCategories(list)
      })
  }, [])

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

        <div className='module-spacer--small' />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className='module-spacer--small' />
        <div className='center'>
          <PrimaryButton
            label={'Save'}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  )
}

export default ProductEdit
