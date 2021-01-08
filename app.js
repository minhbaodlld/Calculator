//Assign HTML element to JS variable
button = document.querySelectorAll('button');
screen = document.getElementById('screen');
clear = document.getElementById('clear');


//Define Math action
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

//Object contains Math operators for easy access
const operObj = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide
}

//Calculate input number
function operate(x, operator, y){
  return operObj[operator](x,y);
}

//show number on screen
function display(text){
  return screen.append(text);
}

//clear screen
function clearScreen(){
return screen.textContent = '';
}

//Can't divide by 0 error
const divideBy0 = () =>{
  if (opt == '/' && num2 == 0){
    result = "Haha can't divide by 0"
  }else{
    result = operate(num1, opt, num2);
    roundNumber();
  }
}

//bind keyboard to calculator buttons
const keyboard = (e) => {
  const keycode = document.querySelector(`button[data-code ~= "${e.keyCode}"]`)
  if (!keycode) return
  else keycode.click()
}

//round decimal number
const roundNumber = () =>{
  let rArray = Array.from(String(result));
    if (rArray.length > 5 && rArray.includes('.') == true){
      result = result.toFixed(5);
    }
}


//Shorten function for overlapping step
const commonProcess = () => {
  clearScreen();
  num2 = parseFloat([...num].join('')); 
  divideBy0();
  display(result);
  num1 = result;
}

//Apply event to each button
button.forEach(button => {
  num = []    //number to display
  num1 = [];  //first number in Math operation
  num2 = [];  //second number in Math operation
  opt = '';   //Math operator

 //Apply event to any button
  button.addEventListener('click', e =>{
  
  //Get number, display on screen
  if(button.getAttribute('value') != null){
    store = button.getAttribute('value');
    if (typeof(result) == 'undefined'){       //Check if any operation was performed
      num.push(store);                        //No -> display input number
      display(store);
      
    //Yes -> result is clear from screen when new number is entered
    }else if (typeof(result) == 'number') {   
      if (screen.textContent == `${result}`){  
        clearScreen();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      }                       
      num.push(store);
      display(store);
    }
  }
  
  // Take in Math operator
  else if (opt == '' && button.getAttribute('data-key') != null){
    clearScreen();
    opt = button.getAttribute('id');
    num1 = parseFloat(Array.from(num).join(''));
    num = []
  }
  
  //Give result when press '='
  else if  (button.getAttribute('id') == 'equal') {
    if (opt == '' ){      //no error when no operator given and '=' is clicked 
      num = [];
      opt = '+';
    }
    commonProcess();
    num = Array.from(String(result));
    opt = '';
  }

  // Give result when a Math operator is pressed
  else if (opt != '' && button.getAttribute('data-key') != null){
    commonProcess();
    opt = button.getAttribute('data-key');
    num = [];
    num2 = [];    
  }

  //Add decimal
  else if(button.getAttribute('id') == 'decimal'){  
    if(num.includes('.')){
    }else{
      num.push('.')
      clearScreen();
      display(num.join(''));
    }
  }

  //EXTRA turn positive or negative
  else if(button.getAttribute('id') == 'plus-minus'){
    if(num.join('') > 0){
      num.unshift('-'); 
      num1 = parseFloat(Array.from(num).join(''))
      clearScreen();
      display(num1);
    }else {
      num.shift(num[0]);
      num1 = parseFloat(Array.from(num).join('')); 
      clearScreen();
      display(num1);
    }
  }
  
  //Clear all
  else if (button.getAttribute('id') == 'clear-all'){
    store = ''; opt = '';
    num = []; num1 = []; num2 =[]; result = 0;
    clearScreen();
  }

  //clear current screen
  else if(button.getAttribute('id') == 'clear'){
    clearScreen()
    store = ''; num = [];
  }

  //Backspace
  else if (button.getAttribute('id') == 'back-space'){
    if(num == []){
    }else {
      num.pop();
      num1 = parseFloat(Array.from(num).join(''))
      if (isNaN(num1)){
        num1 = 0;
      }
      clearScreen();
      display(num1);
    }
  }

})});

window.addEventListener('keydown', keyboard)
clear.addEventListener('click', clearScreen);