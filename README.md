Project Description

EcoDash is a simple driving simulation that I made using HTML, CSS and JavaScript which simulates real world problems that delivery drivers could face when delivering to villages and other under developed areas .

The aim of the simulation is to drive a delivery vehicle to the village and deliver supplies. The player has to avoid obstacles while making the player consider the vehicle's battery percentage.

The simulation includes potholes, rivers and trees. There is also a solar charging station which allows the player to charge the vehicle's battery.

I created this simulation to demonstrate different JavaScript concepts such as smooth movement, directional movement, velocity, acceleration, trigonometric calculations, collision detection, battery management and object-oriented programming.
How To Play

The player controls the delivery vehicle using the keyboard.

W moves the vehicle forward.

S moves the vehicle backwards.

A turns the vehicle left.

D turns the vehicle right.

P pauses and resumes the game.

The player needs to drive to the village without running out of battery.

Main Features

The game has smooth vehicle movement.

The vehicle can move forwards and backwards.

The vehicle can turn left and right.

The vehicle uses acceleration and velocity.

The game uses Math.sin() and Math.cos() for movement.

The vehicle has a battery system.

The game has an energy efficiency system.

The game has a scoring system.

The highest score is saved.

The game has different obstacles.

The game has collision detection.

The game has a solar charging station.

The game has a simple day and night system.

The game has a pause system.

The game has a game over screen.

The game has a mission complete screen.

Movement

I used acceleration to make the vehicle speed up when the player presses W.

The vehicle also has velocity because the speed changes depending on how the player controls the vehicle.

I used drag to make the vehicle slow down smoothly when the player stops accelerating.

I used Math.cos() and Math.sin() to calculate the X and Y movement of the vehicle based on the direction that it is facing.

Battery System

The vehicle starts with 100 percent battery.

The battery decreases when the vehicle is moving.

The player can recharge the battery by driving close to the solar charging station.

If the battery reaches zero, the game ends.

Collision Detection

I used rectangle collision detection in the game.

The vehicle has a rectangular area and the obstacles also have rectangular areas.

The game checks if these areas overlap.

When the vehicle hits an obstacle, the vehicle is moved backwards and its speed is stopped.

The player also loses some battery and points when they hit an obstacle.

Obstacles

The game has different obstacles.

Potholes are shown using simple dark shapes.

Rivers are shown using blue rectangles.

Trees are made using a rectangle for the trunk and a circle for the leaves.

Construction zones are made using orange and black rectangles.

These obstacles make the player avoid certain areas while driving.

Solar Charging Station

The game has a solar charging station.

The station is shown using simple rectangles.

When the player gets close to the station, the vehicle's battery increases.

This gives the player a way to get more energy during the mission.

Day And Night

The game also has a simple day and night system.

The background changes colour as the game time changes.

The HUD also shows whether it is currently Day or Night.

Object-Oriented Programming

I used object-oriented programming by creating a Vehicle class.

The Vehicle class contains information about the vehicle such as its position, speed, direction, width and height.

The Vehicle class also contains functions that control how the vehicle moves, resets and is drawn on the canvas.

Technologies Used

I used HTML to create the structure of the game.

I used CSS to style the game screens , buttons and HUD.

I used JavaScript to create the game logic.

I used HTML Canvas to draw the vehicle, houses, obstacles and environment.

I used local storage to save the high score.

Installation And Setup

No extra libraries are needed to run the game.

The project files need to be kept in the same folder.

The folder contains index.html, style.css, main.js and README.md.

To run the game you open the index.html file in a web browser.

After opening the game, you press the Start Game button.

Project Folder Structure

The initial project folder contains four main files.

The first file is index.html. This contains the HTML structure of the game, including the start screen, instructions, game screen, HUD, buttons and result screens.

The second file is style.css. This controls the colours, fonts, buttons, screens, HUD and general appearance of the game.

The third file is main.js. This contains the game logic, vehicle movement, obstacles, collision detection, battery system, scoring, day and night system and game loop.

The fourth file is README.md. This contains information about the project, how to run it and how AI was used.

AI Usage Disclosure

I used ChatGPT as a support tool while working on the project.

I used ChatGPT to help me understand some JavaScript concepts.

I used ChatGPT to help me find and fix errors in my code.

I used ChatGPT to help explain what different sections of my code do.

I also used ChatGPT to help me add comments and organise some of the project documentation.

I tested the code and made changes to the project myself.



Initial Project Folder Structure

The initial folder structure for my project was EcoDash.

Inside the folder there is index.html, style.css, main.js and README.md.

The index.html file is used for the structure of the website.

The style.css file is used for the design.

The main.js file is used for the game.

The README.md file is used for the project information.


EcoDash is a simple logistics driving game that allowed me to practise different JavaScript concepts.

The game uses smooth movement, acceleration, velocity, trigonometry, collision detection, a battery system and object-oriented programming.

The player must avoid obstacles and manage their battery while trying to reach the village and complete the delivery.
