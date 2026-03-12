require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000 // timeout 5 secondes pour tester la connexion
})
.then(() => {
    console.log("✅ Database Successfully Connected");
    process.exit(0);
})
.catch(err => {
    console.error("❌ Unable to connect to database");
    console.error(err);
    process.exit(1);
});