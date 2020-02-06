const supertest = require("supertest")

const server = require("../api/server")

const db = require("../database/dbconfig")

const hashFunction = require('../utils/hashFunction')
const testUser = {username: "test", password: hashFunction("123"), volunteer_name: "Mr. SuperTest", phone_number: "1234567894"}


describe("volunteer model", () => {
    test("register accepts username and password", async () => {
        const res = await supertest(server).post("/api/volunteer/register")
            .send({username: "test", password: hashFunction("123"), volunteer_name: "Mr. SuperTest", phone_number: "1234567894"})
        expect(res.status).toBe(201)
    });

    test("if user is forgetting to add their number the registration will be unsuccessful", async () => {
        const res = await supertest(server).post("/api/volunteer/register")
            .send({username: "test1", password: hashFunction("123"), phone_number: "1234567894"})
        expect(res.status).toBe(500)
    })

    test("login of seeded user is successful", async () => {
        const res = await supertest(server).post("/api/volunteer/login")
            .send({username: "jake", password: "123"})
        expect(res.status).toBe(200)
    });

    test("login of seeded user is unsuccessful if the password doesn't match what is stored in db", async () => {
        const res = await supertest(server).post("/api/volunteer/login")
            .send({username:"jake", password:"12"})
        expect(res.status).toBe(401)
    });

    test("login returns a token", async () => {
        const res = await supertest(server).post("/api/volunteer/login")
            .send({username:"jake", password:"123"})
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.token.length).toBeGreaterThan(0)
    });

    test("user can't be deleted without a token", async () => {
        const res = await supertest(server).delete("/api/volunteer/delete")
        expect(res.status).toBe(401)
        expect(res.body.message).toMatch("log in again")
    })

    test("user can't be updated without a token", async () => {
        const res = await supertest(server).put("/api/volunteer/update")
        expect(res.status).toBe(401)
        expect(res.body.message).toMatch("log in again")
    })
})
