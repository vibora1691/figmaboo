const App = {

  render() {

    const childrenMap = Engine.buildTree();
    const positions = Engine.buildPositions("1", childrenMap);

    UI.render(childrenMap, positions);
  }
};

function save() {
  localStorage.setItem("people", JSON.stringify(PEOPLE));
  localStorage.setItem("relations", JSON.stringify(RELATIONS));
}
