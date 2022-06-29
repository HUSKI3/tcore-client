const connect = require("../dist/tcore-client.cjs").connect


// connect() 
test("connects with a wrong endpoint", () => {
  expect(connect()).toBe(false);
});

// this test really depends on the server being online
test("connects with default endpoint", () => {
  expect(connect()).toBe(false||true);
});