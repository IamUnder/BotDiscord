const Discord = require("discord.js");
// const config = require("./config.json");
require('dotenv').config();

const client = new Discord.Client();
const PREFIX = '$';

//Cuando este el bot operativo realizara estas operaciones.
client.once('ready', () => {

    // Console log para que sea mas discreto su arranque
    console.log('Bot encendido');

    // Script para que al iniciar avise de las novedades (por implementar)

});

client.on('message', async message => {
    // Comprobacion de que el mensaje empieza con el prefijo
    if (message.content.startsWith(PREFIX)) {
        const input = message.content.slice(PREFIX.length).trim().split(' ');
        const command = input.shift().toLowerCase();
        const commandArgs = input.join(' ').toLowerCase();

        if (command === 'help') {
            message.channel.send('Que help ni que help, el bot lo ha hecho @IamUnder#7093 habla con el a mi olvidame')
        } else if (command === 'pp') {
            if (!commandArgs.length) {
                message.reply(' necesito que me des el nombre de alguno de estos paletos.')
            } else {
                if (commandArgs === 'rodri') {
                    message.channel.send('Yo no conozco a ningun Rodri.');
                } else if (commandArgs === 'rorri') {
                    message.channel.send('El gran inventor de la build de senna.')
                } else if (commandArgs === 'antonio') {
                    message.channel.send('El calvito favorito del server.')
                } else if (commandArgs === 'castaño') {
                    message.channel.send('Fantasioso de las lolis del fate.')
                } else if (commandArgs === 'moises') {
                    message.channel.send('Moises? Mi puto padre')
                } else if (commandArgs === 'under' || commandArgs === 'jorge') {
                    message.channel.send('El gordito marica del TFT.')
                } else if (commandArgs === 'andrea') {
                    message.channel.send('La egirl del servidor.')
                } else if (commandArgs === 'sergio') {
                    message.channel.send('Mucha polla y abdominales obviamnete.')
                } else if (commandArgs === 'joni') {
                    message.channel.send('Estamos trabajando en algo relevante de el y en poder poner sus twitts' + `¯\_(ツ)_/¯.`)
                } else {
                    message.reply('no se de quien me hablas, deberias de conocer mas el lore de este discord.')
                }
            }
        } else {
            // Si el comando no existe se lo comunica al usuario
            message.reply(' el comando que pretendes usar no funciona pringado.')
        }

    }
})

client.login(process.env.BOT_TOKEN);