const express = require("express");
const app = express();
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { request } = require("http");
const dbPath = path.join(__dirname, "cricketTeam.db");

app.use(express.json());

let db = null;
const InitializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server Started at the port 3000");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};
InitializeDbAndServer();

const convertDbOjectToResponse = (dbObject) => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.player_name,
    jerseyNumber: dbObject.jersey_number,
    role: dbObject.roel,
  };
};

app.get("/players/", async (request, response) => {
  const getPlayerQuery = `SELECT * FROM cricket_team;`;
  const playersArray = await db.all(getPlayerQuery);
  // console.log(playersArray);
  response.send(playersArray.map(convertDbOjectToResponse));
});

app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const insertPlayer = `INSERT INTO cricket_team 
  (player_name, jersey_number, role) VALUES (?,?,?)`;
  await db.run(insertPlayer, [playerName, jerseyNumber, role]);
  response.send("Player Added to Team");
});

//getting the speicic user by the id
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayer = `SELECT * FROM cricket_team 
  WHERE player_id=${playerId};`;
  const player = await db.get(getPlayer);
  response.send(convertDbOjectToResponse(player));
});

// by using this method, updating the player details based on the changes

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const { playerName, jerseyNumber, role } = request.body;

  const updatePlayer = `UPDATE cricket_team SET player_name=?,jersey_number=?, role=?
  WHERE player_id =?;`;
  await db.run(updatePlayer, [playerName, jerseyNumber, role, playerId]);
  response.send("Player Details Updated");
});

app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deletePlayer = `DELETE FROM cricket_team WHERE player_id=?;`;

  await db.run(deletePlayer, [playerId]);
  response.send("Player Removed");
});

module.exports = app.js;
