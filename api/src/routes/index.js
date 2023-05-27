const { Router } = require("express");
const {
  getAllDogs,
  getDogsById,
  createNewDog,
} = require("../handlers/dogs.handlers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getAllDogs);
router.get("/dogs/:idDog", getDogsById);
router.post("/dogs", createNewDog);

module.exports = router;
