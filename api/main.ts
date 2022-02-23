const database = require('./basededatos.json')
const express = require('express') 
const app = express()
const cors = require('cors')
const port = 3000
const fs = require('fs')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/intervalos', (req, res) => {
    let intervalos = []
    database.intervalos.forEach(element => {
        intervalos.push(element.intervalo)
    });
    res.send(intervalos)
})

app.get('/motos/:intervalo?', (req, res) => {
    let motos = []
    database.intervalos.find(function(intervalo){
        if(intervalo.intervalo == req.query.intervalo){
            motos = intervalo.motos
            return
        } 
    })
    console.log(motos)
    res.send(motos)
})

app.post('/gestionReserva', (req, res) => {
    console.log('haviendo reserva')
    let intervalo = req.body.intervalo
    let id = req.body.id
    let estado = req.body.estado
    let cliente = req.body.cliente

    database.intervalos.forEach(element => {
        if(element.intervalo == intervalo){
            element.motos.forEach(moto => {
                if(moto.id == id){
                    moto.estado = estado
                    moto.cliente = cliente
                    return
                }
            })
            return
        }
    })

    console.log('reserva exitosa')
    writeJSON('./basededatos.json', database)
    res.send('Accion exitosa')
})

app.listen(port, () => {
    console.log('se levanto la api en el puerto '+port)
})

function proximoIntervalo(){
    let array = []
    database.intervalos.forEach(element => {
        if(element.motos.length === 0 && array.length == 0){
            for (let i = 1; i < 9; i++) {
                array.push({
                    "id": i,
                    "cliente": null,
                    "estado": "disponible"
                })
            }
            element.motos = array 
        }
    })

    writeJSON('./basededatos.json', database)
}

function writeJSON(json: string, obj){
    fs.writeFile(json, JSON.stringify(obj), (err) => {
        if(err){
            throw err;
        }
        console.log("JSON data is saved")
        return 'Se guardo con exito'
    })
}

function limpiarRegistro(){
    database.intervalos.forEach(element => {
        element.motos = []
    })
    writeJSON('./basededatos.json', database)
}

const CronJob = require('cron').CronJob;
const job = new CronJob('30 * * * * *',  async function(){
    proximoIntervalo()
});

limpiarRegistro()
job.start();