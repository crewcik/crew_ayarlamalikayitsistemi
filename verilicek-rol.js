const { MessageEmbed } = require('discord.js');
const crewData = require('quick.db');
const crew = require('../ayarlar.json')

module.exports = {
    name: 'verilicek-rol',
    aliases: 'v-rol',
    async execute (message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply(`Bu komutu sen kullanamazsın.`)
        }
        if (!args[0]) {
            return message.reply(`Kullanım: **${crew.prefix}verilicek-rol ayarla** & **${crew.prefix}verilicek-rol sıfırla** olarak kullanınız.`)
        }
        if (args[0] === "ayarla") {
            let verilicek_rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            if (!verilicek_rol) {
                return message.reply(`Lütfen bir rol belirtiniz.`)
            }

            crewData.set(`verilicek_rol_${message.guild.id}`, verilicek_rol.id)

            const crew_embed = new MessageEmbed()
            .setDescription(`Verilicek rolü ${verilicek_rol} olarak ayarlandı.`)
            .setColor('DARK_BLUE')
            message.reply({ embeds: [crew_embed] })
        }
        if (args[0] === "sıfırla") {
            let kontrol = crewData.fetch(`verilicek_rol_${message.guild.id}`)
            if (!kontrol) {
                return message.reply(`Verilicek rol zaten ayarlanmamış.`)
            }

            crewData.delete(`verilicek_rol_${message.guild.id}`)

            const crew_embed = new MessageEmbed()
            .setDescription(`Verilicek rol sıfırlandı.`)
            .setColor('DARK_BLUE')
            message.reply({ embeds: [crew_embed] })
        }
    }
}