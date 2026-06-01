const App = {

  render() {

    rebuildMap();

    const tree =
      Engine.buildTree();

    const positions =
      Engine.buildPositions("1", tree);

    UI.render(tree, positions);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  App.render();
});
