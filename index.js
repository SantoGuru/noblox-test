//import noblox library
const noblox = require("noblox.js");
//import express library
const express = require("express");
//import dotenv and use config()
require("dotenv").config();
//import supabase
const supabaseClient = require('@supabase/supabase-js');
//import morgan from 'morgan';
const morgan = require('morgan');
//import bodyParser from "body-parser";
const bodyParser = require('body-parser');
//import cors and config
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,    //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const { COOKIE, API_TOKEN, MAX_RANK, PORT } = process.env
const app = express();
const supabase = supabaseClient.createClient('https://ckpuianxbtpwllpskxxa.supabase.co',API_TOKEN)

app.use(cors(corsOptions)) // Use this after the variable declaration

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

async function startApp() {
  const currentUser = await noblox.setCookie(`${COOKIE}`);
  console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`);
  console.log(await require('./functions/getAllGroupPlayers')(33718360))
  console.log(await require('./functions/inBlackList_group_check')(await require('./functions/getAllGroupPlayers')(33718360)))
}


app.get('/all', async (req, res) => {
  const {data, error} = await supabase
      .from('corregpm')
      .select("*")
  res.send(data);
  console.log(`lists all products${data}`);
});

app.get('/corregpm/:id', async (req, res) => {
  console.log("id = " + req.params.id);
  const { data, error } = await supabase
  .from('corregpm')
  .select('id') // Selecionar apenas a coluna 'id'
  .eq('id', req.params.id)
  .single('id')
  if (data != null){
    console.log(true)
  }
  res.send(data);

  console.log("retorno "+ data);
});

app.put('/products/:id', async (req, res) => {
  const {error} = await supabase
      .from('corregpm')
      .select()
      .eq('id',req.params.id)
      .update({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price
      })
  if (error) {
      res.send(error);
  }
  res.send("updated!!");
});


app.get('/', async (req, res) => {
  res.send("Hello I am working my friend Supabase <3");
  startApp()
});

const server = app.listen(PORT, function () {
    var host = server.address().address
    var port = server.address().port
    console.log(`> Ready on http://localhost:3000`, host, port)
})
