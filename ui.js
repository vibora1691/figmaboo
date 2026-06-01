const UI = {

  expanded: {
    "1": true
  },

  render(childrenMap, positions) {

    const sidebar =
      document.getElementById("sidebar");

    sidebar.innerHTML = `

      <div class="card">

        <h3>Genealogy Builder</h3>

        <input
          id="nameInput"
          placeholder="New person name"
        >

        <button onclick="UI.addPerson()">
          Add Person
        </button>

        <hr>

        <select id="parentSelect">
          ${PEOPLE.map(person => `
            <option value="${person.id}">
              ${person.name}
            </option>
          `).join("")}
        </select>

        <input
          id="childName"
          placeholder="Child name"
        >

        <button onclick="UI.addChild()">
          Add Child
        </button>

      </div>

      ${this.renderNode(
        "1",
        childrenMap,
        positions
      )}
    `;
  },

  renderNode(id, childrenMap, positions) {

    const person = MAP[id];

    if (!person) {

      return `
        <div class="person">
          Missing Person ${id}
        </div>
      `;
    }

    const children =
      childrenMap[id] || [];

    const isOpen =
      this.expanded[id] || false;

    return `

      <div style="margin-left:12px;">

        <div
          class="person"
          onclick="UI.toggle('${id}')"
        >

          <strong>${person.name}</strong>

          <div style="
            font-size:12px;
            opacity:.6;
          ">
            Position:
            ${positions[id] || ""}
          </div>

        </div>

        ${
          isOpen
            ? children.map(childId =>
                this.renderNode(
                  childId,
                  childrenMap,
                  positions
                )
              ).join("")
            : ""
        }

      </div>
    `;
  },

  toggle(id) {

    this.expanded[id] =
      !this.expanded[id];

    App.render();
  },

  addPerson() {

    const input =
      document.getElementById(
        "nameInput"
      );

    const name =
      input.value.trim();

    if (!name) return;

    const id =
      Date.now().toString();

    PEOPLE.push({
      id,
      name
    });

    rebuildMap();

    input.value = "";

    App.render();
  },

  addChild() {

    const parentId =
      document.getElementById(
        "parentSelect"
      ).value;

    const childName =
      document.getElementById(
        "childName"
      ).value
      .trim();

    if (!childName) return;

    const childId =
      Date.now().toString();

    PEOPLE.push({
      id: childId,
      name: childName
    });

    RELATIONS.push({
      parent: parentId,
      child: childId
    });

    rebuildMap();

    document.getElementById(
      "childName"
    ).value = "";

    this.expanded[parentId] = true;

    App.render();
  }
};
