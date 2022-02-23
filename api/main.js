var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var database = require('./basededatos.json');
var express = require('express');
var app = express();
var port = 3000;
var fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/intervalos', function (req, res) {
    var intervalos = [];
    database.intervalos.forEach(function (element) {
        intervalos.push(element.intervalo);
    });
    res.send(intervalos);
});
app.get('/motos/:intervalo?', function (req, res) {
    var motos = [];
    console.log(req.query.intervalo);
    database.intervalos.find(function (intervalo) {
        if (intervalo.intervalo == req.query.intervalo) {
            motos = intervalo.motos;
            return;
        }
    });
    res.send(motos);
});
/*esta tiene que ser post, se le manda: intervalo, moto y cliente */
app.post('/gestionReserva', function (req, res) {
    console.log(req.body.intervalo);
    var intervalo = req.body.intervalo;
    var id = req.body.id;
    var estado = req.body.estado;
    var cliente = req.body.cliente;
    database.intervalos.forEach(function (element) {
        if (element.intervalo == intervalo) {
            element.motos.forEach(function (moto) {
                if (moto.id == id) {
                    moto.estado = estado;
                    moto.cliente = cliente;
                    return;
                }
            });
            return;
        }
    });
    /*fs.writeFile('./basededatos.json', JSON.stringify(database), (err) => {
        if(err){
            res.send('No se guardo con exito')
            throw err;
        }
        res.send('Se guardo con exito')
        console.log("JSON data is saved")
    })*/
    writeJSON('./basededatos.json', database);
});
app.listen(port, function () {
    console.log('se levanto la api en el puerto ' + port);
});
function proximoIntervalo() {
    var data = database.intervalos.forEach(function (element) {
        if (element.motos.lenght == 0) {
            for (var i = 1; i < 8; i++) {
                element.motos.push(JSON.stringify({
                    "id": i,
                    "cliente": null,
                    "estado": "libre"
                }));
            }
            return;
        }
    });
    writeJSON('./basededatos.json', data);
}
function writeJSON(json, obj) {
    fs.writeFile('json', JSON.stringify(obj), function (err) {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved");
        return 'Se guardo con exito';
    });
}
function limpiarRegistro() {
    var database2 = database.intervalos.forEach(function (element) {
        element.motos = JSON.stringify("");
    });
    writeJSON('./basededatos.json', JSON.stringify(database2));
    console.log('entre');
    console.log('entre');
    console.log('entre');
    console.log('entre');
    console.log('entre');
    console.log('entre');
    console.log('entre');
    console.log('entre');
}
var CronJob = require('cron').CronJob;
var job = new CronJob('1 * * * * *', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            proximoIntervalo();
            console.log('prox');
            return [2 /*return*/];
        });
    });
});
limpiarRegistro();
job.start();
