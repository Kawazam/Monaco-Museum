import {publicToken, inventorySceneUUID} from "./config.js";

const inventoryJson = require("./inventory.json");

var menu_display  = false;
var inventory     = true;
var stats         = false;
var map           = false;

var inventory_table = "";

const button_inventory      = document.querySelector("#menu-menubar-title-inventory");
const button_stats          = document.querySelector("#menu-menubar-title-stats");
const button_map            = document.querySelector("#menu-menubar-title-map");

const display_inventory     = document.querySelector("#menu-bloc-inventory");

for(let i = 1; i < 7; i++) {
  for(let j = 1; j < 5; j++) {
    inventory_table += '<div class="menu-bloc-inventory-cell" id="inventory-cell'+i*j+'" style="left: '+((i-1)*15+i*1.4)+'%; top: '+((j-1)*20+j*4)+'%;"></div>';
  }
}

display_inventory.innerHTML = inventory_table;


//window.addEventListener("load", InitApp); //Init 3DVerse SDK
document.addEventListener("keydown", checkKeyPress); //Toggle Inventory display

//Toggle menu section
button_inventory.addEventListener("click", function(){
  inventory = true;
  stats = map = false;
  toggleMenuSection();
});
button_stats.addEventListener("click", function(){
  stats = true;
  inventory = map = false;
  toggleMenuSection();
});
button_map.addEventListener("click", function(){
  map = true;
  inventory = stats = false;
  toggleMenuSection();
});


async function InitApp() {
    await SDK3DVerse.joinOrStartSession ({
            userToken: publicToken,
            sceneUUID: inventorySceneUUID,
            canvas: document.getElementById("display-canvas"),
            viewportProperties: {
                defaultControllerType: SDK3DVerse.controller_type.orbit,
            },
    });
}


function checkKeyPress(event) {
  const key = event.key;
  if (key==='i') {
    menu_display = !menu_display;
  }

  if (menu_display) {
    document.querySelector("#menu").style.visibility = "visible";
    document.querySelector("#menu-bloc-inventory").style.visibility = inventory ? "visible" : "hidden";
    for (let element of document.querySelectorAll(".menu-bloc-inventory-cell")) element.style.visibility = inventory ? "visible" : "hidden";
    document.querySelector("#menu-bloc-stats").style.visibility = stats ? "visible" : "hidden";
    document.querySelector("#menu-bloc-map").style.visibility = map ? "visible" : "hidden";
  } else {
    document.querySelector("#menu").style.visibility = "hidden";
    document.querySelector("#menu-bloc-inventory").style.visibility = "hidden";
    for (let element of document.querySelectorAll(".menu-bloc-inventory-cell")) element.style.visibility = "hidden";
    document.querySelector("#menu-bloc-stats").style.visibility = "hidden";
    document.querySelector("#menu-bloc-map").style.visibility = "hidden";
    document.querySelector("#display-canvas").focus();
  }
}


function toggleMenuSection() {
  button_inventory.classList.toggle("selected_title", inventory);
  button_stats.classList.toggle("selected_title", stats);
  button_map.classList.toggle("selected_title", map);

  document.querySelector("#menu-bloc-inventory").style.visibility = inventory ? "visible" : "hidden";
  for (let element of document.querySelectorAll(".menu-bloc-inventory-cell")) element.style.visibility = inventory ? "visible" : "hidden";
  document.querySelector("#menu-bloc-stats").style.visibility = stats ? "visible" : "hidden";
  document.querySelector("#menu-bloc-map").style.visibility = map ? "visible" : "hidden";
}


function test() {
  for(let i = 0; i < inventoryJson.coraux.length; i++) {
    for(let j = 0; j < 24; j++) {
      if(document.querySelector("#inventory-cell"+j).innerHTML === "") {
        document.querySelector("#inventory-cell"+j).innerHTML = inventoryJson.coraux[i].type + " : " + inventoryJson.coraux[i].quantity;
        break;
      }
    }
  }
}
