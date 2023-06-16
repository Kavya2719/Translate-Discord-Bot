import { config } from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { helpEmbed, translateText, initialiseConversionList, isValidLanguage, makeEmbed } from '../allCommands/index.js';

config();
const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });
const TOKEN = process.env.DISCORDJS_BOT_TOKEN;
const prefix = '.';

client.login(TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // initialising Language to ISO code conversion list
  initialiseConversionList();
});

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;

    const msg = message.content.toLowerCase();
    console.log(msg);

    const cmd2 = "bot, say hii to"; 
    let part1 = msg.substring(0,15);

    // help command
    if(message.content === `<@${client.user.id}>`){
      const embed = helpEmbed(message.author.username);
      message.reply({ embeds: [embed] }); return;
    }

    // Fun command 1
    if(msg === 'hello' || msg === 'hii' || msg === 'heya'){
      message.reply(msg + " " + message.author.username.toLowerCase()); return;
    }

    // Fun command 2
    if(cmd2.substring(0,12) === msg){
      message.reply("tera naukar nahi hu!!");
      message.channel.send("```\n#Roasted_By_a_Bot\n```"); return;
    }

    // Fun command 3
    if(part1 === cmd2){
      let part2 = "";
      for(let i=16; i<msg.length && msg[i] != " "; i++) part2 += msg[i];

      // subcommand
      if(part2 === ""){
        message.reply("ye to bta kisse hello bolu"); return;
      }

      let reply = "Konichiwa ";

      if(part2 === "sidharth") reply += "<@294445510671073282>-san.";
      else if(part2 === "siddharth") reply += "<@351257626392395786>-san.";
      else if(part2 === "ellie") reply += "<@811206890443898901>-chan.";
      else for(let i=16; i<msg.length; i++) reply += msg[i];

      message.channel.send(reply); return;
    }

    // Prefix commands
    if(msg[0] === prefix){
      try{
        // checking for command name
        let ind = 2;
        if(msg.substring(1,10) === 'translate') ind = 10;

        // seperator
        if(msg[ind++] !== ' ') throw error;

        // checking for language input
        let language = "";
        for(; ind < msg.length && msg[ind] != ' '; ind++) language += msg[ind];
               
        const code = isValidLanguage(language);
        console.log(code);
        if(code == false) throw error;

        // seperator
        if(ind >= msg.length || msg[ind++] !== ' ') throw error;

        // text
        const text = msg.substring(ind, msg.length);
        if(text == "") throw error;

        // translate text
        const embed = await translateText(text, code, message.author);
        message.reply({ embeds: [embed] }); return;
      }catch(error){
        const desc = 'Help section for how to translate (to be implemented later)';
        const embed = makeEmbed(desc, message.author);
        message.channel.send({ embeds: [embed] }); return;
      }
    }
});