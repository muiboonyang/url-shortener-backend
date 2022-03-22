//server.js
const server = require("../server.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Seed Users", () => {
  it("POST /seeduser should seed users", async () => {
    const res = await requestWithSupertest.post("/seeduser");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });
});

describe("Short Urls - Redirect", () => {
  it("GET /:shortUrl should redirect users to long url", async () => {
    const res = await requestWithSupertest.get("/nIHDdCael");
    expect(res.status).toEqual(302);
    expect(res.redirect);
  });
});

describe("Short Urls - Edit Long Url", () => {
  it("POST /:shortUrl/update should update long url", async () => {
    const res = await requestWithSupertest.post("/nIHDdCael/update");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });
});

describe("Delete - All Users, All Urls, One Url", () => {
  it("POST /delete/allurl should delete all short and long urls", async () => {
    const res = await requestWithSupertest.post("/delete/allurl");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("POST /delete/alluser should delete all users", async () => {
    const res = await requestWithSupertest.post("/delete/alluser");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("POST /delete/nIHDdCael should delete its short and long urls", async () => {
    const res = await requestWithSupertest.post("/delete/nIHDdCael");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });
});
