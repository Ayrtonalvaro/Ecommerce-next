import { Product } from '@/models/Product'
import clientPromise from '@/lib/mongodb'
import { mongooseConnect } from '@/lib/mongoose'
import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  await mongooseConnect()
  mongoose.Promise = clientPromise

  if (method === 'GET') {
    try {
      if (req.query?.id) {
        res.status(200).json(await Product.findOne({ _id: req.query.id }))
      } else {
        res.status(200).json(await Product.find())
      }
    } catch (error) {
      res.status(500).end()
    }
  }

  if (method === 'POST') {
    try {
      const { name, description, price } = req.body
      const productDoc = await Product.create({
        name,
        description,
        price,
      })
      res.status(200).json(productDoc)
    } catch (error) {
      res.status(500).end()
    }
  }

  if (method === 'PUT') {
    try {
      const { name, description, price, _id } = req.body
      await Product.updateOne({ _id }, { name, description, price })
      res.json(true)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      try {
        await Product.deleteOne({ _id: req.query?.id })
        res.status(200).json(true)
      } catch (error) {
        console.log(error)
        res.status(500).end()
      }
    }
  }
}
