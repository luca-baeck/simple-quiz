const express = require('express');
const bodyParser = require('body-parser');

//Create an app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// function fakultaet(n) {
//     if (n <= 0) {
//       return 1;
//     }
//     return fakultaet(n - 1) * n;
//   }


app.get('/quiz', (req, res) => {
    // for (let i = 0; i < 1000000; i++) {
    //     for (let inde = 0; inde < 6000; inde++) {
    //     }
    // }
    res.send("<h1>Got to / only</h1>");
});

// app.get('/:number', (req, res) => {
//     // let result
//     // for (let o = 0; o < 1000; o++) {
//     //     result = fakultaet(req.params.number - o);
//     // }
//     res.send("");
// });



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


let answers = {
    "frage 1" : 1,
    "frage 2" : 1,
    "frage 3" : 1,
    "frage 4" : 1,
    "frage 5" : 1,
}

let users = [];

app.post('/quizSubmitted', (req, res) => {
    //console.log(req.body)
    //check punkzahl

    //schreibe punktzahl in users

    let data = req.body;

    let points = 0;
    for (const key in data) {
        //console.log(key)
        //console.log(data[key])

        if(answers[key] == data[key]){
            points++;
        }
    }

    users.push({
        "name": data["name"],
        "points": points,
    });

    console.log(users);

   res.redirect("/result")//change to resultpage so that users see results after commiting
});

app.get('/result', (req, res) => {
    users.sort(function(a, b){return b["points"] - a["points"]});

    //get entry of user ranked by points

    let responsePage = createResultPage(users);

    console.log(responsePage);
    res.send(responsePage);
});

const createResultPage = (users) => {
    let page = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Kubernetes</title>
        <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1055px-Kubernetes_logo_without_workmark.svg.png">
        <style>
            .row {
                display: flex;

            }
    
            .column {
                flex: 1;
                padding: 10px;
                text-align: center;

            }
        </style>
    </head>
    <body>
    <div class="row">
    <div class="column">
        <h1>Name:</h1>
    </div>
    <div class="column">
    <h1>Punkte:</h1>
    </div>
    </div>
    `;

    users.map(user => {
        page += `
        <div class="row">
        <div class="column">
            <h2>${user["name"]}</h2>
        </div>
        <div class="column">
        <h2> ${user["points"]}</h2>
        </div>
    </div>
      `;
    })
    
    page += `
    </body>
    </html>
    `;
    
    return page;
}

//Listen port
const PORT = 80;
app.listen(PORT);
console.log(`Running on port ${PORT}`);