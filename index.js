//import noblox library
const noblox = require("noblox.js");
//import express library
const express = require("express");
//import dotenv and use config()
require("dotenv").config();
//import supabase
const supabaseClient = require("@supabase/supabase-js");
//import morgan from 'morgan';
const morgan = require("morgan");
//import bodyParser from "body-parser";
const bodyParser = require("body-parser");
//import cors and config
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const { COOKIE, API_TOKEN, MAX_RANK, PORT } = process.env;
const app = express();
const supabase = supabaseClient.createClient(
  "https://ckpuianxbtpwllpskxxa.supabase.co",
  API_TOKEN
);

app.use(cors(corsOptions)); // Use this after the variable declaration

// using morgan for logs
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function startApp() {
  const currentUser = await noblox.setCookie(`${COOKIE}`);
  console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`);
  console.log(await require("./functions/getAllGroupPlayers")(33718360));
  console.log(
    await require("./functions/inBlackList_group_check")(
      await require("./functions/getAllGroupPlayers")(33718360)
    )
  );
}

app.get("/corregpm", async (req, res) => {
  const { data, error } = await supabase.from("corregpm").select("*");
  res.send(data);
});

app.get("/corregpm/:id", async (req, res) => {
  var { data, error } = await supabase
    .from("corregpm")
    .select()
    .eq("id", req.params.id);
  console.log(data);
  if (typeof data[0] == "object") {
    res.send(data);
  } else {
    res.send(error || "Rota invalida");
  }
});

app.put("/corregpm/update/:id", async (req, res) => {
  var { data, error } = await supabase
    .from("corregpm")
    .select()
    .eq("id", req.params.id);

  if (typeof data[0] == "object") {
    console.log(req.body);
    var { response,error } = await supabase
      .from("corregpm")
      .update({
        id: parseInt(req.body.id),
        nick: req.body.nick,
        correglog: JSON.parse(req.body.correglog),
      })
      .eq("id", req.params.id);
    res.send(response)
  } else {
    res.send(error || "Rota invalida");
  }
});

const server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`> Ready on http://localhost:3000`, host, port);
});
