let express = require('express')
let app = express()
// let bodyParser = require('body-parser')
let path = require('path')
// let http = require('http')
var fs = require('fs')
// var url = require('url')
const fetch = require("node-fetch")

// app.use(express.urlencoded())

app.use(express.static(path.join(__dirname, 'public')))

// my site template as string
var index_string_above = '<!DOCTYPE html><html><head>'
    + '<title>Ross White COMP 4711 Lab 5 Home Page</title>'
    + '<link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">'
    + '<link rel="stylesheet" type="text/css" href="/css/lab05_CSS.css">'
    + '<script src="/javascript/lab05_JS.js" defer></script></head>'
    + '<body onload="initial_hide()"></p>'
    + '<div id="artist_app_id" class="artist_app_class">'
    + '<div class="directory" id="directory">'
    + '<h1>Artist Directory</h1>'
    + '<input type="text" id="artist_input">'
    + '<button id="search_artist_btn" onclick="search_artist()">Search</button>'
    + '<button id="add_artist_btn" onclick="hide_add_artist_div()">Add</button><br><br></div>'
    + '<form id="new_artist_div_id" class="new_artist_div_class" method="POST" action="/">'
    + '<input type="text" id="new_artist_name_field" name="new_artist_name_field" required="true" maxlength="40" placeholder="Artist Name" class="artist_lookup_fields">'
    + '<input type="text" id="new_artist_about_field" name="new_artist_about_field" required="true" maxlength="40" placeholder="About artist" class="artist_lookup_fields">'
    + '<input type="text" id="new_artist_img_field" name="new_artist_img_field" required="true" placeholder="Image url" class="artist_lookup_fields"><br>'
    + '<input type="submit" id="add_btn" value="Add"></input></form>'
    + '<div id="saved_artists_div"></div>'

var index_string_below = '</div></div>'
    + '<br><br><div><form method="POST" action="/delete_all"><input type="submit" id="add_btn" value="Delete All Artitsts"></input></form></div></body></html>'


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// intend to put this in its own file once i figure out how
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    fs.readFile('artists.json', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.write(index_string_above)
            var parse_json = JSON.parse(data)
            for (var i = 0; i < parse_json.length; i++) {
                // creating a text html node
                var new_artist_string = '<div class="artist">'
                    + '<form method="POST" action="/delete_single"><input type="submit" name="jim" class="delete_btn" value="Delete"></input>'
                    // this is super ugly, must be a better way to do this
                    + '<input type="test" id="for_delete_reference" name="for_delete_reference" value="' + parse_json[i].name + '" style="display: none">'
                    + '<img alt="image not found" src="' + parse_json[i].img + '">'
                    + '<h2>' + parse_json[i].name + '</h2>'
                    + '<p name="' + parse_json[i].name + '">' + parse_json[i].about + '</p></div></form>'
                res.write(new_artist_string)
            }
            // here i want to write a scrit to load from backup json if json array empty
            res.write(index_string_below)
            res.end()
        }
    })
})


app.post('/delete_all', (req, res) => {

    fs.readFile('artists.json', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            // unhandled error, if file empty or doesn't exist, write fails and currently need the file with empty array notation
            fs.writeFile("artists.json", "[]", "utf8", (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("directory successfully cleared")
                }
            })
        }
    })
    res.writeHead(302, {
        'Location': '/'
    });
    res.end()
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// intend to put this in its own file once i figure out how
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/delete_single', (req, res) => {
    console.log("test single")
    const retrieved_artist_name = req.body.for_delete_reference
    console.log(retrieved_artist_name)
    fs.readFile('artists.json', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            var parse_json = JSON.parse(data)
            for (var i = 0; i < parse_json.length; i++) {
                // search and remove target JSON entry
                if (parse_json[i].name == retrieved_artist_name) {
                    console.log(parse_json)
                    console.log(retrieved_artist_name)
                    parse_json.splice(i, 1)
                    fs.writeFile("artists.json", JSON.stringify(parse_json), "utf8", (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("file updated successfully")
                        }
                    })
                }
            }
        }
    })
    res.writeHead(302, {
        'Location': '/'
    });
    res.end()
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// intend to put this in its own file once i figure out how
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/', (req, res) => {

    // getting input data from sending form
    const form_new_artist_name = req.body.new_artist_name_field
    const form_new_artist_about = req.body.new_artist_about_field
    const form_new_artist_img = req.body.new_artist_img_field

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // it would be nice to have some sort of auto incrementing value here
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    var new_artist_object = {
        name: form_new_artist_name,
        about: form_new_artist_about,
        img: form_new_artist_img
    }

    fs.readFile('artists.json', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            var parse_json = JSON.parse(data)
            parse_json.push(new_artist_object)
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            // unhandled error, if file empty or doesn't exist, write fails and currently need the file with empty array notation
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            fs.writeFile("artists.json", JSON.stringify(parse_json), "utf8", (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("file updated successfully")
                }
            })
        }
    })
    res.writeHead(302, {
        'Location': '/'
    });
    res.end()
})

console.log('wubbalubbadubdub')

app.listen(3000)

// working bare fetch
    // fetch('http://mysafeinfo.com/api/data?list=englishmonarchs&format=json')
    //     .then(function (data) {
    //         console.log("wubbhell")
    //         res.writeHead(302, {
    //             'Location': '/'
    //           });
    //         res.end()
    //     })




    /*
fetch('/getData')
    .then(function (data) { => d.json()).then(data => console.log(data));
    */


