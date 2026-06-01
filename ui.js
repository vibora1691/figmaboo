const UI = {

  expanded: { "1": true },

  render(tree, positions) {

    const root = document.getElementById("sidebar");

    root.innerHTML = `
      <div class="card">
        <b>Genealogy Builder</b>
      </div>

      <div class="card">
        <b>Add Person</b>
        <input id="nameInput" placeholder="Person name">
        <button onclick="UI.addPerson()">Add</button>
      </div>

      <div class="card">
        <b>Add Child</b>

        <select id="parentSelect">
          ${PEOPLE.map(p => `
            <option value="${p.id}">
              ${p.name}
            </option>
          `).join("")}
        </select>

        <input id="childName" placeholder="Child name">
        <button onclick="UI.addChild()">Add Child</button>
      </div>

      <div class="card">
        <b>Family Tree</b>
      </div>

      ${this.renderNode("1", tree, positions)}

      <div class="card">
        <b>All People (Always Visible)</b>

        ${PEOPLE.map(p => `
          <div class="person">
            ${p.name}
            <div style="font-size:12px;opacity:0.6">
              ${positions[p.id] || "unlinked"}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  },

  renderNode(id, tree, positions) {

    const person = MAP[id];
    if (!person) return "";

    const children = tree[id] || [];
    const open = this.expanded[id];

    return `
      <div style="margin-left:12px">

        <div class="person" onclick="UI.toggle('${id}')">
          <b>${person.name}</b>
          <div style="font-size:12px;opacity:0.6">
            ${positions[id] || ""}
          </div>
        </div>

        ${
          open
            ? children.map(c =>
                this.renderNode(c, tree, positions)
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

    const input =
      document.getElementById("nameInput");

    const name = input.value.trim();
    if (!name) return;

    const id = Date.now().toString();

    PEOPLE.push({ id, name });

    // 🔥 IMPORTANT: attach to root so it's always visible
    RELATIONS.push({
      parent: "1",
      child: id
    });

    rebuildMap();

    input.value = "";

    App.render();
  },

  addChild() {

    const parentId =
      document.getElementById("parentSelect").value;

    const name =
      document.getElementById("childName").value.trim();

    if (!name) return;

    const id = Date.now().toString();

    PEOPLE.push({ id, name });

    RELATIONS.push({
      parent: parentId,
      child: id
    });

    rebuildMap();

    document.getElementById("childName").value = "";

    this.expanded[parentId] = true;

    App.render();
  }
};
