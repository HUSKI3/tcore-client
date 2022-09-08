import {Client} from '../src/index'

const client = new Client();


test("Is the API up?", async () => {
  await client.InitRest()
  expect((await fetch(client.URI)).status === 200).toBe(true);
});

test("connected attribute", () => {
  expect(client.connected).toBe(true);
});