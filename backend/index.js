//const bodyParser = require("body-parser");
const { connect } = require("./connect");
const app = require("./src/app");
var r = require("./reddit.js");
var t = require("./twitter.js");

const PORT = process.env.PORT || 8080;

//Connect to mongodb
connect().then(
  () => {
    console.log(
      `Running mongodb at port ${process.env.MONGO_PORT} and host ${process.env.MONGO_HOSTNAME}`
    );
    app.set("port", PORT);

    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);

       setInterval(r.fetchRedditData, 604800000); // fetch new data once per week
       setInterval(t.fetchTwitterData, 604800000);

    });
  },
  (err) => {
    console.error("Unable to start mongodb");
    console.error(err);
  }
);
