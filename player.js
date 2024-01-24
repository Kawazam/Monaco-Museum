class PlayerInventory {
    constructor() {
        this.inventory = [];
    }

    addItem(item) {
        this.inventory.push(item);
        console.log(`Objet ajouté à l'inventaire: ${item}`);
    }

    removeItem(item) {
        const index = this.inventory.indexOf(item);
        if (index !== -1) {
            this.inventory.splice(index, 1);
            console.log(`Objet retiré de l'inventaire: ${item}`);
        } else {
            console.log(`L'objet ${item} n'est pas présent dans l'inventaire.`);
        }
    }

    displayInventory() {
        if (this.inventory.length === 0) {
            console.log("L'inventaire est vide.");
        } else {
            console.log("Contenu de l'inventaire:");
            this.inventory.forEach(item => {
                console.log(`- ${item}`);
            });
        }
    }

    countOccurrences() {
        const occurrences = {};

        this.inventory.forEach(item => {
            occurrences[item] = (occurrences[item] || 0) + 1;
        });

        console.log("Occurrences dans l'inventaire:");
        for (const [item, count] of Object.entries(occurrences)) {
            console.log(`- ${item}: ${count} fois`);
        }
    }
}

export { PlayerInventory };