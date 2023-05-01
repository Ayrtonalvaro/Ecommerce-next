import Layout from '@/components/Layout'
import { ProductInterface } from '@/interfaces/ProductInt'
import axios from 'axios'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'

const DeleteProductPage = () => {
  const router = useRouter()
  const [productInfo, setProductInfo] = useState<ProductInterface>()
  const goBack = () => {
    router.push('/products')
  }

  const { id } = router.query

  useEffect(() => {
    if (!id) {
      return
    } else {
      axios.get(`/api/products?id=${id}`).then((res) => {
        setProductInfo(res.data)
      })
    }
  }, [id])

  const handleDelete = async () => {
    await axios.delete(`/api/products?id=${id}`)
    goBack()
  }

  return (
    <Layout>
      <h1 className="text-center">{`Do you really want to delete "${productInfo?.name}"?`}</h1>

      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={handleDelete}>Yes</button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  )
}

export default DeleteProductPage
