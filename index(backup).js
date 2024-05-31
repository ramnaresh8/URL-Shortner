require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const validUrl = require('valid-url');
// const nanoid = require('nanoid');
// import { nanoid } from 'nanoid'
const mongoose = require('mongoose')
try {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log(`Connected to MongoDB via mongoose.connect! ${lNr()}`);
} catch (error) {
  console.error(`Error connecting to database: ${lNr()}`, error);
  process.exit(1);
}
/*
const dbMongo = mongoose.connection;
dbMongo.on('error', function(err) { throw err });
dbMongo.once('open', function callback() {
  console.log(`const dbMongo = mongoose.connection ${lNr()}`);
  dbMongo.close();
});
*/
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const dbName = 'Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = async function() {
  const connection = await client.connect();
  const db = connection.db('Cluster0');
  return db;
};
// const { Schema } = mongoose
// Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// const urls = {}; // Object to hold original_url and short_url keys
/*
const urlSchema = new Schema({
  original_url: String,
  short_url: String
})
*/

console.log(`const urlSchema = new mongoose.Schema({ ... ${lNr()}`);
const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    unique: true
  },
  short_url: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  lNr: {
    type: Number
  }
}, { toJSON: { virtuals: true } });
module.exports = urlSchema;
// module.exports = mongoose.model("List", urlSchema);


console.log(`const urlModel13 = mongoose.model("url-tbl", urlSchema) ${lNr()}`);
const urlModel13 = mongoose.model("url-tbl", urlSchema);

console.log(`insert a test data to MongoDB tbl test-data-tbl ${lNr()}`);
const testDataModel = mongoose.model("test-data-tbl", urlSchema);

y81 = new testDataModel({
  original_url: `HiYou : ${lNr()}`,
  short_url: 13,
  lNr: lNr()
});
y81.save().then(() => {
  // Document saved successfully
}).catch((error) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    // Handle duplicate key error
    console.log(`${lNr()}`);
    console.log(`duplicate key error. good and correct :) ${lNr()}`);
  } else {
    console.log(`\n/‾‾‾ error ‾‾‾‾‾‾‾‾‾${lNr()} ${error.name}`);
    console.log(error);
    console.log(`\n\\___ error _________${lNr()} ${error.name}\n`);
  }
});
//  console.log(`cant save test data. maybe drop old data first? ${lNr()}`);

/*
const result = urlSchema.find({
  short_url: { $gt: 0 },
});
console.log(result);
*/


// urlModel13.collection.drop(); // empty from database
console.log(`collection.name = ${urlModel13.collection.name}${lNr()}`); // works

// let test = urlSchema.sort({ short_url: -1, original_url: 1 });
// console.log("${test}${lNr()}"); // works


// console.log(urlModel13.collection); // works

if (false) { // learn a bit more about the model here
  let lastValue = urlModel13.findOne().sort({ field: 'asc', _id: -1 }).limit(1)

  let last_short_url = lastValue.short_url;
  console.log(`last_short_url = ${last_short_url} ${lNr()}`);

  let original_url = {}
  // let original_url = lastValue.original_url; 
  // let original_url = lastValue.schema.paths.original_url; // works but useless for me
  // original_url = lastValue.tree.paths.original_url; // works but useless for me
  console.log(`original_url = ${original_url} ${lNr()}`);
  console.log(original_url);

  console.log(`lastValue ${lNr()}`);
  console.log(`\n/‾‾‾ lastValue ‾‾‾‾‾‾‾‾‾${lNr()}`);
  console.log(lastValue);
  console.log(`\n\\___ lastValue _________${lNr()}\n`);
}


// urlModel13.paths.short_url

let urlDoc;
console.log(`let urlDoc ${lNr()}`);

app.use(express.urlencoded({ extended: true })); // Body parser middleware

app.get("/api/:shorturl", async (req, res) => {
  console.log(`\n/‾‾‾ req.params ‾‾‾‾‾‾‾‾‾${lNr()}`);
  console.log(req.params);
  console.log(`\n\\___ req.params _________${lNr()}\n`);
});
app.get("/api/shorturl", async (req, res) => {
  console.log(`\n/‾‾‾ req.params ‾‾‾‾‾‾‾‾‾${lNr()}`);
  console.log(req.params);
  console.log(`\n\\___ req.params _________${lNr()}\n`);
});
app.get("/api/shorturl", async (req, res) => {
  console.log(`\n/‾‾‾ req.params ‾‾‾‾‾‾‾‾‾${lNr()}`);
  console.log(req.params);
  console.log(`\n\\___ req.params _________${lNr()}\n`);
});

