require('dotenv').config();

const Discord = require('discord.js');
const open = require('open');
const bot = new Discord.Client();
const fs = require('fs');
const request = require(`request`);

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);



bot.on('ready', () => {

  console.info(`Logged in as ${bot.user.tag}!`);
  bot.channels.cache.get("CHANNEL").send("-----anonymous bot online-----");

});

var guilds;
var channel;



bot.on('message', msg => {


    if (msg.channel.type == "dm" && msg.author.id != "CHANNEL" && msg.attachments.size == 0) {

      
        var messageCon = msg.content.toString();

        msg.author.send("message sent: " + messageCon);

        bot.channels.cache.get("CHANNEL").send(messageCon);

        dmId = msg.author.username

        let messageAuth = messageCon + '  -  ' + dmId
        let messageAuthNL = messageAuth + "\n"

        console.log(messageAuth)

        fs.appendFile('messagelog.txt', messageAuthNL, (err) => {
          if (err) {
              throw err;
          }
          console.log("----message logged----");
        });

 } 
 
 
 else if (msg.channel.type == "dm" && msg.author.id != "CHANNEL" && msg.attachments.size > 0){


    var messageCon = msg.content.toString();

    msg.author.send("message sent: " + messageCon);

    if (msg.content) {
      bot.channels.cache.get("CHANNEL").send(messageCon);
    }

    dmId = msg.author.username

    let messageAuth = messageCon + ' ; ' + '[attachment]' + '  -  ' + dmId
    let messageAuthNL = messageAuth + "\n"

    console.log(messageAuth)

    fs.appendFile('messagelog.txt', messageAuthNL, (err) => {
      if (err) {
          throw err;
      }
      console.log("----message logged----");
    });

    msg.attachments.forEach(attachment => {
      const ImageLink = attachment.proxyURL;
      bot.channels.cache.get("CHANNEL").send(ImageLink)
    });


 }
})

