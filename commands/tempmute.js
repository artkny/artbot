const Discord = require("discord.js")
const ms = require("ms")

module.exports.run = async (bot, message, args) => {



    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Не удалось найти пользователя");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Я не могу дать мут ему!");
    let muterole = message.guild.roles.find(`name`, "Muted");

    if(!muterole){
        try{
            muterole = await message.guild.createrole({
                name: "Muted",
                color: "#220303",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.owerWritePermission(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
let mutetime = args[1];
if(!mutetime) return message.reply("Вы не указали время!")

await(tomute.addRole(muterole.id));
message.reply(`<@${tomute.id}> Был замучен на ${ms(mutetime)} Миллисекунд`)

setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> Был отмучен!`);
}, ms (mutetime));

}

module.exports.help = {
    name : "tempmute"
}