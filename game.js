// Selecting the HTML elements used in the game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const winScreen = document.getElementById('winScreen');
const finalScoreDisplay = document.getElementById('finalScore');
const finalScoreWinDisplay = document.getElementById('finalScoreWin');
const startButton = document.getElementById('startButton');
const hardModeButton = document.getElementById('hardModeButton');
const restartButton = document.getElementById('restartButton');
const restartButtonWin = document.getElementById('restartButtonWin');
const typedWordInput = document.getElementById('typedWord');
const scoreDisplay = document.getElementById('scoreDisplay');
const volumeSlider = document.getElementById('volumeSlider');
const muteButton = document.getElementById('muteButton');
const pauseButton = document.getElementById('pauseButton');

// Loading images for the game
let playerImage = new Image();
playerImage.src = 'player.png';

const asteroidImages = [
  new Image(),
  new Image(),
  new Image()
];
asteroidImages[0].src = 'asteroid.png';
asteroidImages[1].src = 'asteroid2.png';
asteroidImages[2].src = 'asteroid3.png';

const laserImage = new Image();
laserImage.src = 'laser.png';

const earthImage = new Image();
earthImage.src = 'earth.png';

const explosionImage = new Image();
explosionImage.src = 'boom.gif';

// Loading audio for the game
const backgroundMusic = new Audio('background_music.mp3');
const laserSound = new Audio('laser_sound.mp3');
const explosionSound = new Audio('explosion_sound.mp3');
const gameOverSound = new Audio('gameover_sound.mp3');

// Defining the words for each level
const words = [
  ['ONE', 'TWO', 'SIX', 'TEN', 'CAT', 'YES', 'IMP', 'BOG', 'HOG', 'COW', 'MOW', 'TOW', 'TOE', 'LOW', 'ACT', 'POP', 'TOP', 'BOP', 'BOT', 'BED', 'DOG', 'MOM', 'EVE', 'DAD', 'ADD', 'DIG', 'DUG', 'PAT', 'RUN', 'SUN', 'FUN', 'HAT', 'BAT', 'BIG', 'BUG', 'MUG', 'BEN', 'CUP', 'CUT', 'TOY', 'BOX', 'FAN', 'POT', 'RED', 'HOP', 'PIN', 'WEB', 'WET', 'JET', 'PIG', 'LOG', 'RAT', 'ANT', 'MAP', 'CAR', 'CAR'],
  ['BOOK', 'FOUR', 'NINE', 'FIVE', 'TOOK', 'HOOK', 'AELA', 'CAKE', 'TAKE', 'MAKE', 'DUST', 'RUST', 'FUSS', 'FROG', 'CATS', 'DOGS', 'LOGS', 'DIGS', 'SUNS', 'SONS', 'HATS', 'PLUS', 'BATS', 'BUGS', 'GIFT', 'HOPE', 'JUMP', 'KITE', 'LAMP', 'MOON', 'BEES', 'TREE', 'FISH', 'STAR', 'RATS', 'JILL', 'PHIL', 'TIME', 'NORA', 'ELLA', 'POND', 'RING', 'TOYS', 'SNOW', 'PINK', 'BIKE', 'DUCK', 'SHIP', 'BIRD', 'WIND', 'WAVE', 'RIDE'],
  ['APPLE', 'EIGHT', 'MINUS', 'SEVEN', 'THREE', 'MOMMY', 'DADDY', 'BROWN', 'CLOCK', 'DREAM', 'EAGLE', 'FRUIT', 'GREEN', 'HAPPY', 'IMAGE', 'JELLY', 'RIVER', 'MOUSE', 'ROSES', 'HONEY', 'BRUSH', 'SHEEP', 'HOUSE', 'NIGHT', 'PLANE', 'BRICK', 'SWEET', 'GRASS', 'SMILE', 'LIGHT', 'CRISP', 'FAIRY', 'PRICE', 'WATER', 'CLOUD', 'PEACH'],
  ['EVELYN', 'BANANA', 'BUTTON', 'TWENTY', 'SISTER', 'MOTHER', 'FATHER', 'CAMERA', 'DANGER', 'FLOWER', 'GARDEN', 'HUNGRY', 'JACKET', 'KITTEN', 'LAPTOP', 'PENCIL', 'ROCKET', 'MARKER', 'COOKIE', 'DINNER', 'FAMILY', 'WINDOW', 'PILLOW', 'JUNGLE',  'TIGERS', 'BOTTLE', 'HAMMER', 'TUNNEL', 'JIGSAW', 'ZIPPER', 'OCEANS', 'CANDLE', 'CASTLE', 'CATTLE', 'SUNSET'],
  ['BASKETS', 'CUPCAKES', 'BALANCE', 'PENGUIN', 'BROTHER', 'BOTTLES', 'BUTTERS', 'CHOCOLATE', 'CUCUMBER', 'DIAMOND', 'GIRAFFE', 'MEADOWS', 'PUZZLES', 'POPCORN', 'STATION', 'RAINBOW', 'SAUSAGE', 'SWEATER', 'TURTLES', 'GIRAFFE', 'PICTURE', 'NOTEBOOK', 'ELEPHANT', 'STRAWBERRY', 'AVOCADO', 'VILLAGE', 'PYJAMAS', 'BALLOON', 'ROCKING']
];

