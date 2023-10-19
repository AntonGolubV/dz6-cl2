const fs = require("fs");
const path = require("path");
const url = require("url");

const { contentTypes } = require("../config/mimeTypes");
const { calcRes, whatOp } = require("../utils/calc");

const decisionTemplate = fs.readFileSync(path.join(__dirname, "../temlates/decision.html"), "utf-8");
const historyTemplate = fs.readFileSync(path.join(__dirname, "../templates/history.html"), "utf-8");

let arrHistory = [];

function getRouter(request, response) {
    const parsedUrl = url.parse(request.url, true);
    console.log(parsedUrl);

    switch (parsedUrl.pathname) {
        case "/":
            response.writeHead(301, {
                Location: "/index.html",
            });
            response.end();
            break;
        case "/calc":
            let decision = decisionTemplate.replace(
                "{{content}}",
                `${parseInt(parsedUrl.query.param1)} ${whatOp(parsedUrl.query.op)} ${parseInt(parsedUrl.query.param2)} =
             ${calcRes(parsedUrl.query.param1, parsedUrl.query.param2, whatOp(parsedUrl.query.op))}`
            );

            arrHistory.push(parsedUrl.query);
            console.log(arrHistory);

            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
            });
            response.end(decision);
            break;

        case "/history":
            let history;

            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
            });
            for (let i = 0; i < arrHistory.length; i++) {
                let history = historyTemplate.replace(
                    "{{history}}",
                    `${parseInt(parsedUrl.query.param1)} ${whatOp(parsedUrl.query.op)} ${parseInt(parsedUrl.query.param2)} =
                 ${calcRes(parsedUrl.query.param1, parsedUrl.query.param2, whatOp(parsedUrl.query.op))}`
                );
                /* if (arrHistory[i].op == "0") {
                    history = historyTemplate.replace(
                        "{{history}}",
                        ` ${parseInt(arrHistory[i].param1)} + ${parseInt(arrHistory[i].param2)} 
            = ${parseInt(arrHistory[i].param1) + parseInt(arrHistory[i].param2)}`
                    );
                    console.log(arrHistory[i].op);
                }
                if (arrHistory[i].op == "1") {
                    history = historyTemplate.replace(
                        "{{history}}",
                        ` ${parseInt(arrHistory[i].param1)} - ${parseInt(arrHistory[i].param2)} 
            = ${parseInt(arrHistory[i].param1) - parseInt(arrHistory[i].param2)}`
                    );
                    console.log(arrHistory[i].op);
                }
                if (arrHistory[i].op == "2") {
                    history = historyTemplate.replace(
                        "{{history}}",
                        ` ${parseInt(arrHistory[i].param1)} / ${parseInt(arrHistory[i].param2)} 
            = ${parseInt(arrHistory[i].param1) / parseInt(arrHistory[i].param2)}`
                    );
                    console.log(arrHistory[i].op);
                }
                if (arrHistory[i].op == "3") {
                    history = historyTemplate.replace(
                        "{{history}}",
                        ` ${parseInt(arrHistory[i].param1)} * ${parseInt(arrHistory[i].param2)} 
            = ${parseInt(arrHistory[i].param1) * parseInt(arrHistory[i].param2)}`
                    );
                    console.log(arrHistory[i].op);
                } */
                console.log(history);
                response.write(history);
            }
            response.end();
            break;

        default:
            const filePath = path.join("./public", parsedUrl.pathname.substring(1));
            console.log(filePath);

            fs.access(filePath, fs.constants.R_OK, (err) => {
                if (err) {
                    response.writeHead(404, {
                        "Content-Type": "text/html; charset=utf-8",
                    });

                    response.end("<h1>Not found</h1>");
                } else {
                    const extname = path.extname(filePath);
                    const contentType = contentTypes[extname] || "application/octet-stream";

                    response.writeHead(200, {
                        "Content-Type": contentType,
                    });
                    fs.createReadStream(filePath).pipe(response);
                }
            });
    }
}
module.exports = getRouter;
