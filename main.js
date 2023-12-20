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

document.addEventListener("DOMContentLoaded", function() {
  // Fonction pour ajouter un corail à la liste
  function addCoral() {
    /*  // Récupère les valeurs des champs de texte
      let newCoralName = document.getElementById("newCoralName").value;
      let newCoralType = document.getElementById("newCoralType").value;

      // Vérifie si les champs ne sont pas vides
      if (newCoralName.trim() !== "" && newCoralType.trim() !== "") {
          // Crée un nouvel élément li
          let newLi = document.createElement("li");

          // Ajoute le texte dans l'élément li
          newLi.appendChild(document.createTextNode(`${newCoralName} - ${newCoralType}`));

          // Ajoute l'élément li à la liste existante
          document.getElementById("coralList").appendChild(newLi);

          // Efface les champs de texte après l'ajout
          document.getElementById("newCoralName").value = "";
          document.getElementById("newCoralType").value = "";
      }*/
  }

  // Associe la fonction addCoral à l'événement click du bouton
  document.getElementById("addCoralBtn").addEventListener("click", addCoral);
});


const coralNumber = {
  planted: [],
  notPlanted: [],
  coralLevel: {
    blue: [],
    red: [],
    green: [],
    white: [],
    gold: [],
  }
}

function addCoral(nom, type, statut) {
  const coralSpecs = {
      coralName: coralName,
      coralType: coralType,
      coralStatut: coralStatut
  };

  // Ajoute le corail à la liste appropriée en fonction de son statut
  if (coralStatut === 'planted') {
      coralNumber.planted.push(planted);
  } else if (coralStatut === 'notplanted') {
      coralNumber.notPlanted.push(notPlanted);
  }

  // Ajoute le corail à la liste du type de corail
  if (coralNumber.types[type]) {
      coralNumber.types[type].push(coralType);
  } else {
      coralNumber.types[type] = [coralType];
  }

  
}




/* import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./travelAnimations.js";
*/