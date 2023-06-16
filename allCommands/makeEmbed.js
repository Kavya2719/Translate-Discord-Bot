function makeEmbed(desc, author){
    const embed = {
        color: 0x00FFFF,
        description: desc,
        author: {
            name: `${author.username}`, 
            icon_url: `${author.displayAvatarURL()}`
        },
    }
    return embed;
}

export { makeEmbed };