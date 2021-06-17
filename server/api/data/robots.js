const robots = [];

function getRobotById(id) {
  return robots.find(e => e.id === id) || {};
}

function getRobots() {
  return [...robots];
}

function addRobot(robot) {
  robots.push(robot);
  return robot;
}

module.exports = {
  getRobotById,
  getRobots,
  addRobot,
};
