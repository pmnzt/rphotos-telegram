const TelegramBot = require('node-telegram-bot-api');
const express = require('express'); 
const axios = require('axios');
const app = express();

app.get('/', (req, res) => { 
  res.sendStatus(200) 
}); 

app.listen(3000);

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id; 
  const user_id = msg.from.id;
  const source = "https://source.unsplash.com/random/?" + msg.text 
  // send a message to the chat acknowledging receipt of their message
  // bot.sendPhoto(chatId, "https://random.imagecdn.app/500/" + (Math.floor(Math.random() * 500) + 150)); 

  
  bot.sendPhoto(chatId, await getBuffer('https://source.unsplash.com/random')) 
  
}); 

async function getBuffer(url) {
   return await axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary'))
  
}