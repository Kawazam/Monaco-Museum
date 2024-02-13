//-----------------------------------CLASS-----------------------------------
class Zone_1 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh1 = "95372d61-afeb-4a48-a7ad-957a49fcc7be";
    }
}

class Zone_2 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh2 = "aaf706e4-7c87-492b-9a9a-2b00c0202199";
    }
}

class Zone_3 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh3 = "76397521-9e28-41d6-b1f2-dc1746442c97";
    }
}

class Zone_4 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh4 = "e96bf9dd-1bc1-4317-88a1-3f3c2389027d";
    }
}

class Zone_5 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh5 = "e6b7e6d7-6a6d-492e-ac10-2e9605b8f442";
    }
}

class Zone_6 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh6 = "3b8465a1-4fd1-4b65-a569-28d3ee3d1e13";
    }
}

class Zone_7 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh7 = "611e8267-0334-4aa6-9750-e52436eca903";
    }
}


//---------------------------------INSTANCES---------------------------------
// Create instances of classes
const zone1 = new Zone_1();
const zone2 = new Zone_2();
const zone3 = new Zone_3();
const zone4 = new Zone_4();
const zone5 = new Zone_5();
const zone6 = new Zone_6();
const zone7 = new Zone_7();


//------------------------------------MAP------------------------------------
//Create the map of corals
const Zone_map = {
    ZonePlace_1: zone1.ZoneMesh1,
    ZonePlace_2: zone2.ZoneMesh2,
    ZonePlace_3: zone3.ZoneMesh3,
    ZonePlace_4: zone4.ZoneMesh4,
    ZonePlace_5: zone5.ZoneMesh5,
    ZonePlace_6: zone6.ZoneMesh6,
    ZonePlace_7: zone7.ZoneMesh7,
};


//-----------------------------------EXPORT----------------------------------
export {
    Zone_map,
    Zone_1,
    Zone_2,
    Zone_3,
    Zone_4,
    Zone_5,
    Zone_6,
    Zone_7,
};