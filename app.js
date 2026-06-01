const App = {

  render() {

    rebuildMap();

    const childrenMap =
      Engine.buildTree();

    const positions =
      Engine.buildPositions(
        "1",
        childrenMap
      );

    UI.render(
      childrenMap,
      positions
    );
  }
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    App.render();
  }
);
