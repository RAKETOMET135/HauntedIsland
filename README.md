# Haunted Island

## Game informations

**This game is about surviving on randomly generated island, where every night monsters appear. Player's goal is to not only survive, but to also build a whole ship and sail away from the island.**

**There is a crafting system where players can craft various items. For example they can craft axes, spears, shovels, pickaxes, torches and much more. In total there is 100+ items players can obtain.**
**Cutting trees, bushes or mining rocks is crucial to progress through the game.**

**To make survival like it should be, I added hunger and thirst. It is important to consider these when attempting this amazing survival on this haunted island.**
**Players can try other activities like fishing, digging dirt or even using a drill.**
**Planting seeds can be one of the ways to get food. These seeds can be watered to lower the growth time.**

**Survival can be difficult, but wild life on the island can help them with their journey. Meat chickens and collect eggs, get milk from cows and much more.**

**To make things suited even for true gamers, I added bossfight to the game. Fight Zirb the only true owner of the haunted island to be able to power your ship. Be ready for Zirb's deadly speed in his majestic flying.**

**Visiting a village can greatly improve the survival chances. Trade with local villagers to obtain special items or just sell wood and other stuff for gold.**

**Players can experience rain or just use it for watering seeds. The choice is theirs.**

**There are 3 difficulties that they can chose from: Sandbox, Normal and Nightmare. Nightmare is designed to test the true survival instincts of players. All things are made to be more diffcult.**

**Playera can spend even an hour trying to escape the haunted island. For that they can use automatical saving into the browser's local storage to continue from same computer and browser again after they feel to play this game again.**

**If you are still not interested in playing the game you can try to do other things on the island. You can ride horses, use bow and arrows and more.**

## Project informations

**I have made this project in Unity using WebGL.**
**I have upgraded default index.html file generated from WebGL and I have turned it into 3 files:**
- HTML file
- CSS file
- JavaScript file

**Images used on web are in Images folder. I have moved images from TemplateData to Images for better acces in files.**
**I have made most of the images myself.**

**Most of the project is programmed in C#.**

### Saving and loading system

**Game progress is saved to local storage of the used browser. Data are saved in unity instance and they are send to unity plugin (.jslib file) that decodes them and calls window methods that turn the data into objects and they are serializered**
**and saved to local storage.**

**Game progress is loaded by getting saved data from local storage then deserialiazing them into objects that can be sent using "unityInstance.SendMessage()" to unity instance where they are loaded.**

**Saving tactics: save just the information needed to be able to load the stuff back (example: tree with health will be saved by saving its health, maxhealth, position and the name of image used for it)**

### World generation

**The island is genereted in these steps:**
1. Create a grass square
2. Add lakes
3. Add biome grounds
4. Add forests
5. Add trees, bushes and rocks
6. Add villages
7. Add items on ground
8. Spawn animals

### Custom font

**This game uses custome font for items in game (does not apply for website). This font is handmade by me.**

### Thanks for reading

**Will anyone even read this? I hope you will enjoy the game and I have tried to minimalize the bugs that can appear. This game took me about a month to make.**







