// Assignment Code
var generateBtn = document.querySelector("#generate");


// generate arrays of strings for our Capital, Lower Case, 
//   Numeric and Special Character parameters for password generation.
//   SAVE THE ""s! by using the split method on spaces in our strings lists.
let alphaCapsString = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
let alphaCaps = alphaCapsString.split(' ');
let alphaLowerString = "a b c d e f g h i j k l m n o p q r s t u v w x y z";
let alphaLower = alphaLowerString.split(' ');
let alphaNumsString = "0 1 2 3 4 5 6 7 8 9";
let alphaNum = alphaNumsString.split(' ');
let alphaSpecialString = "! # $ % & ( ) ' * + - _ , / : ; < = > ? @ [ ] ^ { } | ~"
let alphaSpecial = alphaSpecialString.split(' ');

// define the object that will help us store 
//   the user inputs of length, options and the 
//   final password value.
let passwordObject = {
  length: 0,
  caps: false,
  lowercase: false,
  numeric: false,
  special: false,
  text: ""

};

//Error Checking Function
//Check inputs for needed values. 
function errorCheckingAlpha(){
    //check to see if we have antyhing to work with to generate password  
    if (!passwordObject.caps && !passwordObject.lowercase && !passwordObject.numeric && !passwordObject.special){
        return false;
    }
    // all good.  Error Checking for options is good.
    return true;
}

//Error Checking Function
// Check for valid Integer and Value
function errorCheckingLength(length){
    
    // Is the entered value an integer?
    if ((!Number.isInteger(length))||((length<8) || (length>128))){
        //it isn't!  return a fail for error checking length
        return false;
    } 

    // ... also, is the entered value between 8 and 128 limits?
    else if ((length<8) || (length>128)){
        //it isn't!  return a fail for error checking length
        return false;
    }

    // all good.  Error Checking for length is good.
    return true;
}

// Check user inputs, generate password according to the options, and 
// populate the #password input with our result
function writePassword() {

  // Prompt user for the password length and collect value by attempting to parse Integer.
  let inputLength = parseInt(prompt("password length? (8-128)"));
    
  // Error checking funtion to check Integer and Value
  if (!errorCheckingLength(inputLength)){
    alert("Need valid length");
    return;
  }
  // length passed error checking so lets store it
  passwordObject.length = inputLength;

  // prompt user for the Password Parameters of Y\N on using Capital
  //   letters, Lowercase letters, Numbers and Special Characters.
  passwordObject.caps = confirm("Password Parameters:\r\n Use capital letters?");
  passwordObject.lowercase = confirm("Password Parameters:\r\n Use lowercase letters?");
  passwordObject.numeric = confirm("Password Parameters:\r\n Use Numbers?");
  passwordObject.special = confirm("Password Parameters:\r\n Use special letters?");

  // Check that the user AT LEAST selected one of these options, 
  //    otherwise stop program. 
  if (!errorCheckingAlpha()){
    //alert user
    alert("Please select at least one for Capital, Lowercase, Numerical or Special Characters");
    //stop executing
    return;
  }


  // generate password with our funtion
  var password = generatePassword(passwordObject);

  // set the password text output to return our results
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}

function generatePassword(passwordObj) {

    // lets build the available character list for potential passwords.
  let charPoolArray = [];

  // check if the user option wants the array set for the password and add it. 
  if (passwordObj.caps){
    charPoolArray = charPoolArray.concat(alphaCaps);
  }
  if (passwordObj.lowercase){
    charPoolArray = charPoolArray.concat(alphaLower);
  }
  if (passwordObj.numeric){
    charPoolArray = charPoolArray.concat(alphaNum);
  }
  if (passwordObj.special){
    charPoolArray = charPoolArray.concat(alphaSpecial);
  }
  

  // initialize randomized index
  let index = 0;
  // set this each password generation in case 
  //  user wants to generate more than one password.
  passwordObj.text = "";
  for (x = 0; x < passwordObj.length; x++){
        index = Math.floor(Math.random() * charPoolArray.length);
        passwordObj.text += charPoolArray[index];
    }

  return(passwordObj.text);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
