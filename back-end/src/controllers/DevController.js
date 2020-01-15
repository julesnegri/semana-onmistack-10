const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStrigAsArray");

//index, show, store, update, detroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      // let { name, avatar_url, bio } = apiResponse.data
      // if(!name) {
      //   name = apiResponse.data.login;
      // }
      //forma mais facil de fazer isso
      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },

  async update() {
    //atualizar informaço~es daquele unico dev
    //so faz sentido atualizar o nome, o avatar, a bio, astecnologias e a localizaçaão
  },

  async destroy() {
    //que vai deletar um deve de dentro do banco de dados
  }
};
