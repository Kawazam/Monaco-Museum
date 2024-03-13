// Définition de l'inventaire comme un objet
const inventory = {
    "coral_1": 999,
    "coral_2": 999,
    "coral_3": 999,
    "coral_4": 999,
    "coral_5": 999,
    "coral_6": 999,
    "coral_7": 999,
    "coral_8": 999,
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