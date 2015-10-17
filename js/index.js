$(document).ready(function() {
  var buttonArray = ['CE','%','x','/','+','-','.'];
  for (var i = 9; i >= 0; i--) {
    buttonArray.push(i.toString());
  }
  buttonArray.push("=");
  var myViewModel = function(){
    var self = this, operator, num1, num2, firstNum = true;
    self.buttons = ko.observableArray(buttonArray);
    self.result = ko.observable(0);
    self.keyPress = function(key) {
          if(key === 'CE'){
            self.result(0);
          }else if(key === '%' || key === 'x' || key === '/' || key === '+' || key === '-'){
            operator = key;
            firstNum = false;
            self.result(key);
          }else if(key === "="){
            if(operator === '%'){
              self.result(parseFloat(num1)%parseFloat(num2));
            }else if(operator === 'x'){
              self.result(parseFloat(num1)*parseFloat(num2));
            }else if(operator === '/'){
              self.result(parseFloat(num1)/parseFloat(num2));
            }else if(operator === '+'){
              self.result(parseFloat(num1)+parseFloat(num2));
            }else {
              self.result(parseFloat(num1)-parseFloat(num2));
            }
            
            
          }else if(firstNum){
            num1 = num1 + key;
            self.result(key);
          }else {
            num2 = num2 + key;
            self.result(key);
          }
    };
  };

  ko.applyBindings(myViewModel, document.getElementById("calculator"));

});