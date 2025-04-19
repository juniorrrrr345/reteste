import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  prices: [{ gram: String, price: Number }],
  image: String,
  video: String
});

export default mongoose.model('Product', productSchema);
