import mongoose from 'mongoose';

const statsUserSchema = new mongoose.Schema({
  id: String,
  username: String,
  first_name: String,
  last_name: String,
  language_code: String,
  lastUsed: { type: Date, default: Date.now }
});

export default mongoose.model('StatsUser', statsUserSchema);
