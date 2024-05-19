// Retorna todos os IDs de jogadores do grupo
const noblox = require("noblox.js");
module.exports = async(groupID)=>{
    var roles = await noblox.getRoles(groupID);
    var playerList = []
    let i = 0
    for (z in roles) {
      const playerInRole = await noblox.getPlayers(groupID, roles[z].id);
      for (x in playerInRole) {
        playerList[i] = playerInRole[x].userId;
        i++
      }
    }
    return playerList
}