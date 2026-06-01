const UI = {

  expanded: {},

  render(childrenMap, positions) {

    const sidebar = document.getElementById("sidebar");

    sidebar.innerHTML = `
      <div class="card">
        <b>Genealogy Builder</b>

        <input id="nameInput" placeholder="New person name"/>
        <button onclick="UI.addPerson()">Add Person</button>

        <hr/>

        <select id="parentSelect">
          ${PEOPLE.map(p =>
            `<option value="${p.id}">${p.name}</option>`
          ).join("")}
        </select>

        <input id="childName" placeholder="Child name"/>
        <button onclick="UI.addChild()">Connect Child</button>
      </div>

      ${this.renderNode("1", childrenMap, positions)}
    `;
  },

  renderNode(id, childrenMap, positions) {

    const hasChildren = (childrenMap[id] || []).length > 0;
    const open = this.expanded[id];

    return `
      <div style="margin-left:10px">

        <div class="person" onclick="UI.toggle('${id}')">
          ${MAP[id].name}
          <div style="font-size:11px;opacity:0.5">
            ${positions[id]}
          </div>
        </div>

        ${
          hasChildren && open
            ? childrenMap[id].map(c =>
                this.renderNode(c, childrenMap, positions)
              ).join("")
            : ""
        }

      </div>
    `;
  },

  toggle(id) {
    this.expanded[id] = !this.expanded[id];
    App.render();
  },

  addPerson() {

    const name = document.getElementById("nameInput").value;

    const id = Date.now().toString();

    PEOPLE.push({ id, name });

    save();
    rebuildMap();
    App.render();
  },

  addChild() {

    const parentId = document.getElementById("parentSelect").value;
    const name = document.getElementById("childName").value;

    const id = Date.now().toString();

    PEOPLE.push({ id, name });

    RELATIONS.push({ parent: parentId, child: id });

    save();
    rebuildMap();
    App.render();
  }
};
