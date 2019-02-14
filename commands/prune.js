module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Недостаточно прав на использование команды!')

    let count = args[0] || 1000
    await message.delete()
    await message.channel.bulkDelete(count)
}

module.exports.help = {
    name: 'prune'
}