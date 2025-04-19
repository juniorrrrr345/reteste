
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Telegraf } from 'telegraf';

import Product from './product.model.js';
import Bot from './Bot.model.js';
import StatsUser from './StatsUser.model.js';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connecté à MongoDB');
}).catch((err) => {
  console.error('Erreur MongoDB :', err);
  process.exit(1);
});

bot.start(async (ctx) => {
  const from = ctx.from;

  let configBot = await Bot.findOne();
  if (!configBot) {
    configBot = new Bot();
    await configBot.save();
  }

  const userData = {
    id: String(from.id),
    username: from.username || '',
    first_name: from.first_name || '',
    last_name: from.last_name || '',
    language_code: from.language_code || ''
  };

  await StatsUser.findOneAndUpdate(
    { id: userData.id },
    { ...userData, lastUsed: new Date() },
    { upsert: true }
  );

  ctx.reply(configBot.messageBienvenue);
});

bot.on('text', (ctx) => {
  if (!ctx.message.text.startsWith('/')) {
    ctx.reply("Commande non reconnue. Utilise /start pour commencer.");
  }
});

bot.launch();
console.log('Bot lancé avec Telegraf');
