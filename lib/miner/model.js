class Miner {
  constructor({name, software, data}) {
    this.name = name
    this.software = software
    this.data = data
  }

  static getId(number) {
    if (number < 10) {
      return '0' + number
    } else {
      return number
    }
  }
}

module.exports = Miner
