// WIP, Might use jest or mocha idk
export class Test {
  func: Function;
  expected: any;
  args: any[];

  constructor(func: Function, expected: any, args: any[]) {
    this.func = func;
    this.expected = expected;
    this.args = args;
  }

  test() {
    var result = this.func(...this.args);
    if (result === this.expected) {
      console.log("Passed");
    } else {
      console.log("Failed");
    }
  }
}
