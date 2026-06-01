const Engine = {

  buildTree() {
    const childrenMap = {};

    RELATIONS.forEach(r => {
      if (!childrenMap[r.parent]) {
        childrenMap[r.parent] = [];
      }
      childrenMap[r.parent].push(r.child);
    });

    return childrenMap;
  },

  buildPositions(rootId, childrenMap) {

    const positions = {};

    function walk(id, path) {

      positions[id] = path;

      const children = childrenMap[id] || [];

      children.forEach((childId, index) => {
        walk(childId, `${path}.${index + 1}`);
      });
    }

    walk(rootId, "1");

    return positions;
  }
};
