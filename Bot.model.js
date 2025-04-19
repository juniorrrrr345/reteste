import mongoose from 'mongoose';

const botSchema = new mongoose.Schema({
  messageBienvenue: { type: String, default: 'Bienvenue sur notre bot !' },
  lienContact: String,
  lienCanal: String
});

export default mongoose.model('Bot', botSchema);
