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
  
      // Remove the dropped card from the original container
      const originalContainer = draggableElement.parentNode.parentNode;
      originalContainer.removeChild(draggableElement.parentNode);
    } else {
      alert('Maximum 5 chips cards allowed in the div!');
    }
  }
  
  // Function to generate cards in ascending order
  function generateAscendingCards() {
    container.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      createChipCard(data[i], i);
    }
  }

  // Generate ascending cards on page load
  window.onload = generateAscendingCards;


// Function to show dropped cards
function showDroppedCards() {
  const droppedCardsDiv = document.getElementById('droppedCards');
  const droppedCards = droppedCardsDiv.querySelectorAll('.draggable');

  const droppedCardNames = Array.from(droppedCards).map(card => card.textContent.trim());
  const displayDroppedCards = document.getElementById('displayDroppedCards');
  displayDroppedCards.innerHTML = ''; // Clear previous content

  const selectedTagsHeader = document.createElement('div');
  selectedTagsHeader.textContent = "The selected tags are:";
  selectedTagsHeader.style.color = 'white'; // Set text color to white
  displayDroppedCards.appendChild(selectedTagsHeader);

  const cardNamesList = document.createElement('ul');
  cardNamesList.classList.add('dropped-card-names-list'); // Optional: Add a class for styling
  cardNamesList.style.color = 'white'; // Set text color to white

  droppedCardNames.slice(0, 5).forEach((cardName, index) => {
    const cardListItem = document.createElement('li');
    cardListItem.textContent = `${index + 1}: ${cardName}`; // Display chip number and name
    cardNamesList.appendChild(cardListItem);
  });

  displayDroppedCards.appendChild(cardNamesList);
}
