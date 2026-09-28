
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// These set the size of the game world
canvas.width = 1000;
canvas.height = 600;


// This tells the game if it is running
let gameRunning = false;

// This tells the game if it is paused
let gamePaused = false;


// These are the main game variables
let score = 0;

let distance = 0;

let battery = 100;

let energyUsed = 0;

let efficiency = 100;


// This controls the day and night cycle
let dayTime = 0;


// This stores the keyboard keys
let keys = {};


// This gets the saved high score
let highScore =
    Number(localStorage.getItem("ecoDashHighScore")) || 0;


// This displays the high score on the start screen
document.getElementById("highScoreStart").textContent = highScore;


// VEHICLE CLASS

// This class creates the player's delivery vehicle
class Vehicle {

    constructor() {

        // Starting position of the vehicle
        this.x = 120;
        this.y = 350;

        // Velocity means how fast the vehicle is moving
        this.velocity = 0;

        // Acceleration controls how quickly the vehicle speeds up
        this.acceleration = 0.12;

        // Maximum forward speed
        this.maxSpeed = 4;

        // Maximum backwards speed
        this.maxReverseSpeed = -2;

        // This stores the direction the vehicle is facing
        this.angle = 0;

        // Size of the vehicle
        this.width = 40;
        this.height = 25;

    }


    // This resets the vehicle when a new game starts
    reset() {

        this.x = 120;

        this.y = 350;

        this.velocity = 0;

        this.angle = 0;

    }


    // This updates the movement of the vehicle
    update() {

        // W or the up arrow accelerates the vehicle
        if (keys["w"] || keys["arrowup"]) {

            this.velocity += this.acceleration;

        }


        // S or the down arrow moves the vehicle backwards
        if (keys["s"] || keys["arrowdown"]) {

            this.velocity -= 0.08;

        }


        // A turns the vehicle left
        if (keys["a"] || keys["arrowleft"]) {

            this.angle -= 0.05;

        }


        // D turns the vehicle right
        if (keys["d"] || keys["arrowright"]) {

            this.angle += 0.05;

        }


        // Stop the vehicle from going faster than the maximum speed
        if (this.velocity > this.maxSpeed) {

            this.velocity = this.maxSpeed;

        }


        // Stop the vehicle from reversing too quickly
        if (this.velocity < this.maxReverseSpeed) {

            this.velocity = this.maxReverseSpeed;

        }


        // Friction slowly reduces the velocity
        this.velocity *= 0.97;


        // Math.cos calculates the horizontal movement
        this.x += Math.cos(this.angle) * this.velocity;


        // Math.sin calculates the vertical movement
        this.y += Math.sin(this.angle) * this.velocity;


        // Add the distance travelled
        distance += Math.abs(this.velocity) / 100;


        // Moving uses battery energy
        if (Math.abs(this.velocity) > 0.1) {

            battery -= 0.02;

            energyUsed += 0.02;

        }


        // Make sure the battery does not go below zero
        if (battery < 0) {

            battery = 0;

        }


        // Calculate the efficiency
        if (energyUsed > 0) {

            efficiency = Math.min(
                100,
                Math.round((distance / energyUsed) * 5)
            );

        }


        // Keep the vehicle inside the canvas

        if (this.x < 25) {

            this.x = 25;

        }

        if (this.x > canvas.width - 25) {

            this.x = canvas.width - 25;

        }

        if (this.y < 80) {

            this.y = 80;

        }

        if (this.y > canvas.height - 25) {

            this.y = canvas.height - 25;

        }

    }


    // This draws the vehicle
    draw() {

        // Save the current drawing settings
        ctx.save();


        // Move the drawing to the vehicle position
        ctx.translate(this.x, this.y);


        // Rotate the vehicle
        ctx.rotate(this.angle);


        // Draw the vehicle body
        ctx.fillStyle = "#e0a72f";

        ctx.fillRect(
            -20,
            -12,
            40,
            24
        );


        // Draw the solar panel
        ctx.fillStyle = "#24496b";

        ctx.fillRect(
            -10,
            -9,
            20,
            8
        );


        // Draw the back wheels
        ctx.fillStyle = "#222";

        ctx.fillRect(
            -15,
            9,
            8,
            6
        );

        ctx.fillRect(
            8,
            9,
            8,
            6
        );


        // Draw the front light
        ctx.fillStyle = "#ffff66";

        ctx.fillRect(
            17,
            -5,
            5,
            10
        );


        // Restore the drawing settings
        ctx.restore();

    }

}


