const fs = require('fs');

const express = require('express');

const app = express();

app.listen(8000, () => {
    console.log('servidor iniciado en el puerto 8000')
});

app.use(express.static('public'))

app.get('/inicio', (req, res) => {
    try {
        console.log(req)
        res.sendfile('public/login.html')
    } catch (error) {
        console.log(error.message)
    }
});

app.get('/nosotros', (req, res) => {
    try {
        fs.readFile('public/contador.txt', (error, datos) => {
            let visitas = datos.toString().split(':');
            console.log(visitas)
            visitas = Number(visitas[1]);
            visitas++;
            fs.writeFile('public/contador.txt', `visitas:${visitas}`, (error) => {
                if (error) {
                    console.log(error)
                }
                res.send('<h1>El numero de Visistas es : ' + visitas + '</h1>')
            })
        })
    } catch (error) {
        console.log(error.message)
    }
});

app.get('/registro', (req, res) => {
    try {
        console.log(req)
        res.sendfile('public/register.html')
    } catch (error) {
        console.log(error.message)
    }
});

app.get('/restablecer', (req, res) => {
    try {
        console.log(req)
        res.sendfile('public/forgot-password.html')
    } catch (error) {
        console.log(error.message)
    }
});