require('dotenv').config(); //access to .env file
const { Client, GatewayIntentBits, ApplicationCommandOptionType, InteractionResponse, messageLink } = require('discord.js');

//gives bots permissions
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        
    ],
});

//indicates the bot is online
client.on('ready', (c) => {
    console.log(`${c.user.username} is online.`);


    //makes slash command for bot
    const guildId = '509134330165985280'
    const guild = client.guilds.cache.get(guildId)
    let commands 

    if (guild) {
        commands = guild.commands 
    } else { 
        commands = client.application?.commands
    }

    //slash wiki command bot options 
    commands?.create({
        name: 'wiki',
        description: 'Wiki options',
    })    

    //slash page command will output offical wiki page
    commands?.create({
        name: 'page',
        description: 'Offical Old School Runescape Wiki Page',
    })   
    
    //slash specific commands allows user to search for specific items/monsters/quest on wiki 
    commands?.create(
    {
        name: 'specific',
        description: 'Search for specific items/monsters/quest from the wiki from Discord!',
        options:
        [
            {
            name: 'item-enemy-quest',
            description: 'IMPORTANT: For items with multiple words use underscore. EXAMPLE: Twisted_bow',
            type: ApplicationCommandOptionType.String,
            required: true,
            },
        ],
    })  

});

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()){
            return
        }

        const { commandName, optionbs } = interaction

        if (commandName === 'wiki') {
            interaction.reply({
                content: 'Do you wish for the wiki ( /page ) or search for a ( /specific ) topic Adventurer?',
                ephemeral: true, //(if enabled command will only show for the user calling the commadn)
            })
        }

        if (commandName === 'page') {
            interaction.reply({
                content: 'https://oldschool.runescape.wiki/',
                // ephemeral: true, //(if enabled command will only show for the user calling the commadn)
            })
        }

        if (commandName === 'specific') {
            const specificItem = interaction.options.get('item-enemy-quest').value;
            interaction.reply('https://oldschool.runescape.wiki/' + specificItem)
        }

    })

    

//ability to read users messages and reply
 client.on('messageCreate', (message) => {

        //stop it from messaging other bots
        if (message.author.bot) {  
            return;
        }

        //bed time
        if(message.content === "Say GoodNight to Willy"){
            message.reply("GoodNight");
        }
    });


//bot login
client.login(process.env.TOKEN);