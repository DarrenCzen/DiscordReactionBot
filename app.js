const discord = require("discord.js");

const TOKEN = "Insert Token Here";
const keyword = "Important Keyword Here";

//Create and log in client
const client = new discord.Client();
client.login(TOKEN).then(() => {
    console.log(`Logged in as ${client.user.tag}`);
    registerListeners();
}).catch(reason => {
    console.log(`Problem while logging in bot: ${reason}`);
    process.exit();
});

function registerListeners() {
    let emoji = '🛒';
    client.on("message", message => {
        console.log(message.content);
        if (message.author.username === keyword) {
            message.react(emoji).then(() => {
                console.log("Reacted to message")
            }).catch(reason => {
                console.log(`Problem while reacting to message: ${reason}`);
            });
        }
    });
}

const cleanupFunc = async (code) => {
    await client.destroy();
    process.exit(code);
};

process.once("exit", cleanupFunc);
process.once("SIGINT", cleanupFunc);
process.once("SIGTERM", cleanupFunc);
process.once("unhandledRejection", (async (reason, promise) => {
    console.log("Unhandled promise rejection at: Promise", promise, "reason:", reason);
    await cleanupFunc(0);
}));
process.once("uncaughtException", async error => {
    console.log(error.stack);
    await cleanupFunc(0);
});
