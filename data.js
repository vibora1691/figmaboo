let PEOPLE = JSON.parse(localStorage.getItem("people")) || [
  { id: "1", name: "Deogracias Evora" },
  { id: "2", name: "Manuel Evora" },
  { id: "3", name: "Paulo Evora" },
  { id: "4", name: "Carlos Evora Sr." }
];

let RELATIONS = JSON.parse(localStorage.getItem("relations")) || [
  { parent: "1", child: "2" },
  { parent: "1", child: "3" },
  { parent: "3", child: "4" }
];
const MAP = {};

function rebuildMap() {

  Object.keys(MAP).forEach(key => delete MAP[key]);

  PEOPLE.forEach(p => {
    MAP[p.id] = p;
  });
}
