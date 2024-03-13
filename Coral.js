
//-----------------------------------CLASS-----------------------------------
class Coral_1 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_adulte";
        this.drop1 = 0.1;
        this.cleaning1 = 0.01;
    }

    Mesh_specs() {
        this.CoralMesh1 = "6ae18400-3d3a-4a71-a714-3f6c2337319d";
    }
}

class Coral_2 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_ado";
        this.drop2 = 0.5;
        this.cleaning2 = 0.02;
    }

    Mesh_specs() {
        this.CoralMesh2 = "f7011b36-2f4a-4b7d-b213-ef5964beb4f0";
    }
}

class Coral_3 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_bebe";
        this.drop3 = 1;
        this.cleaning3 = 0.06;
    }

    Mesh_specs() {
        this.CoralMesh3 = "e1f46b19-4af8-4dca-88b6-659b055b3e33";
    }
}

class Coral_4 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_arbre_bebe";
        this.drop4 = 1.5;
        this.cleaning4 = 0.2;
    }

    Mesh_specs() {
        this.CoralMesh4 = "be51944e-03c4-4c2a-947a-ab27a9eafedb";
    }
}

class Coral_5 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_arbre_adulte";
        this.drop5 = 2;
        this.cleaning5 = 0.202;
    }

    Mesh_specs() {
        this.CoralMesh5 = "947d424c-7cc3-489a-99d1-fe72af95fd2b";
    }
}

class Coral_6 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_adulte";
        this.drop6 = 5;
        this.cleaning6 = 0.256;
    }

    Mesh_specs() {
        this.CoralMesh6 = "0bd507d5-9b3d-4f04-8676-2af7573271c2";
    }
}

class Coral_7 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_bebe";
        this.drop7 = 15;
        this.cleaning7 = 0.3;
    }

    Mesh_specs() {
        this.CoralMesh7 = "9de2f365-cf41-4274-9664-505b3289169f";
    }
}

class Coral_8 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_ado";
        this.drop8 = 25;
        this.cleaning8 = 20;
    }

    Mesh_specs() {
        this.CoralMesh8 = "c704af49-451e-4e6e-bb02-cf5ded8dbbf0";
    }
}

class Empty_zone {
    constructor() {
        this.Mesh_specs();
        this.Name = "empty";
        this.drop0 = 0;
        this.cleaning0 = 0;
    }

    Mesh_specs() {
        this.emptyMesh = "cc8e239c-a6c5-4a69-ac78-bf8129e93dac";
    }
}


//---------------------------------INSTANCES---------------------------------
// Create instances of classes
const Coral1 = new Coral_1();
const Coral2 = new Coral_2();
const Coral3 = new Coral_3();
const Coral4 = new Coral_4();
const Coral5 = new Coral_5();
const Coral6 = new Coral_6();
const Coral7 = new Coral_7();
const Coral8 = new Coral_8();
const emptyZone = new Empty_zone();


//------------------------------------MAP------------------------------------
//Create the map of Corals
const Coral_map = {
    Coral_1: Coral1.CoralMesh1,
    Coral_2: Coral2.CoralMesh2,
    Coral_3: Coral3.CoralMesh3,
    Coral_4: Coral4.CoralMesh4,
    Coral_5: Coral5.CoralMesh5,
    Coral_6: Coral6.CoralMesh6,
    Coral_7: Coral7.CoralMesh7,
    Coral_8: Coral8.CoralMesh8,
    empty_zone: emptyZone.emptyMesh
};

const Coral_drop = {
    Coral_1: Coral1.drop1,
    Coral_2: Coral2.drop2,
    Coral_3: Coral3.drop3,
    Coral_4: Coral4.drop4,
    Coral_5: Coral5.drop5,
    Coral_6: Coral6.drop6,
    Coral_7: Coral7.drop7,
    Coral_8: Coral8.drop8,
    empty_zone: emptyZone.drop0
};

const CoralCleaning = {
    Coral_1: Coral1.cleaning1,
    Coral_2: Coral2.cleaning2,
    Coral_3: Coral3.cleaning3,
    Coral_4: Coral4.cleaning4,
    Coral_5: Coral5.cleaning5,
    Coral_6: Coral6.cleaning6,
    Coral_7: Coral7.cleaning7,
    Coral_8: Coral8.cleaning8,
    empty_zone: emptyZone.cleaning0
}

//-----------------------------------EXPORT----------------------------------
export {
    Coral_map,
    Coral_drop,
    CoralCleaning,
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


