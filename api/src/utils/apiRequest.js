const axios = require("axios");

const getDogsApi = async (domain_path, apiKey, nameReceived) => {
  try {
    if (nameReceived === undefined) {
      const response = await axios.get(`${domain_path}?key=${apiKey}`);
      const allDogsApi = response.data;
      return allDogsApi;
    } else {
      const response = await axios.get(
        `${domain_path}search?q=${nameReceived}&key=${apiKey}`
      );
      const allDogsApi = response.data;
      return allDogsApi;
    }
  } catch (error) {
    console.log(error);
  }
};

const getDogByIdApi = async (domain_path, apiKey, idReceived) => {
  try {
    const response = await axios.get(
      `${domain_path}${idReceived}&key=${apiKey}`
    );
    const dogById = response.data;
    return dogById;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDogsApi,
  getDogByIdApi,
};
