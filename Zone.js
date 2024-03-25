class Zone_1 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh1 = "188cf95a-1591-41b7-a432-9d2bb02328f4";
    }
}

class Zone_2 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh2 = "188cf95a-1591-41b7-a432-9d2bb02328f4";
    }
}

class Zone_3 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh3 = "188cf95a-1591-41b7-a432-9d2bb02328f4";
    }
}

class Zone_4 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh4 = "0e181907-28af-4722-8106-37033cc9e3b3";
    }
}

class Zone_5 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh5 = "346195d1-3a3d-47a6-9a75-002fe28d2673";
    }
}

class Zone_6 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh6 = "346195d1-3a3d-47a6-9a75-002fe28d2673";
    }
}

class Zone_7 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh7 = "48ee7cf5-8fbd-4f55-ba4c-138d8f7a3de6";
    }
}

class Zone_8 {
    constructor() {
        this.Mesh_specs();
    }

    Mesh_specs() {
        this.ZoneMesh8 = "48ee7cf5-8fbd-4f55-ba4c-138d8f7a3de6";
    }
}

const zone1 = new Zone_1();
const zone2 = new Zone_2();
const zone3 = new Zone_3();
const zone4 = new Zone_4();
const zone5 = new Zone_5();
const zone6 = new Zone_6();
const zone7 = new Zone_7();
const zone8 = new Zone_8();

const Zone_map = {
    ZonePlace_1: zone1.ZoneMesh1,
    ZonePlace_2: zone2.ZoneMesh2,
    ZonePlace_3: zone3.ZoneMesh3,
    ZonePlace_4: zone4.ZoneMesh4,
    ZonePlace_5: zone5.ZoneMesh5,
    ZonePlace_6: zone6.ZoneMesh6,
    ZonePlace_7: zone7.ZoneMesh7,
    ZonePlace_8: zone7.ZoneMesh8,
};

export {
    Zone_map,
    Zone_1,
    Zone_2,
    Zone_3,
    Zone_4,
    Zone_5,
    Zone_6,
    Zone_7,
    Zone_8
};