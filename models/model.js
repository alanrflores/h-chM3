/// =========================================================================== ///
/// =============================== HENRY-FLIX ================================ ///
/// =========================================================================== ///

"use strict";

const categories = ["regular", "premium"];

let users = [];
let series = [];

module.exports = {
  reset: function () {
    // No es necesario modificar esta función. La usamos para "limpiar" los arreglos entre test y test.

    users = [];
    series = [];
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====

  addUser: function (email, name) {
    // Agrega un nuevo usuario, verificando que no exista anteriormente en base a su email.
    // En caso de existir, no se agrega y debe arrojar el Error ('El usuario ya existe') >> ver JS throw Error
    // Debe tener una propiedad <plan> que inicialmente debe ser 'regular'.
    // Debe tener una propiedad <watched> que inicialmente es un array vacío.
    // El usuario debe guardarse como un objeto con el siguiente formato:
    // {  email: email, name: name,  plan: 'regular' , watched: []}
    // En caso exitoso debe retornar el string 'Usuario <email_del_usuario> creado correctamente'.

    let nuevoUsuario = {
      email: email,
      name: name,
      plan: "regular",
      watched: [],
      series: [],
    };
    users.forEach((user) => {
      if (user.email === email) {
        throw new newBug("El usuario ya existe");
      }
    });

    if (email) {
      users.push(nuevoUsuario);
      return `Usuario ${email} creado correctamente`;
    }
  },

  listUsers: function (plan) {
    // Si no recibe parámetro, devuelve un arreglo con todos los usuarios.
    // En caso de recibir el parámetro <plan>, devuelve sólo los usuarios correspondientes a dicho plan ('regular' o 'premium').
    if (plan) {
      const filterUser = users.filter((user) => user.plan === plan);
      return filterUser;
    }
    return users;
  },

  switchPlan: function (email) {
    // Alterna el plan del usuario: si es 'regular' lo convierte a 'premium' y viceversa.
    // Retorna el mensaje '<Nombre_de_usuario>, ahora tienes el plan <nuevo_plan>'
    // Ej: 'Martu, ahora tienes el plan premium'
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')

    const findEmail = users.find((user) => user.email === email);
    // console.log(findEmail)
    if (!findEmail) {
      throw new newBug("Usuario inexistente");
    }
    let obj = {};
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        //console.log(users[i].email === email)
        users[i].plan = users[i].plan === "regular" ? "premium" : "regular";
        obj = users[i];
      }
    }

    return `${obj.name}, ahora tienes el plan ${obj.plan}`;
  },

  addSerie: function (name, seasons, category, year) {
    // Agrega una nueva serie al catálogo.
    // Si la serie ya existe, no la agrega y arroja un Error ('La serie <nombre_de_la_serie> ya existe')
    // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.
    // Debe devolver el mensaje 'La serie <nombre de la serie> fue agregada correctamente'
    // Debe guardar la propiedad <category> de la serie (regular o premium)
    // Debe guardar la propiedade <rating> inicializada 0
    // Debe guardar la propiedade <reviews> que incialmente es un array vacío.
    let findSerie = series.find(serie => serie.name === name);
    let findCategory = categories.includes(category);

    if(findSerie) throw new newBug(`La serie ${name} ya existe`);
    if (!findCategory) throw new newBug(`La categoría ${category} no existe`);

    series.push({
      name,
      category,
      rating: 0,
      reviews: [],
      seasons: parseInt(seasons),
      year: year,
    });
    return `La serie ${name} fue agregada correctamente`;
  },

  listSeries: function (category) {
    // Devuelve un arreglo con todas las series.
    // Si recibe una categoría como parámetro, debe filtrar sólo las series pertenecientes a la misma (regular o premium).
    // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.
    if (category) {
      let findCategory = categories.includes(category);
      if (!findCategory) throw new newBug(`La categoría ${category} no existe`);

      return series.filter(serie => serie.category === category);
    }

    return series;
  },

  play: function (serie, email) {
    // Con esta función, se emula que el usuario comienza a reproducir una serie.
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')
    // Si la serie no existe, arroja el Error ('Serie inexistente')
    // Debe validar que la serie esté disponible según su plan. Usuarios con plan regular sólo pueden reproducir series de dicha categoría, usuario premium puede reproducir todo.
    // En caso de contrario arrojar el Error ('Contenido no disponible, contrata ahora HenryFlix Premium!')
    // En caso exitoso, añadir el nombre (solo el nombre) de la serie a la propiedad <watched> del usuario.
    // Devuelve un mensaje con el formato: 'Reproduciendo <nombre de serie>'
    //console.log('serie', serie)

    let myUser = users.find((user) => user.email === email);
    let mySerie = series.find((s) => s.name === serie);
    //console.log("serie:", serie);
    // console.log("match serie:", mySerie);
    // console.log("match user:", myUser);

    if (!myUser) {
      throw new newBug(`Usuario inexistente`);
    }
    if (!mySerie) {
      throw new newBug("Serie inexistente");
    }

    if (
      (mySerie.category === "regular" && myUser.plan === "regular") || myUser.plan === "premium")
   {
      myUser.watched.push(mySerie.name);
      //console.log("match serie regular y user regular o premium:", myUser);
      return `Reproduciendo ${mySerie.name}`;
    } else if (mySerie.category === "premium" && myUser.plan === "premium") {
      myUser.watched.push(mySerie.name);
      //console.log("match serie premium y user premium:", myUser);
      return `Reproduciendo ${mySerie.name}`;
    } else {
      throw new newBug(
        "Contenido no disponible, contrata ahora HenryFlix Premium!"
      );
    }
  },

  watchAgain: function (email) {
    // Devuelve sólo las series ya vistas por el usuario
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')
    //console.log(email)
    const findUser = users.find((user) => user.email === email);
    if (!findUser) {
      throw new newBug("Usuario inexistente");
    }
    const filterWatched = findUser.watched.filter((watched) => watched);
    
    if (filterWatched) {
      return filterWatched;
    }
  },

  rateSerie: function (serie, email, score) {
    // Asigna un puntaje de un usuario para una serie:
    // Actualiza la propiedad <reviews> de la serie, guardando en dicho arreglo un objeto con el formato { email : email, score : score } (ver examples.json)
    // Actualiza la propiedad <rating> de la serie, que debe ser un promedio de todos los puntajes recibidos.
    // Devuelve el mensaje 'Le has dado <puntaje> puntos a la serie <nombre_de_la_serie>'
    // Si el usuario no existe, arroja el Error ('Usuario inexistente') y no actualiza el puntaje.
    // Si la serie no existe, arroja el Error ('Serie inexistente') y no actualiza el puntaje.
    // Debe recibir un puntaje entre 1 y 5 inclusive. En caso contrario arroja el Error ('Puntaje inválido') y no actualiza el puntaje.
    // Si el usuario no reprodujo la serie, arroja el Error ('Debes reproducir el contenido para poder puntuarlo') y no actualiza el puntaje. >> Hint: pueden usar la función anterior
   let findUser = users.filter(user=> user.email === email)
   let filterSerie = series.filter(element => element.name === serie);
   //console.log(filterSerie)
   if(score >= 1 && score <= 5){
     if(filterSerie.length === 0) throw new newBug('Serie inexistente');
     if(findUser.length === 0) throw new newBug('Usuario inexistente');
     if(findUser[0].watched.length === 0) throw new newBug('Debes reproducir el contenido para poder puntuarlo');
     //console.log(findUser.watched)

    filterSerie[0].reviews.push({ email : email, score : score });

    let arr = filterSerie[0].reviews;

    let suma = 0;
    for(let i=0; i<arr.length; i++){
      //console.log(arr[i])
    suma = suma + arr[i].score
    
    }
   
    let promedio = suma / arr.length
    // console.log(promedio)
    filterSerie[0].rating = promedio;

    return `Le has dado ${score} puntos a la serie ${serie}`;
   }else{
     throw new newBug('Puntaje inválido');
   }
  },
};

//custom error
class newBug extends Error {
  constructor(message, Code) {
    super(message);
    this.code = Code;
  }
}
