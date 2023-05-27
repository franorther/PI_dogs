const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");

const findAllDogsDB = async (nameReceived) => {
  try {
    if (nameReceived === undefined) {
      const allDogsDB = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      return allDogsDB;
    } else {
      const dogsByNameBD = await Dog.findAll({
        where: {
          name: {
            [Op.like]: `%${nameReceived}%`,
          },
        },
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return dogsByNameBD;
    }
  } catch (error) {
    console.log(error);
  }
};

const findDogByIdDb = async (id) => {
  try {
    //Buscamos el video juego en la BBDD
    return await Dog.findByPk(id);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createDog = async (
  id,
  image,
  name,
  heigth,
  weigth,
  lifeYears,
  temperaments
) => {
  try {
    const nameReceived = name.toLowerCase();
    const newDog = await Dog.create({
      id,
      image,
      name: nameReceived,
      heigth,
      weigth,
      lifeYears,
      temperaments,
    });
    const [createTemperament] = await Temperament.findOrCreate({
      where: {
        name: temperaments.toLowerCase(),
      },
    });

    await newDog.addTemperament(createTemperament);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  findAllDogsDB,
  findDogByIdDb,
  createDog,
};
