import { Client } from "tcore.js";

const client = new Client();

await client.InitRest();

console.log(client.asgard.modules);

// websocket logs
(async () => client.wsLogs())();
