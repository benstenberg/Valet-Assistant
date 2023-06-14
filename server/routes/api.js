var express = require('express');
var axios = require('axios');
var router = express.Router();

// setup mongoose
var mongoose = require('mongoose');
var options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect('mongodb://127.0.0.1:27017/valet', options);
var Schema = mongoose.Schema;
var carSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    plate: String
});
var parkedCarSchema = new Schema({
    enteredBy: { type: String, required: true },
    client: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    car: { type: carSchema, required: true }
});
var ParkedCarData = mongoose.model('ParkedCar', parkedCarSchema);

async function getAllCars(filter, uid) {
    if (filter) {
        var data = await ParkedCarData.find({ enteredBy: uid, status: filter });
        return data;
    }
    var data = await ParkedCarData.find({ enteredBy: uid });
    return data;
}

async function addNewParkedCar(body, userId) {
    var data = new ParkedCarData({
        enteredBy: userId,
        client: body.client,
        phone: body.phone,
        date: new Date().toLocaleString(),
        status: "PARKING",
        location: body.location,
        car: {
            make: body.car.make,
            model: body.car.model,
            color: body.car.color,
            plate: body.car.plate
        }
    });
    await data.save()
    return data;
}

async function getParkedCarById(cid) {
    const doc = await ParkedCarData.findById(cid).exec();
    return doc;
}

async function updateParkedCarById(cid, body) {
    const filter = { _id: cid };
    const doc = await ParkedCarData.findOneAndUpdate(filter, body, { new: true });
    return doc;
}

async function deleteParkedCarById(cid) {
    await ParkedCarData.findByIdAndRemove(cid);
}

async function getCarByPhone(phoneNumber) {
    var data = await ParkedCarData.findOne({ "phone": phoneNumber }).exec();
    return data;
}

async function getAllMakes() {
    const options = {
        method: 'GET',
        url: 'https://car-data.p.rapidapi.com/cars/makes',
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getAllModels(make) {
    const options = {
        method: 'GET',
        url: 'https://car-data.p.rapidapi.com/cars',
        params: {
            limit: '50',
            page: '0',
            make: make
        },
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}


/* Routes /api/v1 */

/* GET /clients/{phone}
    Get car associated with this phone number */
router.get('/clients/:phone', (req, res) => {
    getCarByPhone(req.params.phone)
        .then(data => { res.send(data); })
});

/*  GET / ?filter={filter}
    Get all cars for this user, optional filter */
router.get('/', (req, res) => {
    if (!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    var filter;
    if (req.query.filter) {
        filter = req.query.filter;
    }
    else {
        filter = null;
    }
    getAllCars(filter, req.session.user._id)
        .then(data => { res.send(data); });
});

/*  POST /
    Add a new car for this user */
router.post('/', (req, res) => {
    if (!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    addNewParkedCar(req.body, req.session.user._id)
        .then(data => { res.send(data); });
});


/*  GET /cids/{cid}
    Get this specific parked car */
router.get('/cids/:cid', (req, res) => {
    if (!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    getParkedCarById(req.params.cid)
        .then(data => { res.send(data); });
});


/*  POST /cids/{cid}
    Update an existing parked car */
router.post('/cids/:cid', (req, res) => {
    /* if (!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    } */
    updateParkedCarById(req.params.cid, req.body)
        .then(data => { res.send(data); })
});


/*  DELETE /cids/{cid}
    Delete a parked car entirely */
router.delete('/cids/:cid', (req, res) => {
    if (!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    deleteParkedCarById(req.params.cid)
        .then(() => { res.status(200).send(); });
});

/* GET /makes)
    Get all valid car makes */
router.get('/makes', (req, res) => {
    if (!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    getAllMakes().then(ret => {
        res.send(ret.sort());
    });
});

/* GET /makes/:make
    Get all valid models for this make */
router.get('/makes/:make', (req, res) => {
    if (!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    getAllModels(req.params.make).then(ret => {
        res.send( [...new Set(ret.map(function (item) { return item["model"]; }).sort())] );
    })
})

router.get('/who', (req, res) => {
    let result = req.session && req.session.user;
    res.send(result);
})


module.exports = router;
