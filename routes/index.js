"use strict";

const models = require("../models/model");
const express = require("express");
const { restart } = require("nodemon");
const model = require("../models/model");
// const { response } = require('../app')

const router = express.Router();
module.exports = router;

// Escriban sus rutas acá
// Siéntanse libres de dividir entre archivos si lo necesitan

//07
router.get("/users", (req, res) => {
  res.status(200).json(model.listUsers());
});

router.post("/users", (req, res) => {
  const { email, name } = req.body;
  let user = model.listUsers();

  try {
    model.addUser(email, name);
    let myUser = user.find(
      (user) => user.name === name && user.email === email
    );
    //console.log(myUser)
    res.status(201).json({ msg: `Usuario ${email} creado correctamente` });
  } catch (error) {
    if (error.message === "El usuario ya existe") {
      res.status(400).json({ error: error.message });
    }
  }
});

//08
router.patch("/users/plan", (req, res) => {
  let user = model.listUsers();
  // let find = user.filter(user=> user.plan === 'regular')
  // console.log('user', find ? find : undefined)

  let myUser = user.find((user) => user);
  if (myUser) {
    if (myUser.plan === "regular") {
      myUser.plan = "premium";
      res
        .status(200)
        .json({ msg: `${myUser.name}, ahora tienes el plan premium` });
    }
  }
  res.status(404).json({ error: "Usuario inexistente" });
});
//09

router.get("/series", (req, res) => {
  res.status(200).json(model.listSeries());
});

router.post("/series", (req, res) => {
    const { name, category } = req.body;
    let serie = model.listSeries();
    let serieExist = serie.find(serie => serie.name === name);

    try {
        model.addSerie(name, "", category, "");
        res.status(201).json({msg: `La serie ${name} fue agregada correctamente`});
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

//10

router.get('/series/:category', (req, res) => {
    const { category } = req.params;
    console.log(category)
    try{
        let data = model.listSeries(category);
        //console.log(data)
       return res.status(200).json(data)
    }catch(error){
        if(error.message === `La categoría ${category} no existe`)
        return res.status(404).json({ error: error.message });
        
    }

})
//11


// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.
