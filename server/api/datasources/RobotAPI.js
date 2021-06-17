const { DataSource } = require('apollo-datasource');
const robots = require('../data/robots');
const attacks = require('../data/attacks');
const generator = require('../data/generate');

class RobotAPI extends DataSource {
  constructor() {
    super();
  }

  getAttackById(id) {
    return attacks.getAttackById(id);
  }

  getAttacks() {
    return attacks.getAttacks();
  }

  getRobotById(id) {
    return robots.getRobotById(id);
  } 

  getRobots() {
    return robots.getRobots();
  }

  addRobot(seed) {
    return robots.addRobot(generator.generateRobot(seed));
  }
}

module.exports = RobotAPI;
