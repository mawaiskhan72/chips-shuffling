  const data = [
    "HTML",
    "CSS",
    "TAILWINDCSS",
    "JAVASCRIPT",
    "NODE.JS",
    "REACT",
    "PYTHON",
    "REACT NATIVE",
    "MUI",
    "NEXT.JS",
    "NODE.JS",
    "NEXT.JS",
    "EXPRESS.JS",
    "GITLAB",
    "VUE.JS",
    "FLASK",
    "KAFKA",
    "JIRA SOFTWARE",
    "AZURE",
    "DATA BASE"
  ];

  const container = document.getElementById('container');

  data.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('pb-1');

    const button = document.createElement('button');
    button.classList.add('bg-[#f0f0f0]', 'py-1', 'px-1', 'rounded-xl');

    const span = document.createElement('span');
    span.classList.add('bg-[#bbbbbb]', 'px-2', 'py-1', 'text-white');
    span.textContent = index + 1;

    button.appendChild(span);
    button.appendChild(document.createTextNode(item));

    div.appendChild(button);
    container.appendChild(div);
  });


          function generateRandomCard() {
            const cardSerialNumbers = [
              "chip1", "chip2", "chip3", "chip4", "chip5",
              "chip6", "chip7", "chip8", "chip9", "chip10",
              "chip11", "chip12", "chip13", "chip14", "chip15",
              "chip16", "chip17", "chip18", "chip19", "chip20"
            ];
      
            const randomCardIndex = Math.floor(Math.random() * cardSerialNumbers.length);
            const randomCardSerialNumber = cardSerialNumbers[randomCardIndex];
      
            const randomDataIndex = Math.floor(Math.random() * data.length);
            const randomDataValue = data[randomDataIndex];
      
          }

          function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          }
          

          function generateRandomCard() {
            shuffleArray(data); 
          
            const container = document.getElementById('container');
            container.innerHTML = ''; 
          
              data.forEach((item, index) => {
              const div = document.createElement('div');
              div.classList.add('pb-1');
          
              const button = document.createElement('button');
              button.classList.add('bg-[#f0f0f0]', 'py-1', 'px-1', 'rounded-xl');
          
              const span = document.createElement('span');
              span.classList.add('bg-[#bbbbbb]', 'px-2', 'py-1', 'text-white');
              span.textContent = index + 1;
          
              button.appendChild(span);
              button.appendChild(document.createTextNode(item));
          
              div.appendChild(button);
              container.appendChild(div);
            });
          
            const randomDataIndex = Math.floor(Math.random() * data.length);
            const randomDataValue = data[randomDataIndex];
          
            const randomCardSerialNumber = `chip${randomDataIndex + 1}`;
          
            // const randomCard = `${randomDataValue} - ${randomCardSerialNumber}`;
            // document.getElementById("randomCardDisplay").innerText = "Randomly selected card: " + randomCard;
          }

          // for card move in empty div  
          function moveChips(action) {
            const container = document.getElementById('container');
            const emptyDiv = document.getElementById('emptyDiv');
            const chipsInEmptyDiv = emptyDiv.querySelectorAll('.pb-1');
          
            if (action === 'in') {
              const chipsInContainer = container.querySelectorAll('.pb-1');
              chipsInContainer.forEach(chip => {
                if (!emptyDiv.contains(chip) && emptyDiv.childElementCount < 20) {
                  emptyDiv.appendChild(chip.cloneNode(true));
                }
              });
            } else if (action === 'out') {
              chipsInEmptyDiv.forEach(chip => {
                if (container.contains(chip)) {
                  container.appendChild(chip);
                }
              });
              emptyDiv.innerHTML = ''; // Clear the empty div after moving chips out
            }
          }
          