//in most cases, you will at least need to move everything out of a document ready
//so that you can test your code easier.
$(document).ready(function() {
  init();
});

function init() {
  ko.applyBindings(myViewModel, $("#calculator").get(0));
}

var myViewModel = function() {
  var self = this; //set the value for this

  self.buttons = ko.observableArray(getButtons());//button array
  self.result = ko.observable('0');//result box

  self.reset = function(){ //reset function
    self.result('0');
  }
  self.keyPress = function(key) {
    if (key === 'CE') {
      self.reset();//reset if clear is pressed
    } else if (key === '='){
      self.result(eval(self.result()));//evaluate the string when equals is pressed
    }else {
      if(self.result()==='0'){
        self.result('');//fix to show an initial zero but remove it at first number
      }
      self.result(self.result()+key);//append the next char to the string
    }
  }
}

function getButtons() {
  var buttonArray = ['CE', '%', '*', '/', '+', '-', '.'];
  for (var i = 9; i >= 0; i--) {
    buttonArray.push(i.toString());
  }
  buttonArray.push("=");
  return buttonArray;
}