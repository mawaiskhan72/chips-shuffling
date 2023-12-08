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


// Function to handle the "Generate Chips" button click
function toggleGenerationOrder() {
  const droppedCardsDiv = document.getElementById('droppedCards');
  const droppedCardsCount = droppedCardsDiv.childElementCount;

  // Check if there are already 5 cards in the dropped div
  if (droppedCardsCount === 5) {
    const remainingCards = Array.from(container.querySelectorAll('.draggable'));
    const shuffledRemainingCards = remainingCards.slice(5); // Get remaining cards for shuffling

    // Shuffle the remaining cards
    shuffleArray(shuffledRemainingCards);

    // Clear the container and regenerate the cards
    container.innerHTML = '';
    shuffledRemainingCards.forEach(card => {
      container.appendChild(card.cloneNode(true));
    });
  } else {
    // If fewer than 5 cards are present, generate random cards as usual
    generateRandomCard();
  }
}

// Function to create a chip card without the close button
function createChipCardWithoutCloseButton(item, index) {
  const div = document.createElement('div');
  div.classList.add('pb-1');

  const chipButton = document.createElement('button');
  chipButton.classList.add('bg-[#f0f0f0]', 'py-1', 'px-1', 'draggable');
  chipButton.setAttribute('draggable', 'true');
  chipButton.textContent = item; // Set chip text without index number

  div.appendChild(chipButton);
  container.appendChild(div);

  chipButton.addEventListener('dragstart', drag);
}

// Function to display selected tags without the close button
function showSelectedTagsWithoutCloseButton() {
  const droppedCards = document.querySelectorAll('#droppedCards .draggable');
  const displayDroppedCards = document.getElementById('displayDroppedCards');
  displayDroppedCards.innerHTML = ''; // Clear previous content

  const selectedTagsHeader = document.createElement('div');
  selectedTagsHeader.textContent = "The selected tags are:";
  selectedTagsHeader.style.color = 'white'; // Set text color to white
  displayDroppedCards.appendChild(selectedTagsHeader);

  const cardNamesList = document.createElement('ul');
  cardNamesList.classList.add('dropped-card-names-list'); // Optional: Add a class for styling
  cardNamesList.style.color = 'white'; // Set text color to white

  droppedCards.forEach(card => {
    const cardListItem = document.createElement('li');
    const cardText = card.textContent.trim().replace(/^\d+([A-Z\s.]+)/, '$1'); // Remove the leading numbers
    cardListItem.textContent = cardText; // Display chip name without the leading numbers
    cardNamesList.appendChild(cardListItem);
  });

  displayDroppedCards.appendChild(cardNamesList);
}

// Modify the submit button event listener to display selected tags without the close button
document.querySelector('button[onclick="showDroppedCards()"]').addEventListener('click', function() {
  showSelectedTagsWithoutCloseButton();
});


const originalPositions = {};

// ... (Your existing code for generating cards and functions)

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  const droppable = event.target;

  if (droppable.childElementCount <= 4) {
    const draggedElement = document.getElementById(data);
    const clonedElement = draggedElement.cloneNode(true);

    // Save original position of the dragged element
    originalPositions[data] = {
      parent: draggedElement.parentNode,
      nextSibling: draggedElement.nextSibling
    };

    // Append the close button to the dropped card
    const closeButton = createCloseButton(clonedElement, draggedElement);
    clonedElement.appendChild(closeButton);

    droppable.appendChild(clonedElement);

    // Remove the dragged element from its original position
    if (originalPositions[data]) {
      originalPositions[data].parent.removeChild(draggedElement);
      delete originalPositions[data]; // Remove saved position data
    }

    // Check if 5 cards are dropped, then reset original positions
    if (droppable.childElementCount === 5) {
      resetCardsToOriginalPositions();
    }
  } else {
    Toastify({
      text: "Maximum 5 chips cards allowed in the div!",
      backgroundColor: "red",
      gravity: "top",
      position: "right",      
      close: true,
      onClick: function() {}
      // Additional options and styling as needed
    }).showToast();
  }
}



// Function to create a close (X) button for each dropped card
function createCloseButton(clonedElement, originalCard) {
  const closeButton = document.createElement('span');
  closeButton.innerHTML = '&times;'; // Unicode for the "×" symbol
  closeButton.classList.add('close-button');

  // Apply styles for the close button
  closeButton.style.cursor = 'pointer';
  closeButton.style.marginLeft = '5px';
  closeButton.style.color = 'red'; // Change color as needed

  // Event listener for removing the card when the close button is clicked
  closeButton.addEventListener('click', function() {
    clonedElement.remove(); // Remove the dropped card
    
  });

  return closeButton;
}


// Function to create a close (X) button for each dropped card
function createCloseButton(clonedElement, originalCard) {
  const closeButton = document.createElement('span');
  closeButton.innerHTML = '&#10005;'; // Unicode for the "×" symbol
  closeButton.classList.add('close-button');

  closeButton.style.cursor = 'pointer';
  closeButton.style.marginLeft = '5px';
  closeButton.style.color = 'gray'; // Change color as needed
   closeButton.style.borderRadius = '50%'; // Makes the button circular
   closeButton.style.width = '20px'; // Set the width of the button
   closeButton.style.height = '20px'; // Set the height of the button
   closeButton.style.display = 'inline-flex'; // Display as flex to center content
   closeButton.style.alignItems = 'center'; // Align content vertically
   closeButton.style.justifyContent = 'center'; // Align content horizontally
   closeButton.style.backgroundColor = 'gray'; // Background color set to gray
   closeButton.style.fontSize = '14px'; // Set font size for the cross symbol
   closeButton.style.lineHeight = '20px'; // Set line height to center vertically
   closeButton.style.color = 'white'; // Set color of the cross symbol to white
   closeButton.style.marginLeft = '5px'; // Add space between chip name and cross

  // Event listener for removing the card when the close button is clicked
  closeButton.addEventListener('click', function() {
    clonedElement.remove(); // Remove the dropped card

    // Show the original card
    originalCard.style.display = 'block';
  });

  return closeButton;
}





