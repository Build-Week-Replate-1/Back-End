const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbconfig")
//yarn test ./requests/food_requests_router.spec.js

const businesstoken = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJnZW9yZ2llcG9yZ2llMDEiLCJidXNpbmVzc19uYW1lIjoiR2VvcmdpZSBQb3JnaWUncyIsInR5cGUiOiJkb25vciIsImlhdCI6MTU4MTAyOTI1MywiZXhwIjoxNTgxMDMyODUzfQ.RvhBbM8E6L8lBKtcYt-SMmGLB-4pm2Oq1eCPLXoxPDc"}
const volunteertoken = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqYWtlIiwidm9sdW50ZWVyX25hbWUiOiJKYWNvYiBDYWx2aW5vIiwiaWF0IjoxNTgxMDMxNDcxLCJleHAiOjE1ODEwMzUwNzF9.AluSv_WcHta_GfHTmg6O4cejm2l7au94vAVuEzoHH3s"}
const charitytoken = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmZWVkVVNBIiwiYnVzaW5lc3NfbmFtZSI6IkZlZWRpbmcgQW1lcmljYSBTb3V0aGVhc3QiLCJ0eXBlIjoiY2hhcml0eSIsImlhdCI6MTU4MTAyODI4MywiZXhwIjoxNTgxMDMxODgzfQ.3OFjZLNl7hFKh5Af0AMnM1stqu5FN_YQrvhz5Wui8Zg"}

