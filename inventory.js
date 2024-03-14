// Définition de l'inventaire comme un objet
const inventory = {
    "Coral_1": 999,
    "Coral_2": 999,
    "Coral_3": 999,
    "Coral_4": 999,
    "Coral_5": 999,
    "Coral_6": 999,
    "Coral_7": 999,
    "Coral_8": 999,
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