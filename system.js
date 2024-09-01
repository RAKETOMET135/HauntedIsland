/* Unity default variables */
var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var warningBanner = document.querySelector("#unity-warning");

/* Side panel variables */
var newGameButton = document.querySelector("#new-game-button");
var newGameImage = document.querySelector("#new-game-image")
var continueGameButton = document.querySelector("#continue-game-button");
var continueGameImage = document.querySelector("#continue-image");
var tutorialButton = document.querySelector("#tutorial-button");
var tutorialImage = document.querySelector("#tutorial-image");

/* Audio variables */
var audioButton = document.querySelector("#audio-button");
var audioButtonImage = document.querySelector("#audio-image");

var audioEnabled = false;

var buttonAudio = new Audio("Audio/Button.mp3");
var menuBackgroundAudio = new Audio("Audio/MenuBackground.mp3"); menuBackgroundAudio.volume = 0.5;

/* Loading screen variables */
var loadingScreen = document.querySelector("#loading-screen");
var isLoaderLoaded = false;

/* Difficulty variables */
var difficultySelection = document.querySelector("#difficulty");
var difficultyBackground = document.querySelector("#difficulty-background");

var sandboxButton = document.querySelector("#sandbox-mode");
var sandboxButtonImage = document.querySelector("#sandbox-image");
var normalButton = document.querySelector("#normal-mode");
var normalButtonImage = document.querySelector("#normal-image");
var nightmareButton = document.querySelector("#nightmare-mode");
var nightmareButtonImage = document.querySelector("#nightmare-image");

var diffInfo = document.querySelector("#difficulty-desc");
var diffInfoImage = document.querySelector("#difficulty-desc-image");
var selectAwaited = false;

/* Question variables */
var question = document.querySelector("#question");

var questionYes = document.querySelector("#question-yes");
var questionYesImage = document.querySelector("#question-image-yes");
var questionNo = document.querySelector("#question-no");
var questionNoImage = document.querySelector("#question-image-no");

var inputAwaited = false;

/* Tutorial variables */
var tutorial = document.querySelector("#tutorial");

var leftPageButton = document.querySelector("#left-page-button");
var leftPageImage = document.querySelector("#left-page-image");
var rightPageButton = document.querySelector("#right-page-button");
var rightPageImage = document.querySelector("#right-page-image");
var tutorialCancelButton = document.querySelector("#tutorial-cancel");

var tutorialPageImage = document.querySelector("#tutorial-page");

var currentTutorialPage = 1;

/* Data variables */
var saveNotAllowed = false;

/* Additional hover functionality */
function hoverYes(state){
  if (state) { questionYesImage.src = "Images/YesGreen.png"; } 
  else { questionYesImage.src = "Images/Yes.png"; }
}
questionYes.addEventListener("mouseover", () => { hoverYes(true); });
questionYes.addEventListener("mouseout", () => { hoverYes(false); });

function hoverNo(state){
  if (state) { questionNoImage.src = "Images/NoRed.png"; } 
  else { questionNoImage.src = "Images/No.png"; }
}
questionNo.addEventListener("mouseover", () => { hoverNo(true); });
questionNo.addEventListener("mouseout", () => { hoverNo(false); });

function hoverSandbox(state){
  if (state) { sandboxButtonImage.src = "Images/SandboxSelect.png"; diffInfoImage.src = "Images/SandboxInfo.png"; difficultyBackground.style.height = "250%"; } 
  else { sandboxButtonImage.src = "Images/Sandbox.png"; diffInfoImage.src = "Images/GigaPixel.png"; difficultyBackground.style.height = "130%"; }
}
sandboxButton.addEventListener("mouseover", () => { hoverSandbox(true); });
sandboxButton.addEventListener("mouseout", () => { hoverSandbox(false); });

function hoverNormal(state){
  if (state) { normalButtonImage.src = "Images/NormalSelect.png"; diffInfoImage.src = "Images/NormalInfo.png"; difficultyBackground.style.height = "185%"; } 
  else { normalButtonImage.src = "Images/Normal.png"; diffInfoImage.src = "Images/GigaPixel.png"; difficultyBackground.style.height = "130%"; }
}
normalButton.addEventListener("mouseover", () => { hoverNormal(true); });
normalButton.addEventListener("mouseout", () => { hoverNormal(false); });

function hoverNightmare(state){
  if (state) { nightmareButtonImage.src = "Images/NightmareSelect.png"; diffInfoImage.src = "Images/NightmareInfo.png"; difficultyBackground.style.height = "310%"; } 
  else { nightmareButtonImage.src = "Images/Nightmare.png"; diffInfoImage.src = "Images/GigaPixel.png"; difficultyBackground.style.height = "130%"; }
}
nightmareButton.addEventListener("mouseover", () => { hoverNightmare(true); });
nightmareButton.addEventListener("mouseout", () => { hoverNightmare(false); });

