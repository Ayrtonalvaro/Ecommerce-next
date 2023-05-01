import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

const products = () => {
  return (
    <Layout>
      <Link className='bg-green-600 rounded-md text-white py-1 px-2' href={'/products/newProduct'} >Add new product </Link>
    </Layout>
  )
}

export default products
