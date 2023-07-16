function addNewItem(){
    var name = document.getElementById('name_input').value;
    var description = document.getElementById("description_input").value;
    var place = document.getElementById("place_input").value;
 
    var newItem = {
        name:name,
        description: description,
        place:place
    }
 
    console.log(newItem);
    alert(newItem.name)
    alert(newItem.description)
    alert(newItem.place)
 }
 // Import untuk menghantar ke index.js
var electron = require('electron');
var {ipcRenderer} = electron;

function addNewItem(){
   var name = document.getElementById('name_input').value;
   var description = document.getElementById("description_input").value;
   var place = document.getElementById("place_input").value;

   var newItem = {
       name:name,
       description: description,
       place:place
   }
// Menghantar ke index.js
 ipcRenderer.send('item:add',newItem);
}
