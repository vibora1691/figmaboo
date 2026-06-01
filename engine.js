const Engine = {

  buildTree() {

    const tree = {};

    RELATIONS.forEach(r => {

      if (!tree[r.parent]) {
        tree[r.parent] = [];
      }

      tree[r.parent].push(r.child);
    });

    return tree;
  },

  buildPositions(rootId, tree) {

    const positions = {};

    function walk(id, path) {

      positions[id] = path;

      const children = tree[id] || [];

      children.forEach((childId, i) => {
        walk(childId, `${path}.${i + 1}`);
      });
    }

    walk(rootId, "1");

    return positions;
  },

  getGeneration(position) {
    if (!position) return 1;
    return position.split(".").length;
  }
};
