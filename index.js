const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(function (req, res, next) {
  setTimeout(() => {
    next();
  }, 1000);
});

// Add custom routes before JSON Server router
server.post("/station/operations/:action", (req, res) => {
  console.log("Body", req.body);
  let status = "success";
  let request;
  let response;
  switch (req.params.action) {
    case "bootnotification":
      request =
        '[2,"G3XTH000-SN66-6888-2020-100718513315","BootNotification",{"chargePointModel":"IESG3X_Tri1","chargePointVendor":"IES_WANMA","firmwareVersion":"5.1A.06","chargeBoxSerialNumber":"G3XTH000002"}]';
      response =
        '[3,"G3XTH000-SN66-6888-2020-100700446059",{"status":"Accepted","currentTime":"2020-10-07T00:44:16.748188Z","interval":60}]';
      break;
    case "heartbeat":
      request = '[2,"G3XTH000-SN66-6888-2020-100700006098","Heartbeat",{}]';
      response =
        '[3,"G3XTH000-SN66-6888-2020-100700006098",{"currentTime":"2020-10-07T00:00:14.140Z"}]';
      break;
    case "starttransaction":
      request = `[2,"2","StartTransaction",{"timestamp":"2020-09-25T08:02:36Z","connectorId":1,"meterStart":100000,"idTag":"${req.body.idTag}"}]`;
      response =
        '[3,"a7caa7a1-c309-43bd-af3f-b5c1c4f9657e",{"idTagInfo":{"status":"Blocked","expiryDate":"2020-10-12T19:43:48Z"}}]';
      break;
    case "authorize":
      request = `[2,"a7caa7a1-c309-43bd-af3f-b5c1c4f9657e","Authorize",{"idTag": "${req.body.idTag}"}]`;
      response =
        '[3,"2",{"transactionId":325845,"idTagInfo":{"status":"Accepted","expiryDate":"2020-10-09T14:04:56Z"}}]';
      break;
    case "stoptransaction":
      request = `[2,"4","StopTransaction",{"timestamp":"2020-09-25T10:10:26Z","transactionId":${req.body.transactionId},"meterStop":260000,"idTag":"B5C99702","reason":"Local","transactionData":[{"timestamp":"2020-06-25T10:10:36Z","sampledValue":[{"value":"100.000","context":"Transaction.Begin","unit":"kWh"}]},{"timestamp":"2020-06-25T10:10:26Z","sampledValue":[{"value":"105.000","context":"Transaction.End","unit":"kWh"}]}]}]`;
      response = `[3,"4",{"idTagInfo":{"status":"Accepted","expiryDate":"2020-10-09T14:48:27Z"}}]`;
      break;
    case "statusnotification":
      request = `[2,"5110","StatusNotification",{"connectorId":2,"errorCode":"${req.body.errorCode}","status":"${req.body.status}"}]`;
      response = `[3,"5110",{}]`;
      break;
    default:
      status = "Not supported";
      request = "";
      response = "";
  }
  res.json({
    status,
    request,
    response,
  });
});

// Use default router
server.use(router);
server.listen(3004, () => {
  console.log("JSON Server is running");
});
