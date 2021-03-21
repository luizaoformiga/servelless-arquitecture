import { ObjectID } from 'mongodb';
import createMongoClient from '../shared/mongoClient';

export default async function (context, request) {
  const { id } = request.params;
  const product = request.body || {};

  if (!id || !product) {
    context.response = {
      status: 400,
      body: 'Provide a product and product id on params',
    }
    return;
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Products = MongoClient.collection('products');

  try {
    const products = await Products.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: product },
    );
    closeConnectionFn();
    context.response = { status: 200, body: products };
  } catch (error) {
    context.response = {
      status: 500,
      body: 'Error on insert product',
    } 
  }
}