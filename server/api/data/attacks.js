const attacks = [];

function getAttackById(id) {
  return attacks.find(e => e.id === id) || {};
}

function getAttacks() {
  return [...attacks];
}

function addAttack(attack) {
  attacks.push(attack);
}

module.exports = {
  getAttackById,
  getAttacks,
  addAttack,
};