// Hard mode word list
const hardModeWords = [
'Cat Box', 'Go Up', 'Hi Mom', 'By Now', 'Do It', 'Yes Sir', 'Yes Mam', 'No Mam', 'Be Cool', 'Go Fast', 'Hi Dad', 'No Way', 'So Fun', 'Be Good', 'Hi Pal', 'Go Far', 'Hi Bud', 'No Sir', 'So Bad', 'Be Safe', 'Hi Guy', 'Go Now', 'Hi Sis', 'No Thanks', 'On Top', 'Big Hat', 'My Car', 'My Dog', 'A Book', 'Act', 'Pop Tart', 'On Top', 'Bop It', 'Robotic', 'Bedtime', 'Dog Bowl', 'My Mom', 'Eve', 'My Dad', 'Dig Dug', 'Pat', 'Run', 'Sun', 'Fun', 'Hat', 'Bat', 'Big Cat', 'Bug', 'Mug', 'Ben', 'Cup', 'Cut', 'A Toy', 'Box', 'Fan', 'Pot', 'Red', 'Hop', 'Pin', 'Web', 'Wet', 'Jet', 'Pig', 'Log', 'Rat', 'Ant', 'Map', 'Car', 'Book', 'Took', 'Hook', 'Aela', 'Cake', 'Take', 'Make', 'Dust', 'Rust', 'Fuss', 'Frog', 'Cats', 'Dogs', 'Logs', 'Digs', 'Suns', 'Sons', 'Hats', 'Bats', 'Bugs', 'Gift', 'Hope', 'Jump', 'A Kite', 'Lamp', 'Moon', 'Bees', 'Tree', 'Fish', 'Star', 'Rats', 'Jill', 'Phil', 'Nora', 'Ella', 'Pond', 'Ring', 'Toys', 'Snow', 'Pink', 'Bike', 'Duck', 'Ship', 'Bird', 'Windy Day', 'Wave', 'Ride', 'Apple', 'Mommy', 'Daddy', 'Brown', 'Clock', 'Dream', 'Eagle', 'Fruit', 'Green', 'Happy', 'Image', 'Jelly', 'River', 'Mouse', 'Roses', 'Honey', 'Brush', 'Sheep', 'House', 'Night', 'Plane', 'Brick', 'Sweet', 'Grass', 'A Smile', 'A Light', 'Crisp', 'Fairy', 'Price', 'Water', 'Cloud', 'Peach', 'Evelyn', 'Banana', 'Button', 'Sister', 'Mother', 'Father', 'Camera', 'Danger', 'Flower', 'Garden', 'Hungry', 'Jacket', 'Kitten', 'Laptop', 'Pencil', 'Rocket', 'Marker', 'Cookie', 'Dinner', 'Family', 'Window', 'Pillow', 'Jungle', 'Tigers', 'Bottle', 'Hammer', 'Tunnel', 'Jigsaw', 'Zipper', 'Oceans', 'Candle', 'Castle', 'Cattle', 'Sunset', 'Baskets', 'Cupcakes', 'Balance', 'Penguin', 'Brother', 'Bottles', 'Butters', 'Chocolate', 'Cucumber', 'Diamond', 'Giraffe', 'Meadows', 'Puzzles', 'Popcorn', 'Station', 'Rainbow', 'Sausage', 'Sweater', 'Turtles', 'Giraffe', 'Picture', 'Notebook', 'Elephants', 'Strawberries', 'Avocado', 'Villages', 'Pyjamas', 'Balloons', 'Rocking', 'Turn On', 'Turn Off', 'Go Fast', 'Go Slow', 'Look Up', 'Look Down', 'Look Left', 'Look Right', 'Move Up', 'Move Down', 'Move Left', 'Move Right', 'Jump Up', 'Jump Down', 'Jump Left', 'Jump Right'
];

