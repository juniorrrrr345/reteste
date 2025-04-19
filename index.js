
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';

import Product from './product.model.js';
import Bot from './Bot.model.js';
import StatsUser from './StatsUser.model.js';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('Erreur : BOT_TOKEN non défini dans le fichier .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connecté à MongoDB');
}).catch((err) => {
  console.error('Erreur de connexion MongoDB :', err);
  process.exit(1);
});

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  let configBot = await Bot.findOne();
  if (!configBot) {
    configBot = new Bot();
    await configBot.save();
  }

  const userData = {
    id: msg.from.id,
    username: msg.from.username || '',
    first_name: msg.from.first_name || '',
    last_name: msg.from.last_name || '',
    language_code: msg.from.language_code || ''
  };

  await StatsUser.findOneAndUpdate(
    { id: userData.id },
    { ...userData, lastUsed: new Date() },
    { upsert: true }
  );

  bot.sendMessage(chatId, configBot.messageBienvenue);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(chatId, "Commande non reconnue. Utilise /start pour commencer.");
  }
});
