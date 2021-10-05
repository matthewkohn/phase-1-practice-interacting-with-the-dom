// Definitions
const counterDOM = document.querySelector('#counter')
const minus = document.querySelector('#minus');
const plus = document.querySelector('#plus');
const heart = document.querySelector('#heart');
const pause = document.querySelector('#pause');
const likes = document.querySelector('.likes');
const commentForm = document.querySelector('#comment-form');
const comments = document.querySelector('#list');

let counter = document.querySelector('#counter').innerText;
let seconds = parseInt(counter);
let heartCount = {};


// As a user, I should see the timer increment every second once the page has loaded.
function timer() {
  ++seconds;
  counterDOM.innerText = seconds;
}
let playing = setInterval(timer, 1000);

// As a user, I can manually increment and decrement the counter using the plus and minus buttons.
minus.addEventListener('click', () => {
  seconds -= 1;
  counterDOM.innerText = seconds;
});
plus.addEventListener('click', () => {
  seconds += 1;
  counterDOM.innerText = seconds;
});

// As a user, I can 'like' an individual number of the counter. I should see the count of the number of 'likes' associated with that number displayed.
heart.addEventListener('click', handleHearts);

function handleHearts() {
  // keep track of the number of clicks for each number displayed in a heartCount object
  heartCount[seconds] = heartCount[seconds] || 0;
  heartCount[seconds] += 1;
  // Create list element
  const li = document.createElement('li');
  // For each key (second displayed) in the heartCount Object, create the appropriate textContent
  for (let second in heartCount) {
    li.textContent = `${second} has been liked ${heartCount[second]} times`;
  }
  // display new list item in the DOM
  likes.appendChild(li);
}

// As a user, I can pause the counter, which should:
//  * pause the counter
//  * disable all buttons except the pause button
//  * switch the label on the button from "pause" to "resume"
pause.addEventListener('click', handlePause);

function handlePause() {
  let buttons = [minus, plus, heart];
  if (pause.innerText === 'pause') {
    clearInterval(playing);
    pause.innerText = 'resume';
    buttons.forEach(a => a.disabled = true);
  } else if (pause.innerText === 'resume') {
    playing = setInterval(timer, 1000);
    pause.innerText = 'pause';
    buttons.forEach(a => a.disabled = false);
  }
}

// As a user, I should be able to click the "restart" button to restart the counter and re-enable the buttons.
// As a user, I can leave comments on my gameplay, such as: "Wow, what a fun game this is."

commentForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  // grab the comment input
  const commentInput = document.querySelector('#comment-input');
  // add to the DOM
  const li = document.createElement(li);
  li.innerText = commentInput;
  comments.append(li);
  e.target.reset();
}