/* Functions */
function changeTutorialPageButtonState(state, pageButton) { 
  if (!state) { pageButton.style.filter = "invert(80%)"; pageButton.style.pointerEvents = "none"; }
  else { pageButton.style.filter = "invert(10%)"; pageButton.style.pointerEvents = "all"; }
}

async function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function enableDiff() {
  difficultySelection.style.zIndex = 20;
  selectAwaited = true;
}

function enableQuestion() {
  question.style.zIndex = 20;
  inputAwaited = true;
}

function changeTutorialPage() {
  tutorialPageImage.src = "Images/TutorialPage" + currentTutorialPage.toString() + ".png";
}

function changeTutorialState(state) {
  if (state) { tutorial.style.zIndex = "20"; }
  else { tutorial.style.zIndex = "-5"; }
}

function changeAudioButtonBorderColor(colorString) {
  audioButton.style.borderColor = colorString;
}

function playAudio(audio) {
  if (!navigator.userActivation || !navigator.userActivation.isActive) { return; }

  if (audioEnabled) { if (!audio.paused) { audio.currentTime = 0; } audio.play(); }
}
function stopAudio(audio) {
  audio.pause();
}

/* Tutorial system */
changeTutorialPageButtonState(false, leftPageButton);
changeTutorialPage(currentTutorialPage);

leftPageButton.addEventListener("click", () => {
  if (currentTutorialPage > 1) { currentTutorialPage--; changeTutorialPageButtonState(true, rightPageButton); }

  if (currentTutorialPage == 1) { changeTutorialPageButtonState(false, leftPageButton); }

  playAudio(buttonAudio);
  changeTutorialPage(currentTutorialPage);
});

rightPageButton.addEventListener("click", () => {
  if (currentTutorialPage < 16) { currentTutorialPage++; changeTutorialPageButtonState(true, leftPageButton); }

  if (currentTutorialPage == 16) { changeTutorialPageButtonState(false, rightPageButton); }

  changeTutorialPage(currentTutorialPage);
  playAudio(buttonAudio);
});

tutorialButton.addEventListener("click", () => {
  disableTriggerButtons();
  changeTutorialState(true);
  playAudio(buttonAudio);
});

tutorialCancelButton.addEventListener("click", () => {
  enableTriggerButtons();
  changeTutorialState(false);
  playAudio(buttonAudio);
});

