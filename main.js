//##############################################################################
//#                                 IMPORTS                                    #
//##############################################################################

//------------------------------------------------------------------------------
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
  //inventorySceneUUID,
} from "./config.js";

//------------------------------------------------------------------------------
import {
  coral_list,
  coral_map,
  Coral_1,
  Coral_2,
  Coral_3,
  Coral_4,
  Coral_5,
  Coral_6,
  Coral_7,
  Coral_8,
} from "./Coral.js";

//------------------------------------------------------------------------------
import TravelAnimation from "./travelAnimation.js";

//##############################################################################



//##############################################################################
//#                               INVENTORY                                    #
//##############################################################################

//------------------------------------------------------------------------------
//const inventoryJson = require("./inventory.json");

//------------------------------------------------------------------------------
var menu_display  = false;
var inventory     = true;
var stats         = false;
var map           = false;

var inventory_table = "";

const button_inventory      = document.querySelector("#menu-menubar-title-inventory");
const button_stats          = document.querySelector("#menu-menubar-title-stats");
const button_map            = document.querySelector("#menu-menubar-title-map");

const display_inventory     = document.querySelector("#menu-bloc-inventory");

//------------------------------------------------------------------------------
for(let i = 1; i < 7; i++) {
  for(let j = 1; j < 5; j++) {
    inventory_table += '<div class="menu-bloc-inventory-cell" id="inventory-cell'+i*j+'" style="left: '+((i-1)*15+i*1.4)+'%; top: '+((j-1)*20+j*4)+'%;"></div>';
  }
}

//------------------------------------------------------------------------------
display_inventory.innerHTML = inventory_table;

//------------------------------------------------------------------------------
//Toggle Inventory display
document.addEventListener("keydown", CheckKeyPress);

