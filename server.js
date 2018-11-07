const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.resolve(__dirname, "dist")));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});