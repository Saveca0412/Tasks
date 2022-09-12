const dotenv = require("dotenv").config();
const { app } = require("./app");
const { initmodels } = require("./models/initModels");
const { datab } = require("./util/datab.util");

const startServer = async () => {
  try {
    await datab.authenticate();
    console.log("Base de datos autenticada.");
    initmodels();
    await datab.sync();
    console.log("Base de datos sincronizada.");
    let PORT = 4002;
    app.listen(PORT, () => {
      console.log("Express escuchando y listo.");
    });
  } catch (error) {
    console.error(error);
  }
};
startServer();
