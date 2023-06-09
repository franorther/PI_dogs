const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heigth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weigth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lifeYears: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
