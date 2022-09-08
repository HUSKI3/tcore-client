import { io, Socket } from "socket.io-client";

function log(...args: any[]) {
  console.log("[LOGGER]", ...args);
}

function logErr(...args: any[]) {
  console.log("[ERROR]", ...args);
}

class Asgards {
  modules: any[] = [];

  updateModules(modules: any[]) {
    this.modules = modules;
  }
}

export class Client {
  connected: boolean;
  URI: string = "http://localhost:8080";
  URIBackup: string = "0.0.0.0";
  PortBackup: number = 8080;
  asgard: Asgards;
  socket: Socket;

  constructor() {
    this.asgard = new Asgards();
    this.connected = false;
  }

  public async connectStatus() {
    const res = await fetch(this.URI);
    this.connected = res.status === 200 ? true : false;

    return this.connected;
  }

  public wsLogs() {
    this.socket = io(this.URI);
    const socket = this.socket;

    this.socket.on("connect", () => {
      log("connected");
      this.connected = true;
    });

    socket.on("connect_failed", logErr);
    socket.on("connect_error", logErr);
    socket.on("system", log);
  }

  public async InitRest() {
    var data = await this.getModules();
    var jsondata = await data.json();

    await this.connectStatus();

    this.asgard.updateModules(jsondata["data"]["data"]);
  }

  public async getModules(): Promise<Response> {
    const res = await fetch(`${this.URI}/list_asgard`);

    if (res.status !== 200) throw `URI returned ${res.status}`;

    return res;
  }

  public async sendRequest(body: { [key: string]: string }) {
    const res = await fetch(this.URI);

    return res;
  }

  public async tryConnect() {
    log(`Trying to connect to ${this.URI}`);

    const res = await fetch(this.URI);

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}
