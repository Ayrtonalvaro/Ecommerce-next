import Layout from '@/components/Layout'
import axios from 'axios'
import React, { FormEvent, useRef, useState } from 'react'

const NewProduct = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = nameRef.current?.value
    const description = descRef.current?.value
    const price = priceRef.current?.value

    const data = { name, description, price }
    await axios.post('/api/products', data)
  }

  return (
    <Layout>
      <h1 className="">New product</h1>
      <form onSubmit={handleSubmit}>
        <label>Product name</label>
        <input type="text" placeholder="samgung s23..." value={nameRef.current?.value} ref={nameRef} />
        <label>Description</label>
        <textarea placeholder="1gb memory, ..." value={descRef.current?.value} ref={descRef} />
        <label>Price (USD)</label>
        <input type="number" placeholder="120$..." value={priceRef.current?.value} ref={priceRef} />
        <button type='submit' className="btn-primary mt-2">Add</button>
      </form>
    </Layout>
  )
}

export default NewProduct
