const data = [
  "HTML", "CSS", "TAILWINDCSS", "JAVASCRIPT", "NODE.JS", "REACT", "PYTHON", "REACT NATIVE",
  "MUI", "NEXT.JS", "NODE.JS", "NEXT.JS", "EXPRESS.JS", "GITLAB", "VUE.JS", "FLASK",
  "KAFKA", "JIRA SOFTWARE", "AZURE", "DATA BASE"
];

const container = document.getElementById('container');

// Function to create chips cards
function createChipCard(item, index) {
  const div = document.createElement('div');
  div.classList.add('pb-1');

  const button = document.createElement('button');
  button.classList.add('bg-[#f0f0f0]', 'py-1', 'px-1', 'rounded-xl', 'draggable');
  button.setAttribute('draggable', 'true');
  button.setAttribute('id', `card-${index}`);

  const span = document.createElement('span');
  span.classList.add('bg-[#bbbbbb]', 'px-2', 'py-1', 'text-white');
  span.textContent = index + 1;

  button.appendChild(span);
  button.appendChild(document.createTextNode(item));

  div.appendChild(button);
  container.appendChild(div);

  button.addEventListener('dragstart', drag);
}

// Generate random cards on page load
window.onload = generateRandomCard();

// Function to generate random cards
function generateRandomCard() {
  container.innerHTML = '';

  const chipNumberPairs = data.map((item, index) => ({ chip: item, number: index + 1 }));
  shuffleArray(chipNumberPairs);

  chipNumberPairs.forEach(pair => {
    createChipCard(pair.chip, pair.number - 1);
  });
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  const draggableElement = document.getElementById(data);
  const droppable = event.target;

  if (droppable.childElementCount <= 4) {
    droppable.appendChild(draggableElement.cloneNode(true));
  } else {
    alert('Maximum 5 chips cards allowed in the div!');
  }
}

    // Function to show dropped cards
    function showDroppedCards() {
      const droppedCardsDiv = document.getElementById('droppedCards');
      const droppedCards = droppedCardsDiv.querySelectorAll('.draggable');
      
      const droppedCardNames = Array.from(droppedCards).map(card => card.textContent.trim());
      const displayDroppedCards = document.getElementById('displayDroppedCards');
      displayDroppedCards.textContent = `Dropped Cards: ${droppedCardNames.join(', ')}`;
    }