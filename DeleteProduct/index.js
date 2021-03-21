import { ObjectID } from 'mongodb';
import createMongoClient from '../shared/mongoClient';

export default async function (context, request) {
  const { id } = request.params;

  if (!id) {
    context.response = {
      status: 400,
      body: 'Provide a product id on params',
    }
    return;
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Products = MongoClient.collection('products');

  try {
    await Products.findOneAndDelete({ _id: ObjectID(id) });
    closeConnectionFn();

    context.response = {
      status: 200,
      body: 'Product deleted successfully!',
    }
  } catch (error) {
    context.response = {
      status: 500,
      body: 'Error on delete product ' + id,
    }
  }
}