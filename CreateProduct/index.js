import createMongoClient from '../shared/mongoClient';

export default async function (context, request) {
  const product = request.body || {};

  if (product) {
    context.response = {
      status: 400,
      body: 'Product is required',
    }
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Products = MongoClient.collection('products');

  try {
    const products = await Products.insert(product);
    closeConnectionFn();
    context.response = { status: 201, body: products.ops[0] };
    
  } catch (error) {
    context.response = {
      status: 500,
      body: 'Error on insert product',
    }
  }
}