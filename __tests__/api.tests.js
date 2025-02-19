const request = require("supertest");
const app = require("../app");

describe("🔥 API Tests", () => {
    // ✅ GET /api/events/save
    test("GET /api/events/save - Fetch & save events from Skiddle", async () => {
        const { body } = await request(app).get("/api/events/save").expect(200);
        expect(body).toHaveProperty("message", "Events successfully saved");
    });

    // ✅ GET /api/events/local
    test("GET /api/events/local - Retrieve saved events from MongoDB", async () => {
        const { body } = await request(app).get("/api/events/local").expect(200);
        expect(Array.isArray(body.events)).toBe(true);
        body.events.forEach(event => {
            expect(event).toHaveProperty("_id");
            expect(event).toHaveProperty("title");
            expect(event).toHaveProperty("description");
            expect(event).toHaveProperty("date");
        });
    });

    // ✅ GET /api/event/:eventId/calendar-link
    test("GET /api/event/:eventId/calendar-link - Retrieve Google Calendar link", async () => {
        const eventId = "event123"; // Replace with a valid event ID
        const { body } = await request(app).get(`/api/event/${eventId}/calendar-link`).expect(200);
        expect(body).toHaveProperty("calendarLink");
        expect(typeof body.calendarLink).toBe("string");
    });

    // ✅ POST /api/auth/register
    test("POST /api/auth/register - Register a new user", async () => {
        const testUser = { name: "John Doe", email: "johndoe@example.com", password: "securepassword" };
        const { body } = await request(app).post("/api/auth/register").send(testUser).expect(200);
        expect(body).toHaveProperty("message", "User registered successfully");
        expect(body).toHaveProperty("userId");
    });

    // ✅ POST /api/auth/login
    test("POST /api/auth/login - Login existing user", async () => {
        const testUser = { email: "johndoe@example.com", password: "securepassword" };
        const { body } = await request(app).post("/api/auth/login").send(testUser).expect(200);
        expect(body).toHaveProperty("message", "Login successful");
        expect(body).toHaveProperty("token");
    });

    // ✅ POST /api/response (Set RSVP)
    test("POST /api/response - Set RSVP response", async () => {
        const testResponse = { userId: "user123", eventId: "event123", response: "going" };
        const { body } = await request(app).post("/api/response").send(testResponse).expect(200);
        expect(body).toHaveProperty("message", "Response updated");
        expect(body.response).toMatchObject(testResponse);
    });

    // ✅ GET /api/response/user/:eventId (Get User RSVP)
    test("GET /api/response/user/:eventId - Get user RSVP for an event", async () => {
        const eventId = "event123"; // Replace with a valid event ID
        const { body } = await request(app).get(`/api/response/user/${eventId}`).expect(200);
        expect(body.response).toHaveProperty("userId");
        expect(body.response).toHaveProperty("eventId");
        expect(body.response).toHaveProperty("response");
    });

    // ❌ Error Handling Tests
    test("GET /api/nonexistent - Invalid route should return 404", async () => {
        const { body } = await request(app).get("/api/nonexistent").expect(404);
        expect(body.msg).toBe("Invalid input");
    });
});
