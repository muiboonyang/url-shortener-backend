//test.js

const server = require("../server.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Short Urls", () => {
  it("POST /seeduser should seed users", async () => {
    const res = await requestWithSupertest.post("/seeduser");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("muiboonyang");
  });
});

// describe("Short Urls", () => {
//   it("GET /shortUrl should show all shortUrl", async () => {
//     const res = await requestWithSupertest.get("/nIHDdCael");
//     expect(res.status).toEqual(200);
//     expect(res.type).toEqual(expect.stringContaining("json"));
//     expect(res.body).toHaveProperty("nIHDdCael");
//   });
// });

// it("GET /users/:id should show a user", async () => {
//   const res = await requestWithSupertest.get("/users/3");
//   expect(res.statusCode).toEqual(200);
//   expect(res.body).toHaveProperty("user3");
// });
