//##############################################################################
//#                                 IMPORTS                                    #
//##############################################################################

//------------------------------------------------------------------------------
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
  //inventorySceneUUID,
  moonSunAnimUUID,
  butterflyFish2UUID,
  engineOutputEventUUID,
  characterControllerUUID,
} from "./config.js";

//------------------------------------------------------------------------------
import {
  Coral_map,
  Coral_drop,
  Coral_cleaning,
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

//------------------------------------------------------------------------------
import { inventory } from "./inventory.js";
for (let i = 0; i < inventory.length - 1; i++){
  const index = `coral_${i}`;
  inventory[index] = 5;
}
//##############################################################################



//##############################################################################
//#                               INVENTORY                                    #
//##############################################################################

//------------------------------------------------------------------------------
//const inventoryJson = require("./inventory.json");

//------------------------------------------------------------------------------
var MenuDisplay   = false;
var Inventory     = true;
var Stats         = false;
var Map           = false;

var InventoryTable = "";

const ButtonInventory       = document.querySelector("#menu-menubar-title-inventory");
const ButtonStats           = document.querySelector("#menu-menubar-title-stats");
const ButtonMap             = document.querySelector("#menu-menubar-title-map");

const DisplayInventory      = document.querySelector("#menu-bloc-inventory");

//------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function(){
  const cells = document.querySelectorAll('.menu-bloc-inventory-cell');
  cells.forEach(cell => {
    cell.addEventListener('click', function() {
      addContentToCell(cell.id);
    });
  });
});

//------------------------------------------------------------------------------
// function addContentToCell(cellID) {
//   const cell = document.getElementById(cellID);
//   const content = prompt("Ajouter du contenu dans la cellule");
//   if (content !== null) {
//     cell.innerHTML = content;
//   }
// }


//------------------------------------------------------------------------------
let cell_index = 0;

for (let i = 1; i < 7; i++) {
  for (let j = 1; j < 5; j++) {
    const cellID = `inventory-cell-${cell_index}`;
    
    const leftPosition = ((i - 1) * 15 + i * 1.4) + '%';
    const topPosition = ((j - 1) * 20 + j * 4) + '%';

    InventoryTable += `<div class="menu-bloc-inventory-cell" id="${cellID}" style="left: ${leftPosition}; top: ${topPosition};"></div>`;

    const cell = document.getElementById(cellID);
    // Vérifier si la cellule existe avant de manipuler son contenu
    if (cell) {
      if (cell_index <= 7) {
        const a = inventory[`coral_${cell_index+1}`];
        console.log(a);
        cell.innerHTML = a;
      }
    }
    cell_index++;
  }
}

// for(let i = 1; i < 7; i++) {
//   for(let j = 1; j < 5; j++) {
//     InventoryTable += '<div class="menu-bloc-inventory-cell" id="inventory-cell'+i*j+'" style="left: '+((i-1)*15+i*1.4)+'%; top: '+((j-1)*20+j*4)+'%;"></div>';
//   }
// };

//------------------------------------------------------------------------------
DisplayInventory.innerHTML = InventoryTable;

//------------------------------------------------------------------------------
//Toggle Inventory display
document.addEventListener("keydown", checkMenueToggle);

//------------------------------------------------------------------------------
//Toggle menu section
ButtonInventory.addEventListener("click", function(){
  Inventory = true;
  Stats = Map = false;
  toggleMenuSection();
});
ButtonStats.addEventListener("click", function(){
  Stats = true;
  Inventory = Map = false;
  toggleMenuSection();
});
ButtonMap.addEventListener("click", function(){
  Map = true;
  Inventory = Stats = false;
  toggleMenuSection();
});