// Create the player vehicle
const player = new Vehicle();

// OBSTACLES

// These are the obstacles in the game
let obstacles = [

    // Pothole
    {
        x: 300,
        y: 180,
        width: 65,
        height: 55,
        type: "pothole"
    },

    // River
    {
        x: 470,
        y: 410,
        width: 130,
        height: 45,
        type: "river"
    },

    // Wildlife
    {
        x: 610,
        y: 150,
        width: 55,
        height: 55,
        type: "wildlife"
    },

    // Fallen tree
    {
        x: 650,
        y: 350,
        width: 100,
        height: 30,
        type: "fallenTree"
    },

    // Traffic
    {
        x: 400,
        y: 300,
        width: 60,
        height: 35,
        type: "traffic"
    },

    // Construction zone
    {
        x: 760,
        y: 390,
        width: 100,
        height: 60,
        type: "construction"
    },

    // Load-shedding zone
    {
        x: 650,
        y: 500,
        width: 100,
        height: 55,
        type: "loadShedding"
    }

];


// VILLAGE HOUSES

// These are simple square houses
let houses = [

    {
        x: 820,
        y: 120
    },

    {
        x: 900,
        y: 170
    },

    {
        x: 820,
        y: 280
    },

    {
        x: 900,
        y: 330
    },

    {
        x: 820,
        y: 440
    }

];



// DRAW HOUSES

// This draws the village houses
function drawHouses() {

    houses.forEach(function(house) {

        // Draw the square house
        ctx.fillStyle = "#c9864b";

        ctx.fillRect(
            house.x,
            house.y,
            55,
            45
        );


        // Draw the roof
        ctx.fillStyle = "#70452a";

        ctx.beginPath();

        ctx.moveTo(
            house.x - 5,
            house.y
        );

        ctx.lineTo(
            house.x + 27,
            house.y - 20
        );

        ctx.lineTo(
            house.x + 60,
            house.y
        );

        ctx.closePath();

        ctx.fill();


        // Draw the door
        ctx.fillStyle = "#49301f";

        ctx.fillRect(
            house.x + 22,
            house.y + 22,
            12,
            23
        );

    });

}



// DRAW OBSTACLES

