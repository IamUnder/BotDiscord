const Discord = require("discord.js");
// const config = require("./config.json");
require('dotenv').config();
const { Client } = require('pg');

const client = new Discord.Client();
const PREFIX = '$';
const POINTS = '300';
const VERSION = '0.2 pre-alpha';


const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

//Cuando este el bot operativo realizara estas operaciones.
client.once('ready', () => {

    // Console log para que sea mas discreto su arranque
    console.log('Bot encendido');
    db.connect();

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
                    message.channel.send("Estamos trabajando en algo relevante de el y en poder poner sus twitts ¯_(ツ)_/¯.")
                } else {
                    message.reply('no se de quien me hablas, deberias de conocer mas el lore de este discord.')
                }
            }
        } else if (command === "me") {
            // Comando que te dice los puntos que tienes e informacion sobre ti
            let find = false;
            let points;

            // Buscamos en la base de datos
            db.query('SELECT * FROM users;', (err, res) => {
                if (err) throw err;
                for (let row of res.rows || find) {
                    if (row.iduser == message.author.id) {
                        console.log('El valor del punto del array es ' + row.iduser);
                        console.log('El valor de la id del usuario es ' + message.author.id);
                        console.log('El usuario tiene ' + row.points);
                        find = true;
                        points = row.points;
                    }
                }
                // Damos una respuesta segun hayamos o no registrado el usuario
                if (find) {
                    message.reply('te encontre si que estas registrado y tus puntos son: ' + points)
                } else {
                    message.reply('Deberias de resgistrarte si quieres que sepa algo de ti.'+
                    '\n Puedes usar el comando \`$r\` para darte de alta en el sistema y recibir tus primeras monedas')
                }
            });
            

        } else if (command === "r" || command === 'register') {
            // Comando para registrarte para la ludopatia

            db.query("INSERT INTO users values('"+ message.author.id +"',"+ POINTS +")", (err, res) => {
                if (err) message.reply('ya estas registrado si quieres saber tus puntos usa \`$me\`');
                if (res) message.reply('te has registrado correctamente con \`$me\` podras ver tus puntos.')
            });

        } else if (command === 'version' || command === 'v') {
            message.channel.send('La version actual del bot es la: ' + VERSION)
        } else if (command === 'game' || command === 'g') {
            // Comando de minijuego implementado para ganar moneditas ricas
            if (!commandArgs.length) {
                message.reply(' necesito que me digas el numero con el que quieres jugar.')
            } else {
                if (commandArgs === 'info') {
                    message.channel.send('Pasame un numero entre 0 y 10, yo generare uno y si ambos coincidimos te llevas 50 moneditas');
                } else{
                    let v = Math.random()*10;
                    if (commandArgs == v.toFixed()) {
                        message.reply('¡has acertado, que suerte tienes!')

                        // Sumamos las monedas por ganar
                        db.query("update users set points=points+50 where iduser='"+ message.author.id +"'; ", (err, res) => {
                            if (err) throw err;
                        });
                    }else{
                        message.reply('oh que pena fallaste, el valor era '+ v.toFixed())
                    }
                }
            }
        } else if (command === 'test') {
            // Comando de testing y pruebas
            message.channel.send(message.author.id)
        } else {
            // Si el comando no existe se lo comunica al usuario
            message.reply(' el comando que pretendes usar no funciona pringado.')
        }

    }
})

client.login(process.env.BOT_TOKEN);