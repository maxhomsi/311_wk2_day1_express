
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
let bodyParser = require("body-parser");
app.use(bodyParser.json())
const { users } = require('./state')

/* BEGIN - create routes here */

app.get("/users", function(req, res){ //GET para "pegar" a informacao do DB fornecido.
  console.log("GET /users");
  res.json(users)
}
)

app.get("/users/:id", function(req, res){  //loop para verificar o tamanho da lista
  console.log("/get/users", req.params.id)
let found
for(let i=0; i < users.length; i++){
  let item = users[i]
  if(item._id  == req.params.id){ //underline pois foi assim que tava no objeto
    found = item;
    break;
  }
}
if(found) {
  res.json(found); //se achou achou se nao 404
  } else {
  res.sendStatus(404);
  }

}
)

app.post("/users", function(req, res){ //"postando" um novo item. tem q sempre seuiguir o parametro
  console.log ("POST /users");

  let json =req.body;
  console.log("body = ", json);
  let itemNovo = {}; //lembrar de colocar em um objeto vazio
  itemNovo._id = json._id
  itemNovo.name = json.name;
  itemNovo.occupation = json.occupation;
  itemNovo.avatar = json.avatar;
  users.push(itemNovo);
  res.json(itemNovo)

}
)
app.put("/users/:id", function(req, res){
  console.log ("PUT /users", req.params.id) 
let json = req.body
let found;

for(let i=0; i < users.length; i++){
let item =  users[i]

if(item._id  == req.params.id){ 
  found = item;

  break;
}

}
if(found) { //se for encontrado, fazer as alteracaoes
  found.name = json.name;
  found.occupation = json.occupation;
  found.avatar = json.avatar;
  res.json(found)

  } else {
  res.sendStatus(404);
  }


})

app.delete("/users/:id", function (req, res) { //funcao pega a ID e deleta ela 
  console.log("DELETE /users/", req.params.id);
  let index = -1;

  for (let i = 0; i < users.length; i++) {
    let item = users[i];

    if (item._id == req.params.id) {
      index = i;
      break;
    }
  }
  let found;
  if (index > -1) {
    found = users.splice(index, 1);
  }
  res.send(`id: ${index + 1} D-E-L-E-T-E-D`); //retorno da funcao
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))