/* Data saving methods */
window.SaveWorldData = (worldData) => {
  let worldDataObject = {
    worldTiles: worldData.worldTiles,
    gridSize: worldData.gridSize,
    blockSize: worldData.blockSize,
    gridStart: worldData.gridStart
  };

  if (saveNotAllowed) return;

  window.localStorage.setItem("worldData", JSON.stringify(worldDataObject));
}
window.SaveVegetationData = (vegetationData) => {
  let vegetationDataObject = {
    vegetationName: vegetationData.vegetationName,
    vegetationTag: vegetationData.vegetationTag,
    vx: vegetationData.vx,
    vy: vegetationData.vy,
    maxHealth: vegetationData.maxHealth,
    health: vegetationData.health
  };

  if (saveNotAllowed) return;

  window.localStorage.setItem("vegetationData", JSON.stringify(vegetationDataObject));
}
window.SaveItemData = (itemData) => {
  let itemDataObject = {
    itemNames: itemData.itemNames,
    itemTags: itemData.itemTags,
    rotX: itemData.rotX,
    posX: itemData.posX,
    posY: itemData.posY,
    growth: itemData.growth,
    watered: itemData.watered
  };

  if (saveNotAllowed) return;

  window.localStorage.setItem("itemData", JSON.stringify(itemDataObject));
}
window.SavePickedItemData = (pickedItemData) => {
  let pickedItemDataObject = {
    itemNames: pickedItemData.itemNames,
    itemAmounts: pickedItemData.itemAmounts,
    equippedItemName: pickedItemData.equippedItemName
  };

  if (saveNotAllowed) return;

  window.localStorage.setItem("pickedItemData", JSON.stringify(pickedItemDataObject));
}
window.SavePlayerData = (playerData) => {
  let playerDataObject = {
    playerPosition: playerData.playerPosition,
    flipX: playerData.flipX,
    health: playerData.health,
    hunger: playerData.hunger,
    thirst: playerData.thirst,
    gameTime: playerData.gameTime,
    gameDays: playerData.gameDays,
    gameStep: playerData.gameStep,
    gameLightStep: playerData.gameLightStep,
    onHorse: playerData.onHorse,
    difficulty: playerData.difficulty,
    gameWin: playerData.gameWin,
    gameOverTip: playerData.gameOverTip,
    rain: playerData.rain,
    timeRunning: playerData.timeRunning
  };

  if (saveNotAllowed) return;

  window.localStorage.setItem("playerData", JSON.stringify(playerDataObject));
}
window.SaveEnemyData = (enemyData) => {
  let enemyDataObject = {
    x: enemyData.x,
    y: enemyData.y,
    enemyName: enemyData.enemyName,
    maxHealth: enemyData.maxHealth,
    health: enemyData.health,
    damage: enemyData.damage,
    speed: enemyData.speed
  };

  if (saveNotAllowed) return;

  window.localStorage.setItem("enemyData", JSON.stringify(enemyDataObject));
}
window.SaveAnimalData = (animalData) => {
  let animalDataObject = {
    x: animalData.x,
    y: animalData.y,
    animalName: animalData.animalName,
    maxHealth: animalData.maxHealth,
    health: animalData.health,
    damage: animalData.damage,
    speed: animalData.speed,
    attack: animalData.attack,
    saddle: animalData.saddle,
    ride: animalData.ride
  };

  if (saveNotAllowed) return;

  window.localStorage.setItem("animalData", JSON.stringify(animalDataObject));
}
window.SaveVillagerData = (villagerData) => {
  let villagerDataObject = {
    x: villagerData.x,
    y: villagerData.y,
    villagerName: villagerData.villagerName,
    speed: villagerData.speed,
    tradeIds: villagerData.tradeIds
  };

  if (saveNotAllowed) return;

  window.localStorage.setItem("villagerData", JSON.stringify(villagerDataObject));
}
window.LoadGameLoader = (requestInfo) => {
  isLoaderLoaded = true;
  loadingScreen.style.zIndex = -10;

  const newGameOnLoadData = window.sessionStorage.getItem("newGame");
    if (newGameOnLoadData){
      if (newGameOnLoadData === "true"){
        window.sessionStorage.removeItem("newGame");
        enableQuestion();
        disableTriggerButtons();
      }
  }
}
window.SaveWebsiteData = () => {
  let websiteDataObject = {
    audioAllowed: audioEnabled
  };

  window.localStorage.setItem("websiteData", JSON.stringify(websiteDataObject));
}
window.ReloadWebsite = (message) => {
  window.localStorage.removeItem("playerData");
  window.localStorage.removeItem("animalData");
  window.localStorage.removeItem("enemyData");
  window.localStorage.removeItem("itemData");
  window.localStorage.removeItem("worldData");
  window.localStorage.removeItem("pickedItemData");
  window.localStorage.removeItem("vegetationData");
  window.localStorage.removeItem("villagerData");

  saveNotAllowed = true;

  location.reload();
}


/* Unity default */
/*
 Shows a temporary message banner/ribbon for a few seconds, or
 a permanent error message on top of the canvas if type=="error".
 If type=='warning', a yellow highlight color is used.
 Modify or remove this function to customize the visually presented
 way that non-critical warnings and error messages are presented to the
 user.
*/
function unityShowBanner(msg, type) {
  function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length ? "block" : "none";
  }
  var div = document.createElement("div");
  div.innerHTML = msg;
  warningBanner.appendChild(div);
  if (type == "error") div.style = "background: red; padding: 10px;";
  else {
    if (type == "warning") div.style = "background: yellow; padding: 10px;";
    setTimeout(function () {
      warningBanner.removeChild(div);
      updateBannerVisibility();
    }, 5000);
  }
  updateBannerVisibility();
}

var buildUrl = "Build";
var loaderUrl = buildUrl + "/WebGameBuilds.loader.js";
var config = {
  dataUrl: buildUrl + "/WebGameBuilds.data.unityweb",
  frameworkUrl: buildUrl + "/WebGameBuilds.framework.js.unityweb",
  codeUrl: buildUrl + "/WebGameBuilds.wasm.unityweb",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "Survival",
  productVersion: "1.0",
  showBanner: unityShowBanner,
}

// By default Unity keeps WebGL canvas render target size matched with
// the DOM size of the canvas element (scaled by window.devicePixelRatio)
// Set this to false if you want to decouple this synchronization from
// happening inside the engine, and you would instead like to size up
// the canvas DOM size and WebGL render target sizes yourself.
// config.matchWebGLToCanvasSize = false;

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  container.className = "unity-mobile";
  // Avoid draining fillrate performance on mobile devices,
  // and default/override low DPI mode on mobile browsers.
  config.devicePixelRatio = 1;
  unityShowBanner('WebGL builds are not supported on mobile devices.');
} else {
  canvas.style.width = "960px";
  canvas.style.height = "600px";
}
loadingBar.style.display = "block";

