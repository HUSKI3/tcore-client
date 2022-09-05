function log(...args: any[]) {
  console.log("[LOGGER]", ...args);
}

class Asgard {
  modules: any[] = [];

  updateModules(modules: any[]) {
    this.modules = modules;
  }
}

class Client {
  connected: boolean;
  URI: string = "http://localhost:8080";
  URIBackup: string = "0.0.0.0";
  PortBackup: number = 8080;
  asgard: Asgard;

  constructor() {
    this.asgard = new Asgard();
    this.connected = false;
  }

  public async InitRest() {
    var data = await this.getModules();
    var jsondata = await data.json();

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

// usage

const client = new Client();
