const { DataSource } = require('apollo-datasource');

class TestSource extends DataSource {
  constructor() {
    super();
  }

  getMessages() {
    return [
      {
        msg: 'Hello world!',
      },
      {
        msg: 'This is a test.',
      },   
      {
        msg: 'Please remain calm.',
      },
      {
        msg: 'Stay where you are.',
      },
      {
        msg: 'Do not attempt escape.',
      },
    ];
  }
}

module.exports = TestSource;