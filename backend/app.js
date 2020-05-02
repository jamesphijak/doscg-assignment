/*
 *
 ############################################
 * Index of apps
 ############################################
 *
 */

/*
 * Initialize Express and others network module
 */
const config = require('./configs/config')
const express = require('express');
const app = express();

/**
 * Initialize cors
 * This must be the first of middleware, use before inspect request
 */
const cors = require('cors')
app.options('*', cors())

const whitelist = config.whitelist

const corsOptionsDelegate = function (req, callback) {
    let corsOptions
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

/**
 * Encoded bodies
 */
app.use(express.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use(express.json()) // to support JSON-encoded bodies
app.use(cors(corsOptionsDelegate))

/**
 * using body parser
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * using route
 */
const route = require('./routes/index')
app.use('/api', route);
/**
 * check backend start
 */
app.get('*', (req, res) => {
    res.status(200).send('Back-end stated.')
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

/**
 * server listen
 */
const port = process.env.PORT || config.default_port
app.listen(port, () => console.log(`Server is started. Port ${port}.`));