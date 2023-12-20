//------------------------------------------------------------------------------
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";

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
  const InsideTpPoint = await SDK3DVerse.engineAPI.findEntitiesByEUID('075dfe39-7699-4976-9504-2d30d95eef7a');
  const OutsideTpPoint = await SDK3DVerse.engineAPI.findEntitiesByEUID('c34c10e9-071f-41e8-83ea-c8af395ed420');
  const InteractZonePLayer = await SDK3DVerse.engineAPI.findEntitiesByEUID('67919a03-7107-402a-a87e-4027311d9ec6');
  const playerHitBox = await SDK3DVerse.engineAPI.findEntitiesByEUID('bbaeab8e-973c-4771-a7de-e84d9ca1d975');
  const GravityZone = await SDK3DVerse.engineAPI.findEntitiesByEUID('ac2c7b00-967f-490a-b6bf-621a7eb7ad87');
  const lamp = await SDK3DVerse.engineAPI.findEntitiesByEUID('f95f32ec-fa18-410a-967d-7be768c539d1');
  let islampvisible = false;
  const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID('7875aa33-7421-47b0-bcba-884aed856227');
  console.log(entities);
  let scriptComponent = entities[0].getComponent("script_map");
  console.log(entities);
  console.log("is Swimming = ",scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"]);
  SDK3DVerse.engineAPI.playAnimationSequence('cf241010-8bcf-4e8f-abca-d269347c0dc8');
  
  const engineOutputEventUUID = "42830dc6-ca1e-4f4c-9f2a-ede6d436a964";
  SDK3DVerse.engineAPI.registerToEvent(engineOutputEventUUID, "log", (event) => console.log(event.dataObject.output));

  function TeleportInside(event) {
    if (event.key === 'e') {
      const inside = InsideTpPoint[0].getGlobalTransform();
      entities[0].setGlobalTransform(inside);
      scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"] = 0;
      console.log(scriptComponent.elements["f8789590-4a8c-444a-b0f6-362c93762d3e"].dataJSON["isSwimming"])
      entities[0].setComponent("script_map", scriptComponent);
      setTimeout(()=>{SDK3DVerse.engineAPI.assignClientToScripts(entities[0])}, 100);
      document.removeEventListener('keydown', TeleportInside);
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
  SDK3DVerse.engineAPI.onEnterTrigger((emitterEntity, triggerEntity) =>
  {
    console.log('enter ',emitterEntity.getName()," ", triggerEntity.getName());
    if (triggerEntity == InteractZonePLayer[0]){
      if (emitterEntity == InsideHubDoorToOutside[0]){
        console.log('press E to exit');
        document.removeEventListener('keydown', TeleportOutside);
        document.addEventListener('keydown', TeleportOutside);
        
      }
      else if (emitterEntity == OutsideHubDoorToInside[0]){
        console.log('press E to enter');
        document.removeEventListener('keydown', TeleportInside);
        document.addEventListener('keydown', TeleportInside);
      }
    }
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
