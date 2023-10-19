const http = require("http");
const router = require("./routes/index");

const server = http.createServer(router);
server.listen(2008);
