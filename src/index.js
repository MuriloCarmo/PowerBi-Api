const express = require('express');
const app = express();
const knex = require('knex');
require('dotenv').config();
const connection = require('./db/connection');
const axios = require('axios');
const bodyParser = require('body-parser');

//Realiza Consulta
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  try {
    ////////////////////////////QUERY para adquirir dados
  
    dataConsulta = "'01/12/2020 00:00:00'";
    
      dataConsulta = await connection.raw(
        'SELECT TOP 1 [Data Solicitação] FROM [Qlik].[dbo].[vw_matricula] WHERE [Data Solicitação] >= ' + dataConsulta + ' ORDER BY [Data Solicitação] asc'
      );
       
       dataResultado = `'${dataConsulta[0]['Data Solicitação']}'`
        console.log(dataResultado);

    const consulta = await connection.raw(
      'SELECT TOP 100 [Matrícula], [Composição], [Nível Ensino], [Cód. Série], [Série], [Turno], [Regional Escola 1ª Opção], [Município Escola 1ª Opção], [Nome Escola 1ª Opção], [Tipo Aluno], [Característica], [Data Solicitação] FROM dbo.vw_matricula WHERE [Data Solicitação] >= '+
      dataResultado+
      ' ORDER BY [Data Solicitação] asc'
    );

    //Método para inserção na API do Power BI  

    const inserir = await axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url:
        '',
      data: consulta,
    });

     res.json(consulta[99]);

  } catch (err) {
    console.error(err);
    res.status(500).json('Erro ao encontrar Query');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Rodando na porta:', process.env.PORT || 3000);
});
