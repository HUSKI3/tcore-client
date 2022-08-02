/**
 * Connect to TCore using this function
 * @param {string?} endpoint - The API endpoint to connect to. Leaving empty will connect to the tcore endpoint on the local device OR the dev server
 * @return {boolean} A flag with the return status
 */
export function connect(endpoint: string = "wip"): boolean {
  // WIP
  console.log("Hi Mom!");

  return false;
}

// Extend functionality ;P
let log: Function = function() {
  return Function.prototype.bind.call(console.log, console, "[Logger]:");
}();

// Pronounced T-Curry
class tcuri {
head!:     string
body!:     string
tail!:     string
args?:      Map<string, any>
final?:    string

constructor(data: Partial<tcuri>) {
  Object.assign(this, data);
  for (var _ of [
          ["^(http|https):\/\/",this.head], 
          [".*.",this.body], 
          [".*.",this.tail]
      ])
      {
        this._check_exp(_[0], _[1]);
      }
  this._init_cmps();
}
_init_cmps(){
  let args = "";
  if (this.args){
    for (var arg of this.args){
      log(arg);
    }
  }
  this.final = `${this.head}${this.body}:${this.tail}`;
}
_check_exp(regexp: string, against: string){
  let hr = new RegExp(regexp);
  if (hr.test(against)) {
    log(`✔ ${against} is valid`) 
  } else {
    throw Error(`✘ ${against} verification failed`)
  }
}
}

//let t = new tcuri({
//  "head": "https://d",
//  "body": "d",
//  "tail": "d",
//});

interface Request {
  hook:     string
  args: {
    action: string
    func:   string
    data:   string
  }
}

interface AsgardContact {
  req:    Request | null
  params: Array<string> | null
}

class TClient{
  uri?: tcuri;
  constructor(data: {"uri": tcuri}){
    Object.assign(this, data);
  };

  send(r: Required<AsgardContact>) {
    /**  Send cases
      This let's us easily and quickly decide what sort
      of request to send. This is determended by the 
      @param {r.req} parameter. 
      
      r : AsgardContact -- This is an interface that 
      holds all our request data. 
    */
    switch (r.req){
      /** 
       * Consider that the request is null.
       * We will default to just the index 
       * route of Asgard.
      */
      case null:
        log("Request is empty. Returning index");
        return do_request(this.uri?.final);
    }
  }
}

async function do_request(uri?: string, params?: Map<string, string>) {
  if (!uri){
    throw new Error(`[DoReq] URI is not valid?`)
  }
  try {
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();

    console.log('Response:', JSON.stringify(result, null, 4));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}



///////////////////////////

let client = new TClient(
  {
    "uri": new tcuri({
      "head": "http://",
      "body": "localhost",
      "tail": "27070",
    })
  }
);

// Let's try to request tcore information
let info = () => {
  let cr: AsgardContact = ({
    req: null,
    params: null
  })
  //log(cr)
  client.send(cr)
}

info();