const getRouter = require("./getRouter");
const postRouter = require("./postRouter");

function handler(request, response) {
    switch (request.method) {
        case "POST":
            postRouter(request, response);
            break;
        case "GET":
            getRouter(request, response);
            break;
    }
}

module.exports = handler;
