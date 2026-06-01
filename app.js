const App = {

  render() {

    // rebuild latest map
    if (typeof rebuildMap === "function") {
      rebuildMap();
    }

    // build tree
    const tree =
      typeof Engine !== "undefined"
        ? Engine.buildTree()
        : {};

    // build positions
    const positions =
      typeof Engine !== "undefined"
        ? Engine.buildPositions("1", tree)
        : {};

    // render UI
    if (typeof UI !== "undefined") {
      UI.render(tree, positions);
    }
  }
};

// start app AFTER DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  App.render();
});
