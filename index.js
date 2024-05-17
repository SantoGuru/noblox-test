const noblox = require('noblox.js')
const express = require('express')
const { error } = require('console')
const config = require('dotenv').config().parsed
const app = express()

console.log(config)

async function startApp () {
    // You MUST call setCookie() before using any authenticated methods [marked by 🔐]
    // Replace the parameter in setCookie() with your .ROBLOSECURITY cookie.
    const currentUser = await noblox.setCookie(`${config.COOKIE}`) 
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
    // Do everything else, calling functions and the like.
    const roles = await noblox.getRoles(4164726)
    const players = await noblox.getPlayers(4164726,28178686)
    console.log(players)
}

startApp ()

const server = app.listen(config.PORT, function () {  
    var host = server.address().address  
    var port = server.address().port  
    console.log("listen on http://%s:%s", host, port)  
})

