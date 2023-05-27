require("dotenv").config();
const { DOMAIN_PATH, API_KEY } = process.env;
const { getDogsApi, getDogByIdApi } = require("../utils/apiRequest");

const findAllDogsAPI = async (nameReceived) => {
  try {
    const allDogsAPI = await getDogsApi(DOMAIN_PATH, API_KEY, nameReceived);

    return allDogsAPI.map((elem) => {
      return {
        id: elem.id,
        image: elem.image
          ? elem.image.url
          : `https://cdn2.thedogapi.com/images/${elem.reference_image_id}.jpg`,
        name: elem.name,
        heigth: elem.height.metric,
        weigth: elem.weight.metric,
        lifeYears: elem.life_span,
        temperaments:  elem.temperament
      };
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findDogAPIById = async (idReceived) => {
  try {
    const allDogsAPI = await getDogByIdApi(DOMAIN_PATH, API_KEY, idReceived);
    if (allDogsAPI.name === undefined) throw new Error("El id no existe");

    return {
      id: allDogsAPI.id,
      image: allDogsAPI.image
        ? allDogsAPI.image.url
        : `https://cdn2.thedogapi.com/images/${allDogsAPI.reference_image_id}.jpg`,
      name: allDogsAPI.name,
      heigth: allDogsAPI.height.metric,
      weigth: allDogsAPI.weight.metric,
      lifeYears: allDogsAPI.life_span,
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  findAllDogsAPI,
  findDogAPIById,
};
