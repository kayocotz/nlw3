const database = require("./db");
const saveOrfanato = require('./saveOrfanato')
database.then(async (db) => {
  // inserir dados na tabela
  await saveOrfanato(db, {
      lat: "-15.6726241",
      lng: "-47.6386394",
      name: "Lar das meninos",
      about: "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.",
      whatsapp: "41231321",
      images: ["https://images.unsplash.com/photo-1573261524391-266433971be1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaW"

      ].toString(),
      instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
      opening_hours: "Horário de visitas das 18h até ás 8h",
      open_on_weekends: "0"
  })
  //consultar dados da tabela
  const selectedOrfanatos = await db.all(`SELECT * FROM ORFANATOS`);
  console.log(selectedOrfanatos);
  //consultar somente 1 orfanato pelo id
  const orfanato = await db.all('SELECT * FROM orfanatos WHERE id = "2"');
  console.log(orfanato);
  //deletar dado da tabela
  await db.run("DELETE FROM orfanatos WHERE id ='4'");
});
