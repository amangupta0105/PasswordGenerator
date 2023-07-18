const passLength = 10;
const initialSlider = document.querySelector('#passlength');
const upperCase = document.getElementById('uppercase');
const lowerCase = document.getElementById('lowercase');
const number = document.getElementById('number');
const symbols = document.getElementById('symbols');
const symbolString = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const generateButton = document.querySelector('#pass-gen');
const reset = document.querySelector('#pass-regen');
const symbolLength = symbolString.length;
const displayPassword = document.querySelector('#display-pass');
const inputSlider = document.querySelector('#silder');
const copy = document.querySelector('#copy-pass');
const copyMsg = document.querySelector('#data-copyMsg');

initialSlider.innerHTML = passLength;

// slider function
slider();
function slider() {
    inputSlider.addEventListener('input',() => initialSlider.innerHTML = inputSlider.value);
}

//random number geretaor function
function generateRandomNumbers(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//string generator
function generateUpperCase() {
    return String.fromCharCode(generateRandomNumbers(65, 90));
}
function generateLowerCase() {
    return String.fromCharCode(generateRandomNumbers(98, 122));
}
function generateNumber() {
    return generateRandomNumbers(0, 9);
}
function generateSymbol() {
    return symbolString.charAt(generateRandomNumbers(0, symbolLength));
}

//pass generator
generateButton.addEventListener('click', function () {
    let dump = [];
    let finalpass = '';
    if (lowerCase.checked == true) {
        for (let i = 0; i < inputSlider.value; i++) {
            dump = dump + generateLowerCase();
        }
    }
    if (upperCase.checked == true) {
        for (let i = 0; i < inputSlider.value; i++) {
            dump = dump + generateUpperCase();
        }
    }
    if (number.checked == true) {
        for (let i = 0; i < inputSlider.value; i++) {
            dump = dump + generateNumber();
        }
    }
    if (symbols.checked == true) {
        for (let i = 0; i < inputSlider.value; i++) {
            dump = dump + generateSymbol();
        }
    }
    const ans = shuffleString(dump);
    displayPassword.value = ans;
    if ((upperCase.checked != true) && (lowerCase.checked != true) && (number.checked != true) && (symbols.checked != true)) {
        displayPassword.value = '';
    }
    const strength1 = document.querySelector('#circle');
    if (displayPassword.value.length >= 6) {
        strength1.style.backgroundColor = 'green';
    } else {
        strength1.style.backgroundColor = 'red';
    }

});

//reset button
reset.addEventListener('click', () => {
    displayPassword.value='';
    copyMsg.innerHTML ='';
});

//shuffle string
function shuffleString(str) {
    // Convert the string into an array of characters
    const chars = str.split('');

    // Shuffle the array
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
  
    // Convert the array back into a string
    const shuffledStr = chars.join('');
    return shuffledStr;
}

//copy password
async function copyContent() {
    try {
        await navigator.clipboard.writeText(displayPassword.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        console.error('Error in copying',e);
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}
    
//copy button  
const as =displayPassword.value;
copy.addEventListener('click', () => {
    copyContent();
    document.querySelector('#data-copyMsg').style.backgroundColor = 'lightgrey';
});
