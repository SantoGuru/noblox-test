const noblox = require("noblox.js");
const express = require("express");
const config = require("dotenv").config().parsed;
const app = express();

console.log(config);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
async function startApp() {
  // You MUST call setCookie() before using any authenticated methods [marked by 🔐]
  // Replace the parameter in setCookie() with your .ROBLOSECURITY cookie.
  const currentUser = await noblox.setCookie(`${config.COOKIE}`);
  console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`);
  // Do everything else, calling functions and the like.
  //console.log(configJson.BlackList)
  const playerList = [];
  const playerBlackList = [];
  const roles = await noblox.getRoles(13956182);
  const configJson = require("./config.json");

  for (z in roles) {
    const playerInRole = await noblox.getPlayers(13956182, roles[z].id);
    let i = 0;
    for (x in playerInRole) {
      playerList[i] = playerInRole[x].userId;
      i++;
    }
  }

  async function invitePlayer(groupid) {
    let i = 0;
    let sleeptime = 20
    for (y in playerList) {
      console.log(i)
      if (i==sleeptime){
        console.log("Dormiu")
        await require("./functions/sleep")(10000)
        sleeptime += 20
      }else{
      const a = await noblox.getRankInGroup(groupid, playerList[y])
      if(a>0){
        playerBlackList.push(playerList[y])
         console.log(playerBlackList)
      }
      i++
    }
    }
  }
  for (x in configJson.BlackList) {
    let groupid = configJson.BlackList[x];
    invitePlayer(groupid);
  }
}

startApp();

//const server = app.listen(config.PORT, function () {
//    var host = server.address().address
//   var port = server.address().port
//  console.log("listen on http://%s:%s", host, port)
//})
