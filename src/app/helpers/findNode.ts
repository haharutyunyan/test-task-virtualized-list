function findStartNode(
  scrollTop: number,
  nodePositions: number[],
  itemCount: number,
): number {
  let startRange = 0;
  let endRange = itemCount - 1;

  while (endRange !== startRange) {
    const middle = Math.floor((endRange - startRange) / 2 + startRange);

    if (
      nodePositions[middle] <= scrollTop &&
      nodePositions[middle + 1] > scrollTop
    ) {
      return middle;
    }

    if (middle === startRange) {
      return endRange;
    } else {
      if (nodePositions[middle] <= scrollTop) {
        startRange = middle;
      } else {
        endRange = middle;
      }
    }
  }

  return itemCount;
}

function findEndNode(
  nodePositions: number[],
  startNode: number,
  itemCount: number,
  height: number,
): number {
  let endNode: number;

  for (endNode = startNode; endNode < itemCount; endNode++) {
    if (nodePositions[endNode] > nodePositions[startNode] + height) {
      return endNode;
    }
  }

  return endNode;
}
export { findStartNode, findEndNode };
