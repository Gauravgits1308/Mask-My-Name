const input = document.getElementById('input-box');
const output = document.getElementById('output');

document.getElementById('submit').addEventListener('click', () => {
  const userInput = input.value.trim();

  // Empty input check
  if (userInput === "") {
    output.innerText = "⚠️ Please enter your name!";
    animateOutput();
    return;
  }

  // Validation: only letters and spaces
  const isValid = /^[a-zA-Z\s]+$/.test(userInput);
  if (!isValid) {
    output.innerText = "❌ Only alphabets and spaces are allowed!";
    animateOutput();
    return;
  }

  // Generate and display result
  const result = codeName(userInput);
  output.innerText = `${result}`;
  animateOutput();
});

function codeName(userInput) {
  let chars = userInput.split('');
  let size = chars.length;

  // Swap adjacent characters
  let limit = size % 2 === 0 ? size : size - 1;
  for (let i = 0; i < limit; i += 2) {
    [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
  }

  // Flip ASCII characters
  for (let j = 0; j < size; j++) {
    let code = chars[j].charCodeAt(0);
    if (code >= 65 && code <= 90) {
      code = 155 - code; // A-Z → Z-A
    } else if (code >= 97 && code <= 122) {
      code = 219 - code; // a-z → z-a
    }
    chars[j] = String.fromCharCode(code);
  }

  return chars.join('');
}

function animateOutput() {
  output.style.opacity = 0;
  output.style.transform = "scale(0.5) translateY(30px)";
  setTimeout(() => {
    output.style.transition = "all 0.4s ease-out";
    output.style.opacity = 1;
    output.style.transform = "scale(1.2) translateY(-5px)";
  }, 20);

  setTimeout(() => {
    output.style.transition = "transform 0.2s ease-in";
    output.style.transform = "scale(1) translateY(0)";
  }, 450);
}
