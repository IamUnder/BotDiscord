const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

//Cuando este el bot operativo realizara estas operaciones.
client.on('ready', () => {

    var generalChannel = client.channels.cache.get("829262758306381856");

    generalChannel.send("Bot operativo BipBipBop")

});

client.on('message', message => {
    if (message.content === "Castaño") {
        message.channel.send('Vaya marica de pelo largo');
    }
    if (message.content === "Antonio") {
        message.channel.send('Su calva me impide escribir con claridad');
    }
})

client.login(config.BOT_TOKEN);