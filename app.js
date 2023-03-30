const http = require("http");
const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();

const connectDb = require("./config/db.js");
connectDb();

const server = http.createServer(app);

// ========== MIDDLEWARES ===========
app.use(express.json());
app.use(cors());

//  ========== STATIC FOLDERS ===========
app.use("/uploads", express.static("uploads"));

//  ========== ROUTES ===========
// app.use("/admin", require("./routes/admin"));
// app.use("/agent", require("./routes/agent"));
// app.use("/student", require("./routes/student"));
// app.use("/notification", require("./routes/notification"));
// app.use("/address", require("./routes/address"));
// app.use("/docsrequired", require("./routes/docsrequired"));

// Users route
app.use("/users", require("./routes/users"));
app.use("/users_roles", require("./routes/users_roles"));
app.use("/teams", require("./routes/teams"));
app.use("/tasks", require("./routes/tasks"));

server.listen(process.env.PORT || 3006, () =>
  console.log(`Listening on port ${process.env.PORT || 3006}`)
);
