// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordLength= null;
var lowerCase= null;
var upperCase= null;
var number= null;
var specialCharacter = null;
var temporaryCharacter ="";
var gotCharacters = 0;
var finalPassword = "";
var characterArray = new Array();
var arrayPosition			=	0;



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  gotCharacters = 0;
  finalPassword = "";
}

function question(charactersString) {
  var characters = confirm("click ok if you want " + charactersString + " in your password")
  return characters;
}

function generate_random(i_lower_number, i_top_number) {
  var     i_random  =   Math.floor((Math.random() * (i_top_number - i_lower_number + 1)) + i_lower_number);
  return  i_random;
}

// function that generates a character type based on the type that is passed as a parameter (uppercase, lowercase, number, symbol or random)
function get_character(characterType){
  // we have created a specific list of characters, which also does not have some characters such as the uppercase "i" or the lowercase "l" to avoid transcription errors
  var characterList	=	"$+=?*!23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
  var generatedCharacter	=	"";
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
} // end of the function gen_character)

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
    lowerCase = question("lowercase");
    upperCase = question("uppercase");
    number = question( "number");
    specialCharacter = question( "special characters");
    if (lowerCase != true && upperCase !=true && number!=true && specialCharacter!=true) {
      alert("you most choose at lest one type of character")
      return 0;
    }
  }

  while (gotCharacters < passwordLength) {

    if (lowerCase==true && gotCharacters < passwordLength) {
      temporaryCharacter	=	get_character("lowercase");
      save_character_at_random_position(temporaryCharacter);
      gotCharacters++;
    }
  
    if (upperCase==true && gotCharacters < passwordLength)  {
      temporaryCharacter	=	get_character("uppercase");
      save_character_at_random_position(temporaryCharacter);
      gotCharacters++;
       
    }
  
    if (number==true && gotCharacters < passwordLength) {
      temporaryCharacter	=	get_character("number");
      save_character_at_random_position(temporaryCharacter);
      gotCharacters++;
    }
  
    if (specialCharacter==true && gotCharacters < passwordLength) {
      temporaryCharacter	=	get_character("special character");
      save_character_at_random_position(temporaryCharacter);
      gotCharacters++;
    }
  }

  // now we pass the content of the array to the variable password_definitive
  for(var i=0; i < characterArray.length; i++){
    finalPassword	=	finalPassword + characterArray[i];
  }
  characterArray = new Array();

  return finalPassword;

}