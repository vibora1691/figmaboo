// =========================
// DATA
// =========================

let PEOPLE = [
  {
    id: "1",
    name: "Deogracias Evora"
  },
  {
    id: "2",
    name: "Manuel Evora"
  },
  {
    id: "3",
    name: "Paulo Evora"
  },
  {
    id: "4",
    name: "Carlos Evora Sr."
  }
];

let RELATIONS = [
  {
    parent: "1",
    child: "2"
  },
  {
    parent: "1",
    child: "3"
  },
  {
    parent: "3",
    child: "4"
  }
];

// =========================
// MAP
// =========================

let MAP = {};

function rebuildMap() {

  MAP = {};

  PEOPLE.forEach(person => {
    MAP[person.id] = person;
  });
}

rebuildMap();
