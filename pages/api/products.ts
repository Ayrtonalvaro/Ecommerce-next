import { Product } from "@/models/Product";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req: NextApiRequest, res:NextApiResponse) {
  const {method} = req
  await mongooseConnect()
  mongoose.Promise = clientPromise
  if (method === 'POST') {

    try {
      const { name, description, price } = req.body
      const productDoc = await Product.create({
        name,
        description,
        price,
      })
      res.json(productDoc)
    } catch (error) {
      res.status(500).end()
    }

    
  }
  
}