/* Data loading */
var worldDataObject = JSON.parse(window.localStorage.getItem("worldData"));
var vegetationDataObject = JSON.parse(window.localStorage.getItem("vegetationData"));
var playerDataObject = JSON.parse(window.localStorage.getItem("playerData"));
var itemDataObject = JSON.parse(window.localStorage.getItem("itemData"));
var pickedItemDataObject = JSON.parse(window.localStorage.getItem("pickedItemData"));
var enemyDataObject = JSON.parse(window.localStorage.getItem("enemyData"));
var animalDataObject = JSON.parse(window.localStorage.getItem("animalData"));
var villagerDataObject = JSON.parse(window.localStorage.getItem("villagerData"));
if (!worldDataObject && !vegetationDataObject && !playerDataObject && !itemDataObject && !pickedItemDataObject && !enemyDataObject && !animalDataObject && !villagerDataObject) {
  continueGameImage.style.filter = "invert(80%)";
  continueGameButton.style.pointerEvents = "none";
}
var dataLoaded = false;

/* Button selection style */
function disableTriggerButtons() {
  newGameImage.style.filter = "invert(80%)";
  newGameButton.style.pointerEvents = "none";
  continueGameImage.style.filter = "invert(80%)";
  continueGameButton.style.pointerEvents = "none";
  tutorialImage.style.filter = "invert(80%)";
  tutorialButton.style.pointerEvents = "none";
}

function enableTriggerButtons() {
  newGameImage.style.filter = "none";
  newGameButton.style.pointerEvents = "all";
  tutorialImage.style.filter = "none";
  tutorialButton.style.pointerEvents = "all";
  if (!worldDataObject && !vegetationDataObject && !playerDataObject && !itemDataObject && !pickedItemDataObject && !enemyDataObject && !animalDataObject && !villagerDataObject) {
    continueGameImage.style.filter = "invert(80%)";
    continueGameButton.style.pointerEvents = "none";
  }
  else {
    continueGameImage.style.filter = "none";
    continueGameButton.style.pointerEvents = "all";
  }
}

/* Console clearing */
var debugMode = true;
if (!debugMode) {
  console.log = (message) => {}
  console.warn = (message) => {}
}

/* Extra audio functionality */
document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) { playAudio(menuBackgroundAudio); } } );

menuBackgroundAudio.addEventListener("ended", () => { playAudio(menuBackgroundAudio); })

