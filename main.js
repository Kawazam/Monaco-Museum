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

import {
  Zone_map,
  Zone_1,
  Zone_2,
  Zone_3,
  Zone_4,
  Zone_5,
  Zone_6,
  Zone_7,
} from "./Zone.js";

//------------------------------------------------------------------------------
import TravelAnimation from "./travelAnimation.js";
import { PlayerInventory } from './player.js';

const playerInventory = new PlayerInventory();
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


//------------------------------------------------------------------------------
//Toggle menu section
button_inventory.addEventListener("pointerdown", function(){
  inventory = true;
  stats = map = false;
  toggleMenuSection();
});
button_stats.addEventListener("pointerdown", function(){
  stats = true;
  inventory = map = false;
  toggleMenuSection();
});
button_map.addEventListener("pointerdown", function(){
  map = true;
  inventory = stats = false;
  toggleMenuSection();
});

function checkMenueToggle(event){
  const key = event.key;
  if (key==='i') {
    console.log("I been pressed");
    menu_display = !menu_display;
    if (menu_display) {
      console.log(menu_display);
      console.log("display menue");
      document.querySelector("#menu").style.visibility = "visible";
      document.querySelector("#menu-bloc-inventory").style.visibility = inventory ? "visible" : "hidden";
      for (let element of canvas.querySelectorAll(".menu-bloc-inventory-cell")) element.style.visibility = inventory ? "visible" : "hidden";
      canvas.querySelector("#menu-bloc-stats").style.visibility = stats ? "visible" : "hidden";
      canvas.querySelector("#menu-bloc-map").style.visibility = map ? "visible" : "hidden";
      resetFPSCameraController(canvas);
    } else {
      document.querySelector("#menu").style.visibility = "hidden";
      document.querySelector("#menu-bloc-inventory").style.visibility = "hidden";
      for (let element of document.querySelectorAll(".menu-bloc-inventory-cell")) element.style.visibility = "hidden";
      document.querySelector("#menu-bloc-stats").style.visibility = "hidden";
      document.querySelector("#menu-bloc-map").style.visibility = "hidden";
      document.querySelector("#display-canvas").focus();
      setFPSCameraController(canvas);
    }
    console.log('menue out');
  }
}


