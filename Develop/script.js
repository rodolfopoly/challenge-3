// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordLength= null;
var lowerCase= null;
var upperCase= null;
var number= null;
var specialCharacter = null;
var temporaryCharacter =" ";
var gotLowercase = 0;
var gotUppercase = 0;
var gotSpecialCharacter = 0;
var gotNumber = 0;
var gotCharacters = 0;
var finalPassword = " ";
var characterArray = new Array();
  for(var i = 0; i < passwordLength; i++){		
    characterArray[i]	=	null;
    }


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function question(characters, charactersString) {
  characters = confirm("click ok if you want " + charactersString + " in your password")
}

function generate_random(i_lower_number, i_top_number) {
  var     i_random  =   Math.floor((Math.random() * (i_top_number - i_lower_number + 1)) + i_lower_number);
  return  i_random;
}

// function that generates a character type based on the type that is passed as a parameter (uppercase, lowercase, number, symbol or random)
function get_character(characterType){
  // we have created a specific list of characters, which also does not have some characters such as the uppercase "i" or the lowercase "l" to avoid transcription errors
  var characterList	=	"$+=?*!23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
  var generatedCharacter	=	'';
  var lowerValue		=	0;
  var topValue		=	0;

  switch (characterType){
    case "lowercase":
      lowerValue	=	38;
      topValue	=	61;
      break;
    case "uppercase":
      lowerValue	=	14;
      topValue	=	37;
      break;
    case "number":
      lowerValue	=	6;
      topValue	=	13;
      break;
    case "special character":	
      lowerValue	=	0;
      topValue	=	5;
      break;
    case "random":
      lowerValue	=	0;
      topValue	=	61;

  } // end switch

  generatedCharacter	=	characterList.charAt(generate_random(lowerValue, topValue));
  return generatedCharacter;
} // end of the function genera_caracter()

// function that saves in a random empty position the character passed by parameter
function save_character_at_random_position(characterPassed){
  var saveEmptyPosition	=	false;
  var arrayPosition			=	0;

  while(saveEmptyPosition	!=	true){
    arrayPosition	=	generate_random(0, passwordLength-1);	// generamos un aleatorio en el rango del tamaño del password

    // the array has been initialized with null in its positions. If it is an empty position, we save the character
    if(characterArray[arrayPosition] == null){
      characterArray[arrayPosition]	=	characterPassed;
      saveEmptyPosition	=	true;
    }
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){

  passwordLength = prompt("Indicate the length of the password you want to generate");
  if (!passwordLength) {
    alert("this field cannot be empty")
  }
  else if (passwordLength <8 || passwordLength>128) {
    prompt("The password must have at least 8 characters and no more than 128");
    return "click Generate Password again tu generate a valid password";
  }
  else {
    question(lowerCase, "lowercase");
    question(upperCase,"uppercase");
    question(number, "number");
    question(specialCharacter, "special characters");
  }

  if (lowerCase==true) {
    console.log("lollllllll")
    while (gotLowercase < 1){
      temporaryCharacter	=	get_character("lowercase");
      save_character_at_random_position(temporaryCharacter);
      got_lowercase_letters++;
      got_characters++;
    }  
  }

  if (upperCase==true) {
    while (gotUppercase < 1){
      temporaryCharacter	=	get_character("uppercase");
      save_character_at_random_position(temporaryCharacter);
      gotUppercase++;
      gotCharacters++;
    }  
  }

  if (number==true) {
    while (gotNumber < 1){
      temporaryCharacter	=	get_character("number");
      save_character_at_random_position(temporaryCharacter);
      gotNumber++;
      gotCharacters++;
    }
  }

  if (specialCharacter==true) {
    while (gotSpecialCharacter < 1){
      temporaryCharacter	=	get_character("special character");
      save_character_at_random_position(temporaryCharacter);
      gotSpecialCharacter++;
      gotCharacters++;
    }
  }

  // if we haven't generated all the characters we need, we randomly add the missing ones
  // until we reach the password size that interests us
  while (gotCharacters < passwordLength){
    temporaryCharacter	=	get_character("random");
    save_character_at_random_position(temporaryCharacter);
    gotCharacters++;
  }

  // now we pass the content of the array to the variable password_definitive
  for(var i=0; i < characterArray.length; i++){
    finalPassword	=	finalPassword + characterArray[i];
  }
  return finalPassword;

}