app.get("/", (req, res) => {
  console.log(`\n/‾‾‾ req.query ‾‾‾‾‾‾‾‾‾${lNr()}`);
  console.log("GET Query Params:", req.query); // Log GET query 
  console.log(`\n\\___ req.query _________${lNr()}\n`);
  res.send("Hello req.query!");
});

app.post("/data", (req, res) => {
  console.log(`\n/‾‾‾ post req.body ‾‾‾‾‾‾‾‾‾${lNr()}`);
  console.log(req.body); // Log post
  console.log(`\n\\___ post req.body _________${lNr()}\n`);
  res.status(201).json({ status: "Hello post req.body!" });
});

app.get("/api/shorturl/:{id}", async (req, res) => {

  // console.log(`${lNr()}: received query params:`);
  // console.log( req.query );

  console.log(`\n/‾‾‾ req.headers ‾‾‾‾‾‾‾‾‾${lNr()}`);
  console.log(req.headers);
  console.log(`\n\\___ req.headers _________${lNr()}\n`);

  console.log(`\n/‾‾‾ req.params ‾‾‾‾‾‾‾‾‾${lNr()}`);
  console.log(req.params);
  console.log(req.params.id);
  const { query } = req;
  Object.keys(query).forEach(key => {
    console.log(`${key}:`);
    console.log(query[key]);
  });
  console.log(`\n\\___ req.params _________${lNr()}\n`);

  res.json({ test: `${lNr()} stop running this script here becouse i want test something else at the moment.` });
  return;



  let id = req.params.id;

  const logId = mongoose.model("log-id-url", urlSchema);
  temp = new logId({
    original_url: id,
    short_url: id,
    lNr: lNr()
  });
  temp.save();


  if (!id || id == 'undefined') {
    if (id == 'undefined') {
      console.log(`id to string = ${id.toString()} ${lNr()}`);
      console.log(id);
    }
    res.json({ error: 'invalid url' });
    return;
  }
  console.log(`/api/shorturl/:id  id = ${id} ${lNr()}`);
  let url = urlModel13.findOne({ short_url: id })
  console.log(`/api/shorturl/:id \n search ${id} result: url.original_url = \n${url.original_url} ${lNr()}`);

  console.log(urlModel13);

  res.redirect(url.original_url);
  //res.json(url); // JSON response with original_url and short_url
})

app.get("/apiOFFFFF/shorturl/id", async (req, res) => {
  let id = req.params.id
  console.log(`/api/shorturl/ id: id = ${id} ${lNr()}`);
  let url = urlModel13.findOne({ short_url: id })
  console.log(`44: id = ${id} = url.original_url = ${url.original_url} ${lNr()}`);
  //res.redirect(url.original_url)
  res.json(url); // JSON response with original_url and short_url
})

