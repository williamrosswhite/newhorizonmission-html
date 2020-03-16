function hide_add_artist_div() {
    var new_artist_div = document.getElementById("new_artist_div_id");
    new_artist_div.classList.toggle("hidden");
}

function initial_hide() {
    hide_add_artist_div();
}

function add_artist() {


    // generating elements
    var added_artist_div = document.createElement('div');
    added_artist_div.classList.add('artist');

    var new_artist_name = document.createElement('p');
    var new_artist_about = document.createElement('h2');
    var new_artist_img = document.createElement('img');
    var new_artist_delete_btn = document.createElement('button');
    new_artist_delete_btn.classList.add('delete_btn');
    // new_artist_delete_btn.addEventListener("click", delete_artist(this));
    new_artist_delete_btn.addEventListener("click", function () {
        delete_artist(new_artist_delete_btn);
    });


    // // getting existing elements
    var artist_div = document.getElementById('artist_app_id');

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
    added_artist_div.appendChild(new_artist_about);
    added_artist_div.appendChild(new_artist_name)

    // pasting div
    artist_list_div = document.getElementById('artist_app_id');
    artist_list_div.appendChild(added_artist_div);

    clear_fields();
    hide_add_artist_div();

}


function clear_fields() {

    // clears the input fields
    var new_artist_name_text = document.getElementById("new_artist_name_field");
    var new_artist_about_text = document.getElementById("new_artist_about_field");
    var new_artist_img_url = document.getElementById("new_artist_img_field");
    new_artist_name_text.value = "";
    new_artist_about_text.value = "";
    new_artist_img_url.value = "";

}

function delete_artist(button) {

    // gets button, gets its parent, then get ITS parent, and then remove that child
   var garbage_artist_div = button.parentNode;
    garbage_artist_div.remove();

}

