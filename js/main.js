window.onload = function(){

  let clearTextArea = document.getElementById("clear");
  let encryptedTextArea = document.getElementById("encrypted");
  let keyInput = document.getElementById("key");
  let encrypt = document.getElementById("encrypt");
  let checkSwitch = encrypt.checked;
  let topTitle = document.getElementById("topTextTitle");
  let bottomTitle = document.getElementById("bottomTextTitle");

  const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  const onlyLetters = new RegExp("^[a-zA-Z\\s]+$");
  let key = "";
  let clearText = "";
  let encryptedText = "";


  let loop = setInterval(check, 1000);

  function setEncryptionKey(){
    if( onlyLetters.test(keyInput.value) ){
      return keyInput.value.replace(/\s/g,"");
    }
    return "";
  }

  function check(){
    normalizedClearText = clearTextArea.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if( clearText != normalizedClearText || key != setEncryptionKey() || encrypt.checked != checkSwitch){
      if( setEncryptionKey() != "" ){
        checkSwitch = encrypt.checked;
        key = setEncryptionKey();
        clearText = normalizedClearText;
        encryptedText = changeText(clearText);
        encryptedTextArea.value = encryptedText;
      }
      else{
        encryptedTextArea.value = "";
      }
    }
  }
  function changeText(clearText){
    let tempEncrypted = "";
    let j = 0; 
    for(let i = 0; i < clearText.length; i++){
      char = clearText.charAt(i);
      if( char.match(/[A-z\\s]/)){
        keyChar = key[ j % key.length ].toLowerCase();
        char = encryptDecrypt(char, keyChar);
        char = (clearText.charAt(i) == clearText.charAt(i).toUpperCase() ? char.toUpperCase() : char);
        j++;
      }
      tempEncrypted += char;
    }
    return tempEncrypted;
  }
  function encryptDecrypt(char, keyChar){
    if(encrypt.checked == true){ // encrypt
      return alphabet[ ( alphabet.indexOf(char.toLowerCase()) + alphabet.indexOf(keyChar) ) % alphabet.length ];
    }else{ // decrypt
      return alphabet[ ( alphabet.indexOf(char.toLowerCase()) -  alphabet.indexOf(keyChar) + 26 ) % alphabet.length ];
    }
  }

  encrypt.onclick = function(){
    if( encrypt.checked == true ){
      topTitle.innerText = "Texte à chiffrer";
      bottomTitle.innerText = "Texte chiffré";
    }else{
      topTitle.innerText = "Texte à déchiffrer";
      bottomTitle.innerText = "Texte déchiffré"
    }
  };

}
