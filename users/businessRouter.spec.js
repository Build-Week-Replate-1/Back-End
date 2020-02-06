const supertest = require("supertest")

const server = require("../api/server")

const db = require("../database/dbconfig")

const hashFunction = require('../utils/hashFunction')

const testUser = {
    username: "business_test", 
    password: hashFunction("123"), 
    business_name: "Mr. SuperTest's Fried Chicken", 
    phone_number: "1234567894", 
    business_address: "1263 testing blvd", 
    type: "donor"
}

const badTestUser = {
    username: "business_test", 
    password: hashFunction("123"), 
    business_name: "Mr. SuperTest's Fried Chicken",  
    business_address: "1263 testing blvd", 
    type: "donor"
}

beforeAll(async () => {
    await db.seed.run()
})

describe("business model", () => {
test("register accepts username and password", async () => {
    const res = await supertest(server).post("/api/business/register")
        .send(testUser)
    expect(res.status).toBe(201)
});

test("if user is forgetting to add their number the registration will be unsuccessful", async () => {
    const res = await supertest(server).post("/api/business/register")
        .send(badTestUser)
    expect(res.status).toBe(500)
})

test("login of business seeded user is successful", async () => {
    const res = await supertest(server).post("/api/business/login")
        .send({username: "georgieporgie01", password:"123"})
    expect(res.status).toBe(200)
});

test("login of seeded user is unsuccessful if the password doesn't match what is stored in db", async () => {
    const res = await supertest(server).post("/api/business/login")
        .send({username:"georgieporgie01", password:"12"})
    expect(res.status).toBe(401)
});

test("login returns a token", async () => {
    const res = await supertest(server).post("/api/business/login")
        .send({username:"georgieporgie01", password:"123"})
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.token.length).toBeGreaterThan(0)
});

test("user can't be deleted without a token", async () => {
    const res = await supertest(server).delete("/api/business/delete")
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch("log in again")
})

test("user can't be updated without a token", async () => {
    const res = await supertest(server).put("/api/business/update")
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch("log in again")
})
})
