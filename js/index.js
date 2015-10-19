$(document).ready(function() {
  var buttonArray = ['CE', '%', 'x', '/', '+', '-', '.'];
  for (var i = 9; i >= 0; i--) {
    buttonArray.push(i.toString());
  }
  buttonArray.push("=");
  var myViewModel = function() {
    var self = this,
      operator = '',
      num1 = '',
      num2 = '',
      sum = 0,
      firstNum = true;
    self.buttons = ko.observableArray(buttonArray);
    self.result = ko.observable(0);
    self.historyDisp = ko.observable('');
    self.reset = function(){
      self.result(0);
      self.historyDisp('');
      num1 = '';
      num2 = '';
      operator = '';
      firstNum = true;
      sum = 0;
    }
    self.keyPress = function(key) {
      if (key === 'CE') {
        self.reset();
      } else if (key === '%' || key === 'x' || key === '/' || key === '+' || key === '-') {
        if (firstNum) {
          operator = key;
          firstNum = false;
          self.result(key);
          self.historyDisp(historyDisp() + key);
        } else {
          if (key === '%') {
            sum = parseFloat(num1) % parseFloat(num2);
            self.result(sum);
            self.historyDisp(historyDisp() + key);
            num1 = sum;

          } else if (key === 'x') {
            sum = parseFloat(num1) * parseFloat(num2);
            self.result(sum);
            self.historyDisp(historyDisp() + key);
            num1 = sum;

          } else if (key === '/') {
            sum = parseFloat(num1) / parseFloat(num2);
            self.result(sum);
            self.historyDisp(historyDisp() + key);
            num1 = sum;

          } else if (key === '+') {
            sum = parseFloat(num1) + parseFloat(num2);
            self.result(sum);
            self.historyDisp(historyDisp() + key);
            num1 = sum;

          } else {
            sum = parseFloat(num1) - parseFloat(num2);
            self.result(sum);
            self.historyDisp(historyDisp() + key);
            num1 = sum;

          }
        }
      } else if (key === "=") {
        if (operator === '%') {
          sum = parseFloat(num1) % parseFloat(num2);
          self.result(sum);

          num1 = sum;
        } else if (operator === 'x') {
          sum = parseFloat(num1) * parseFloat(num2);
          self.result(sum);

          num1 = sum;
        } else if (operator === '/') {
          sum = parseFloat(num1) / parseFloat(num2);
          self.result(sum);

          num1 = sum;
        } else if (operator === '+') {
          sum = parseFloat(num1) + parseFloat(num2);
          self.result(sum);

          num1 = sum;
        } else {
          sum = parseFloat(num1) - parseFloat(num2);
          self.result(sum);

          num1 = sum;
        }
        num1 = '';
        num2 = '';
        operator = '';
        sum = 0;
        firstNum = true;

      } else if (firstNum) {
        num1 = num1 + key;
        self.result(num1);
        self.historyDisp(historyDisp() + num1);
      } else {

        if (sum > 0) {
          num2 = key;
          self.result(sum);
          self.historyDisp(historyDisp() + key);
        }else {
          num2 = num2 + key;
          self.result(num2);
          self.historyDisp(historyDisp() + key);
        }
      }
    };
  };

  ko.applyBindings(myViewModel, document.getElementById("calculator"));

});
