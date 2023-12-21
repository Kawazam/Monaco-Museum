//------------------------------------------------------------------------------
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
  inventorySceneUUID,
} from "./config.js";

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

//------------------------------------------------------------------------------
window.addEventListener("load", InitApp);


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


//------------------------------------------------------------------------------
async function InitApp() {
  await SDK3DVerse.joinOrStartSession({
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    canvas: document.getElementById("display-canvas"),
    createDefaultCamera: false,
    startSimulation: "on-assets-loaded",
  });
  await InitFirstPersonController(characterControllerSceneUUID);
  const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID('7875aa33-7421-47b0-bcba-884aed856227');
  console.log(entities);
  let scriptComponent = entities[0].getComponent("script_map");
  console.log(entities);
  console.log("is Swimming = ",scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
  
  const engineOutputEventUUID = "42830dc6-ca1e-4f4c-9f2a-ede6d436a964";
  SDK3DVerse.engineAPI.registerToEvent(engineOutputEventUUID, "log", (event) => console.log(event.dataObject.output));

  SDK3DVerse.engineAPI.onExitTrigger((emitterEntity, triggerEntity) =>
  {
      console.log(emitterEntity, " exited trigger of ", triggerEntity);
      
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"] = 0;
      console.log(scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
      entities[0].setComponent("script_map", scriptComponent);
      console.log("is Swimming = ",scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
  });
  SDK3DVerse.engineAPI.onEnterTrigger((emitterEntity, triggerEntity) =>
  {
      console.log(emitterEntity, " enter trigger of ", triggerEntity);
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"] = 1;
      console.log(scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
      entities[0].setComponent("script_map", scriptComponent);
      console.log("is Swimming = ",scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
  });
  await SplinesForFishes();
  
}

//------------------------------------------------------------------------------
async function InitFirstPersonController(charCtlSceneUUID) {
  // To spawn an entity we need to create an EntityTempllate and specify the
  // components we want to attach to it. In this case we only want a scene_ref
  // that points to the character controller scene.
  const playerTemplate = new SDK3DVerse.EntityTemplate();
  playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });

  // Passing null as parent entity will instantiate our new entity at the root
  // of the main scene.
  const parentEntity = null;
  // Setting this option to true will ensure that our entity will be destroyed
  // when the client is disconnected from the session, making sure we don't
  // leave our 'dead' player body behind.
  const deleteOnClientDisconnection = true;
  // We don't want the player to be saved forever in the scene, so we
  // instantiate a transient entity.
  // Note that an entity template can be instantiated multiple times.
  // Each instantiation results in a new entity.
  const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
    "Player",
    parentEntity,
    deleteOnClientDisconnection
  );

  // The character controller scene is setup as having a single entity at its
  // root which is the first person controller itself.
  const firstPersonController = (await playerSceneEntity.getChildren())[0];
  // Look for the first person camera in the children of the controller.
  const children = await firstPersonController.getChildren();
  const firstPersonCamera = children.find((child) =>
    child.isAttached("camera")
  );

  // We need to assign the current client to the first person controller
  // script which is attached to the firstPersonController entity.
  // This allows the script to know which client inputs it should read.
  SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);
  
  // Finally set the first person camera as the main camera.
  SDK3DVerse.setMainCamera(firstPersonCamera);
  
}

//------------------------------------------------------------------------------
const anim = new TravelAnimation();

//------------------------------------------------------------------------------
window.fishes = {};
async function SplinesForFishes()
{
  await anim.init();
  //const cube = (await SDK3DVerse.engineAPI.findEntitiesByEUID('51efcfcc-4888-45a9-8b39-736769f0f60a'))[0];
  //const spline = (await SDK3DVerse.engineAPI.findEntitiesByEUID('70842758-a1bf-4b04-b29b-5c9b24808f98'))[0];

  const rootEntities = await SDK3DVerse.engineAPI.getRootEntities();
  const fishesEntity = rootEntities.find(entity => {
    return entity.getName() === 'fishes';
  });

  const fishEntities = await fishesEntity.getChildren();
  for(const fish of fishEntities) {
    const children = await fish.getChildren();
    const fishMesh = children.find(e => e.getName() === 'mesh');
    const fishPath = children.find(e => e.getName() === 'spline_path');

    const travellingSpline = findTravellingSplineFromEntity(fishPath);

    if(!travellingSpline) {
      console.error('Travelling spline not found for entity', fishPath.getName());
      continue;
    }

    fishes[fish.getID()] = { 
      travelling: true,
      fish,
      fishMesh,
      fishPath,
      travellingSpline
    };
    loopOnFishSplineTravel(fishes[fish.getID()], fishMesh, travellingSpline, 4, 0.1);
  }
}

//------------------------------------------------------------------------------
async function loopOnFishSplineTravel(fish, entity, spline, speed, delay)
{
  while(fish.travelling)
  {
    await anim.gotoSplineAndTravel(entity, spline, speed, delay);
  }
}

//------------------------------------------------------------------------------
function findTravellingSplineFromEntity(entity) {
  return anim.splines.find(s => s.parentEntity.getEUID() === entity.getEUID());
}

//-----------------------------------------------------------------------------

// Fonction pour afficher le terminal avec anim
function afficherModale() {
    const modal = document.getElementById('maModal');
    const body = document.body;
    modal.style.display = 'block';
    body.classList.add('body-overlay');
    setTimeout(() => {
        modal.classList.add('show');
    }, 1000); // Delay the addition of 'show' class for the animation to take effect
}

// Fonction pour fermer le terminal
function fermerModale() {
    const modal = document.getElementById('maModal');
    const body = document.body;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        body.classList.remove('body-overlay');
    }, 1000); // Delay the removal of 'show' class for the animation to take effect
}

// Fermer le terminal lorsque l'utilisateur clique en dehors de la zone
window.onclick = function (event) {
    const modal = document.getElementById('maModal');
    const body = document.body;
    if (event.target === modal) {
        fermerModale();
    }
};

// Fonction pour valider le contenu du terminal
function validerModal() {
    const nom = document.getElementById('nom').value;
    const message = document.getElementById('message').value;

    // Vous pouvez faire quelque chose avec les valeurs, par exemple, les afficher dans la console
    console.log('Nom:', nom);
    console.log('Message:', message);

    // Fermer la fen�tre modale apr�s validation
    fermerModale();
}