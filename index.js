const noblox = require('noblox.js')
const config = require('dotenv').config().parsed

console.log(config)

async function startApp () {
    // You MUST call setCookie() before using any authenticated methods [marked by 🔐]
    // Replace the parameter in setCookie() with your .ROBLOSECURITY cookie.
    const currentUser = await noblox.setCookie(`${config.ROBLOSECURITY}`) 
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)

    // Do everything else, calling functions and the like.
    const groupInfo = await noblox.getGroup(4164726)
}

startApp()