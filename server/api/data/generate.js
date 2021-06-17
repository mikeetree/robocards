const seedrandom = require('seedrandom');
const { v4: uuidv4 } = require('uuid');
const { addRobot, getRobots } = require('./robots');
const { addAttack, getAttacks } = require('./attacks');

const adjectives = [
  'Agitated',
  'Extreme',
  'Murderous',
  'Friendly',
  'Overpowered',
  'Noisy',
  'Robotic',
  'Rusty',
  'Sir.',
  'Captain',
  'Galaxy\'s Most Wanted',
  'Tricky',
  'Commander',
  'General',
  'Madam',
  'Lady',
  'Gentle',
  'Frenzied',
  'Malfunctioning',
];

const prefixes = [
  'Tech',
  'Kill',
  'Hug',
  'Blast',
  'Boom',
  'Crash',
  'Bolt',
  'Murder',
];

const suffixes = [
  'bot',
  'inator',
  'droid',
  'atron',
  'borg',
  'naut',
  'ulator',
  'machine',
]

const postfixes = [
  'Mark IV',
  'Alpha',
  'Beta',
  'Omega',
  'v1.0',
  'v2.0',
  '(Early Access)',
  'Prototype',
];

const attack_adjectives = [
  'Overwhelming',
  'Exotic',
  'Futuristic',
  'Overpowered',
  'Amazing',
  'Unreliable',
  'Massive',
  'Unbelievable',
  'Unstoppable',
  'Semi-automatic',
  'Fully-automatic',
  'Murderous',
  'Telescopic',
];

const attack_source = [
  'Fist',
  'Mecha-',
  'Robotic Arm',
  'Robotic Leg',
  'Laser',
  'Omni-',
  'Power',
  'Techno-',
  'Omega',
  'Vibro-',
  'Death',
];

const attack_verb = [
  'Smash',
  'Slash',
  'Barrage',
  'Volley',
  'Strike',
  'Punch',
  'Kick',
  'Slam',
  'Attack',
  'Murder',
  'Kill',
  'Hug',
  'Embrace',
];

function randomRange(rand, min, max) {
  return Math.floor(rand * (max - min) + min);
}

function getRandomInArray(rand, arr) {
  return arr[randomRange(rand, 0, arr.length)];
}

function generateName(id) {
  const rng = new seedrandom(id + 'name');

  let adj = rng() < .8 ? getRandomInArray(rng(), adjectives) + ' ' : '';
  let prefix = getRandomInArray(rng(), prefixes);
  let suffix = getRandomInArray(rng(), suffixes);
  let postfix = rng() < .4 ? ' ' + getRandomInArray(rng(), postfixes) : '';

  return adj + prefix + suffix + postfix;
}

function generateImageURL(id) {
  return `https://robohash.org/${id}.png?bgset=bg2&set=set1`;
}

function generateLevel(id) {
  const r = new seedrandom(id + 'level')();

  return r < .1 ? 3 : r < .4 ? 2 : 1;
}

function generateHealth(id, level) {
  const r = new seedrandom(id + 'health')();

  return 60 + 10 * Math.round((r + 1) * level);
}

function generateAttackDamage(id, level) {
  return level * 10;
}

function generateAttacks(id, level) {
  const rng = new seedrandom(id);
  const availableAttacks = getAttacks().filter(e => e.level <= level);
  const attacks = [getRandomInArray(rng(), availableAttacks).id];

  for (let i = 0; i < level - 1; i++) {
    if (rng() < 1 - i * .4) {
      const newAttack = getRandomInArray(rng(), availableAttacks.filter(e => !attacks.find(a => a.id === e.id)));
      if (newAttack) attacks.push(newAttack.id);
    }
  }

  return attacks;
}

function generateAttackName(id) {
  const rng = new seedrandom(id + 'attack');

  let adj = rng() < .8 ? getRandomInArray(rng(), attack_adjectives) + ' ' : '';
  let source = getRandomInArray(rng(), attack_source);
  let verb = (source.slice(-1) === '-' ? '' : ' ') + getRandomInArray(rng(), attack_verb);

  return adj + source + verb;
}

function generateAttack(seed) {
  const attack = {};

  attack.id = uuidv4();
  attack.seed = seed || attack.id;
  attack.name = generateAttackName(attack.seed);
  attack.level = generateLevel(attack.seed);
  attack.damage = generateAttackDamage(attack.seed, attack.level);

  return attack;
}

function generateRobot(seed) {
  const robot = {};

  robot.id = uuidv4();
  robot.seed = seed || robot.id;
  robot.name = generateName(robot.seed);
  robot.image = generateImageURL(robot.seed);
  robot.level = generateLevel(robot.seed);
  robot.health = generateHealth(robot.seed, robot.level);
  robot.attacks = generateAttacks(robot.seed, robot.level);

  return robot;
}

function generateAndAdd(robots = 10, attacks = 20) {
  for (let i = 0; i < attacks; i++) {
    addAttack(generateAttack());
  }

  for (let i = 0; i < robots; i++) {
    addRobot(generateRobot());
  }
}

function printRobot(robot) {
  let card = `\n${robot.name}\nHealth: ${robot.health}\n${'⭐⭐⭐'.slice(-robot.level)}\n`;

  const attacks = [...robot.attacks].sort((a, b) => a.damage - b.damage);
  
  for (attack of attacks) {
    card += `\n> ${attack.name.padEnd(35)} ${attack.damage}`;
  }
  
  card += `\n\nImage: ${robot.image}\n`;
  console.log(card + '\n');
}

function printAllRobots() {
  for (robot of getRobots()) {
    printRobot(robot);
  }
}

module.exports = {
  generateRobot,
  generateAndAdd,
};
