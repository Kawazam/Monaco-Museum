//------------------------------------------------------------------------------
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";

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
} from "./Coral.js"


//------------------------------------------------------------------------------
window.addEventListener("load", InitApp);
//------------------------------------------------------------------------------
async function InitApp() {
  let canvas = document.getElementById("display-canvas");
  await SDK3DVerse.startSession({
  //await SDK3DVerse.joinOrStartSession({
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    canvas: document.getElementById("display-canvas"),
    createDefaultCamera: false,
    startSimulation: "on-assets-loaded",
  });
  await InitFirstPersonController(characterControllerSceneUUID);
  
  canvas.addEventListener('mousedown', () => setFPSCameraController(canvas));
  


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
  const sun  = await SDK3DVerse.engineAPI.findEntitiesByEUID('0e3748a2-ea86-44e0-869b-cddb715dab0e');
  
  
  let islampvisible = false;
  let zone;
  const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID('7875aa33-7421-47b0-bcba-884aed856227');
  console.log(entities);
  let scriptComponent = entities[0].getComponent("script_map");
  console.log(entities);
  console.log("is Swimming = ",scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"]);
  SDK3DVerse.engineAPI.playAnimationSequence('f04ae5d8-365f-4c7d-831e-e71dc860d0a5', { playbackSpeed : 1.0 });
  
  const engineOutputEventUUID = "42830dc6-ca1e-4f4c-9f2a-ede6d436a964";
  SDK3DVerse.engineAPI.registerToEvent(engineOutputEventUUID, "log", (event) => console.log(event.dataObject.output));
  let outsideTrigger = false;

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
  
  let canPlaceCoral = false;

  function PlaceCoral(event){
    
    if (event.key === 'e'){
      console.log('pressed E')
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
    }
    //mathCoral();
    canPlaceCoral = false;
    document.removeEventListener('keydown', PlaceCoral);    
  }

  function mathCoral (){
    let nbZones = 6;
    const occurrences = {};
    coral_list.forEach((coralType) => {
      occurrences[coralType] = (occurrences[coralType] || 0) + 1;
    });
    const averageOccurrences = {};
    Object.keys(occurrences).forEach((coralType) => {
      averageOccurrences[coralType] = occurrences[coralType] / nbZones;
    });
    const normalizedOccurrences = {};
    Object.keys(occurrences).forEach((coralType) => {
      normalizedOccurrences[coralType] = occurrences[coralType] / averageOccurrences[coralType];
    });
  }

  function TeleportToHub(event){
    if (event.key === 'e'){
      const hub = ToHubTpPoint[0].getGlobalTransform();
      entities[0].setGlobalTransform(hub);
      document.removeEventListener('keydown', TeleportToHub)
    }
  }

  function TeleportToLab(event){
    if (event.key === 'e'){
      const lab = ToLabTpPoint[0].getGlobalTransform();
      entities[0].setGlobalTransform(lab);
      document.removeEventListener('keydown', TeleportToLab);
    }
  }

  SDK3DVerse.engineAPI.onEnterTrigger(async (emitterEntity, triggerEntity) =>
  {
    let emitterEntityParent = emitterEntity.getParent();
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
        if (zone[0] != "cube9"){
          zone[0].setComponent('scene_ref',{value : coral_map["empty_zone"], maxRecursionCount: 1});
        }
        console.log(emitterEntity," ",emitterEntity.getName()," ",emitterEntityParent," ",zone);
        document.removeEventListener('keydown', PlaceCoral);
        document.addEventListener('keydown', PlaceCoral);
        
      }
    }
  });

  SDK3DVerse.engineAPI.onExitTrigger((emitterEntity, triggerEntity) => {
    console.log(emitterEntity.getName()," exit ", triggerEntity.getName());
    outsideTrigger = false;
    console.log(outsideTrigger);

  });

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
}

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
