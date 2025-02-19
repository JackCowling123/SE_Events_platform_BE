const mockEvents = [
    { _id: "event123", title: "Music Fest", description: "Live music in Manchester", date: "2025-03-15T18:00:00" },
    { _id: "event456", title: "Tech Conference", description: "Latest in tech", date: "2025-04-10T10:00:00" }
];

const mockResponses = [];

const addResponse = (userId, eventId, response) => {
    mockResponses.push({ userId, eventId, response });
    return { userId, eventId, response };
};

module.exports = { mockEvents, mockResponses, addResponse };