// Initializing game variables
let player;
let asteroids = [];
let lasers = [];
let explosions = [];
let score = 0;
let level = 0;
let asteroidsDestroyed = 0;
let gameOver = false;
let gameStarted = false;
let selectedBackground = 'background.png';
let selectedPlayer = 'player.png';
let unlockedBackgrounds = ['background.png'];
let unlockedPlayers = ['player.png'];
let hardMode = false;
let isPaused = false;

// Player class definition
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height =100;
  }

  draw() {
    ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
  }
}

// Asteroid class definition
class Asteroid {
  constructor(x, y, word, image) {
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 75;
    this.speed = hardMode ? 1.4 + level * 0.6 : 0.7 + level * 0.3; // Increase speed with each level
    this.word = word;
    this.highlighted = '';
    this.lastHighlightedIndex = -1;
    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.font = '22px Arial';
    ctx.textAlign = 'center';

    let textWidth = ctx.measureText(this.word).width;
    let xOffset = this.x + (this.width - textWidth) / 2;
    let yOffset = this.y + this.height / 2 + 10;

    for (let i = 0; i < this.word.length; i++) {
      const char = this.word[i];
      const isHighlighted = i <= this.lastHighlightedIndex;
      ctx.fillStyle = isHighlighted ? 'green' : 'red';
      ctx.fillText(char, xOffset + i * 20, yOffset);
      ctx.strokeText(char, xOffset + i * 20, yOffset);
    }
  }

  update() {
    if (!isPaused) {
      this.y += this.speed;
    }
  }
}

// Laser class definition
class Laser {
  constructor(x, y, targetX, targetY, word) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.radius = 10;
    this.speed = 25;
    this.word = word;
    this.angle = Math.atan2(targetY - y, targetX - x);
    this.rotation = 0;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(laserImage, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
    ctx.restore();
    this.rotation += 2.1; // Rotate the laser blast
  }

  update() {
    if (!isPaused) {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
    }
  }
}

// Function to handle asteroid explosion
function explodeAsteroid(asteroid) {
  const explosionElement = document.createElement('div');
  explosionElement.classList.add('exploding-asteroid');
  explosionElement.style.position = 'absolute';
  explosionElement.style.left = `${asteroid.x}px`;
  explosionElement.style.top = `${asteroid.y}px`;
  explosionElement.style.width = `${asteroid.width}px`;
  explosionElement.style.height = `${asteroid.height}px`;
  explosionElement.innerHTML = `<img src="boom.gif" alt="Explosion">`;

  // Append the explosion element to the game container
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.appendChild(explosionElement);

  setTimeout(() => {
    explosionElement.remove();
    explosions.shift(); // Remove the explosion from the explosions array
  }, 1000); // Duration of the explosion animation
}

// Initialize the game
function init() {
  playerImage.src = selectedPlayer;
  player = new Player(canvas.width / 2 - 25, canvas.height - 150);
  spawnAsteroid();
  backgroundMusic.loop = true;
  backgroundMusic.play();
  animate();
}