// This function draws all the obstacles
function drawObstacles() {

    obstacles.forEach(function(obstacle) {


        // Draw a pothole
        if (obstacle.type === "pothole") {

            ctx.fillStyle = "#30251e";

            ctx.beginPath();

            ctx.ellipse(
                obstacle.x + 32,
                obstacle.y + 27,
                32,
                20,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }


        // Draw the river
        if (obstacle.type === "river") {

            ctx.fillStyle = "#3182bd";

            ctx.fillRect(
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );


            // Small white lines make the river look like water
            ctx.strokeStyle = "#9bd8ff";

            ctx.beginPath();

            ctx.moveTo(
                obstacle.x + 10,
                obstacle.y + 15
            );

            ctx.lineTo(
                obstacle.x + 45,
                obstacle.y + 15
            );

            ctx.moveTo(
                obstacle.x + 65,
                obstacle.y + 30
            );

            ctx.lineTo(
                obstacle.x + 110,
                obstacle.y + 30
            );

            ctx.stroke();

        }


        // Draw wildlife
        if (obstacle.type === "wildlife") {

            // Animal body
            ctx.fillStyle = "#8b5a2b";

            ctx.fillRect(
                obstacle.x + 10,
                obstacle.y + 20,
                35,
                20
            );


            // Animal head
            ctx.fillRect(
                obstacle.x + 38,
                obstacle.y + 10,
                18,
                20
            );


            // Animal legs
            ctx.fillRect(
                obstacle.x + 15,
                obstacle.y + 38,
                6,
                15
            );

            ctx.fillRect(
                obstacle.x + 35,
                obstacle.y + 38,
                6,
                15
            );


            // Animal eye
            ctx.fillStyle = "black";

            ctx.fillRect(
                obstacle.x + 48,
                obstacle.y + 15,
                3,
                3
            );

        }


        // Draw a fallen tree
        if (obstacle.type === "fallenTree") {

            // Tree trunk
            ctx.fillStyle = "#70452a";

            ctx.fillRect(
                obstacle.x,
                obstacle.y + 8,
                obstacle.width,
                15
            );


            // Tree branches
            ctx.strokeStyle = "#4d321f";

            ctx.lineWidth = 5;

            ctx.beginPath();

            ctx.moveTo(
                obstacle.x + 30,
                obstacle.y + 15
            );

            ctx.lineTo(
                obstacle.x + 15,
                obstacle.y - 5
            );

            ctx.moveTo(
                obstacle.x + 60,
                obstacle.y + 15
            );

            ctx.lineTo(
                obstacle.x + 75,
                obstacle.y - 5
            );

            ctx.stroke();

        }


        // Draw traffic
        if (obstacle.type === "traffic") {

            // Draw a simple car
            ctx.fillStyle = "#d64545";

            ctx.fillRect(
                obstacle.x,
                obstacle.y + 10,
                60,
                22
            );

            // Car windows
            ctx.fillStyle = "#8bd3ff";

            ctx.fillRect(
                obstacle.x + 12,
                obstacle.y,
                15,
                12
            );

            ctx.fillRect(
                obstacle.x + 34,
                obstacle.y,
                15,
                12
            );

        }


        // Draw construction zone
        if (obstacle.type === "construction") {

            ctx.fillStyle = "#f97316";

            ctx.fillRect(
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );


            // Black construction stripes
            ctx.fillStyle = "black";

            ctx.fillRect(
                obstacle.x,
                obstacle.y + 15,
                obstacle.width,
                8
            );

            ctx.fillRect(
                obstacle.x,
                obstacle.y + 40,
                obstacle.width,
                8
            );

        }


        // Draw load-shedding zone
        if (obstacle.type === "loadShedding") {

            ctx.fillStyle = "#333";

            ctx.fillRect(
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );


            // Draw a simple electricity symbol
            ctx.fillStyle = "#ffd166";

            ctx.font = "30px Arial";

            ctx.fillText(
                "⚡",
                obstacle.x + 35,
                obstacle.y + 38
            );

        }

    });

}



// SOLAR CHARGING STATION

// This draws the solar charging station
function drawSolarStation() {

    // Station base
    ctx.fillStyle = "#555";

    ctx.fillRect(
        500,
        500,
        100,
        50
    );


    // Solar panel
    ctx.fillStyle = "#2563eb";

    ctx.fillRect(
        510,
        470,
        80,
        35
    );


    // Solar panel lines
    ctx.strokeStyle = "#a9d7ff";

    ctx.beginPath();

    ctx.moveTo(550, 470);
    ctx.lineTo(550, 505);

    ctx.moveTo(510, 487);
    ctx.lineTo(590, 487);

    ctx.stroke();


    // Station label
    ctx.fillStyle = "white";

    ctx.font = "14px Arial";

    ctx.fillText(
        "SOLAR",
        535,
        460
    );

}



// VILLAGE SIGN

// This draws the village sign
function drawVillage() {

    // Sign post
    ctx.fillStyle = "#4b3621";

    ctx.fillRect(
        870,
        80,
        10,
        50
    );


    // Sign
    ctx.fillStyle = "#5b3a22";

    ctx.fillRect(
        820,
        45,
        110,
        40
    );


    // Sign text
    ctx.fillStyle = "white";

    ctx.font = "16px Arial";

    ctx.fillText(
        "VILLAGE",
        842,
        70
    );

}



// PARTICLES


// This stores the dust particles
let particles = [];


// This creates a dust particle behind the vehicle
function createParticle() {

    if (Math.abs(player.velocity) > 1) {

        particles.push({

            x: player.x - 20,

            y: player.y,

            size: 3,

            life: 30

        });

    }

}


// This updates the dust particles
function updateParticles() {

    createParticle();


    particles.forEach(function(particle) {

        particle.x -= 0.5;

        particle.size += 0.05;

        particle.life--;

    });


    // Remove particles that have disappeared
    particles = particles.filter(function(particle) {

        return particle.life > 0;

    });

}


// This draws the dust particles
function drawParticles() {

    particles.forEach(function(particle) {

        ctx.fillStyle =
            "rgba(190,150,100,0.5)";


        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

}


// COLLISION DETECTION

// This checks if the vehicle touches an obstacle
// It uses rectangle collision detection
function collision(player, obstacle) {

    return (

        player.x - player.width / 2 <
        obstacle.x + obstacle.width

        &&

        player.x + player.width / 2 >
        obstacle.x

        &&

        player.y - player.height / 2 <
        obstacle.y + obstacle.height

        &&

        player.y + player.height / 2 >
        obstacle.y

    );

}


// This checks every obstacle
function checkCollisions() {

    obstacles.forEach(function(obstacle) {

        if (collision(player, obstacle)) {

            // Move the player backwards after a collision
            player.x -=
                Math.cos(player.angle) * 5;

            player.y -=
                Math.sin(player.angle) * 5;


            // Stop the vehicle
            player.velocity = 0;


            // Collision uses some battery
            battery -= 2;


            // Collision removes points
            score -= 10;


            // Score cannot go below zero
            if (score < 0) {

                score = 0;

            }

        }

    });

}


// SOLAR STATION

// This checks if the player is near the charging station
function checkSolarStation() {

    // Calculate distance from the station
    let stationDistance = Math.sqrt(

        (player.x - 550) ** 2 +

        (player.y - 510) ** 2

    );


    // Check if the player is close enough
    if (stationDistance < 80) {

        // Check if the load-shedding zone is nearby
        let loadSheddingDistance = Math.sqrt(

            (player.x - 700) ** 2 +

            (player.y - 525) ** 2

        );


        // Only charge if the player is not in load-shedding
        if (loadSheddingDistance > 70) {

            battery += 0.2;

        }


        // Battery cannot go above 100
        if (battery > 100) {

            battery = 100;

        }

    }

}


// VILLAGE

// This checks if the vehicle reached the village
function checkVillage() {

    if (

        player.x > 800 &&

        player.y > 40 &&

        player.y < 500

    ) {

        completeGame();

    }

}



// DAY AND NIGHT

// This changes between day and night
function updateDayNight() {

    dayTime += 0.001;


    // Restart the cycle after it reaches 1
    if (dayTime > 1) {

        dayTime = 0;

    }


    // Change the text shown in the HUD
    if (dayTime > 0.5) {

        document.getElementById(
            "dayNight"
        ).textContent = "Night";

    } else {

        document.getElementById(
            "dayNight"
        ).textContent = "Day";

    }

}


// DRAW THE GAME


// This draws everything in the game
function drawGame() {

    // Draw the daytime background
    if (dayTime > 0.5) {

        ctx.fillStyle = "#20304a";

    } else {

        ctx.fillStyle = "#79a85b";

    }


    // Fill the whole canvas
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Draw the main road
    ctx.fillStyle = "#b98b55";

    ctx.fillRect(
        0,
        280,
        canvas.width,
        120
    );


    // Draw a road line
    ctx.strokeStyle = "#f5d76e";

    ctx.lineWidth = 4;

    ctx.setLineDash([25, 20]);

    ctx.beginPath();

    ctx.moveTo(
        0,
        340
    );

    ctx.lineTo(
        canvas.width,
        340
    );

    ctx.stroke();

    ctx.setLineDash([]);


    // Draw the village
    drawVillage();


    // Draw the houses
    drawHouses();


    // Draw the obstacles
    drawObstacles();


    // Draw the solar station
    drawSolarStation();


    // Draw dust particles
    drawParticles();


    // Draw the player last
    player.draw();

}


// UPDATE HUD

// This updates the information at the top of the game
function updateHUD() {

    // Update score
    document.getElementById(
        "score"
    ).textContent = score;


    // Update distance
    document.getElementById(
        "distance"
    ).textContent =
        distance.toFixed(1);


    // Update battery
    document.getElementById(
        "battery"
    ).textContent =
        Math.round(battery);


    // Update efficiency
    document.getElementById(
        "efficiency"
    ).textContent =
        efficiency;

}



// START GAME

// This starts a new game
function startGame() {

    // Tell the game that it is running
    gameRunning = true;

    // Make sure it is not paused
    gamePaused = false;


    // Reset score
    score = 0;

    // Reset distance
    distance = 0;

    // Reset battery
    battery = 100;

    // Reset energy used
    energyUsed = 0;

    // Reset efficiency
    efficiency = 100;

    // Reset day and night
    dayTime = 0;

    // Remove old particles
    particles = [];


    // Reset the vehicle
    player.reset();


    // Hide all other screens
    document.getElementById(
        "startScreen"
    ).classList.add("hidden");

    document.getElementById(
        "instructionsScreen"
    ).classList.add("hidden");

    document.getElementById(
        "gameOverScreen"
    ).classList.add("hidden");

    document.getElementById(
        "completeScreen"
    ).classList.add("hidden");

    document.getElementById(
        "pauseScreen"
    ).classList.add("hidden");


    // Show the game
    document.getElementById(
        "gameScreen"
    ).classList.remove("hidden");


    // Update the HUD immediately
    updateHUD();

}



// PAUSE GAME


// This pauses the game
function pauseGame() {

    // Do nothing if the game is not running
    if (!gameRunning) {

        return;

    }


    // Pause the game
    gamePaused = true;


    // Show pause screen
    document.getElementById(
        "pauseScreen"
    ).classList.remove("hidden");

}


// ============================================================
// RESUME GAME
// ============================================================

// This resumes the game
function resumeGame() {

    // Continue the game
    gamePaused = false;


    // Hide pause screen
    document.getElementById(
        "pauseScreen"
    ).classList.add("hidden");

}


// ============================================================
// GAME OVER
// ============================================================

// This function ends the game
function gameOver(message) {

    // Stop the game
    gameRunning = false;


    // Display the game over message
    document.getElementById(
        "gameOverText"
    ).textContent = message;


    // Display the final score
    document.getElementById(
        "finalScore"
    ).textContent = score;


    // Display the distance
    document.getElementById(
        "finalDistance"
    ).textContent =
        distance.toFixed(1);


    // Display efficiency
    document.getElementById(
        "finalEfficiency"
    ).textContent =
        efficiency;


    // Check if a new high score was reached
    if (score > highScore) {

        highScore = score;


        // Save the high score
        localStorage.setItem(
            "ecoDashHighScore",
            highScore
        );

    }


    // Display the high score
    document.getElementById(
        "finalHighScore"
    ).textContent = highScore;


    // Update the high score on the menu
    document.getElementById(
        "highScoreStart"
    ).textContent = highScore;


    // Hide the game
    document.getElementById(
        "gameScreen"
    ).classList.add("hidden");


    // Show game over screen
    document.getElementById(
        "gameOverScreen"
    ).classList.remove("hidden");

}



// MISSION COMPLETE


// This function is called when the player reaches the village
function completeGame() {

    // Stop the game
    gameRunning = false;


    // Give the player bonus points
    score += 500;


    // Display final score
    document.getElementById(
        "completeScore"
    ).textContent = score;


    // Display distance
    document.getElementById(
        "completeDistance"
    ).textContent =
        distance.toFixed(1);


    // Display efficiency
    document.getElementById(
        "completeEfficiency"
    ).textContent =
        efficiency;


    // Check the high score
    if (score > highScore) {

        highScore = score;


        // Save high score
        localStorage.setItem(
            "ecoDashHighScore",
            highScore
        );

    }


    // Update high score on start screen
    document.getElementById(
        "highScoreStart"
    ).textContent = highScore;


    // Hide the game
    document.getElementById(
        "gameScreen"
    ).classList.add("hidden");


    // Show completion screen
    document.getElementById(
        "completeScreen"
    ).classList.remove("hidden");

}



// KEYBOARD CONTROLS


// This detects when a keyboard button is pressed
document.addEventListener(
    "keydown",
    function(event) {

        // Convert the key to lowercase
        let key = event.key.toLowerCase();


        // Store the key as pressed
        keys[key] = true;


        // Prevent the browser from scrolling with arrow keys
        if (
            key === "arrowup" ||
            key === "arrowdown" ||
            key === "arrowleft" ||
            key === "arrowright"
        ) {

            event.preventDefault();

        }


        // P pauses and resumes the game
        if (key === "p") {

            if (gamePaused) {

                resumeGame();

            } else {

                pauseGame();

            }

        }

    }

);


// This detects when a keyboard button is released
document.addEventListener(
    "keyup",
    function(event) {

        // Mark the key as not being pressed
        keys[event.key.toLowerCase()] = false;

    }

);



// BUTTON EVENTS


// Start button
document.getElementById(
    "startButton"
).addEventListener(
    "click",
    startGame
);


// Instructions button
document.getElementById(
    "instructionsButton"
).addEventListener(
    "click",
    function() {

        // Hide start screen
        document.getElementById(
            "startScreen"
        ).classList.add("hidden");


        // Show instructions
        document.getElementById(
            "instructionsScreen"
        ).classList.remove("hidden");

    }
);


// Back button
document.getElementById(
    "backButton"
).addEventListener(
    "click",
    function() {

        // Hide instructions
        document.getElementById(
            "instructionsScreen"
        ).classList.add("hidden");


        // Show start screen
        document.getElementById(
            "startScreen"
        ).classList.remove("hidden");

    }
);


// Pause button
document.getElementById(
    "pauseButton"
).addEventListener(
    "click",
    pauseGame
);


// Resume button
document.getElementById(
    "resumeButton"
).addEventListener(
    "click",
    resumeGame
);


// Restart from game over
document.getElementById(
    "restartButton"
).addEventListener(
    "click",
    startGame
);


// Restart from pause
document.getElementById(
    "restartPauseButton"
).addEventListener(
    "click",
    startGame
);


// Play again after completing the mission
document.getElementById(
    "playAgainButton"
).addEventListener(
    "click",
    startGame
);


// Main menu from game over
document.getElementById(
    "menuButton"
).addEventListener(
    "click",
    function() {

        location.reload();

    }
);


// Main menu from pause
document.getElementById(
    "menuPauseButton"
).addEventListener(
    "click",
    function() {

        location.reload();

    }
);


// Main menu after completing the mission
document.getElementById(
    "completeMenuButton"
).addEventListener(
    "click",
    function() {

        location.reload();

    }
);


// MAIN GAME LOOP

// This function keeps the game running
function gameLoop() {

    // Only update the game if it is running and not paused
    if (gameRunning && !gamePaused) {

        // Update vehicle movement
        player.update();


        // Update dust particles
        updateParticles();


        // Check for obstacle collisions
        checkCollisions();


        // Check the solar station
        checkSolarStation();


        // Check if the player reached the village
        checkVillage();


        // Update day and night
        updateDayNight();


        // Update the HUD
        updateHUD();


        // Give points when travelling
        if (Math.abs(player.velocity) > 1) {

            score += 1;

        }


        // Check if the battery has run out
        if (battery <= 0) {

            battery = 0;


            gameOver(
                "Your battery ran out!"
            );

        }

    }


    // Draw the game
    drawGame();


    // Run the game loop again
    requestAnimationFrame(gameLoop);

}



// START THE GAME LOOP

// This starts the animation loop
gameLoop();
