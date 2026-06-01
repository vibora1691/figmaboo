const UI = {

  expanded: { "1": true },
  selected: null,

  // =========================
  // MAIN RENDER
  // =========================
  render(tree, positions) {

    const root = document.getElementById("sidebar");

    const selected =
      typeof PEOPLE !== "undefined"
        ? PEOPLE.find(p => p.id === this.selected)
        : null;

    root.innerHTML = `
      <div class="card">
        <b>Genealogy Builder</b>
      </div>

      ${this.renderEditor(selected)}

      <div class="card">
        <b>Family Tree</b>
      </div>

      ${this.renderNode("1", tree, positions)}
    `;
  },

  // =========================
  // EDIT PANEL
  // =========================
  renderEditor(person) {

    if (!person) {
      return `
        <div class="card">
          Click a person to edit
        </div>
      `;
    }

    return `
      <div class="card">
        <b>Editing</b>

        <div style="opacity:0.7; margin-bottom:6px;">
          ID: ${person.id}
        </div>

        <input id="editName" value="${person.name}" />

        <button onclick="UI.save('${person.id}')">
          Save
        </button>
      </div>
    `;
  },

  // =========================
  // SELECT PERSON
  // =========================
  select(id) {
    this.selected = id;
    App.render();
  },

  // =========================
  // SAVE EDIT
  // =========================
  save(id) {

    const input = document.getElementById("editName");
    if (!input) return;

    const name = input.value.trim();
    if (!name) return;

    const person =
      typeof PEOPLE !== "undefined"
        ? PEOPLE.find(p => p.id === id)
        : null;

    if (person) {
      person.name = name;
    }

    if (typeof rebuildMap === "function") {
      rebuildMap();
    }

    App.render();
  },

  // =========================
  // TREE NODE
  // =========================
  renderNode(id, tree, positions) {

    const person =
      typeof MAP !== "undefined"
        ? MAP[id]
        : null;

    if (!person) return "";

    const children = tree[id] || [];
    const open = this.expanded[id];
    const isSelected = this.selected === id;

    return `
      <div style="margin-left:12px">

        <div class="person"
          style="border:${isSelected ? '1px solid #4ea1ff' : 'none'}; padding:4px; border-radius:6px;"
        >

          <span
            onclick="UI.toggle('${id}')"
            style="cursor:pointer; font-weight:bold;"
          >
            ${open ? "▼" : "▶"}
          </span>

          <span
            onclick="UI.select('${id}')"
            style="cursor:pointer; margin-left:6px;"
          >
            ${person.name}
          </span>

          <div style="font-size:12px; opacity:0.6;">
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

  // =========================
  // TOGGLE NODE
  // =========================
  toggle(id) {
    this.expanded[id] = !this.expanded[id];
    App.render();
  }
};

// IMPORTANT: expose globally
window.UI = UI;
