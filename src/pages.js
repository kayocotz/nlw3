
const database = require("./database/db");
const saveOrfanato = require("./database/saveOrfanato");

module.exports = {
  index(request, response) {
    return response.render("index")
  },
  
  async orfanato(request, response) {
        const id = request.query.id
            try 
            {
                const db = await database;
                const results = await db.all(`SELECT * FROM orfanatos WHERE id = "${id}"`)
                const orfanato = results[0]
                
                orfanato.images = orfanato.images.split(",")
                orfanato.firstImage = orfanato.images[0]
                

                if(orfanato.open_on_weekends == "0"){
                    orfanato.open_on_weekends == false
                } else{
                    orfanato.open_on_weekends == true
                }
                return response.render('orfanato', {orfanato})
            } catch (error) {
                console.log(error);
                return response.send("Erro no banco de dados");
            }
  },
  async orfanatos(request, response) {
    try {
      const db = await database;
      const orfanatos = await db.all(`SELECT * FROM ORFANATOS`);
      return response.render("orfanatos", { orfanatos });
    } catch (error) {
      console.log(error);
      return response.send("Erro no banco de dados");
    }
  },
  createOrfanato(request, response) {
    return response.render("create-orfanato");
  },
  async saveOrfanato(request, response) {
      const fields = request.body

      //validar se todos os campos estão preenchidos
      if(Object.values(fields).includes('')){
        return response.send('Todos os campos devem ser preenchidos!')
      }
      try { 
          //salvar o orfanato
          const db = await database
          await saveOrfanato(db,{
          lat: fields.lat,
          lng: fields.lng,
          name: fields.name,
          about: fields.about,
          whatsapp: fields.whatsapp,
          images: fields.images.toString(),
          instructions: fields.instructions,
          opening_hours: fields.opening_hours,
          open_on_weekends: fields.open_on_weekends

      })
        //redirecionamento
        return response.redirect('/orfanatos')
      } catch (error) {
        console.log(error)
        return response.send('Erro no banco de dados')
      }



  }
}