describe("food_requests_router", ()=> {
    test("does /all return all requests?", async () =>{
        const res = await supertest(server).get("/api/requests/all")
        .set('Accept', 'application/json')
        .set({ "token": businesstoken.token, Accept: 'application/json' })
        expect(res.status).toBe(200)
    })

    test("does /pending only return pending requests?", async () =>{
        const res = await supertest(server).get("/api/requests/all")
        .set('Accept', 'application/json')
        .set({ "token": businesstoken.token, Accept: 'application/json' })
        expect(res.status).toBe(200)
        expect(res.body[0].pending).toBe("true")
    })

    test("does /business/me return any requests it shouldn't if its a volunteer token", async () =>{
        const res = await supertest(server).get("/api/requests/business/me")
        .set('Accept', 'application/json')
        .set({ "token": volunteertoken.token, Accept: 'application/json' })
        expect(res.status).toBe(401)
        expect(res.body.message).toBe("only businesses can acces this if you are a volunteer you can access your pickup requests at /api/requests/volunteer/me")
    })

    test("does /business/me return all requests?", async () =>{
        const res = await supertest(server).get("/api/requests/business/me")
        .set('Accept', 'application/json')
        .set({ "token": businesstoken.token, Accept: 'application/json' })
        expect(res.status).toBe(200)
    })

    test("does /volunteer/me return any requests it shouldn't if its a business token", async () =>{
        const res = await supertest(server).get("/api/requests/volunteer/me")
        .set('Accept', 'application/json')
        .set({ "token": businesstoken.token, Accept: 'application/json' })
        expect(res.status).toBe(401)
        expect(res.body.message).toBe("only volunteers can acces this if you are a business you can access your pickup requests at /api/requests/business/me")
    })

    test("does /volunteer/me return all requests?", async () =>{
        const res = await supertest(server).get("/api/requests/volunteer/me")
        .set('Accept', 'application/json')
        .set({ "token": volunteertoken.token, Accept: 'application/json' })
        expect(res.status).toBe(200)
    })

    test("does /add work without a token it better not", async ()=> {
        const res = await supertest(server).post("/api/requests/add")
            .set('Accept', 'application/json')
            .send({
                type: "chicken wings",
                amount: "7 pounds",
                pickup_time: "February 6th 2020, 4:10:06 pm",
            })
            expect(res.status).toBe(401)
    })

    test("does /add work as a volunteer? It shouldn't!", async ()=> {
        const res = await supertest(server).post("/api/requests/add")
            .set('Accept', 'application/json')
            .set({ "token": volunteertoken.token, Accept: 'application/json' })
            .send({
                type: "chicken wings",
                amount: "7 pounds",
                pickup_time: "February 6th 2020, 4:10:06 pm",
            })
            expect(res.status).toBe(401)
    })

    test("does /add work as a type donor business? It should!", async ()=> {
        const res = await supertest(server).post("/api/requests/add")
            .set('Accept', 'application/json')
            .set({ "token": businesstoken.token, Accept: 'application/json' })
            .send({
                type: "chicken wings",
                amount: "7 pounds",
                pickup_time: "February 6th 2020, 4:10:06 pm",
            })
            expect(res.status).toBe(201)
    })

    test("does /add work as a type charity business? It shouldn't!", async ()=> {
        const res = await supertest(server).post("/api/requests/add")
            .set('Accept', 'application/json')
            .set({ "token": charitytoken.token, Accept: 'application/json' })
            .send({
                type: "chicken wings",
                amount: "7 pounds",
                pickup_time: "February 6th 2020, 4:10:06 pm",
            })
            expect(res.status).toBe(401)
    })
    //update food requests
    test("does /update work without a token it better not", async ()=> {
        const res = await supertest(server).put("/api/requests/update/1")
            .set('Accept', 'application/json')
            .send({
                type: "chicken wings",
                amount: "7 pounds",
                pickup_time: "February 6th 2020, 4:10:06 pm",
            })
            expect(res.status).toBe(401)
    })

    test("does /update work as a volunteer? It should!", async ()=> {
        const res = await supertest(server).put("/api/requests/update/1")
            .set('Accept', 'application/json')
            .set({ "token": volunteertoken.token, Accept: 'application/json' })
            .send({
                type: "chicken wings",
                amount: "7 pounds",
                pickup_time: "February 6th 2020, 4:10:06 pm",
            })
            expect(res.status).toBe(200)
    })

    test("does /update work as a type donor business? It should!", async ()=> {
        const res = await supertest(server).put("/api/requests/update/1")
            .set('Accept', 'application/json')
            .set({ "token": businesstoken.token, Accept: 'application/json' })
            .send({
                type: "chicken wings",
                amount: "7 pounds",
                pickup_time: "February 6th 2020, 4:10:06 pm",
            })
            expect(res.status).toBe(200)
    })

    test("does /update work as a type charity business? It should!", async ()=> {
        const res = await supertest(server).put("/api/requests/update/1")
            .set('Accept', 'application/json')
            .set({ "token": charitytoken.token, Accept: 'application/json' })
            .send({
                type: "chicken wings",
                amount: "7 pounds",
                pickup_time: "February 6th 2020, 4:10:06 pm",
            })
            expect(res.status).toBe(200)
    })

    test("does /update work with no body? It shouldn't", async ()=> {
        const res = await supertest(server).put("/api/requests/update/1")
            .set('Accept', 'application/json')
            .set({ "token": charitytoken.token, Accept: 'application/json' })
            .send()
            expect(res.status).toBe(500)
    })

    test("does /delete work without a token?", async ()=> {
        const res = await supertest(server).delete("/api/requests/delete/4")
            expect(res.status).toBe(401)
            expect(res.body.message).toBe('log in again')
    })

    test("does /delete work?", async ()=> {
        const res = await supertest(server).delete("/api/requests/delete/4")
            .set('Accept', 'application/json')
            .set({ "token": charitytoken.token, Accept: 'application/json' })
            expect(res.status).toBe(200)
            expect(res.body.message).toBe('food request with id of 4 has been deleted')
    })

    test("does /delete work with a request that doesn't exist?", async ()=> {
        const res = await supertest(server).delete("/api/requests/delete/10000")
            .set('Accept', 'application/json')
            .set({ "token": charitytoken.token, Accept: 'application/json' })
            expect(res.status).toBe(400)
            expect(res.body.message).toBe("food request not found")
    })
})

