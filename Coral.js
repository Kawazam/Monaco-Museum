
//-----------------------------------CLASS-----------------------------------
class Coral_1 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_adulte";
    }

    Mesh_specs() {
        this.coralMesh1 = "6ae18400-3d3a-4a71-a714-3f6c2337319d";
    }
}

class Coral_2 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_ado";
    }

    Mesh_specs() {
        this.coralMesh2 = "f7011b36-2f4a-4b7d-b213-ef5964beb4f0";
    }
}

class Coral_3 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_bebe";
    }

    Mesh_specs() {
        this.coralMesh3 = "e1f46b19-4af8-4dca-88b6-659b055b3e33";
    }
}

class Coral_4 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_arbre_bebe";
    }

    Mesh_specs() {
        this.coralMesh4 = "be51944e-03c4-4c2a-947a-ab27a9eafedb";
    }
}

class Coral_5 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_arbre_adulte";
    }

    Mesh_specs() {
        this.coralMesh5 = "947d424c-7cc3-489a-99d1-fe72af95fd2b";
    }
}

class Coral_6 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_adulte";
    }

    Mesh_specs() {
        this.coralMesh6 = "0bd507d5-9b3d-4f04-8676-2af7573271c2";
    }
}

class Coral_7 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_bebe";
    }

    Mesh_specs() {
        this.coralMesh7 = "9de2f365-cf41-4274-9664-505b3289169f";
    }
}

class Coral_8 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_ado";
    }

    Mesh_specs() {
        this.coralMesh8 = "c704af49-451e-4e6e-bb02-cf5ded8dbbf0";
    }
}

class Empty_zone {
    constructor() {
        this.Mesh_specs();
        this.Name = "empty";
    }

    Mesh_specs() {
        this.emptyMesh = "cc8e239c-a6c5-4a69-ac78-bf8129e93dac";
    }
}


//---------------------------------INSTANCES---------------------------------
// Create instances of classes
const coral1 = new Coral_1();
const coral2 = new Coral_2();
const coral3 = new Coral_3();
const coral4 = new Coral_4();
const coral5 = new Coral_5();
const coral6 = new Coral_6();
const coral7 = new Coral_7();
const coral8 = new Coral_8();
const emptyZone = new Empty_zone();


//------------------------------------MAP------------------------------------
//Create the map of corals
const coral_map = {
    coral_1: coral1.coralMesh1,
    coral_2: coral2.coralMesh2,
    coral_3: coral3.coralMesh3,
    coral_4: coral4.coralMesh4,
    coral_5: coral5.coralMesh5,
    coral_6: coral6.coralMesh6,
    coral_7: coral7.coralMesh7,
    coral_8: coral8.coralMesh8,
    empty_zone: emptyZone.emptyMesh
};


//-----------------------------------EXPORT----------------------------------
export {
    coral_map,
    coral_list,
    Coral_1,
    Coral_2,
    Coral_3,
    Coral_4,
    Coral_5,
    Coral_6,
    Coral_7,
    Coral_8,
    Empty_zone
};