//------------------------------------------------------------------------------
function checkMenueToggle(event){
  const key = event.key;
  if (key==='i') {
    console.log("I been pressed");
    MenuDisplay = !MenuDisplay;
    if (MenuDisplay) {
      console.log(MenuDisplay);
      console.log("display menue");
      document.querySelector("#menu").style.visibility = "visible";
      document.querySelector("#menu-bloc-inventory").style.visibility = Inventory ? "visible" : "hidden";
      for (let element of canvas.querySelectorAll(".menu-bloc-inventory-cell")) element.style.visibility = Inventory ? "visible" : "hidden";
      document.querySelector("#menu-bloc-stats").style.visibility = Stats ? "visible" : "hidden";
      document.querySelector("#menu-bloc-map").style.visibility = Map ? "visible" : "hidden";
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
};


//------------------------------------------------------------------------------
function toggleMenuSection() {
  ButtonInventory.classList.toggle("selected_title", Inventory);
  ButtonStats.classList.toggle("selected_title", Stats);
  ButtonMap.classList.toggle("selected_title", Map);

  document.querySelector("#menu-bloc-inventory").style.visibility = Inventory ? "visible" : "hidden";
  for (let element of document.querySelectorAll(".menu-bloc-inventory-cell")) element.style.visibility = inventory ? "visible" : "hidden";
  document.querySelector("#menu-bloc-stats").style.visibility = Stats ? "visible" : "hidden";
  document.querySelector("#menu-bloc-map").style.visibility = Map ? "visible" : "hidden";
};

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
let characterController;
let lamp;
let percent = 0;
const color_100_percent_pollution = [6, 73, 27];
const color_0_percent_pollution = [4,76,138];
const night_fog  = '0,0,0';



//------------------------------------------------------------------------------
async function InitApp() {

  //show loading page-------------------------------------------------------------
  document.querySelector("#loading-page").style.visibility = "visible";

  //------------------------------------------------------------------------------
  canvas = document.getElementById("display-canvas");

  //------------------------------------------------------------------------------
  const isSessionCreator = await SDK3DVerse.joinOrStartSession({
    isTransient: true,
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    // sceneUUID: inventorySceneUUID,
    canvas: document.getElementById("display-canvas"),
    createDefaultCamera: false,
    startSimulation: "on-assets-loaded",
  });

  //------------------------------------------------------------------------------
  let seconds = 0;
  let newfogColor;
  characterController = await InitFirstPersonController(characterControllerSceneUUID);
  const getCam = await characterController.firstPersonController.getChildren();
  console.log("getcam = ",getCam);
  const camera = getCam[1];
  var dataJSON = camera.getComponent('camera').dataJSON;
  const getCamChildren = await getCam[1].getChildren();
  lamp = await getCamChildren[0];

  console.log("debug_anim", characterController.playerSceneEntity);
  //SDK3DVerse.engineAPI.playAnimationSequence('ba7a979b-8238-4f45-a8c8-151b5c0474e0', {playbackSpeed : /*5*/ 5}, characterController.playerSceneEntity);

  //------------------------------------------------------------------------------
  if (lamp.getName()!= "camLamp") {
    lamp = await getCamChildren[1];
  };

  //------------------------------------------------------------------------------
  async function changeFogOnPercentChange(pollution){
    // Fonction pour l'interpolation entre la couleur renvoyée par la fonction précédente et la couleur noire
    const rgb1 = color_100_percent_pollution;
    const rgb2 = color_0_percent_pollution;
  
    const diff1R = rgb2[0] - rgb1[0];
    const diff1G = rgb2[1] - rgb1[1];
    const diff1B = rgb2[2] - rgb1[2];
  
    let newR, newG, newB;
  
    newR = Math.round(rgb1[0] + (diff1R * pollution));
    newG = Math.round(rgb1[1] + (diff1G * pollution));
    newB = Math.round(rgb1[2] + (diff1B * pollution));
    const cam = getCam[1];
    newfogColor = [newR/255, newG/255, newB/255];
    const cam_compo = cam.getComponent('camera');
    const dataJSON = { ...cam_compo.dataJSON };
    dataJSON.fogColor=newfogColor;
    dataJSON.fogDistanceDensity = 0.015;
    dataJSON.fogExtinction = [0.2,0.2,0.2];
    dataJSON.fogHeightDensity = 2.5;
    dataJSON.fogInterScattering = [0.2, 0.2, 0.2];
    dataJSON.fogZeroHeight = 200.777161
    cam.setComponent('camera', {dataJSON});
    console.log("newcolor = ",newfogColor);
  }

  //------------------------------------------------------------------------------
  console.log("lamp =",lamp.getName());
  console.log("lamp children = ", getCamChildren)
  lamp.setVisibility(false);
  var islampvisible = false;

  //------------------------------------------------------------------------------
  canvas.addEventListener('pointerdown', () => setFPSCameraController(canvas));
  document.addEventListener('keydown', checkMenueToggle);

  //------------------------------------------------------------------------------
  if(isSessionCreator) {
    await SplinesForFishes();
  }

  //------------------------------------------------------------------------------
  SDK3DVerse.engineAPI.playAnimationSequence(moonSunAnimUUID, { playbackSpeed : 1.0 });
  SDK3DVerse.engineAPI.playAnimationSequence(butterflyFish2UUID, { playbackSpeed : 1.0 });

  //hide loading page-------------------------------------------------------------
  document.querySelector("#loading-page").style.visibility = "hidden";
  document.querySelector("#cross").style.visibility = "visible";

  //------------------------------------------------------------------------------
  document.addEventListener('keydown', function(event) {
  // Vérifie si la touche pressée est 't'
  if (event.key === 't') {
      // Vérifie si islampvisible est true
      if (islampvisible === true) {
        lamp.setVisibility(!islampvisible);
        console.log("lamp allumé")
          // Change la valeur de islampvisible à false
          islampvisible = false;
      }
      else if (islampvisible === false) {
        lamp.setVisibility(!islampvisible);
          // Change la valeur de islampvisible à false
          islampvisible = true;
          console.log("lampe éteinte")
      }
  }
  });

  //------------------------------------------------------------------------------
  // Menu define
  var TimeSetMenuDisplay       = false;
  var laboratoryMenuDisplay    = false;
  var Merger                   = true;
  var Analyser                 = false;
  var CheckboxChecked          = false;
  var CheckboxUnchecked        = true;
  
  // UUID item define
  const Couch                     = await SDK3DVerse.engineAPI.findEntitiesByEUID('63c4825f-10b6-4635-a479-7234dc1229d3');
  const Laboratory_computer       = await SDK3DVerse.engineAPI.findEntitiesByEUID('8dce73e1-36a9-4481-a987-592995605d40');
  const InsideHubDoorToOutside    = await SDK3DVerse.engineAPI.findEntitiesByEUID('27675405-d3b0-4b14-ac55-cdd78aa43d1d');
  const OutsideHubDoorToInside    = await SDK3DVerse.engineAPI.findEntitiesByEUID('cffd55a8-968b-4e22-a163-33d52ec90854');
  const ToLaboratoryDoor          = await SDK3DVerse.engineAPI.findEntitiesByEUID('922e09b1-b9a9-43af-a8a7-7f49bb59dd53');
  const ToHubDoor                 = await SDK3DVerse.engineAPI.findEntitiesByEUID('cffd55a8-968b-4e22-a163-33d52ec90854');
  const CoralZone                 = await SDK3DVerse.engineAPI.findEntitiesByEUID('a1584b3a-f729-4e08-a873-a34f6260f90c');

  // Menu button define
  const ButtonDay           = document.querySelector("#time-set-day");
  const ButtonMidday        = document.querySelector("#time-set-midday");
  const ButtonNight         = document.querySelector("#time-set-night");
  const ButtonMidnight      = document.querySelector("#time-set-midnight");
  const ButtonCheckbox      = document.querySelector("#unchecked");
  const ButtonUncheckbox    = document.querySelector("#checked");
  // const ButtonMerger        = document.querySelector("#laboratory-menubar-title-merger");
  // const ButtonAnalyser      = document.querySelector("#laboratory-menubar-title-analyser");
  const ButtonArrow1        = document.querySelector("#laboratory-menubar-title-arrow-1");
  const ButtonArrow2        = document.querySelector("#laboratory-menubar-title-arrow-2");

  //Robin's define
  var tpPoint;
  let Coral_list=[];
  
  const zoneName = await CoralZone[0].getChildren();
  const GlobalPlantation = await SDK3DVerse.engineAPI.findEntitiesByNames("Plantations");
  console.log(GlobalPlantation[0]);
  const GlobalPlantationChildren = await GlobalPlantation[0].getChildren();
  const GlobalPlantationChildrenLenght = await GlobalPlantationChildren.length;
  const nbZones = GlobalPlantationChildrenLenght;
  
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
  let zone;
  let currentPlayerController;
  let outsideTrigger = false;
  await checkCoralList();

  //------------------------------------------------------------------------------
  SDK3DVerse.engineAPI.registerToEvent(engineOutputEventUUID, "log", (event) => console.log(event.dataObject.output));

  //------------------------------------------------------------------------------
  function delay(milliseconds) {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    })
  };

  //------------------------------------------------------------------------------
  async function checkCoralList(){
    Coral_list = [];
    for (var i = 0; i < GlobalPlantationChildrenLenght; i++){
      console.log(i);
      const CoralPlanted = await GlobalPlantationChildren[i].getChildren();
      console.log("Coral planted = ",CoralPlanted[0].getName());
      console.log(GlobalPlantationChildren[i].getName());
      let CoralSceneRef = CoralPlanted[0].getComponent('scene_ref').value;
      console.log(CoralSceneRef);
      if (CoralSceneRef == Coral_map["Coral_1"]){
        Coral_list.push(Coral_1.name);
      }
      if (CoralSceneRef == Coral_map["Coral_2"]){
        Coral_list.push(Coral_2.name);
      }
      if (CoralSceneRef == Coral_map["Coral_3"]){
        Coral_list.push(Coral_3.name);
      }
      if (CoralSceneRef == Coral_map["Coral_4"]){
        Coral_list.push(Coral_4.name);
      }
      if (CoralSceneRef == Coral_map["Coral_5"]){
        Coral_list.push(Coral_5.name);
      }
      if (CoralSceneRef == Coral_map["Coral_6"]){
        Coral_list.push(Coral_6.name);
      }
      if (CoralSceneRef == Coral_map["Coral_7"]){
        Coral_list.push(Coral_7.name);
      }
      if (CoralSceneRef == Coral_map["Coral_8"]){
        Coral_list.push(Coral_8.name);
      }
    }
    console.log("checkCoralList = ",Coral_list.length,Coral_list);
    return Coral_list;
  }
  console.log(CoralZone);
  console.log(zoneName);

  //------------------------------------------------------------------------------
  async function checkPlantCoral(event) {
    if (event.key != 'e'){
      return;
    }
    const currentCoralValue = zone[0].getComponent('scene_ref').value;
    console.log("pressed E = ",event.key);
      // if a plantions is empty call placeCoral() to place a Coral
    if (currentCoralValue == Coral_map["empty_zone"]){
      document.removeEventListener('keypress', checkPlantCoral);
      document.removeEventListener('keypress',placeCoral);
      document.addEventListener('keypress',placeCoral);
      return;
    }

    for (const CoralKey in Coral_map) {
      if (currentCoralValue === Coral_map[CoralKey]) {
          const CoralIndex = Coral_list.indexOf(CoralKey);
          if (CoralIndex !== -1) {
              console.log(`Coral = ${CoralKey.replace("Coral_", "")}`);
              console.log(CoralIndex);
              Coral_list.splice(CoralIndex, 1);
              inventory[`Coral_${CoralKey}`] += 1;
              console.log("inventory =",inventory)
          }
          break; // Sortir de la boucle dès qu'on trouve le corail
      }
    }

    zone[0].setComponent('scene_ref',{value : Coral_map["empty_zone"], maxRecursionCount: 1});
    zone[0].save()
    checkCoralList();
  };
  
  //------------------------------------------------------------------------------
  async function teleport(){
    document.querySelector("#loading-page").style.visibility = "visible";
    let tpPointChildren = await tpPoint.getChildren()
    let tpPointPos = tpPointChildren[0].getGlobalTransform();
    let scriptComponent = currentPlayerController.getComponent("script_map");
    currentPlayerController.setGlobalTransform(tpPointPos);
    console.log(tpPoint.getName());
    console.log("swim = ",scriptComponent.elements[characterControllerUUID].dataJSON["isSwimming"]);
    console.log(InsideHubDoorToOutside[0].getName());

    if (tpPoint.getName() == InsideHubDoorToOutside[0].getName()){
      scriptComponent.elements[characterControllerUUID].dataJSON["isSwimming"] = 1;
      scriptComponent.elements[characterControllerUUID].dataJSON["walkSpeed"] = 1.5;
      scriptComponent.elements[characterControllerUUID].dataJSON["runSpeed"] = 5;
      scriptComponent.elements[characterControllerUUID].dataJSON["gravityValue"] = 0.2;
      scriptComponent.elements[characterControllerUUID].dataJSON["pitch"] = 0.0;
      scriptComponent.elements[characterControllerUUID].dataJSON["yaw"] = 90.0;

      currentPlayerController.setComponent("script_map", scriptComponent);
      setTimeout(()=>{SDK3DVerse.engineAPI.assignClientToScripts(currentPlayerController)}, 100);
      document.removeEventListener('click', teleport);
    } else if (tpPoint.getName() == ToHubDoor[0]. getName()){
      scriptComponent.elements[characterControllerUUID].dataJSON["isSwimming"] = 0;
      scriptComponent.elements[characterControllerUUID].dataJSON["walkSpeed"] = 2;
      scriptComponent.elements[characterControllerUUID].dataJSON["runSpeed"] = 6;
      scriptComponent.elements[characterControllerUUID].dataJSON["gravityValue"] = 9.8;
      scriptComponent.elements[characterControllerUUID].dataJSON["pitch"] = 0.0;
      scriptComponent.elements[characterControllerUUID].dataJSON["yaw"] = 90.0;

      currentPlayerController.setComponent("script_map", scriptComponent);
      setTimeout(()=>{SDK3DVerse.engineAPI.assignClientToScripts(currentPlayerController)}, 100);
      document.removeEventListener('click', teleport);
    } else {
      scriptComponent.elements[characterControllerUUID].dataJSON["isSwimming"] = 0;
      scriptComponent.elements[characterControllerUUID].dataJSON["walkSpeed"] = 2;
      scriptComponent.elements[characterControllerUUID].dataJSON["runSpeed"] = 6;
      scriptComponent.elements[characterControllerUUID].dataJSON["gravityValue"] = 9.8;
      scriptComponent.elements[characterControllerUUID].dataJSON["pitch"] = 0.0;
      scriptComponent.elements[characterControllerUUID].dataJSON["yaw"] = -90.0;

      currentPlayerController.setComponent("script_map", scriptComponent);
      setTimeout(()=>{SDK3DVerse.engineAPI.assignClientToScripts(currentPlayerController)}, 100);
      document.removeEventListener('click', teleport);
    }
    await delay(2000);
    document.querySelector("#loading-page").style.visibility = "hidden";
    document.removeEventListener('click', teleport);
  };

  //------------------------------------------------------------------------------
  function adjustCoralList() {
    const totalCount = Coral_list.length;
    console.log("longueur =",Coral_list.length);
    console.log("Coral-list = ",typeof Coral_list,Coral_list,Array.isArray(Coral_list));

    // Si le nombre total de coraux est inférieur à nbZones, retourner les occurences
    if (totalCount < nbZones) {
        const adjustedCounts = Coral_list.reduce((counts, CoralType) => {
            counts[CoralType] = (counts[CoralType] || 0) + 1;
            return counts;
        }, {});
        console.log("adjustedCounts =",adjustedCounts);
        return adjustedCounts;
    } else {

      // Le reste du code reste inchangé...
      const proportionalCounts = Coral_list.reduce((counts, CoralType) => {
          counts[CoralType] = (counts[CoralType] || 0) + 1;
          return counts;
      }, {});

      const adjustedProportionalCounts = {};
      for (const CoralType in proportionalCounts) {
          adjustedProportionalCounts[CoralType] = Math.round((proportionalCounts[CoralType] / totalCount) * nbZones);
      }

      const adjustedLengths = {};
      for (const CoralType in adjustedProportionalCounts) {
          adjustedLengths[CoralType] = adjustedProportionalCounts[CoralType];
      }
      console.log("adjusted lenghts", adjustedLengths, adjustedProportionalCounts);
      return adjustedLengths;
    }
  };

  //------------------------------------------------------------------------------
  function getRandomCoralAndDecrement(adjustedLengths, Coral_list, nbZones) {
    console.log("adjustedLengths:", adjustedLengths);
    // Si la longueur de Coral_list est supérieure à nbZones, sélectionner un corail directement
    if (Coral_list.length > nbZones) {
        const availableCoralTypes = Coral_list.filter(CoralType => adjustedLengths[CoralType] > 0);
        if (availableCoralTypes.length === 0) {
            // Aucun type de corail disponible, retourner null ou traiter en conséquence
            return null;
        }
        const randomCoralType = availableCoralTypes[Math.floor(Math.random() * availableCoralTypes.length)];
        adjustedLengths[randomCoralType]--;
        return randomCoralType;
    }

    // Si la longueur de Coral_list est inférieure ou égale à nbZones, continuer avec la logique précédente
    const availableCoralTypes = Object.keys(adjustedLengths).filter(CoralType => adjustedLengths[CoralType] > 0);

    if (availableCoralTypes.length === 0) {
        // Aucun type de corail disponible, retourner null ou traiter en conséquence
        return null;
    }

    const randomCoralType = availableCoralTypes[Math.floor(Math.random() * availableCoralTypes.length)];
    adjustedLengths[randomCoralType]--;

    return randomCoralType;
  };


  //------------------------------------------------------------------------------
  async function placeCoral(event) {
    console.log("pressed to place =", event.key);
    const CoralIndex = parseInt(event.key);
    if (CoralIndex >= 1 && CoralIndex <= 8) {
      const CoralKey = `Coral_${CoralIndex}`;
      console.log(inventory[CoralKey]);
      if (inventory[CoralKey] > 0){
        console.log(event.key);
        zone[0].setComponent('scene_ref', { value: Coral_map[CoralKey], maxRecursionCount: 1 });
        zone[0].save()
        inventory[CoralKey] -= 1;
        console.log("inventory",inventory);
        await checkCoralList();
        console.log(Coral_list);
        let adjustedLengths = adjustCoralList(Coral_list, nbZones);
        console.log(adjustedLengths);
        for (let i = 0; i < nbZones; i++) {
          // Get a random Coral type and decrement its count
          let randomCoral = getRandomCoralAndDecrement(adjustedLengths, Coral_list, nbZones);
          console.log("voici",CoralZone[0].getName());
          console.log(zoneName[i].getName());
          console.log(randomCoral);
          console.log("this = ",zoneCoralPlace[randomCoral])
          zoneName[i].setComponent('scene_ref',{value : zoneCoralPlace[randomCoral], maxRecursionCount: 0});
          zoneName[i].setGlobalTransform(CoralZone[0]);
          console.log(`Zone ${i + 1}: ${randomCoral}`);
        }
      }else{
        console.log("not enough Coral :\n", inventory);
      }

    //get the occurrences and adapt them to the number of decorztion zone
    }
    document.removeEventListener('keypress', placeCoral);
    await coralClean();
  };

  //------------------------------------------------------------------------------
  function passNightMenu(event){
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
      document.querySelector("#time-set-checkbox").style.visibility = "visible";
      document.querySelector("#checked").style.visibility = CheckboxChecked ? "visible" : "hidden";
      document.querySelector("#unchecked").style.visibility = CheckboxUnchecked ? "visible" : "hidden";
      removeEventListener('keydown', passNightMenu);
      resetFPSCameraController(canvas);
    }else{
      document.querySelector("#time-set-menu").style.visibility = "hidden";
      document.querySelector("#time-set-day").style.visibility = "hidden";
      document.querySelector("#time-set-midday").style.visibility = "hidden";
      document.querySelector("#time-set-night").style.visibility = "hidden";
      document.querySelector("#time-set-midnight").style.visibility = "hidden";
      document.querySelector("#time-set-checkbox").style.visibility = "hidden";
      document.querySelector("#checked").style.visibility = "hidden";
      document.querySelector("#unchecked").style.visibility = "hidden";
      removeEventListener('keydown', passNightMenu);
      setFPSCameraController(canvas);
    }
    removeEventListener('keydown', passNightMenu);
  };

  //------------------------------------------------------------------------------
  function toggleCheckbox() {
    // console.log("toggle checkbox")
    // console.log("CheckboxChecked:", CheckboxChecked);
    // console.log("CheckboxUnchecked:", CheckboxUnchecked);
    document.querySelector("#checked").style.visibility = CheckboxChecked ? "visible" : "hidden";
    document.querySelector("#unchecked").style.visibility = CheckboxUnchecked ? "visible" : "hidden";
  };

  //------------------------------------------------------------------------------
  let posBeforeTravellingToScreen;
  let orientationBeforeTravellingToScreen;
  async function laboratoryMenu(event) {
    if (event.key === 'e') {
      laboratoryMenuDisplay = !laboratoryMenuDisplay;
    }
    
    const viewports = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
    
    
    
    if (laboratoryMenuDisplay){
      posBeforeTravellingToScreen = SDK3DVerse.utils.clone(viewports[0].getTransform().position);
      orientationBeforeTravellingToScreen = SDK3DVerse.utils.clone(viewports[0].getTransform().orientation);
      await SDK3DVerse.engineAPI.cameraAPI.setViewports([{
        id: 1, top: 0, left: 0, width: 1, height: 1, 
        defaultControllerType: SDK3DVerse.cameraControllerType.none,
        defaultTransform: viewports[0].getTransform(),
        onCameraCreation: function(cameraEntity){
          const viewports = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
          SDK3DVerse.engineAPI.cameraAPI.travel(viewports[0], [-68.5,20.3,1], [0, -0.7071067690849304, 0, 0.7071067690849304], 1);
        }
      }])
      console.log("Laboratory Menu = ", laboratoryMenuDisplay);
      document.querySelector("#laboratory-menu").style.visibility = "visible";
      document.querySelector("#laboratory-menubar-title-merger").style.visibility = Merger ? "visible" : "hidden";
      document.querySelector("#laboratory-menubar-title-analyser").style.visibility = Analyser ? "visible" : "hidden";
      document.querySelector("#laboratory-bloc-merger").style.visibility = Merger ? "visible" : "hidden";
      document.querySelector("#laboratory-bloc-analyser").style.visibility = Analyser ? "visible" : "hidden";
      SDK3DVerse.disableInputs();
      removeEventListener('keydown', laboratoryMenu);
      resetFPSCameraController(canvas);
    } else {
      console.log("Laboratory Menu = ", laboratoryMenuDisplay);
      const viewport = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0];
      if(viewport.getId() === 1) {
        await SDK3DVerse.engineAPI.cameraAPI.travel(viewport, posBeforeTravellingToScreen, orientationBeforeTravellingToScreen, 1);

        const children = await characterController.getChildren();
        const firstPersonCamera = children.find((child) => child.isAttached("camera"));
        SDK3DVerse.setMainCamera() = firstPersonCamera;
        // const viewports = [{
          //   id: 0, left: 0, top: 0, width: 1, height: 1,
          //   camera: firstPersonCamera,
          //   defaultCameraTransform: viewport.getTransform(),
          //   onCameraCreation: cameraEntity => {
            //     const viewport = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0];
            //     SDK3DVerse.engineAPI.cameraAPI.travel(viewport, posBeforeTravellingToScreen, orientationBeforeTravellingToScreen, 1);
        //   }
        // }];
        // await SDK3DVerse.engineAPI.cameraAPI.setViewports(viewports);
      }
      document.querySelector("#laboratory-menu").style.visibility = "hidden";
      document.querySelector("#laboratory-menubar-title-merger").style.visibility = "hidden";
      document.querySelector("#laboratory-menubar-title-analyser").style.visibility = "hidden";
      document.querySelector("#laboratory-bloc-merger").style.visibility = "hidden";
      document.querySelector("#laboratory-bloc-analyser").style.visibility = "hidden";
      SDK3DVerse.enableInputs();
      removeEventListener('keydown', laboratoryMenu);
      setFPSCameraController(canvas);
    }
    removeEventListener('keydown', laboratoryMenu);
  }

  //------------------------------------------------------------------------------
  function toggleLaboratorySection() {
    // ButtonMerger.classList.toggle("selected_title", Merger);
    // ButtonAnalyser.classList.toggle("selected_title", Analyser);

    document.querySelector("#laboratory-menubar-title-merger").style.visibility = Merger ? "visible" : "hidden";
    document.querySelector("#laboratory-menubar-title-analyser").style.visibility = Analyser ? "visible" : "hidden";

    document.querySelector("#laboratory-bloc-merger").style.visibility = Merger ? "visible" : "hidden";
    document.querySelector("#laboratory-bloc-analyser").style.visibility = Analyser ? "visible" : "hidden";
  };

  //------------------------------------------------------------------------------
  ButtonDay.addEventListener("click", function(){
    SDK3DVerse.engineAPI.playAnimationSequence(moonSunAnimUUID, { playbackSpeed : 1.0, seekOffset : 0.0 });
  });
  ButtonMidday.addEventListener("click", function(){
    SDK3DVerse.engineAPI.playAnimationSequence(moonSunAnimUUID, { playbackSpeed : 1.0, seekOffset : 0.25 });
  });
  ButtonNight.addEventListener("click", function(){
    SDK3DVerse.engineAPI.playAnimationSequence(moonSunAnimUUID, { playbackSpeed : 1.0, seekOffset : 0.5 });
  });
  ButtonMidnight.addEventListener("click", function(){
    SDK3DVerse.engineAPI.playAnimationSequence(moonSunAnimUUID, { playbackSpeed : 1.0, seekOffset : 0.75 });
  });
  ButtonCheckbox.addEventListener("click", function(){
    CheckboxChecked = true;
    CheckboxUnchecked = false;
    // console.log("checked", CheckboxChecked);
    SDK3DVerse.engineAPI.pauseAnimationSequence(moonSunAnimUUID);
    toggleCheckbox();
  });
  ButtonUncheckbox.addEventListener("click", function(){
    CheckboxChecked = false;
    CheckboxUnchecked = true;
    // console.log("unchecked", CheckboxUnchecked);
    SDK3DVerse.engineAPI.playAnimationSequence(moonSunAnimUUID);
    toggleCheckbox();
  });
  // ButtonMerger.addEventListener("click", function(){
  //   Merger = true;
  //   Analyser = false;
  //   toggleLaboratorySection();
  // });
  // ButtonAnalyser.addEventListener("click", function(){
  //   Analyser = true;
  //   Merger = false;
  //   toggleLaboratorySection();
  // });
  ButtonArrow1.addEventListener("click", function(){
    Analyser = !Analyser;
    Merger = !Merger;
    toggleLaboratorySection();
  });
  ButtonArrow2.addEventListener("click", function(){
    Analyser = !Analyser;
    Merger = !Merger;
    toggleLaboratorySection();
  });

  //------------------------------------------------------------------------------
  SDK3DVerse.engineAPI.onEnterTrigger(async (emitterEntity, triggerEntity) =>
  {
    let emitterEntityParent = emitterEntity.getParent();
    let triggerEntityParent = triggerEntity.getParent();
    console.log("triggerEntityParent:", triggerEntityParent);
    if(!triggerEntityParent.isAttached('camera'))
    {
      // if it's not a camera then it's not the player'camera that we expect to be
      // the parent of the player's InteractZone entity.
      return;
    }

    const firstPersonControllerEntity = triggerEntityParent.getParent();
    const playerEntity = firstPersonControllerEntity.getParent();
    const playerClientUUID = playerEntity.getName().split('_')[1];
    console.log("!!!!!!!!", playerEntity, playerClientUUID);
    if(playerClientUUID !== SDK3DVerse.getClientUUID())
    {
      // it's the entity of another player, so we don't care about it!
      return;
    }

    currentPlayerController = firstPersonControllerEntity;
    console.log("We entered an interaction area player controller:", currentPlayerController);
    console.log('The interaction area is:', emitterEntity.getName());

    if (emitterEntity == InsideHubDoorToOutside[0]){
      console.log('press E to exit');
      document.querySelector("#cross").style.visibility = "hidden";
      document.querySelector("#door").style.visibility = "visible";
      tpPoint = await emitterEntity;
      document.removeEventListener('click', teleport);
      document.addEventListener('click',teleport);

    }
    else if (emitterEntity == OutsideHubDoorToInside[0]){
      outsideTrigger = true;
      console.log('press E to enter');
      document.querySelector("#cross").style.visibility = "hidden";
      document.querySelector("#door").style.visibility = "visible";
      tpPoint = await emitterEntity;
      document.removeEventListener('click', teleport);
      document.addEventListener('click',teleport);
    }
    else if (emitterEntity == ToLaboratoryDoor[0]){
      console.log('press E to laboratory');
      document.querySelector("#cross").style.visibility = "hidden";
      document.querySelector("#door").style.visibility = "visible";
      tpPoint = await emitterEntity;
      document.removeEventListener('click', teleport);
      document.addEventListener('click',teleport);
    }
    else if (emitterEntity == ToHubDoor[0]){
      console.log('press E to Hub');
      document.querySelector("#cross").style.visibility = "hidden";
      document.querySelector("#door").style.visibility = "visible";
      tpPoint = await emitterEntity;
      document.removeEventListener('click', teleport);
      document.addEventListener('click',teleport);
    }
    else if (emitterEntity  == Couch[0]) {
      console.log('press E to pass the night');
      document.removeEventListener('keydown', passNightMenu);
      document.addEventListener('keydown', passNightMenu);
    }
    else if (emitterEntity  == Laboratory_computer[0]) {
      console.log('press E to open the menu');
      document.removeEventListener('keydown', laboratoryMenu);
      document.addEventListener('keydown', laboratoryMenu);
    }
    else if (emitterEntity.getParent().getName() == "Plantations"){
      console.log("press E");
      zone = await emitterEntity.getChildren();
      if (zone[0].getComponent('scene_ref').value == Coral_map["empty_zone"]){
        document.querySelector("#cross").style.visibility = "hidden";
        document.querySelector("#put").style.visibility = "visible";
      } else {
        document.querySelector("#cross").style.visibility = "hidden";
        document.querySelector("#take").style.visibility = "visible";
      }
      console.log(zone[0].getName());
      console.log(emitterEntity," ",emitterEntity.getName()," ",emitterEntityParent," ",zone);
      document.removeEventListener('keypress', checkPlantCoral);
      document.addEventListener('keypress', checkPlantCoral);
    }
  });

  //------------------------------------------------------------------------------
  SDK3DVerse.engineAPI.onExitTrigger((emitterEntity, triggerEntity) => {
    console.log("exit trigger");
    if (emitterEntity === ToHubDoor[0] || emitterEntity === ToLaboratoryDoor[0] || emitterEntity === OutsideHubDoorToInside[0] || emitterEntity === InsideHubDoorToOutside[0] || emitterEntity.getParent().getName() === "Plantations"){
      console.log("cursor hidden, exit trigger");
      document.querySelector("#door").style.visibility = "hidden";
      document.querySelector("#put").style.visibility = "hidden";
      document.querySelector("#take").style.visibility = "hidden";
      document.querySelector("#cross").style.visibility = "visible";
    }

    console.log(emitterEntity.getName()," exit ", triggerEntity.getName());
    outsideTrigger = false;
    console.log(outsideTrigger);
    document.removeEventListener('keydown', checkPlantCoral);
    document.removeEventListener('keydown', passNightMenu);
    document.removeEventListener('click', teleport);
  });
  console.log(Coral_drop['Coral_1']);

  //------------------------------------------------------------------------------
  async function addCoralDNAToken(){
    let a = 0;
    for (let i = 0; i <= Coral_list.length - 1; i++){
      a += Coral_drop[Coral_list[i]];
    }
    inventory["DNA_token"] += a;
    console.log("DNA_Token =",inventory["DNA_token"])
  }

  //------------------------------------------------------------------------------
  async function coralClean(){
    let b = 0;
    for(let i = 0; i <= Coral_list.length-1; i++){
      console.log(Coral_list[i]);
      b += Coral_cleaning[Coral_list[i]]
    }
    if (b > 100){
      b=100;
    }
    await changeFogOnPercentChange(b/100);
    console.log("b =",b);
    console.log(newfogColor);
  }
  setInterval(addCoralDNAToken, 10000);

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

  // Release the pointer lock.
  canvas.exitPointerLock = (
      canvas.exitPointerLock
      || canvas.mozExitPointerLock
      || canvas.webkitExitPointerLock
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
    "Player_" + SDK3DVerse.getClientUUID(),
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
  return {firstPersonController, playerSceneEntity};

};
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
};

//------------------------------------------------------------------------------
async function loopOnFishSplineTravel(fish, entity, spline, speed, delay)
{
  while(fish.travelling)
  {
    await anim.gotoSplineAndTravel(entity, spline, speed, delay);
  }
};

//------------------------------------------------------------------------------
function findTravellingSplineFromEntity(entity) {
  return anim.splines.find(s => s.parentEntity.getEUID() === entity.getEUID());
};
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
// function fermerModale() {
//     const modal = document.getElementById('maModal');
//     const body = document.body;
//     modal.classList.remove('show');
//     setTimeout(() => {
//         modal.style.display = 'none';
//         body.classList.remove('body-overlay');
//     }, 1000); // Delay the removal of 'show' class for the animation to take effect
// };

// //------------------------------------------------------------------------------
// window.onclick = function (event) {
//     const modal = document.getElementById('maModal');
//     const body = document.body;
//     if (event.target === modal) {
//         fermerModale();
//     }
// };

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


