const fs = require('fs');
const path = require('path')
const bodyparser = require('body-parser')


const express = require('express');
const { ALL } = require('dns');

const app = express();

app.listen(8000, () => {
    console.log('servidor iniciado en el puerto 8000')
});

app.use(express.static('public'))
app.use(bodyparser.urlencoded())

app.get('/', (req, res) => {
    try {
        console.log(req)
        res.sendfile(path.join(__dirname, 'public', 'login.html'))
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
        res.sendfile(path.join(__dirname, 'public', 'register.html'))
    } catch (error) {
        console.log(error.message)
    }
});

app.get('/restablecer', (req, res) => {
    try {
        console.log(req)
        res.sendfile(path.join(__dirname, 'public', 'forgot-password.html'))
    } catch (error) {
        console.log(error.message)
    }
});

app.get('/main', (req, res) => {
    try {
        console.log(req)
        res.sendFile(path.join(__dirname, 'public', '/main.html'))
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/register', (req, res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;

    fs.readFile('db.json', (error, data) => {
        let users = JSON.parse(data.toString())
        users.push(req.body)
        fs.writeFile('db.json', JSON.stringify(users), (error) => {
            if (error) {
                console.log(error)
            }
            res.redirect('/')
        });
        // console.log(typeof users)
    });

})

app.post('/login', (req, res) => {
    let emails = req.body.email;
    let password = req.body.password;


    fs.readFile('db.json', (error, data) => {
        let compareUsrs = JSON.parse(data.toString())
        let mails = compareUsrs.map(function (usrsEmails) {
            return usrsEmails.email;
        })
        let paswords = compareUsrs.map(function (usrsPswd) {
            return usrsPswd.password;
        })

        let filtermail = mails.find(e => e === emails)
        let filterPswd = paswords.find(e => e === password)

        console.log(filtermail)
        console.log(filterPswd)

        if (filtermail && filterPswd) {
            res.redirect('/main')
        } else res.redirect('/')
    })

})