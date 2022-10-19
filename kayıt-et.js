const { MessageEmbed } = require('discord.js')
const crewData = require('quick.db')
const crew = require('../ayarlar.json')

module.exports = {
    name: 'kayıt',
    aliases: 'register',
    async execute (message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply(`Bu komutu **YÖNETİCİ** kullanabilir.`)
        }

        let verilicek_rol = crewData.fetch(`verilicek_rol_${message.guild.id}`)
        let alınacak_rol = crewData.fetch(`alınacak_rol_${message.guild.id}`)

        if (!verilicek_rol) return message.reply(`Verilicek rol ayarlanmamış.`)
        if (!alınacak_rol) return message.reply(`Alınacak rol ayarlanmamış.`)

        let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let isim = args[1]
        let yaş = args[2] 

        if (!kullanıcı) return message.reply(`Lütfen bir kullanıcı belirtin.`)
        if (!isim) return message.reply(`Lütfen bir isim belirtin.`)
        if (!yaş) return message.reply(`Lütfen bir yaş belirtin.`)

        const crew_embed = new MessageEmbed()
        .setDescription(`${kullanıcı} başarıyla **• ${isim} | ${yaş}** olarak kayıt işlemi gerçekleşti.`)
        .setColor('DARK_BLUE')
        message.reply({ embeds: [crew_embed] })
        kullanıcı.roles.add(verilicek_rol)
        kullanıcı.roles.remove(alınacak_rol)
        kullanıcı.setNickname(`• ${isim} | ${yaş}`)
    }
}