
//-----------------------------------CLASS-----------------------------------
class Coral_1 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_adulte";
    }

    Mesh_specs() {
        this.coralMesh1 = "3736a061-4e48-4642-bc9d-d79dfc6b4c40";
    }
}

class Coral_2 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_ado";
    }

    Mesh_specs() {
        this.coralMesh2 = "a4c08d35-4888-4c5d-a80c-8824d73e5251";
    }
}

class Coral_3 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_bebe";
    }

    Mesh_specs() {
        this.coralMesh3 = "fb236bac-9b40-47e1-bbfc-08824255690a";
    }
}

class Coral_4 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_arbre_bebe";
    }

    Mesh_specs() {
        this.coralMesh4 = "2ab54c3d-c92b-438d-bee9-6293b3a426d3";
    }
}

class Coral_5 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_arbre_adulte";
    }

    Mesh_specs() {
        this.coralMesh5 = "040f8588-10f6-45a1-a665-24c5921482b0";
    }
}

class Coral_6 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_adulte";
    }

    Mesh_specs() {
        this.coralMesh6 = "a5233545-e922-4bd6-a244-63d0806f9b1d";
    }
}

class Coral_7 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_bebe";
    }

    Mesh_specs() {
        this.coralMesh7 = "db675168-0289-4345-9882-a426adf03ea6";
    }
}

class Coral_8 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_ado";
    }

    Mesh_specs() {
        this.coralMesh8 = "57c3eb87-3cf3-4a1c-a37d-45262699e89c";
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

// Add thes instances of classes to the coral list
const coral_list = [];


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


