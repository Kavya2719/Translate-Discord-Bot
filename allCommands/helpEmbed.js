import fs from "fs";

function helpEmbed(username){
    const obj = JSON.parse(fs.readFileSync("./allCommands/allCommands.json", "utf-8"));
    
    const embed = {
        color: 0x00FFFF,
        title: `Hello ${username} !!`,
        description: 'Here\'s the list of all my commands that anyone can use in this server. Have Fun !!\n-------------------------',
        fields: obj.allCommands,
        thumbnail: {
            url: `https://i.pinimg.com/originals/ce/56/74/ce567497ebe5f99a1ce2232275554b5b.gif`,
            height: 0,
            width: 0
        },
        footer: { 
            text: `developed by Kavya Gupta`, 
            icon_url: `https://cdn.discordapp.com/avatars/766943885284081665/efada64abbdeb1ac19f5e4080a24f520.webp`
        }
    };

    return embed;
}

export { helpEmbed };