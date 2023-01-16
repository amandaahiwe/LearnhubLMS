const request = require("supertest");
const app = require("../app.js");

describe("POST /user", () => {
  // register user
  describe("given fullname, email and password", () => {
    test("should respond with 200 status code", async () => {
      const res = await request(app).post("/user/register").send({
        fullname: "fullname",
        email: "mail@mail.com",
        password: "password",
      });
      expect(res.statusCode).toEqual(201);
    });
  });
});
