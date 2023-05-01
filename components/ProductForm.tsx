import { ProductInterface } from '@/interfaces/ProductInt'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
interface FormProps {
  _id?: string
}
const ProductForm: React.FC<FormProps> = ({_id}) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const [goToProducts, setGotProducts] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = nameRef.current?.value
    const description = descRef.current?.value
    const price = priceRef.current?.value
    const data = { name, description, price }
    if (_id) {
      await axios.put('/api/products', {...data, _id})
    } else {
      await axios.post('/api/products', data)
      
    }
    setGotProducts(true)
  }

  if (goToProducts) {
    router.push('/products')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Product name</label>
        <input type="text" placeholder="samgung s23..." ref={nameRef} />
        <label>Description</label>
        <textarea placeholder="1gb memory, ..." ref={descRef} />
        <label>Price (USD)</label>
        <input type="number" placeholder="120$..." ref={priceRef} />
        <button type="submit" className="btn-primary mt-2">
          Add
        </button>
      </form>
    </div>
  )
}

export default ProductForm
