// Définition de l'inventaire comme un objet
var inventory = {
    "coral_1": 5,
    "coral_2": 3,
    "coral_3": 7,
    "coral_4": 2,
    "coral_5": 0,
    "coral_6": 1,
    "coral_7": 4,
    "coral_8": 6,
    "DNA_token": 10
};

// Affichage du contenu de l'inventaire
console.log("Contenu de l'inventaire :");
for (var item in inventory) {
    console.log(item + ": " + inventory[item]);
}

export{
    inventory,
}