// Game loop
function animate() {
  // Check if the game is over
  if (!gameOver) {
    // Request the next frame for the animation loop
    requestAnimationFrame(animate);

    // Clear the entire canvas to remove previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player on the canvas
    player.draw();

    // Draw the Earth at the bottom of the canvas
    drawEarth();

    // Iterate over each asteroid in the asteroids array
    asteroids.forEach((asteroid, index) => {
      // Draw the asteroid on the canvas
      asteroid.draw();

      // Update the asteroid's position
      asteroid.update();

      // Check if the asteroid has reached the bottom of the canvas
      if (asteroid.y > canvas.height - 50) {
        // If the asteroid reaches the bottom, set the game to over
        gameOver = true;

        // Pause the background music
        backgroundMusic.pause();

        // Show the game over screen
        showGameOverScreen();
      }

      // Iterate over each laser in the lasers array
      lasers.forEach((laser, laserIndex) => {
        // Check if the laser hits the asteroid
        if (
          laser.x < asteroid.x + asteroid.width && // Laser's x position is within the asteroid's x range
          laser.x + laser.radius * 2 > asteroid.x && // Laser's right edge is within the asteroid's x range
          laser.y < asteroid.y + asteroid.height && // Laser's y position is within the asteroid's y range
          laser.y + laser.radius * 2 > asteroid.y && // Laser's bottom edge is within the asteroid's y range
          laser.word === asteroid.word // The laser's word matches the asteroid's word
        ) {
          // Create a new explosion at the asteroid's position
          explodeAsteroid(asteroid);

          // Remove the asteroid from the asteroids array
          asteroids.splice(index, 1);

          // Remove the laser from the lasers array
          lasers.splice(laserIndex, 1);

          // Play the explosion sound
          explosionSound.play();

          // Increase the score by the length of the asteroid's word
          score += asteroid.word.length;

          // Update the score display
          updateScore();

          // Increase the count of asteroids destroyed
          asteroidsDestroyed++;

          // Check if enough asteroids have been destroyed to level up
          if (asteroidsDestroyed >= 10) {
            // Increase the level
            level++;

            // Reset the count of asteroids destroyed
            asteroidsDestroyed = 0;

            // Unlock new items based on the level
            unlockItems();

            // Check if the player has reached the final level
            if (!hardMode && level >= words.length) {
              // If the player has reached the final level, set the game to over
              gameOver = true;

              // Pause the background music
              backgroundMusic.pause();

              // Show the win screen
              showWinScreen();
            } else if (hardMode && score >= 500) {
              // If the player has reached the final score in hard mode, set the game to over
              gameOver = true;

              // Pause the background music
              backgroundMusic.pause();

              // Show the win screen
              showWinScreen();
            } else {
              // Clear the asteroids array
              asteroids = [];

              // Spawn a new asteroid
              spawnAsteroid();
            }
          } else {
            // Spawn a new asteroid
            spawnAsteroid();
          }
        }
      });
    });

    // Iterate over each laser in the lasers array
    lasers.forEach((laser, index) => {
      // Draw the laser on the canvas
      laser.draw();

      // Update the laser's position
      laser.update();

      // Check if the laser is out of bounds
      if (laser.y < 0 || laser.x < 0 || laser.x > canvas.width || laser.y > canvas.height) {
        // If the laser is out of bounds, remove it from the lasers array
        lasers.splice(index, 1);
      }
    });
  }
}

// Spawn a new asteroid
function spawnAsteroid() {
  const word = hardMode ? hardModeWords[Math.floor(Math.random() * hardModeWords.length)] : words[level][Math.floor(Math.random() * words[level].length)];
  const asteroidWidth = 120; // Assuming the width of the asteroid is 120 pixels
  const margin = 70; // Margin to avoid spawning near the edges
  const x = Math.random() * (canvas.width - asteroidWidth - 2 * margin) + margin;
  const image = asteroidImages[Math.floor(Math.random() * asteroidImages.length)];
  asteroids.push(new Asteroid(x, -75, word, image));
}

// Show the game over screen
function showGameOverScreen() {
  gameOverScreen.classList.remove('hidden');
  finalScoreDisplay.textContent = score;
  gameOverSound.play();
}

// Show the win screen
function showWinScreen() {
  winScreen.classList.remove('hidden');
  finalScoreWinDisplay.textContent = score;
}

// Start the game
function startGame() {
  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  winScreen.classList.add('hidden');
  canvas.classList.remove('hidden');
  typedWordInput.value = '';
  asteroids = [];
  lasers = [];
  explosions = [];
  score = 0;
  level = 0;
  asteroidsDestroyed = 0;
  gameOver = false;
  gameStarted = true;
  hardMode = false;
  canvas.style.backgroundImage = `url('${selectedBackground}')`;
  countdown();
}

// Start the hard mode game
function startHardMode() {
  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  winScreen.classList.add('hidden');
  canvas.classList.remove('hidden');
  typedWordInput.value = '';
  asteroids = [];
  lasers = [];
  explosions = [];
  score = 0;
  level = 0;
  asteroidsDestroyed = 0;
  gameOver = false;
  gameStarted = true;
  hardMode = true;
  canvas.style.backgroundImage = `url('${selectedBackground}')`;
  countdown();
}

// Restart the game
function restartGame() {
  gameOverScreen.classList.add('hidden');
  winScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  updateUnlocks();
}

// Countdown before the game starts
function countdown() {
  let count = 3;
  const countdownInterval = setInterval(() => {
    if (count > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '48px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(count, canvas.width / 2 - 20, canvas.height / 2);
      count--;
    } else {
      clearInterval(countdownInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '48px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText('START', canvas.width / 2 - 70, canvas.height / 2);
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        typedWordInput.focus();
        init();
      }, 1000);
    }
  }, 1000);
}

// Draw the Earth at the bottom of the canvas
function drawEarth() {
  ctx.drawImage(earthImage, 0, canvas.height - 50, canvas.width, 100);
}