//------------------------------------------------------------------------------

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
let canvas;
//------------------------------------------------------------------------------
async function InitApp() {
  canvas = document.getElementById("display-canvas");
  await SDK3DVerse.joinOrStartSession({
    isTransient: true,
    userdocumentToken: publicToken,
    sceneUUID: mainSceneUUID,
    // sceneUUID: inventorySceneUUID,
    canvas: document.getElementById("display-canvas"),
    createDefaultCamera: false,
    startSimulation: "on-assets-loaded",
  });
  
  //------------------------------------------------------------------------------
  await InitFirstPersonController(characterControllerSceneUUID);
  
  //------------------------------------------------------------------------------
  canvas.addEventListener('pointerdown', () => setFPSCameraController(canvas));
  canvas.addEventListener('keydown', checkMenueToggle);
  
  //------------------------------------------------------------------------------
  await SplinesForFishes();

  //------------------------------------------------------------------------------
  canvas.addEventListener('keydown', function(event) {
    // Vérifie si la touche pressée est 't'
    if (event.key === 't') {
      console.log("t been Pressed")
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

  const zoneCoralPlace = {
    Coral_1 : Zone_map["ZonePlace_2"],
    Coral_2 : Zone_map["ZonePlace_3"],
    Coral_3 : Zone_map["ZonePlace_4"],
    Coral_4 : Zone_map["ZonePlace_5"],
    Coral_5 : Zone_map["ZonePlace_6"],
    Coral_6 : Zone_map["ZonePlace_7"],
    Coral_7 : Zone_map["ZonePlace_7"],
    Coral_8 : Zone_map["ZonePlace_7"],
    null    : Zone_map["ZonePlace_1"]
  };

  //------------------------------------------------------------------------------
  const InsideHubDoorToOutside = await SDK3DVerse.engineAPI.findEntitiesByEUID('3f1d3498-dd14-49df-a6e5-bb13281095d5');
  const OutsideHubDoorToInside = await SDK3DVerse.engineAPI.findEntitiesByEUID('3c3b76c9-1b50-4f4e-9386-0566896a55ce');
  const ToLaboratoryDoor = await SDK3DVerse.engineAPI.findEntitiesByEUID('24145957-9a15-4752-9b0e-359e14b5ba8e');
  const ToHubDoor  = await SDK3DVerse.engineAPI.findEntitiesByEUID('299e8f24-53fa-4bf5-b6b3-979a0348dc60');
  const InteractZonePLayer = await SDK3DVerse.engineAPI.findEntitiesByEUID('67919a03-7107-402a-a87e-4027311d9ec6');
  const lamp = await SDK3DVerse.engineAPI.findEntitiesByEUID('f95f32ec-fa18-410a-967d-7be768c539d1');
  const CoralZone = await SDK3DVerse.engineAPI.findEntitiesByEUID('6972f860-1786-41fd-9150-a5f605ac1ac4');
  const zoneName = await CoralZone[0].getChildren();
  const GlobalPlantation = await SDK3DVerse.engineAPI.findEntitiesByNames("Plantations");
  console.log(GlobalPlantation[0]);
  const GlobalPlantationChildren = await GlobalPlantation[0].getChildren();
  const GlobalPlantationChildrenLenght = await GlobalPlantationChildren.length;
  var tpPoint;
  // const sun  = await SDK3DVerse.engineAPI.findEntitiesByEUID('0e3748a2-ea86-44e0-869b-cddb715dab0e');
  //------------------------------------------------------------------------------
  let islampvisible = false;
  let zone;
  let entities;
  //const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID('7875aa33-7421-47b0-bcba-884aed856227');
  //console.log(entities);
  //let scriptComponent = entities.getComponent("script_map");
  //console.log(entities);
  //console.log("is Swimming = ",scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
  //star animation 'moon-sun-anim' and 'butterfly-fish-2'
  SDK3DVerse.engineAPI.playAnimationSequence('26eef687-a9c6-4afd-9602-26c5f74c62f8', { playbackSpeed : 20.0 });
  SDK3DVerse.engineAPI.playAnimationSequence('1d3f545a-afbd-4c31-af06-8737b012b5bd', { playbackSpeed : 1.0 });
  CheckCoralList();
  //------------------------------------------------------------------------------
  const engineOutputEventUUID = "42830dc6-ca1e-4f4c-9f2a-ede6d436a964";
  SDK3DVerse.engineAPI.registerToEvent(engineOutputEventUUID, "log", (event) => console.log(event.dataObject.output));
  let outsideTrigger = false;
  //------------------------------------------------------------------------------
  async function CheckCoralList(){
    coral_list.splice(0, coral_list.length);
    for (var i = 0; i < GlobalPlantationChildrenLenght; i++){
      console.log(i);
      const coralPlanted = await GlobalPlantationChildren[i].getChildren();
      console.log("coral planted = ",coralPlanted[0].getName());
      console.log(GlobalPlantationChildren[i].getName());
      let coralSceneRef = coralPlanted[0].getComponent('scene_ref').value;
      console.log(coralSceneRef);
      if (coralSceneRef == coral_map["coral_1"]){
        coral_list.push(Coral_1.name);
      }
      if (coralSceneRef == coral_map["coral_2"]){
        coral_list.push(Coral_2.name);
      }
      if (coralSceneRef == coral_map["coral_3"]){
        coral_list.push(Coral_3.name);
      }
      if (coralSceneRef == coral_map["coral_4"]){
        coral_list.push(Coral_4.name);
      }
      if (coralSceneRef == coral_map["coral_5"]){
        coral_list.push(Coral_5.name);
      }
      if (coralSceneRef == coral_map["coral_6"]){
        coral_list.push(Coral_6.name);
      }
      if (coralSceneRef == coral_map["coral_7"]){
        coral_list.push(Coral_7.name);
      }
      if (coralSceneRef == coral_map["coral_8"]){
        coral_list.push(Coral_8.name);
      }
    }
    console.log(coral_list);
  }
  //------------------------------------------------------------------------------
  async function checkPlantCoral(event) {
    if (event.key != 'e'){
      return;
    }
    console.log("pressed E = ",event.key);
      // if a plantions is empty call placeCoral() to place a coral
    if (zone[0].getComponent('scene_ref').value == coral_map["empty_zone"]){
      document.removeEventListener('keypress', checkPlantCoral);
      document.removeEventListener('keypress',PlaceCoral);
      document.addEventListener('keypress',PlaceCoral);
      return;
    }
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
    
    zone[0].setComponent('scene_ref',{value : coral_map["empty_zone"], maxRecursionCount: 1});
    zone[0].save();
    CheckCoralList();
  };

  async function teleport(){
    let tpPointChildren = await tpPoint.getChildren()
    let tpPointPos = tpPointChildren[0].getGlobalTransform();
    let scriptComponent = entities.getComponent("script_map");
    //const keepRotationView = entities.getGlobalTransform().orientation;
    entities.setGlobalTransform(tpPointPos);
    //entities.setGlobalTransform({orientation : keepRotationView});
    console.log(tpPoint.getName());
    console.log("swim = ",scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"]);
    console.log(InsideHubDoorToOutside[0].getName());
    if (tpPoint.getName() == InsideHubDoorToOutside[0].getName()){
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"] = 1;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["walkSpeed"] = 0.5;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["runSpeed"] = 1;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["gravityValue"] = 0.2;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["pitch"] = 0.0;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["yaw"] = 90.0;
      entities.setComponent("script_map", scriptComponent);
      setTimeout(()=>{SDK3DVerse.engineAPI.assignClientToScripts(entities)}, 100);
      
      
      document.removeEventListener('click', teleport);
    } 
    else if (tpPoint.getName() == ToHubDoor[0].getName()){
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"] = 0;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["walkSpeed"] = 2;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["runSpeed"] = 6;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["gravityValue"] = 9.8;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["pitch"] = 0.0;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["yaw"] = 90.0;
      entities.setComponent("script_map", scriptComponent);
      setTimeout(()=>{SDK3DVerse.engineAPI.assignClientToScripts(entities)}, 100);
      document.removeEventListener('click', teleport);
    } else {
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"] = 0;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["walkSpeed"] = 2;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["runSpeed"] = 6;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["gravityValue"] = 9.8;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["pitch"] = 0.0;
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["yaw"] = -90.0;
      entities.setComponent("script_map", scriptComponent);
      setTimeout(()=>{SDK3DVerse.engineAPI.assignClientToScripts(entities)}, 100);
      document.removeEventListener('click', teleport);
    }
    document.removeEventListener('click', teleport);
  };
  //------------------------------------------------------------------------------
  function adjustCoralList(coral_list, nbZones) {
    let totalCount = coral_list.length;

    // Si le nombre total de coraux est inférieur à nbZones, retourner les occurences
    if (totalCount < nbZones) {
        let adjustedCounts = coral_list.reduce((counts, coralType) => {
            counts[coralType] = (counts[coralType] || 0) + 1;
            return counts;
        }, {});
        return adjustedCounts;
    } else {
      let proportionalCounts = coral_list.reduce((counts, coralType) => {
          counts[coralType] = (counts[coralType] || 0) + 1;
          return counts;
      }, {});

      const roundedTotalCount = Object.values(proportionalCounts).reduce((total, count) => total + count, 0);

      let adjustedProportionalCounts = {};
      for (const coralType in proportionalCounts) {
          adjustedProportionalCounts[coralType] = Math.round((proportionalCounts[coralType] / totalCount) * nbZones);
      }

      let adjustedLengths = {};
      for (const coralType in adjustedProportionalCounts) {
          adjustedLengths[coralType] = adjustedProportionalCounts[coralType];
      }

      return adjustedLengths;
    }
  }


    

  function getRandomCoralAndDecrement(adjustedLengths, coral_list, nbZones) {
    console.log("adjustedLengths:", adjustedLengths);

    // Si la longueur de coral_list est supérieure à nbZones, sélectionner un corail directement
    if (coral_list.length > nbZones) {
        let availableCoralTypes = coral_list.filter(coralType => adjustedLengths[coralType] > 0);

        if (availableCoralTypes.length === 0) {
            // Aucun type de corail disponible, retourner null ou traiter en conséquence
            return null;
        }

        let randomCoralType = availableCoralTypes[Math.floor(Math.random() * availableCoralTypes.length)];
        adjustedLengths[randomCoralType]--;

        return randomCoralType;
    }

    // Si la longueur de coral_list est inférieure ou égale à nbZones, continuer avec la logique précédente
    let availableCoralTypes = Object.keys(adjustedLengths).filter(coralType => adjustedLengths[coralType] > 0);

    if (availableCoralTypes.length === 0) {
        // Aucun type de corail disponible, retourner null ou traiter en conséquence
        return null;
    }

    let randomCoralType = availableCoralTypes[Math.floor(Math.random() * availableCoralTypes.length)];
    adjustedLengths[randomCoralType]--;

    return randomCoralType;
  }



  //------------------------------------------------------------------------------
  function PlaceCoral(event) {
    console.log("pressed to place =", event.key);

    const coralIndex = parseInt(event.key);

    if (coralIndex >= 1 && coralIndex <= 8) {
        const coralKey = `coral_${coralIndex}`;
        console.log(event.key);
        zone[0].setComponent('scene_ref', { value: coral_map[coralKey], maxRecursionCount: 1 });
        zone[0].save();
        CheckCoralList();
        console.log(coral_list);
    }
    //get the occurrences and adapt them to the number of decorztion zone
    const nbZones = 6; 
    let adjustedLengths = adjustCoralList(coral_list, nbZones);
    console.log(adjustedLengths);
    for (let i = 0; i < nbZones; i++) {
      // Get a random coral type and decrement its count
      let randomCoral = getRandomCoralAndDecrement(adjustedLengths, coral_list, nbZones);
      console.log("voici",CoralZone[0].getName());
      console.log(zoneName[i].getName());
      console.log(randomCoral);
      console.log("this = ",zoneCoralPlace[randomCoral])
      zoneName[i].setComponent('scene_ref',{value : zoneCoralPlace[randomCoral], maxRecursionCount: 0});
      zoneName[i].setGlobalTransform(CoralZone[0]);
      console.log(`Zone ${i + 1}: ${randomCoral}`);
    }
    document.removeEventListener('keypress', PlaceCoral);
  }

  
  //------------------------------------------------------------------------------
  
  //------------------------------------------------------------------------------
  SDK3DVerse.engineAPI.onEnterTrigger(async (emitterEntity, triggerEntity) =>
  {
    let emitterEntityParent = emitterEntity.getParent();
    let getCamTrigger = await triggerEntity.getParent();
    console.log(getCamTrigger);
    entities = await getCamTrigger.getParent();
    console.log('enter ',emitterEntity.getName()," ", triggerEntity.getName());
    if (emitterEntity == InsideHubDoorToOutside[0]){
      console.log('press E to exit');
      tpPoint = await emitterEntity;
      document.removeEventListener('click', teleport);
      document.addEventListener('click',teleport);
      
    }
    else if (emitterEntity == OutsideHubDoorToInside[0]){
      outsideTrigger = true;
      console.log('press E to enter');
      tpPoint = await emitterEntity;
      document.removeEventListener('click', teleport);
      document.addEventListener('click',teleport);
    }
    else if (emitterEntity == ToLaboratoryDoor[0]){
      console.log('press E to loaboratory')
      tpPoint = await emitterEntity;
      document.removeEventListener('click', teleport);
      document.addEventListener('click',teleport);
    }
    else if (emitterEntity == ToHubDoor[0]){
      console.log('press E to Hub')
      tpPoint = await emitterEntity;
      document.removeEventListener('click', teleport);
      document.addEventListener('click',teleport);
    }
    else if (emitterEntity.getParent().getName() == "Plantations"){
      console.log("press E");
      zone = await emitterEntity.getChildren();
      console.log(zone[0].getName());
      console.log(emitterEntity," ",emitterEntity.getName()," ",emitterEntityParent," ",zone);
      document.removeEventListener('keypress', checkPlantCoral);
      document.addEventListener('keypress', checkPlantCoral);
      
    }
  });

  //------------------------------------------------------------------------------
  SDK3DVerse.engineAPI.onExitTrigger((emitterEntity, triggerEntity) => {
    console.log(emitterEntity.getName()," exit ", triggerEntity.getName());
    outsideTrigger = false;
    console.log(outsideTrigger);
    document.removeEventListener('click', teleport);

  });
}
//##############################################################################



//##############################################################################
//#                          CHARACTER CONTROLLER                              #
//##############################################################################

//------------------------------------------------------------------------------
async function setFPSCameraController(canvas){
  // Remove the required pointerdown for the LOOK_LEFT, LOOK_RIGHT, LOOK_UP, and 
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

async function resetFPSCameraController(canvas) {
  const SDK3DVerse = window.SDK3DVerse
  // // console.log(SDK3DVerse)
  // console.log("We set moving stay")
  // Restore the default actions for LOOK_LEFT, LOOK_RIGHT, LOOK_UP, and LOOK_DOWN.

  SDK3DVerse.actionMap.values["LOOK_LEFT"][0] = ["MOUSE_BTN_LEFT"];
  SDK3DVerse.actionMap.values["LOOK_RIGHT"][0] = ["MOUSE_BTN_LEFT"];
  SDK3DVerse.actionMap.values["LOOK_DOWN"][0] = ["MOUSE_BTN_LEFT"];
  SDK3DVerse.actionMap.values["LOOK_UP"][0] = ["MOUSE_BTN_LEFT"];
  SDK3DVerse.actionMap.propagate();



  // const clientUUID = await SDK3DVerse.getClientUUID()

  // const player = await SDK3DVerse.engineAPI.findEntitiesByNames(`Player_${clientUUID}`);

  // await player[0].setOrientation([1,1,1,1]);



  // Release the pointer lock.
  document.exitPointerLock = (
      document.exitPointerLock
      || document.mozExitPointerLock
      || document.webkitExitPointerLock
  );
  document.exitPointerLock();




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
window.onpointerdown = function (event) {
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


