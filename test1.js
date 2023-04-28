const listUrl =
  'https://gist.githubuserconten동.com/niceaji/d34fcd2d593bef75c277fe1f4a0ee519/raw/6698dab524040e1f0d48d4f8282476a5e5b53640/sentences.json';
const JSONfile = "./sentences.json"
const translateUr = 'https://translate.google.com/?sl=en&tl=ko&text=';

let timeLimit = 3000; //문제당 제한시간 3초

let index = 0;
let maxQ = 0;
var sentences = null;
var randomNumbers = [];
var box = document.getElementById("box");
var loading = document.getElementById("loading");
box.style.visibility='hidden' 
loading.style.visibility='visible' 

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// Lấy tham chiếu đến phần tử danh sách
//const myList = document.getElementById("myList");

// Tải tệp JSON từ URL hoặc đường dẫn tệp cục bộ
fetch(JSONfile)
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    // Duyệt qua mỗi mục trong danh sách JSON
    globalThis.sentences = data;
    //console.log(sentences);
    maxQ = data.length;
    var numberElement = document.getElementById("maxQ");
    numberElement.innerHTML = maxQ;
    

    let numbers = [];

    // Fill the array with numbers 0-49
    for (let i = 0; i < maxQ; i++) {
      numbers.push(i);
    }

    let randomNumbers = [];

    // Randomly select maxQ distinct numbers from the array
    while (randomNumbers.length < maxQ) {
      let randomIndex = Math.floor(Math.random() * numbers.length);
      let randomNumber = numbers[randomIndex];
      randomNumbers.push(randomNumber);
      numbers.splice(randomIndex, 1);
    }

    console.log(randomNumbers);
    globalThis.randomNumbers = randomNumbers;

    

    box.style.visibility = 'visible' //muốn hiện để visible
    loading.style.visibility='hidden' //lệnh box ẩn đi
    
    var KoText = document.getElementById("KoText");
    KoText.innerHTML = data[randomNumbers[index]].ko;
    var EnText = document.getElementById("EnText");
    EnText.innerHTML = data[randomNumbers[index]].en;
    EnText.style.visibility = "hidden"
    document.getElementById("but").disabled = true;
    setTimeout(() => { EnText.style.visibility = "visible"; document.getElementById("but").disabled = false; }, 3000);
    move()
    
  })
  .catch(error => console.error(error));


 // console.log(sentences); 
//console.log(sentence[0].en);
//console.log(sentence[0].ko);
//console.log(sentence[0].vn);
//maxQ = len(sentence);
//console.log(maxQ);
function increaseNumber() {
  // Lấy phần tử số
  var numberElement = document.getElementById("ind");

  // Lấy số hiện tại
  var currentNumber = parseInt(numberElement.innerHTML);

  // Tăng số lên 1
  var newNumber = currentNumber + 1;
  if(newNumber > maxQ){
    newNumber = maxQ
  }
  // Cập nhật giá trị của số
  numberElement.innerHTML = newNumber;
  index = newNumber-1;
  var EnText = document.getElementById("EnText");
  EnText.innerHTML = sentences[randomNumbers[index]].en;
  var KoText = document.getElementById("KoText");
  KoText.innerHTML = sentences[randomNumbers[index]].ko;
  EnText.style.visibility = "hidden"
  document.getElementById("but").disabled = true;
    setTimeout(() => { EnText.style.visibility = "visible"; document.getElementById("but").disabled = false; }, 3000);
    move()
  }

function decreaseNumber() {
  // Lấy phần tử số
  var numberElement = document.getElementById("value");

  // Lấy số hiện tại
  var currentNumber = parseInt(numberElement.innerHTML);

  // Tăng số lên 1
  var newNumber = currentNumber - 1;
  if (newNumber < 0){
      newNumber = 0;
  }
  // Cập nhật giá trị của số
  numberElement.innerHTML = newNumber;
}

var iT = 0;
function move() {
  if (iT == 0) {
    iT = 1;
    var elem = document.getElementById("timer");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        iT = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}