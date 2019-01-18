const Discord = require("discord.js");
const client = new Discord.Client();
const token = "XXXXX" //replace X's with bot token

client.on('ready', () => {
  console.log('connected');
});

client.on('error', console.error);

client.on('message', (msg) => {

    if(!msg.content.startsWith('!') || msg.author.bot || !msg.channel.guild) {
        return;
    }

    const args = msg.content.toLowerCase().split(' ');
    const command = args[0].substring(1);
    
    if(command === 'help') {
        msg.channel.send("**Bot commands:**\n\n`!addrole [@user] [rolename]` - *adds a role to a specific user*\n`!removerole [@user] [rolename]` - *removes a role from a specific user*\n!kick [@user]` - *kicks the user from the server*\n`!ban [@user]` - *bans the user from the server*")
    };

    if(command === 'addrole' || command === 'removerole') {
        if(!msg.channel.permissionsFor(msg.member).has("MANAGE_ROLES_OR_PERMISSIONS")) {
            return msg.channel.send("You don't have the correct permissions to do that")
        }
        const user = msg.mentions.users.first();
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                let role = msg.guild.roles.find(role => role.name === args[2]);
                if(!role) {
                    return msg.channel.send("Please give a valid role name")
                };
                if (member.roles.find("name", args[2])) {
                    if (command === 'addrole') {
                        msg.channel.send("User already has that role.")
                    } else {
                        member.removeRole(role).catch(console.error);
                        msg.channel.send("The role '" + args[2] + "' was removed from " + user.tag)
                    };
                } else {
                    if (command === 'addrole') {
                        member.addRole(role).catch(console.error);
                        msg.channel.send("The role '" + args[2] + "' was added to " + user.tag)
                    } else {
                        msg.channel.send("User does not have that role.")
                    }
                } return;
            } return msg.channel.send("Please mention a user who is a member of this server");
        } return msg.channel.send("Please mention a valid user");
    };

    if (command === 'kick') {
        if(!msg.channel.permissionsFor(msg.member).has("KICK_MEMBERS")) {
            return msg.channel.send("You don't have the correct permissions to do that")
        };
        const user = msg.mentions.users.first();
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                member.kick().then(() => {
                    msg.channel.send(user.tag + " was kicked by " + msg.author.username);
                    return;
                }).catch(err => {
                    msg.channel.send("User could not be kicked");
                    console.error(err);
                    return;
                }); 
            } else {
                msg.channel.send("Please mention a valid server member to kick");
            };
        } else {
            msg.channel.send("Please mention a valid user to kick");
        }; 
    };

    if (command === 'ban') {
        if(!msg.channel.permissionsFor(msg.member).has("BAN_MEMBERS")) {
            return msg.channel.send("You don't have the correct permissions to do that")
        };
        const user = msg.mentions.users.first();
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                member.ban().then(() => {
                    msg.channel.send(user.tag + " was banned by " + msg.author.username);
                    return;
                }).catch(err => {
                    msg.channel.send("User could not be banned");
                    console.error(err);
                    return;
                }); 
            } else {
                msg.channel.send("Please mention a valid server member to ban");
            };
        } else {
            msg.channel.send("Please mention a valid user to ban");
        }; 
    };
});

client.login(token);