export default class Compatibility {

  static isSupported(inputType) {
    if (!Compatibility._checked) {
      Compatibility._checkCompatibility();
    }

    return Compatibility._supported[inputType];
  }

  static isDateSupported() {
    return Compatibility.isSupported('date');
  }

  static _checkCompatibility() {
    let tester = document.createElement('input');
    for (let type in Compatibility._supported) {
      try {
        tester.type = type;
        tester.value = ':(';

        if (tester.type === type && tester.value === '') {
          Compatibility._supported[type] = true;
        }
      } catch (error) {
        // Do nothing for now
      }
    }
    Compatibility._checked = true;
  }

}
Compatibility._supported = { date: false, number: false, time: false, month: false, week: false };
Compatibility._checked = false;
