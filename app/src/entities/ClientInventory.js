
module.exports = function(uuid) {
  return class ClientInventory {
    constructor() {
      this.fullHours = 0;
      this.halfHours = 0;
      this.pairs = 0;
    }

    calculateInventory(cmd) {
      console.log('==========cmd=========');
      console.log(cmd);
      console.log('==========END cmd=========');

      return {
        fullHours: this.fullHours + cmd.totalFullHours,
        halfHours: this.halfHours + cmd.totalHalfHours,
        pairs: this.pairs + cmd.totalPairs
      };
    }

    setInventory(event) {
      console.log('==========event=========');
      console.log(event);
      console.log('==========END event=========');

      this.fullHours = event.fullHours;
      this.halfHours = event.halfHours;
      this.pairs = event.pairs;
    }

  }
};
