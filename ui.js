const UI = {

  expanded: { "1": true },
  selected: null,

  render(tree, positions) {

    const root = document.getElementById("sidebar");

    const selectedPerson =
      PEOPLE.find(p => p.id === this.selected);

    root.innerHTML = `
      <div class="card">
        <b>Genealogy Builder</b>
      </div>

      ${this.renderEditor(selectedPerson)}

      <div class="card">
        <b>Family Tree</b>
      </div>

      ${this.renderNode("1", tree, positions)}

      <div class="card">
        <b>All People</b>

        ${PEOPLE.map(p => `
          <div class="person" onclick="UI.select('${p.id}')">
            ${p.name}
          </div>
        `).join("")}
      </div>
    `;
  },

  renderEditor(person) {

    if (!person) {
      return `
        <div class="card">
          <b>Select a person to edit</b>
        </div>
      `;
    }

    return `
      <div class="card">
        <b>Edit Person</b>

        <input id="editName" value="${person.name}" />

        <button onclick="UI.saveEdit('${person.id}')">
          Save
        </button>
      </div>
    `;
  },

  select(id) {
    this.selected = id;
    App.render();
  },

  saveEdit(id) {

    const input =
      document.getElementById("editName");

    const name = input.value.trim();
    if (!name) return;

    const person =
      PEOPLE.find(p => p.id === id);

    if (person) {
      person.name = name;
    }

    rebuildMap();
    App.render();
  },

  renderNode(id, tree, positions) {

    const person = MAP[id];
    if (!person) return "";

    const children = tree[id] || [];
    const open = this.expanded[id];

    return `
      <div style="margin-left:12px">

        <div class="person"
             onclick="UI.toggle('${id}')">

          <b onclick="UI.select('${id}')"
             style="cursor:pointer">
            ${person.name}
          </b>

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
  }
};