/////////////////////////////////////////////////////////////////////////////////////////////////
// this functionality now handled entirely server side
/////////////////////////////////////////////////////////////////////////////////////////////////
/*
function add_artist() {

    // generating elements
    var added_artist_div = document.createElement('div');
    added_artist_div.classList.add('artist');
    var new_artist_name = document.createElement('h2');
    var new_artist_about = document.createElement('p');
    var new_artist_img = document.createElement('img');
    new_artist_img.setAttribute('alt', "image not found");
    var new_artist_delete_btn = document.createElement('button');
    new_artist_delete_btn.classList.add('delete_btn');
    new_artist_delete_btn.addEventListener("click", function () {
        delete_artist(new_artist_delete_btn);
    });

    // // getting text from existing elements
    var new_artist_name_text = document.getElementById("new_artist_name_field").value;
    var new_artist_about_text = document.getElementById("new_artist_about_field").value;
    var new_artist_img_url = document.getElementById("new_artist_img_field").value;

    // apply values to objects
    new_artist_name.textContent = new_artist_name_text;
    new_artist_about.textContent = new_artist_about_text;
    new_artist_img.src = new_artist_img_url;

    // creating div
    new_artist_delete_btn.innerText = "Delete";
    added_artist_div.appendChild(new_artist_delete_btn);
    added_artist_div.appendChild(new_artist_img);
    added_artist_div.appendChild(new_artist_name)
    added_artist_div.appendChild(new_artist_about);
    var artist_string = added_artist_div.innerHTML;

    // pasting div
    artist_list_div = document.getElementById('saved_artists_div');
    artist_list_div.appendChild(added_artist_div);

    add_artist_to_local_storage(new_artist_name_text, added_artist_div);
    clear_fields();
    hide_add_artist_div();
}
*/

/////////////////////////////////////////////////////////////////////////////////////////////////
// this functionality now handled entirely server side
/////////////////////////////////////////////////////////////////////////////////////////////////
/*
function add_artist_to_local_storage(new_artist_name_text, new_artist_div) {

    // putting object in local storage
    localStorage.setItem(new_artist_name_text, new_artist_div.innerHTML);
}
*/

/////////////////////////////////////////////////////////////////////////////////////////////////
// this functionality now handled entirely server side
/////////////////////////////////////////////////////////////////////////////////////////////////
/*
function load_existing_artists() {

    // while loop to capture all local storage elements
    for (var i = 0; localStorage.getItem(localStorage.key(i)) != null; i++) {
        var new_div = document.createElement('div');
        var running_artist_add = localStorage.getItem(localStorage.key(i));
        new_div.innerHTML = running_artist_add;
        new_div.classList.add('artist');
        var child_node_array = new_div.childNodes;
        var child_delete_btn = child_node_array[0];
        child_delete_btn.classList.add('delete_btn')
        child_delete_btn.addEventListener("click", function () {
            delete_artist(child_delete_btn);
        });

        // adding divs to master artist element
        artist_list_div = document.getElementById('saved_artists_div');
        artist_list_div.appendChild(new_div);
    }
}
*/

/////////////////////////////////////////////////////////////////////////////////////////////////
// this functionality now handled entirely server side
/////////////////////////////////////////////////////////////////////////////////////////////////
/*
function search_artist() {

    // getting the searchable string
    var artist_search_name = document.getElementById("artist_input").value;
    var artist_directory = document.getElementById("saved_artists_div");
    var directory_node_array = artist_directory.children;

    // search through all of the elements
    for (var i = 0; i < directory_node_array.length; i++) {
        var name_check_div = document.createElement('div');
        name_check_div = directory_node_array[i];
        var name_check_div_element_array = name_check_div.children;
        name_to_check_string = name_check_div_element_array[2];
        var searched_name = name_to_check_string.innerHTML.toLowerCase();
        if (!searched_name.includes(artist_search_name.toLowerCase())) {
            directory_node_array[i].classList.toggle("hidden");
        }
    }
}
*/

/////////////////////////////////////////////////////////////////////////////////////////////////
// this functionality now handled entirely server side
/////////////////////////////////////////////////////////////////////////////////////////////////
/*
function clearLocal() {

    // confirming delete
    if (confirm("Are you sure you want to delete all of your artists?")) {
        alert("Can do!");
        localStorage.clear();
        location.reload();
    } else {
        alert("Deletion cancelled.");
    }
}
*/

/////////////////////////////////////////////////////////////////////////////////////////////////
// this functionality now handled entirely server side
/////////////////////////////////////////////////////////////////////////////////////////////////
/*
function clear_fields() {

    // clears the input fields
    var new_artist_name_text = document.getElementById("new_artist_name_field");
    var new_artist_about_text = document.getElementById("new_artist_about_field");
    var new_artist_img_url = document.getElementById("new_artist_img_field");
    new_artist_name_text.value = "";
    new_artist_about_text.value = "";
    new_artist_img_url.value = "";
}
*/

/////////////////////////////////////////////////////////////////////////////////////////////////
// this functionality now handled entirely server side
/////////////////////////////////////////////////////////////////////////////////////////////////
/*
function delete_artist(button) {

    // grabs parent node, grabs child array, selects artist name from array,
    //      removes node from local storage
    var garbage_artist_div = button.parentNode;
    var garbage_node_array = garbage_artist_div.childNodes;
    var node_to_remove = document.createElement('div');
    node_to_remove.innerHTML = garbage_node_array[2].innerHTML;
    localStorage.removeItem(node_to_remove.innerHTML);

    // gets button, gets its parent, then get ITS parent, and then remove that child
    // removes from current page
    var garbage_artist_div = button.parentNode;
    garbage_artist_div.remove();

    // reloads page
    location.reload();
}
*/

