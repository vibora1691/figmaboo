const UI = {

  expanded: { "1": true },
  selected: null,

  // =========================
  // MAIN RENDER
  // =========================
  render(tree, positions) {

    const root = document.getElementById("sidebar");

    const selected = PEOPLE.find(p => p.id === this.selected);

    root.innerHTML = `
      <div class="card">
        <b>Genealogy Builder</b>
      </div>

      ${this.renderEditor(selected)}

      <div class="card">
        <b>Family Tree</b>
      </div>

      ${this.renderNode("1", tree, positions)}

      <div class="card">
        <b>All People</b>
        <small>(click to edit)</small>

        ${PEOPLE.map(p => `
          <div class="person" onclick="UI.select('${p.id}')">
            ${p.name}
          </div>
        `).join("")}
      </div>
    `;
  },

  // =========================
  // EDIT PANEL
  // =========================
  renderEditor(person) {

    if (!person) {
      return `
        <div class="card">
          <b>No person selected</b>
          <div>Click a name in "All People"</div>
        </div>
      `;
    }

    return `
      <div class="card">
        <b>Edit Person</b>

        <input id="editName" value="${person.name}" />

        <button onclick="UI.save('${person.id}')">
          Save Changes
        </button>
      </div>
    `;
  },

  // =========================
  // SELECT PERSON (FIXED)
  // =========================
  select(id) {

    this.selected = id;

    // DO NOT rely on rerender timing for selection logic
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

    const person = PEOPLE.find(p => p.id === id);

    if (person) {
      person.name = name;
    }

    rebuildMap();
    App.render();
  },

  // =========================
  // TREE NODE
  // =========================
  renderNode(id, tree, positions) {

    const person = MAP[id];
    if (!person) return "";

    const children = tree[id] || [];
    const open = this.expanded[id];

    return `
      <div style="margin-left:12px">

        <div class="person">

          <!-- EXPAND TOGGLE (SEPARATE AREA) -->
          <span
            style="cursor:pointer;font-weight:bold"
            onclick="UI.toggle('${id}')"
          >
            ${open ? "▼" : "▶"}
          </span>

          <!-- CLICK NAME TO EDIT -->
          <span
            style="margin-left:6px;cursor:pointer"
            onclick="UI.select('${id}')"
          >
            ${person.name}
          </span>

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

  // =========================
  // TOGGLE EXPAND
  // =========================
  toggle(id) {
    this.expanded[id] = !this.expanded[id];
    App.render();
  }
};