// Update the score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Toggle the mute state of the game audio
function toggleMute() {
  const isMuted = backgroundMusic.muted;
  backgroundMusic.muted = !isMuted;
  laserSound.muted = !isMuted;
  explosionSound.muted = !isMuted;
  gameOverSound.muted = !isMuted;
  muteButton.textContent = isMuted ? 'Mute' : 'Unmute';
}

// Update the volume of the game audio
function updateVolume() {
  const volume = volumeSlider.value;
  backgroundMusic.volume = volume;
  laserSound.volume = volume;
  explosionSound.volume = volume;
  gameOverSound.volume = volume;
}

// Highlight the letters of the asteroids as the player types
function highlightAsteroidLetters() {
  const typedWord = typedWordInput.value.trim();
  asteroids.forEach(asteroid => {
    asteroid.highlighted = '';
    asteroid.lastHighlightedIndex = -1;
    for (let i = 0; i < typedWord.length; i++) {
      if (asteroid.word[i] === typedWord[i]) {
        asteroid.lastHighlightedIndex = i;
        asteroid.highlighted += typedWord[i];
      }
    }
  });
}

// Unlock items based on the player's level
function unlockItems() {
  if (level === 1) {
    unlockedPlayers.push('player2.png');
  } else if (level === 2) {
    unlockedPlayers.push('player3.png');
    unlockedBackgrounds.push('background2.png');
  } else if (level === 3) {
    unlockedBackgrounds.push('background3.png');
  } else if (level === 4) {
    unlockedPlayers.push('player4.png');
    unlockedBackgrounds.push('background4.png');
  }
  updateUnlocks();
}

// Update the visual state of unlocked items
function updateUnlocks() {
  document.querySelectorAll('.backgroundOption, .playerOption').forEach(option => {
    const item = option.getAttribute('data-bg') || option.getAttribute('data-player');
    if (unlockedBackgrounds.includes(item) || unlockedPlayers.includes(item)) {
      option.classList.remove('locked');
      const lockOverlay = option.querySelector('.lock-overlay');
      if (lockOverlay) {
        lockOverlay.style.display = 'none';
      }
    }
  });

  // Unlock hard mode if all levels are completed
  if (level >= words.length) {
    hardModeButton.classList.remove('locked');
    const lockOverlay = hardModeButton.querySelector('.lock-overlay');
    if (lockOverlay) {
      lockOverlay.style.display = 'none';
    }
  }
}

// Add event listeners for selecting backgrounds and players
document.querySelectorAll('.backgroundOption, .playerOption').forEach(option => {
  option.addEventListener('click', () => {
    if (!option.classList.contains('locked')) {
      const item = option.getAttribute('data-bg') || option.getAttribute('data-player');
      if (option.classList.contains('backgroundOption')) {
        selectedBackground = item;
        document.querySelectorAll('.backgroundOption').forEach(opt => opt.classList.remove('selected'));
      } else {
        selectedPlayer = item;
        document.querySelectorAll('.playerOption').forEach(opt => opt.classList.remove('selected'));
      }
      option.classList.add('selected');
    }
  });
});

// Add event listeners for buttons
startButton.addEventListener('click', startGame);
hardModeButton.addEventListener('click', startHardMode);
restartButton.addEventListener('click', restartGame);
restartButtonWin.addEventListener('click', restartGame);
muteButton.addEventListener('click', toggleMute);
volumeSlider.addEventListener('input', updateVolume);
pauseButton.addEventListener('click', togglePause);

// Add event listener for typing in the input field
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && gameStarted && !gameOver && !isPaused) {
    const typedWord = typedWordInput.value.trim();
    if (typedWord !== '') {
      const matchingAsteroid = asteroids.find(asteroid => asteroid.word === typedWord);
      if (matchingAsteroid) {
        player.shoot(typedWord, matchingAsteroid.x + matchingAsteroid.width / 2, matchingAsteroid.y + matchingAsteroid.height / 2);
        typedWordInput.value = '';
      }
    }
  }
});

// Add event listener for highlighting asteroid letters
typedWordInput.addEventListener('input', highlightAsteroidLetters);

// Add shoot method to the Player prototype
Player.prototype.shoot = function(word, targetX, targetY) {
  lasers.push(new Laser(this.x + this.width / 2, this.y, targetX, targetY, word));
  laserSound.play();
};

// Toggle the pause state of the game
function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    pauseButton.textContent = 'Unpause';
    backgroundMusic.pause();
  } else {
    pauseButton.textContent = 'Pause';
    backgroundMusic.play();
  }
}