const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
const url = "mongodb://localhost:27017";

app.use('/', express.static('.'));
app.use(bodyParser.json());

app.get('/all_appeals', function (request, result) {
    mongoClient.connect(url, function (error, db) {
        if (error) {
            throw error;
        }

        let dbo = db.db("lab10-11_web");
        dbo.collection("all_appeals").find().toArray().then(function (data) {
            result.send(data);
        });
        db.close();
    });
});

app.post('/all_appeals', function (req, result) {
    mongoClient.connect(url, function (error, db) {
        if (error) {
            throw error;
        }

        if (req.body) {
            let dbo = db.db("lab10-11_web");
            dbo.collection("all_appeals").insert(req.body, function(error, result) {
                if (error) throw error;
                db.close();
            });
        }
    });
    result.send();
});

app.put('/all_appeals', function (request, result) {
    mongoClient.connect(url, function (error, db) {
        if (error) {
            throw error;
        }

        if (request.body) {
            let dbo = db.db("lab10-11_web");
            dbo.collection("all_appeals").update(req.body, function(error, result) {
                if (error) throw error;
                db.close();
            });
        }
    });
    result.send();
});

app.delete('/all_appeals', function (request, result) {
    mongoClient.connect(url, function (error, db) {
        if (error) {
            throw error;
        }

        if (req.body) {
            let dbo = db.db("lab10-11_web");
            dbo.collection("all_appeals").remove(req.body, function(error, result) {
                if (error) throw error;
                db.close();
            });
        }
    });
    result.send();
});

app.get('/all_news', function (request, result) {
    mongoClient.connect(url, function (error, db) {
        if (error) {
            throw error;
        }

        let dbo = db.db("lab10-11_web");
        dbo.collection("all_news").find().toArray().then(function (data) {
            result.send(data);
        });
        db.close();
    });
});

app.post('/all_news', function (request, result) {
    mongoClient.connect(url, function (error, db) {
        if (error) {
            throw error;
        }

        if (request.body) {
            let dbo = db.db("lab10-11_web");
            dbo.collection("all_news").insert(request.body, function(error, result) {
                if (error) throw error;
                db.close();
            });
        }
    });
    result.send();
});

app.put('/all_news', function (request, result) {
    mongoClient.connect(url, function (error, db) {
        if (error) {
            throw error;
        }

        if (request.body) {
            let dbo = db.db("lab10-11_web");
            dbo.collection("all_news").update(req.body, function(error, result) {
                if (error) throw error;
                db.close();
            });
        }
    });
    result.send();
});

app.delete('/all_news', function (request, result) {
    mongoClient.connect(url, function (error, db) {
        if (error) {
            throw error;
        }

        if (req.body) {
            let dbo = db.db("lab10-11_web");
            dbo.collection("all_news").remove(req.body, function(error, result) {
                if (error) throw error;
                db.close();
            });
        }
    });
    result.send();
});

app.listen(port, function () {
    console.log("Listening at port", port);
});
