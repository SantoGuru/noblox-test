const configJson = require("../config.json");
const noblox = require("noblox.js");

async function continuoCheck(groupid, playerList) {
  let i = 0;
  let sleeptime = 20;
  var partialBlackList = [];
  for (y in playerList) {
    if (i == sleeptime) {
      await require("./sleep")(10000);
      sleeptime += 20;
    } else {
      const inGroup = await noblox.getRankInGroup(groupid, playerList[y]);
      if (inGroup > 0) {
        partialBlackList.push(playerList[y]);
      }
      i++;
    }
  }
  return partialBlackList;
}

module.exports = async (playerList) => {
  const playerBlackList = [];
  for (x in configJson.BlackList) {
    let groupid = configJson.BlackList[x];
    playerBlackList.push(await continuoCheck(groupid, playerList));
  }
  return playerBlackList;
};