//------------------------------------------------------------------------------
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
function CheckKeyPress(event) {
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

//------------------------------------------------------------------------------
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
/*function test() {
  for(let i = 0; i < inventoryJson.coraux.length; i++) {
    for(let j = 0; j < 24; j++) {
      if(document.querySelector("#inventory-cell"+j).innerHTML === "") {
        document.querySelector("#inventory-cell"+j).innerHTML = inventoryJson.coraux[i].type + " : " + inventoryJson.coraux[i].quantity;
        break;
      }
    }
  }
}*/
//##############################################################################



//##############################################################################
//#                                  GLOBAL                                    #
//##############################################################################

//------------------------------------------------------------------------------
window.addEventListener("load", InitApp);

//------------------------------------------------------------------------------
async function InitApp() {

  //show loading page-------------------------------------------------------------
  document.querySelector("#loading-page").style.visibility = "visible";
  
  //------------------------------------------------------------------------------
  let canvas = document.getElementById("display-canvas");
  
  //------------------------------------------------------------------------------
  await SDK3DVerse.startSession({
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    // sceneUUID: inventorySceneUUID,
    canvas: document.getElementById("display-canvas"),
    createDefaultCamera: false,
    startSimulation: "on-assets-loaded",
  });
  
  //------------------------------------------------------------------------------
  await InitFirstPersonController(characterControllerSceneUUID);
  
  //------------------------------------------------------------------------------
  canvas.addEventListener('mousedown', () => setFPSCameraController(canvas));
  
  //------------------------------------------------------------------------------
  await SplinesForFishes();
  
  //star animation 'moon-sun-anim' and 'butterfly-fish-2'-------------------------
  SDK3DVerse.engineAPI.playAnimationSequence('26eef687-a9c6-4afd-9602-26c5f74c62f8', { playbackSpeed : 15.0 }); //'moon-sun-animation'
  SDK3DVerse.engineAPI.playAnimationSequence('1d3f545a-afbd-4c31-af06-8737b012b5bd', { playbackSpeed : 1.0 }); //'butterfly-fish-2'
  
  //hide loading page-------------------------------------------------------------
  document.querySelector("#loading-page").style.visibility = "hidden";

  //------------------------------------------------------------------------------
  document.addEventListener('keydown', function(event) {
    // Vérifie si la touche pressée est 't'
    if (event.key === 't') {
        // Vérifie si islampvisible est true
        if (islampvisible === true) {
          lamp[0].setVisibility(islampvisible);
          console.log("lamp allumé")
            // Change la valeur de islampvisible à false
            islampvisible = false;
        }
        else if (islampvisible === false) {
          lamp[0].setVisibility(islampvisible);
            // Change la valeur de islampvisible à false
            islampvisible = true;
            console.log("lampe éteinte")
        }
    }
  });

  //------------------------------------------------------------------------------
  var TimeSetMenuDisplay = false;
  
  const Couch = await SDK3DVerse.engineAPI.findEntitiesByEUID('347659d6-bd3f-44f4-b816-bd2837ed82d0');
  const InsideHubDoorToOutside = await SDK3DVerse.engineAPI.findEntitiesByEUID('3f1d3498-dd14-49df-a6e5-bb13281095d5');
  const OutsideHubDoorToInside = await SDK3DVerse.engineAPI.findEntitiesByEUID('3c3b76c9-1b50-4f4e-9386-0566896a55ce');
  const ToLaboratoryDoor = await SDK3DVerse.engineAPI.findEntitiesByEUID('24145957-9a15-4752-9b0e-359e14b5ba8e');
  const ToHubDoor  = await SDK3DVerse.engineAPI.findEntitiesByEUID('299e8f24-53fa-4bf5-b6b3-979a0348dc60');
  const ToHubTpPoint = await SDK3DVerse.engineAPI.findEntitiesByEUID('a0854b06-1e4e-4d2f-abf2-b6f2790e75ed');
  const ToLabTpPoint = await SDK3DVerse.engineAPI.findEntitiesByEUID('461d6d0c-7251-47c2-8da3-b3d610710347');
  const InsideTpPoint  = await SDK3DVerse.engineAPI.findEntitiesByEUID('075dfe39-7699-4976-9504-2d30d95eef7a');
  const OutsideTpPoint = await SDK3DVerse.engineAPI.findEntitiesByEUID('c34c10e9-071f-41e8-83ea-c8af395ed420');
  const InteractZonePLayer = await SDK3DVerse.engineAPI.findEntitiesByEUID('67919a03-7107-402a-a87e-4027311d9ec6');
  const lamp = await SDK3DVerse.engineAPI.findEntitiesByEUID('f95f32ec-fa18-410a-967d-7be768c539d1');

  const ButtonDay = document.querySelector("#time-set-day");
  const ButtonMidday = document.querySelector("#time-set-midday");
  const ButtonNight = document.querySelector("#time-set-night");
  const ButtonMidnight = document.querySelector("#time-set-midnight");
  
  //------------------------------------------------------------------------------
  let islampvisible = false;
  let zone;
  const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID('7875aa33-7421-47b0-bcba-884aed856227');
  console.log(entities);
  let scriptComponent = entities[0].getComponent("script_map");
  console.log(entities);
  console.log("is Swimming = ",scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
  
  //------------------------------------------------------------------------------
  const engineOutputEventUUID = "42830dc6-ca1e-4f4c-9f2a-ede6d436a964";
  SDK3DVerse.engineAPI.registerToEvent(engineOutputEventUUID, "log", (event) => console.log(event.dataObject.output));
  let outsideTrigger = false;
  
  //------------------------------------------------------------------------------
  function TeleportInside(event) {
    if (event.key === 'e') {
      if (outsideTrigger === true){
        const inside = InsideTpPoint[0].getGlobalTransform();
        entities[0].setGlobalTransform(inside);
        scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"] = 0;
        console.log(scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
        entities[0].setComponent("script_map", scriptComponent);
        setTimeout(()=>{SDK3DVerse.engineAPI.assignClientToScripts(entities[0])}, 100);
        document.removeEventListener('keydown', TeleportInside);
      }
    }
  }
  
  //------------------------------------------------------------------------------
  function TeleportOutside(event) {
    if (event.key === 'e') {
      const outside = OutsideTpPoint[0].getGlobalTransform();
      entities[0].setGlobalTransform(outside);
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"] = 1;
      console.log(scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
      entities[0].setComponent("script_map", scriptComponent);
      console.log("is Swimming = ",scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
      setTimeout(()=>{SDK3DVerse.engineAPI.assignClientToScripts(entities[0])}, 100);
      document.removeEventListener('keydown', TeleportOutside);
    }
  }

  //------------------------------------------------------------------------------
  function adjustCoralList(coral_list, nbZones) {
    const totalCount = coral_list.length;

    // Si le nombre total de coraux est inférieur à nbZones, retourner les occurences
    if (totalCount < nbZones) {
        const adjustedCounts = coral_list.reduce((counts, coralType) => {
            counts[coralType] = (counts[coralType] || 0) + 1;
            return counts;
        }, {});
        return adjustedCounts;
    } else {

      // Le reste du code reste inchangé...
      const proportionalCounts = coral_list.reduce((counts, coralType) => {
          counts[coralType] = (counts[coralType] || 0) + 1;
          return counts;
      }, {});

      const roundedTotalCount = Object.values(proportionalCounts).reduce((total, count) => total + count, 0);

      const adjustedProportionalCounts = {};
      for (const coralType in proportionalCounts) {
          adjustedProportionalCounts[coralType] = Math.round((proportionalCounts[coralType] / totalCount) * nbZones);
      }

      const adjustedLengths = {};
      for (const coralType in adjustedProportionalCounts) {
          adjustedLengths[coralType] = adjustedProportionalCounts[coralType];
      }

      return adjustedLengths;
    }
  }

  //------------------------------------------------------------------------------
  function getRandomCoralAndDecrement(adjustedLengths, coral_list, nbZones) {
    console.log("adjustedLengths:", adjustedLengths);

    // Si la longueur de coral_list est supérieure à nbZones, sélectionner un corail directement
    if (coral_list.length > nbZones) {
        const availableCoralTypes = coral_list.filter(coralType => adjustedLengths[coralType] > 0);

        if (availableCoralTypes.length === 0) {
            // Aucun type de corail disponible, retourner null ou traiter en conséquence
            return null;
        }

        const randomCoralType = availableCoralTypes[Math.floor(Math.random() * availableCoralTypes.length)];
        adjustedLengths[randomCoralType]--;

        return randomCoralType;
    }

    // Si la longueur de coral_list est inférieure ou égale à nbZones, continuer avec la logique précédente
    const availableCoralTypes = Object.keys(adjustedLengths).filter(coralType => adjustedLengths[coralType] > 0);

    if (availableCoralTypes.length === 0) {
        // Aucun type de corail disponible, retourner null ou traiter en conséquence
        return null;
    }

    const randomCoralType = availableCoralTypes[Math.floor(Math.random() * availableCoralTypes.length)];
    adjustedLengths[randomCoralType]--;

    return randomCoralType;
  }

  //------------------------------------------------------------------------------
  let canPlaceCoral = false;
  
  //------------------------------------------------------------------------------
  function PlaceCoral(event){
    
    if (event.key === 'e'){
      console.log('pressed E')
      if (zone[0] != "Coral"){
        console.log("selected ",zone[0].getComponent('scene_ref').value);
        console.log("coral_1 : ",coral_map["coral_1"]);
        console.log("coral_2 : ",coral_map["coral_2"]);
        console.log("coral_3 : ",coral_map["coral_3"]);
        console.log("coral_4 : ",coral_map["coral_4"]);
        console.log("coral_5 : ",coral_map["coral_5"]);
        console.log("coral_6 : ",coral_map["coral_6"]);
        console.log("coral_7 : ",coral_map["coral_7"]);
        console.log("coral_8 : ",coral_map["coral_8"]);
        console.log("empty_zone : ",coral_map["coral_9"]);
        if (zone[0].getComponent('scene_ref').value == coral_map["coral_1"]){
          console.log("coral = 1");
          const coralIndex = coral_list.indexOf(Coral_1.name);
          console.log(coralIndex);
          if (coralIndex !== -1) {
            coral_list.splice(coralIndex, 1);
          }
        }
        if (zone[0].getComponent('scene_ref').value == coral_map["coral_2"]){
          console.log("coral = 2");
          const coralIndex = coral_list.indexOf(Coral_2.name);
          console.log(coralIndex);
          if (coralIndex !== -1) {
            coral_list.splice(coralIndex, 1);
          }
        }
        if (zone[0].getComponent('scene_ref').value == coral_map["coral_3"]){
          console.log("coral = 3");
          const coralIndex = coral_list.indexOf(Coral_3.name);
          console.log(coralIndex);
          if (coralIndex !== -1) {
            coral_list.splice(coralIndex, 1);
          }
        }
        if (zone[0].getComponent('scene_ref').value == coral_map["coral_4"]){
          console.log("coral = 4");
          const coralIndex = coral_list.indexOf(Coral_4.name);
          console.log(coralIndex);
          if (coralIndex !== -1) {
            coral_list.splice(coralIndex, 1);
          }
        }
        if (zone[0].getComponent('scene_ref').value == coral_map["coral_5"]){
          console.log("coral = 5");
          const coralIndex = coral_list.indexOf(Coral_5.name);
          console.log(coralIndex);
          if (coralIndex !== -1) {
            coral_list.splice(coralIndex, 1);
          }
        }
        if (zone[0].getComponent('scene_ref').value == coral_map["coral_6"]){
          console.log("coral = 6");
          const coralIndex = coral_list.indexOf(Coral_6.name);
          console.log(coralIndex);
          if (coralIndex !== -1) {
            coral_list.splice(coralIndex, 1);
          }
        }
        if (zone[0].getComponent('scene_ref').value == coral_map["coral_7"]){
          console.log("coral = 7");
          const coralIndex = coral_list.indexOf(Coral_7.name);
          console.log(coralIndex);
          if (coralIndex !== -1) {
            coral_list.splice(coralIndex, 1);
          }
        }
        if (zone[0].getComponent('scene_ref').value == coral_map["coral_8"]){
          console.log("coral = 8");
          const coralIndex = coral_list.indexOf(Coral_8.name);
          console.log(coralIndex);
          if (coralIndex !== -1) {
            coral_list.splice(coralIndex, 1);
          }
        }
        // Retire l'élément associé au composant de coral_list
        zone[0].setComponent('scene_ref',{value : coral_map["empty_zone"], maxRecursionCount: 1});
        canPlaceCoral = false;
      }
      canPlaceCoral = true;
      console.log(canPlaceCoral);
      return;
      }


    if(canPlaceCoral)
    {
      
      if (event.key === '1'){
        console.log(event.key);
        zone[0].setComponent('scene_ref',{value : coral_map["coral_1"], maxRecursionCount: 1});
        coral_list.push(Coral_1.name);
        console.log(coral_list);
      }
      if (event.key === '2'){
        console.log(event.key);
        zone[0].setComponent('scene_ref',{value : coral_map["coral_2"], maxRecursionCount: 1});
        coral_list.push(Coral_2.name);
        console.log(coral_list);
      }
      if (event.key === '3'){
        console.log(event.key);
        zone[0].setComponent('scene_ref',{value : coral_map["coral_3"], maxRecursionCount: 1});
        coral_list.push(Coral_3.name);
        console.log(coral_list);
      }
      if (event.key === '4'){
        console.log(event.key);
        zone[0].setComponent('scene_ref',{value : coral_map["coral_4"], maxRecursionCount: 1});
        coral_list.push(Coral_4.name);
        console.log(coral_list);
      }
      if (event.key === '5'){
        console.log(event.key);
        zone[0].setComponent('scene_ref',{value : coral_map["coral_5"], maxRecursionCount: 1});
        console.log(coral_map['coral_5']);
        coral_list.push(Coral_5.name);
        console.log(coral_list);
      }
      if (event.key === '6'){
        console.log(event.key);
        zone[0].setComponent('scene_ref',{value : coral_map["coral_6"], maxRecursionCount: 1});
        coral_list.push(Coral_6.name);
        console.log(coral_list);
        
      }
      if (event.key === '7'){
        console.log(event.key);
        zone[0].setComponent('scene_ref',{value : coral_map["coral_7"], maxRecursionCount: 1});
        coral_list.push(Coral_7.name);
        console.log(coral_list);
      }
      if (event.key === '8'){
        console.log(event.key);
        zone[0].setComponent('scene_ref',{value : coral_map["coral_8"], maxRecursionCount: 1});
        coral_list.push(Coral_8.name);
        console.log(coral_list);
      }
      const nbZones = 6; // Replace with your desired number of zones
      const adjustedLengths = adjustCoralList(coral_list, nbZones);
      console.log(adjustedLengths);
      for (let i = 0; i < nbZones; i++) {
        // Get a random coral type and decrement its count
        const randomCoral = getRandomCoralAndDecrement(adjustedLengths, coral_list, nbZones);
      
        console.log(`Zone ${i + 1}: ${randomCoral}`);
      }
    }
    
    
    canPlaceCoral = false;
    document.removeEventListener('keydown', PlaceCoral);    
  }

  
  //------------------------------------------------------------------------------
  function TeleportToHub(event){
    if (event.key === 'e'){
      const hub = ToHubTpPoint[0].getGlobalTransform();
      entities[0].setGlobalTransform(hub);
      document.removeEventListener('keydown', TeleportToHub)
    }
  }
  
  //------------------------------------------------------------------------------
  function TeleportToLab(event){
    if (event.key === 'e'){
      const lab = ToLabTpPoint[0].getGlobalTransform();
      entities[0].setGlobalTransform(lab);
      document.removeEventListener('keydown', TeleportToLab);
    }
  }

  //------------------------------------------------------------------------------
  function PassTheNightMenu(event){
    if (event.key === 'e'){
      TimeSetMenuDisplay = !TimeSetMenuDisplay;
      // console.log(TimeSetMenuDisplay);
      // console.log(ButtonDay);
      // console.log(ButtonMidday);
      // console.log(ButtonNight);
      // console.log(ButtonMidnight);
    }

    if (TimeSetMenuDisplay) {
      document.querySelector("#time-set-menu").style.visibility = "visible";
      document.querySelector("#time-set-day").style.visibility = "visible";
      document.querySelector("#time-set-midday").style.visibility = "visible";
      document.querySelector("#time-set-night").style.visibility = "visible";
      document.querySelector("#time-set-midnight").style.visibility = "visible";
    }else{
      document.querySelector("#time-set-menu").style.visibility = "hidden";
      document.querySelector("#time-set-day").style.visibility = "hidden";
      document.querySelector("#time-set-midday").style.visibility = "hidden";
      document.querySelector("#time-set-night").style.visibility = "hidden";
      document.querySelector("#time-set-midnight").style.visibility = "hidden";
    }
  }

  //------------------------------------------------------------------------------
  ButtonDay.addEventListener("click", function(){
    SDK3DVerse.engineAPI.playAnimationSequence('26eef687-a9c6-4afd-9602-26c5f74c62f8', { playbackSpeed : 15.0, seekOffset : 0.0 });
  });
  ButtonMidday.addEventListener("click", function(){
    SDK3DVerse.engineAPI.playAnimationSequence('26eef687-a9c6-4afd-9602-26c5f74c62f8', { playbackSpeed : 15.0, seekOffset : 0.25 });
  });
  ButtonNight.addEventListener("click", function(){
    SDK3DVerse.engineAPI.playAnimationSequence('26eef687-a9c6-4afd-9602-26c5f74c62f8', { playbackSpeed : 15.0, seekOffset : 0.5 });
  });
  ButtonMidnight.addEventListener("click", function(){
    SDK3DVerse.engineAPI.playAnimationSequence('26eef687-a9c6-4afd-9602-26c5f74c62f8', { playbackSpeed : 15.0, seekOffset : 0.75 });
  }); 

  //------------------------------------------------------------------------------
  SDK3DVerse.engineAPI.onEnterTrigger(async (emitterEntity, triggerEntity) =>
  {
    let emitterEntityParent = emitterEntity.getParent();
    //console.log('taponoir', bloupo[0]);
    console.log('enter ',emitterEntity.getName()," ", triggerEntity.getName());
    if (triggerEntity == InteractZonePLayer[0]){
      if (emitterEntity == InsideHubDoorToOutside[0]){
        console.log('press E to exit');
        document.removeEventListener('keydown', TeleportOutside);
        document.addEventListener('keydown', TeleportOutside);
        
      }
      else if (emitterEntity == OutsideHubDoorToInside[0]){
        outsideTrigger = true;
        console.log('press E to enter');
        document.removeEventListener('keydown', TeleportInside);
        document.addEventListener('keydown', TeleportInside);
      }
      else if (emitterEntity == ToLaboratoryDoor[0]){
        console.log('press E to loaboratory')
        document.removeEventListener('keydown', TeleportToLab);
        document.addEventListener('keydown', TeleportToLab);
      }
      else if (emitterEntity == ToHubDoor[0]){
        console.log('press E to Hub')
        document.removeEventListener('keydown', TeleportToHub);
        document.addEventListener('keydown', TeleportToHub);
      }
      else if (emitterEntity.getParent().getName() == "Plantations"){
        console.log("press E");
        zone = await emitterEntity.getChildren();
        console.log(zone[0].getName());
        console.log(emitterEntity," ",emitterEntity.getName()," ",emitterEntityParent," ",zone);
        document.removeEventListener('keydown', PlaceCoral);
        document.addEventListener('keydown', PlaceCoral);
      }
      else if (emitterEntity  == Couch[0]) {
        console.log('press E to pass the night');
        document.removeEventListener('keydown', PassTheNightMenu);
        document.addEventListener('keydown', PassTheNightMenu);
      }
    }
  });

  //------------------------------------------------------------------------------
  SDK3DVerse.engineAPI.onExitTrigger((emitterEntity, triggerEntity) => {
    console.log(emitterEntity.getName()," exit ", triggerEntity.getName());
    outsideTrigger = false;
    console.log(outsideTrigger);

  });
}
//##############################################################################



//##############################################################################
//#                          CHARACTER CONTROLLER                              #
//##############################################################################

//------------------------------------------------------------------------------
async function setFPSCameraController(canvas){
  // Remove the required click for the LOOK_LEFT, LOOK_RIGHT, LOOK_UP, and 
  // LOOK_DOWN actions.
  SDK3DVerse.actionMap.values["LOOK_LEFT"][0] = ["MOUSE_AXIS_X_POS"];
  SDK3DVerse.actionMap.values["LOOK_RIGHT"][0] = ["MOUSE_AXIS_X_NEG"];
  SDK3DVerse.actionMap.values["LOOK_DOWN"][0] = ["MOUSE_AXIS_Y_NEG"];
  SDK3DVerse.actionMap.values["LOOK_UP"][0] = ["MOUSE_AXIS_Y_POS"];
  SDK3DVerse.actionMap.values["JUMP"] = [["KEY_32"]];
  SDK3DVerse.actionMap.propagate();

  // Lock the mouse pointer.
  canvas.requestPointerLock = (
    canvas.requestPointerLock 
    || canvas.mozRequestPointerLock 
    || canvas.webkitPointerLockElement
  );
  canvas.requestPointerLock();
};

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
  const light = await SDK3DVerse.engineAPI.findEntitiesByEUID('f95f32ec-fa18-410a-967d-7be768c539d1');
  light[0].setVisibility(false);


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
//##############################################################################



//##############################################################################
//#                              SPLINES FISHES                                #
//##############################################################################

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
    var i = 0;
    const children = await fish.getChildren();
    const fishMesh = children.find(e => e.getName() === 'mesh');
    const fishPath = children.find(e => e.getName() === 'spline_path');
    const fishSpeed = children.find(e => e.getName() === 'speed');
    // console.log(fishSpeed);
    const fishSpeedNumString = await fishSpeed.getChildren();
    // console.log(fishSpeedNumString[i].getName());
    // console.log(typeof fishSpeedNumString[i].getName())
    const fishSpeedNum = Number(fishSpeedNumString[i].getName());
    // console.log(fishSpeedNum);
    // console.log(typeof fishSpeedNum);
    i = i + 1;

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
      travellingSpline,
      fishSpeedNum
    };
    loopOnFishSplineTravel(fishes[fish.getID()], fishMesh, travellingSpline, fishSpeedNum, 0.1);
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
//##############################################################################



//##############################################################################
//#                                  TERMINAL                                  #
//##############################################################################

//------------------------------------------------------------------------------
/*function afficherModale() {
    const modal = document.getElementById('maModal');
    const body = document.body;
    modal.style.display = 'block';
    body.classList.add('body-overlay');
    setTimeout(() => {
        modal.classList.add('show');
    }, 1000); // Delay the addition of 'show' class for the animation to take effect
}*/

//------------------------------------------------------------------------------
function fermerModale() {
    const modal = document.getElementById('maModal');
    const body = document.body;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        body.classList.remove('body-overlay');
    }, 1000); // Delay the removal of 'show' class for the animation to take effect
}

//------------------------------------------------------------------------------
window.onclick = function (event) {
    const modal = document.getElementById('maModal');
    const body = document.body;
    if (event.target === modal) {
        fermerModale();
    }
};

//------------------------------------------------------------------------------
/*function validerModal() {
    const nom = document.getElementById('nom').value;
    const message = document.getElementById('message').value;

    // Vous pouvez faire quelque chose avec les valeurs, par exemple, les afficher dans la console
    console.log('Nom:', nom);
    console.log('Message:', message);

    // Fermer la fen�tre modale apr�s validation
    fermerModale();
}*/

//##############################################################################