/* Unity window extra functionality */
var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
  }).then((unityInstance) => {
    loadingBar.style.display = "none";

    /* Website setting data loading */
    var websiteDataObject = JSON.parse(window.localStorage.getItem("websiteData"));
    if (websiteDataObject.audioAllowed) {
      audioEnabled = true; audioButtonImage.src = "Images/DisableAudio.png";
      changeAudioButtonBorderColor("rgb(23, 197, 0)");

      unityInstance.SendMessage("ExternalSystems", "ChangeAudioAcces", 1);

      var menuAudioInterval = setInterval(() => {
        if (document.fullscreenElement) { clearInterval(menuAudioInterval); } 
        if (navigator.userActivation && navigator.userActivation.isActive) { playAudio(menuBackgroundAudio); clearInterval(menuAudioInterval); } 
      }, 1000);
    }

    /* Extra functions */
    function enableFullscreen() {
      unityInstance.SetFullscreen(1);
      unityInstance.SendMessage("PauseHandling", "OnPauseJavascriptSend", "0");
    }

    async function createNewGame(diff) {
      loadingScreen.style.zIndex = 100;
      await wait(1);
      enableFullscreen();
      unityInstance.SendMessage("Generator", "StartNewGame", diff);
      continueGameImage.style.filter = "none";
      continueGameButton.style.pointerEvents = "all";
      loadingScreen.style.zIndex = -10;
      dataLoaded = true;
      stopAudio(menuBackgroundAudio);
    }

    function onFullscreenExitted() {
      if (dataLoaded){
        unityInstance.SendMessage("PauseHandling", "OnPauseJavascriptSend", "1");
      }
    }

    /* Extra functionality */
    setInterval(() => {
      if (dataLoaded){
        unityInstance.SendMessage("Player", "SavePlayer", "autosave");
        unityInstance.SendMessage("Items", "SaveItemData");
      }
    }, 300 * 1000);

    document.documentElement.addEventListener('fullscreenchange', function () {
      if (!document.fullscreenElement) {
        onFullscreenExitted();
      }
    });

    window.addEventListener('beforeunload', function (event) {
      if (dataLoaded){
        unityInstance.SendMessage("Player", "SavePlayer", "website unloading")
        unityInstance.SendMessage("Items", "SaveItemData");
      }
    });

    newGameButton.onclick = () => {
      if (!isLoaderLoaded) return;

      playAudio(buttonAudio);

      if (worldDataObject || vegetationDataObject || playerDataObject || itemDataObject || pickedItemDataObject || enemyDataObject || animalDataObject || villagerDataObject) {
        if (dataLoaded){
          window.sessionStorage.setItem("newGame", "true");
          window.location.reload();
        }
        else{
          enableQuestion();
          disableTriggerButtons();
        }
      }
      else {
        enableDiff();
        disableTriggerButtons();
      }
    }
    continueGameButton.onclick = () => {
      if (!isLoaderLoaded) return;
      if (dataLoaded) {
        enableFullscreen();
        playAudio(buttonAudio);
        stopAudio(menuBackgroundAudio);
        return;
      }
      if (!worldDataObject || !vegetationDataObject || !playerDataObject || !itemDataObject || !pickedItemDataObject || !enemyDataObject || !animalDataObject || !villagerDataObject) return;

      unityInstance.SendMessage("Generator", "LoadWorldData", JSON.stringify(worldDataObject));
      unityInstance.SendMessage("Generator", "LoadVegetationData", JSON.stringify(vegetationDataObject));
      unityInstance.SendMessage("Generator", "LoadItemData", JSON.stringify(itemDataObject));
      unityInstance.SendMessage("Player", "LoadPlayer", JSON.stringify(playerDataObject));
      
      unityInstance.SendMessage("Items", "LoadPickedItemData", JSON.stringify(pickedItemDataObject));

      unityInstance.SendMessage("ExternalSystems", "LoadEnemy", JSON.stringify(enemyDataObject));
      unityInstance.SendMessage("ExternalSystems", "LoadAnimals", JSON.stringify(animalDataObject));
      unityInstance.SendMessage("ExternalSystems", "LoadVillagers", JSON.stringify(villagerDataObject));

      unityInstance.SendMessage("Generator", "LoadAllData", "load game");

      enableFullscreen();
      playAudio(buttonAudio);
      stopAudio(menuBackgroundAudio);
      dataLoaded = true;
    }
    questionYes.onclick = () => {
      if (!inputAwaited) return;

      inputAwaited = false;
      question.style.zIndex = -5;
      enableDiff();
      playAudio(buttonAudio);
    }
    questionNo.onclick = () => {
      if (!inputAwaited) return;

      inputAwaited = false;
      question.style.zIndex = -5;
      enableTriggerButtons();
      playAudio(buttonAudio);
    }
    sandboxButton.onclick = () => {
      if (!selectAwaited) return;

      difficultySelection.style.zIndex = -5;
      enableTriggerButtons();
      createNewGame("sandbox");
      playAudio(buttonAudio);
    }
    normalButton.onclick = () => {
      if (!selectAwaited) return;

      difficultySelection.style.zIndex = -5;
      enableTriggerButtons();
      createNewGame("normal");
      playAudio(buttonAudio);
    }
    nightmareButton.onclick = () => {
      if (!selectAwaited) return;

      difficultySelection.style.zIndex = -5;
      enableTriggerButtons();
      createNewGame("nightmare");
      playAudio(buttonAudio);
    }

     /* Audio button */
    audioButton.addEventListener("click", () => {
      var audioEnabledNumberState = 0;
      audioEnabled = !audioEnabled;

      if (audioEnabled) { audioButtonImage.src = "Images/DisableAudio.png"; changeAudioButtonBorderColor("rgb(23, 197, 0)"); audioEnabledNumberState = 1; playAudio(menuBackgroundAudio); }
      else { audioButtonImage.src = "Images/EnableAudio.png"; changeAudioButtonBorderColor("rgb(255, 0, 0)"); stopAudio(menuBackgroundAudio); }

      unityInstance.SendMessage("ExternalSystems", "ChangeAudioAcces", audioEnabledNumberState);

      window.SaveWebsiteData();

      playAudio(buttonAudio);
    });

    audioButton.addEventListener("mouseover", () => {
      if (audioEnabled) { changeAudioButtonBorderColor("rgb(23, 197, 0)"); }
      else { changeAudioButtonBorderColor("rgb(255, 0, 0)"); }
    });

  }).catch((message) => {
    alert(message);
  });
}
document.body.appendChild(script);
