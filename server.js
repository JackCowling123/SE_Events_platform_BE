const app = require('./app'); // Imports Express app, where main functionality happens
const mongoose = require('./config/db'); // Connect to noSQL DB, MongoDB. Setup is handed in db file.

const PORT = process.env.PORT || 9090; // Either accesses environment variables through the api secret key in the env file (to prevent unauthorised access) or  defauls to 4000, running locally

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Makes app listen for requests