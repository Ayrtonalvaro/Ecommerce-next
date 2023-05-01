import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm'
import { ProductInterface } from '@/interfaces/ProductInt'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const EditProductPage = () => {
  const [productInfo, setProductInfo] = useState({
    _id:'',
    name: '',
    description: '',
    price: 0,
  })
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const router = useRouter()
  const { id } = router.query
  const _id = productInfo._id
  
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/api/products?id=${id}`).then((res) => {
      setProductInfo(res.data)
    })
  }, [id])
  console.log(productInfo._id)
  const handleSubmit = async () => {
    const data = { name, description, price }
    await axios.put('/api/products', { ...data, _id })
  }

  return (
    <Layout>
      <h1>Edit {productInfo.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>Product name</label>
        <input
          type="text"
          placeholder="samgung s23..."
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="1gb memory, ..."
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Price (USD)</label>
        <input
          type="number"
          placeholder="120$..."
          value={price}
          onChange={(ev) => setPrice(parseInt(ev.target.value))}
        />
        <button type="submit" className="btn-primary mt-2">
          Edit
        </button>
      </form>
    </Layout>
  )
}

export default EditProductPage
