const {
  findAllDogsDB,
  findDogByIdDb,
  createDog,
} = require("../controllers/dogs.DB.controllers");
const {
  findAllDogsAPI,
  findDogAPIById,
} = require("../controllers/dogs.api.controllers");
const isEmpty = require("../utils/isEmpty");
const toValidateUUID = require("../utils/uuidValidate");

const getAllDogs = async (req, res) => {
  try {
    const { name } = req.query;
    const nameReceived = name?.toLowerCase();
    if (name === undefined) {
      const allDogsDB = await findAllDogsDB();
      const allDogsApi = await findAllDogsAPI();

      return res.status(200).json([...allDogsDB, ...allDogsApi]);
    } else {
      const dogsByNameBD = await findAllDogsDB(nameReceived);
      const dogsByNameAPI = await findAllDogsAPI(nameReceived);
      const evaluateEmpty = isEmpty([...dogsByNameBD, ...dogsByNameAPI]);

      if (evaluateEmpty)
        throw new Error(`No existe ${nameReceived} como nombre de raza`);

      return res.status(200).json([...dogsByNameBD, ...dogsByNameAPI]);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
};

const getDogsById = async (req, res) => {
  try {
    const { idDog } = req.params;
    //Buscamos el video juego en la BBDD
    // Validamos si el id es de tipo uuid para buscarlo en la BBDD
    if (toValidateUUID(idDog)) {
      const dogByIdDb = await findDogByIdDb(idDog);
      return res.status(200).json(dogByIdDb);
    } else {
      const dogByIdApi = await findDogAPIById(idDog);
      return res.status(200).json(dogByIdApi);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const createNewDog = async (req, res) => {
  try {
    const { id, image, name, heigth, weigth, lifeYears, temperaments } =
      await req.body;
    if (
      !id ||
      !image ||
      !name ||
      !heigth ||
      !weigth ||
      !lifeYears ||
      !temperaments
    )
      throw new Error("Información incompleta");
    if (!toValidateUUID(id)) throw new Error("El id no tiene el formato uuid");

    const newDog = await createDog(
      id,
      image,
      name,
      heigth,
      weigth,
      lifeYears,
      temperaments
    );
    return res.status(200).json({ msg: "Videojuego creado con éxito" });
  } catch (err) {
    
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { getAllDogs, getDogsById, createNewDog };
