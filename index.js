// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

const axios = require("axios");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("peela sexy!");
  } else if (commandName === "codeforces") {
    let data = [];
    let replyMsg = "";
    await axios.get("https://kontests.net/api/v1/all").then((res) => {
      console.log(res);
      data = res.data;
    });

    data.forEach((item, index) => {
      if (index < 8) {
        replyMsg += `${item.name} - ${item.url}\n`;
      }
    });

    console.log(replyMsg);
    await interaction.reply(replyMsg);
  } else if (commandName === "server") {
    await interaction.reply("Server info.");
  } else if (commandName === "user") {
    await interaction.reply("User info.");
  }
});

client.login(token);
