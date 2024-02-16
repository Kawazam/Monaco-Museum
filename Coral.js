
//-----------------------------------CLASS-----------------------------------
class coral_1 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_adulte";
        this.drop1 = 0.1;
        this.cleaning1 = 0.01;
    }

    Mesh_specs() {
        this.coralMesh1 = "6ae18400-3d3a-4a71-a714-3f6c2337319d";
    }
}

class coral_2 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_ado";
        this.drop2 = 0.5;
        this.cleaning2 = 0.02;
    }

    Mesh_specs() {
        this.coralMesh2 = "f7011b36-2f4a-4b7d-b213-ef5964beb4f0";
    }
}

class coral_3 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_tuyaux_bebe";
        this.drop3 = 1;
        this.cleaning3 = 0.06;
    }

    Mesh_specs() {
        this.coralMesh3 = "e1f46b19-4af8-4dca-88b6-659b055b3e33";
    }
}

class coral_4 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_arbre_bebe";
        this.drop4 = 1.5;
        this.cleaning4 = 0.2;
    }

    Mesh_specs() {
        this.coralMesh4 = "be51944e-03c4-4c2a-947a-ab27a9eafedb";
    }
}

class coral_5 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_arbre_adulte";
        this.drop5 = 2;
        this.cleaning5 = 0.202;
    }

    Mesh_specs() {
        this.coralMesh5 = "947d424c-7cc3-489a-99d1-fe72af95fd2b";
    }
}

class coral_6 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_adulte";
        this.drop6 = 5;
        this.cleaning6 = 0.256;
    }

    Mesh_specs() {
        this.coralMesh6 = "0bd507d5-9b3d-4f04-8676-2af7573271c2";
    }
}

class coral_7 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_bebe";
        this.drop7 = 15;
        this.cleaning7 = 0.3;
    }

    Mesh_specs() {
        this.coralMesh7 = "9de2f365-cf41-4274-9664-505b3289169f";
    }
}

class coral_8 {
    constructor() {
        this.Mesh_specs();
        this.Name = "coraux_plat_ado";
        this.drop8 = 25;
        this.cleaning8 = 20;
    }

    Mesh_specs() {
        this.coralMesh8 = "c704af49-451e-4e6e-bb02-cf5ded8dbbf0";
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
const coral1 = new coral_1();
const coral2 = new coral_2();
const coral3 = new coral_3();
const coral4 = new coral_4();
const coral5 = new coral_5();
const coral6 = new coral_6();
const coral7 = new coral_7();
const coral8 = new coral_8();
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

const coral_drop = {
    coral_1: coral1.drop1,
    coral_2: coral2.drop2,
    coral_3: coral3.drop3,
    coral_4: coral4.drop4,
    coral_5: coral5.drop5,
    coral_6: coral6.drop6,
    coral_7: coral7.drop7,
    coral_8: coral8.drop8,
    empty_zone: emptyZone.drop0
};

const coral_cleaning = {
    coral_1: coral1.cleaning1,
    coral_2: coral2.cleaning2,
    coral_3: coral3.cleaning3,
    coral_4: coral4.cleaning4,
    coral_5: coral5.cleaning5,
    coral_6: coral6.cleaning6,
    coral_7: coral7.cleaning7,
    coral_8: coral8.cleaning8,
    empty_zone: emptyZone.cleaning0
}

//-----------------------------------EXPORT----------------------------------
export {
    coral_map,
    coral_drop,
    coral_cleaning,
    coral_1,
    coral_2,
    coral_3,
    coral_4,
    coral_5,
    coral_6,
    coral_7,
    coral_8,
    Empty_zone
};


