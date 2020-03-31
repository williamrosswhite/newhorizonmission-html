let express = require('express')
let app = express();
// let bodyParser = require('body-parser');
let path = require('path');
// let http = require('http');
var fs = require('fs');
// let mod = require('../test_wubb');
const router = express.Router();


// intend to put this in its own file once i figure out how
app.post('/', (req, res) => {

    // getting input data from sending form
    const form_new_artist_name = req.body.new_artist_name_field
    const form_new_artist_about = req.body.new_artist_about_field
    const form_new_artist_img = req.body.new_artist_img_field

    // creating a text html node
    var new_artist_string = '<div class="artist">'
        + '<button class="delete_btn">Delete</button>'
        + '<img alt="image not found" src="' + form_new_artist_img + '">'
        + '<h2>' + form_new_artist_name + '</h2>'
        + '<p>' + form_new_artist_about + '</p></div>'

    console.log(new_artist_string)

    fs.writeFile("artists.json", new_artist_string, "utf8", (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File successfully written to!");
        }
    });

    res.end()

});