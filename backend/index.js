const express = require("express");

const allrouter = require("./routes/index");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/v1", allrouter);

app.listen(3000, () => {
    console.log("App is running on port 3000")
}
    
);
