const { MessageEmbed } = require('discord.js');
const crewData = require('quick.db');
const crew = require('../ayarlar.json')

module.exports = {
    name: 'alınacak-rol',
    aliases: 'a-rol',
    async execute (message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply(`Bu komutu sen kullanamazsın.`)
        }
        if (!args[0]) {
            return message.reply(`Kullanım: **${crew.prefix}alınacak-rol ayarla** & **${crew.prefix}alınacak-rol sıfırla** olarak kullanınız.`)
        }
        if (args[0] === "ayarla") {
            let alınacak_rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            if (!alınacak_rol) {
                return message.reply(`Lütfen bir rol belirtiniz.`)
            }

            crewData.set(`alınacak_rol_${message.guild.id}`, alınacak_rol.id)

            const crew_embed = new MessageEmbed()
            .setDescription(`Alınacak rolü ${alınacak_rol} olarak ayarlandı.`)
            .setColor('DARK_BLUE')
            message.reply({ embeds: [crew_embed] })
        }
        if (args[0] === "sıfırla") {
            let kontrol = crewData.fetch(`alınacak_rol_${message.guild.id}`)
            if (!kontrol) {
                return message.reply(`Alınacak rol zaten ayarlanmamış.`)
            }

            crewData.delete(`alınacak_rol_${message.guild.id}`)

            const crew_embed = new MessageEmbed()
            .setDescription(`Alınacak rol sıfırlandı.`)
            .setColor('DARK_BLUE')
            message.reply({ embeds: [crew_embed] })
        }
    }
}