app.post('/api/shorturl', function(req, res) {

  if (false) {
    console.log(`\n/‾‾‾ req.headers ‾‾‾‾‾‾‾‾‾${lNr()}`);
    console.log(req.headers);
    console.log(`\n\\___ req.headers _________${lNr()}\n`);
  }

  console.log(`\n/‾‾‾ req.params ‾‾‾‾‾‾‾‾‾${lNr()}`);
  console.log(req.params);
  console.log(`\n\\___ req.params _________${lNr()}\n`);


  let original_url = req.body.url

  const logOriginalUrl = mongoose.model("log-original-url", urlSchema);
  temp = new logOriginalUrl({
    original_url: original_url,
    short_url: 1,
    lNr: lNr()
  });
  temp.save();


  /*
  if (!/(https?:\/\/)/.test(original_url)) return res.send({ error: "invalid original_url" })
  let urlDns = original_url.replace(original_url.match(/(https?:\/\/)/)[0], "")

  const isUriValid = validUrl.isUri(original_url); 
  */

  console.log(`/api/shorturl original_url = ${original_url} ${lNr()}`);


  if (isValidUrl(original_url)) {
    // let lastKey = urlModel13.keys(urlModel13).pop()
    // let lastValue = urlModel13[Object.keys(urlModel13).pop()]

    let lastValue = urlModel13.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    let last_short_url = lastValue.short_url;
    console.log(`last_short_url = ${last_short_url} ${lNr()}`);

    //const client = MongoClient.connect(uri, { useNewUrlParser: true });
    //const client = await MongoClient.connect(uri, { useNewUrlParser: true });

    if (false) {
      console.log(`lastValue ${lNr()}`);
      console.log(`\n/‾‾‾ lastValue ‾‾‾‾‾‾‾‾‾${lNr()}`);
      console.log(lastValue);
      console.log(`\n\\___ lastValue _________${lNr()}\n`);
    }

    try {
      const db = client.db(dbName);
      short_url = generate_short_url(db);
      urlDoc = new urlModel13({
        original_url: original_url,
        short_url: short_url,
        lNr: lNr()
      });
      urlDoc.save(); // to MongoDB
    } finally {
      client.close();
      res.json({ error: 'invalid url' });
      console.log(`/api/shorturl invalid HostName ${lNr()}`);
      return;
    }

    // display all saved
    const allurlDoc = urlModel13.find(); // works
    const allurlDoc2 = mongoose.model("urlModel13", urlSchema);
    if (true) {
      console.log(`allurlDoc ${lNr()}`);
      console.log(allurlDoc);
    }
    if (false) {
      console.log(`allurlDoc2 ${lNr()}`);
      console.log(allurlDoc2);
    }

    console.log(`/api/shorturl save: $original_url = \n${original_url}\n ${lNr()}`);
    console.log(`/api/shorturl \n o: ${urlDoc.original_url} = \n s: ${urlDoc.short_url}\n ${lNr()}`);

    console.log(urlDoc);

    const JSONresponse = { original_url: urlDoc.original_url, short_url: urlDoc.short_url };
    console.log(`/api/shorturl JSONresponse = ${lNr()}`);
    console.log(JSONresponse);

    res.json(JSONresponse);
    return;
  } else {
    res.json({ error: 'invalid url' });
    console.log(`/api/shorturl invalid HostName ${lNr()}`);
    return;
  }
  console.log(`/api/shorturl EndOf${lNr()}`);
  res.json({ error: 'invalid url' });
});

function isValidUrl(url) {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }

  if (typeof url != "string"
    || url.length <= 5
    || url.slice(0, 5) == 'ftp:/') {
    console.log(`not falid ${url} EndOf${lNr()}`);
    return false;
  }
  console.log(`falid i guess ${url} ${lNr()}`);

  const { hostname } = new URL(url);

  return new Promise(resolve => {
    dns.lookup(hostname, error => {
      resolve(!error);
    })
  });
}

app.get("/api", async (req, res) => {
  console.log(`71: ${lNr()}`);
  const urls = urlModel13.find({})
  res.json(urls)
});

app.get("/api/delete", async (req, res) => {
  console.log(`77: ${lNr()}`);
  urlModel13.deleteMany({})
  res.send("deleted")
})





app.post('/apiNODB/shorturl', (req, res) => {
  console.log(`87: ${lNr()}`);
  const original_url = req.body.url;

  const url_regex = /^(https?):\/\/(.*)$/;
  if (!url_regex.test(original_url)) {
    return res.json({ error: 'invalid url' });
  }

  const parsed_url = new URL(original_url);
  const hostname = parsed_url.hostname;
  dns.lookup(hostname, (err) => {
    if (err && err.code === 'ENOTFOUND') {
      return res.json({ error: 'invalid url' });
    }

    //  const short_url = 1;

    const id = shortid.generate();
    console.log('id = ' + id);

    urls[id] = original_url;

    res.json({
      original_url,
      short_url: id
    });
  });
});

function generate_short_url(db) {
  const lastDocument = dbMongo.collection('urls').findOne({}, { sort: { shortCode: -1 } });

  return lastDocument ? lastDocument.short_url + 1 : 0;
}

function getOriginalURL(shortID, urlObject) {
  const result = urlObject.filter(obj => obj.short_url === shortID);
  if (result.length > 0) {
    return result[0].original_url;
  } else {
    throw new Error('shortURL does not exist in the database');
  }
}

app.get("/apiOLD/shorturl/:short_url", (req, res) => {
  const { short_url } = req.params;

  const original_url = getOriginalURL(short_url, urls)

  // res.redirect(originalUrl);
  res.json({
    original_url,
    short_url: id
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port} ${lNr()}`);
});

function onlyNumbers(text) {
  // return text.replace(/\D/g, "");
  // return text;
  return text.replace(/.*?\.js:(\d+)\:.*/g, "$1");

}

function lNr() { // lineNr
  let line;
  const _prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => {
    line = stack[1].getLineNumber();
  };
  const e = new Error();
  e.stack;
  Error.prepareStackTrace = _prepareStackTrace;

  return ' ' + line + ' ';
}
