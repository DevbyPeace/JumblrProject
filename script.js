console.log("app running");

topText = document.querySelector(".ordinary");
const scrambText = document.querySelector(".scrambled");
const textInput = document.querySelector(".inputText");
const refresh = document.querySelector(".ref");
const enterBtn = document.querySelector(".enterBtn");
let word = "";
const userScore = document.querySelector(".score");
const attempts = document.querySelector(".remainder");
const result = document.querySelector(".result");

userScore.textContent = 0;
attempts.textContent = 5;

//////Fetch function
async function wordGetter() {
  const numArray = [6, 7, 8, 9];
  const num = Math.trunc(Math.random() * numArray.length);
  console.log(numArray[num]);
  return fetch(
    `https://random-word.ryanrk.com/api/en/word/random/?length=${numArray[num]}`
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(...data);
      console.log(data);
      word = data[0];
      console.log(word);
      return word;
    })
    .catch((err) => console.log(err.message));
}

///// Scrambler function
async function scrambler(word) {
  const arrWord = await word;
  const arr = arrWord.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.trunc(Math.random() * (i + 1));
    let tempVal = arr[i];
    arr[i] = arr[j];
    arr[j] = tempVal;
    console.log(arr.join(""));
  }
  const scramWord = arr.join("").toLowerCase();
  console.log(scramWord);
  topText.textContent = `Unscramble this:  ${scramWord}`;
  return scramWord;
}

///Nested Functions
const final = async function () {
  // return scrambler(wordGetter());
  const wordVal = await wordGetter();
  await scrambler(wordVal);
};
final();
///Event Listeners
//Refresh
refresh.addEventListener("click", final);

enterBtn.addEventListener("click", function () {
  // console.log(word);
  textInput.blur();
  const guess = textInput.value.trim().toLowerCase();
  if (guess === word.toLowerCase()) {
    // console.log("Correct");
    result.textContent = "Correct!";
    setTimeout(() => (result.textContent = ""), 4000);
    userScore.textContent++;
    textInput.value = "";
    final();
  } else {
    if (attempts.textContent === "1") {
      console.log("finished");
      console.log("finished");
      result.textContent = "Game Over!";
      attempts.textContent--;
      enterBtn.disabled = true;
      // refresh.disabled = true
    } else {
      console.log("Wrong");
      result.textContent = "Wrong!";
      setTimeout(() => (result.textContent = ""), 4000);
      attempts.textContent--;
    }
  }
  // console.log(word)
});


// async function scrambler(word) {
//   const arrWord = await word;
//   const arr = arrWord.split("");
//   //   console.log(Word);
//   const shuffledArr = [];
//   const usedLettersArr = [];
//   let i = 0;
//   while (i < arr.length) {
//     let randomIndex = Math.trunc(Math.random() * arr.length);
//     console.log(randomIndex);
//     if (!usedLettersArr.includes(arr[randomIndex])) {
//       usedLettersArr.push(arr[randomIndex]);
//       shuffledArr.push(arr[randomIndex]);
//       i++;
//     }
//     console.log('anythign')
//   }
//   //   console.log(shuffledArr);
//   const shuffledWord = shuffledArr.join("").toLowerCase();
//   console.log(shuffledWord);
//   topText.textContent = `The Word To Guess Is "${shuffledWord}"`;
// }
// scrambler(wordGetter());
