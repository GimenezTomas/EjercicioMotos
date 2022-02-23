const database = require('./basededatos.json')
const express = require('express') 
const app = express()
const port = 3000
const fs = require('fs')

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
    console.log(req.query.intervalo)
    database.intervalos.find(function(intervalo){
        if(intervalo.intervalo == req.query.intervalo){
            motos = intervalo.motos
            return
        } 
    })
    res.send(motos)
})

/*esta tiene que ser post, se le manda: intervalo, moto y cliente */
app.post('/gestionReserva', (req, res) => {
    console.log(req.body.intervalo)
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

    /*fs.writeFile('./basededatos.json', JSON.stringify(database), (err) => {
        if(err){
            res.send('No se guardo con exito')
            throw err;
        }
        res.send('Se guardo con exito')
        console.log("JSON data is saved")
    })*/
    writeJSON('./basededatos.json', database)

})

app.listen(port, () => {
    console.log('se levanto la api en el puerto '+port)
})

function proximoIntervalo(){
    let data = database.intervalos.forEach(element => {
        if(element.motos.lenght == 0){
            for (let i = 1; i < 8; i++) {
                element.motos.push(
                    JSON.stringify({
                        "id": i,
                        "cliente": null,
                        "estado": "libre"
                    })
                )
            }
            return
        }
    })

    writeJSON('./basededatos.json', data)
}

function writeJSON(json: string, obj){
    fs.writeFile('json', JSON.stringify(obj), (err) => {
        if(err){
            throw err;
        }
        console.log("JSON data is saved")
        return 'Se guardo con exito'
    })
}

function limpiarRegistro(){
    let database2 = database.intervalos.forEach(element => {
        element.motos = JSON.stringify("")
    })
    writeJSON('./basededatos.json', JSON.stringify(database2))
    console.log('entre')
    console.log('entre')
    console.log('entre')
    console.log('entre')
    console.log('entre')
    console.log('entre')
    console.log('entre')
    console.log('entre')

}

const CronJob = require('cron').CronJob;
const job = new CronJob('1 * * * * *',  async function(){
    proximoIntervalo()
    console.log('prox')
});

limpiarRegistro()
job.start();