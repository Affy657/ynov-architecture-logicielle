import ClientHandler from "../Network/ClientHandler";


// Fonction pour charger dynamiquement le contenu de ui.html dans le conteneur
async function loadUI() {
  const container = document.getElementById('app-container');
  const response = await fetch('src/modules/UI/ui.html');
  const html = await response.text();
  if (container) {
    container.innerHTML = html;
  }
}

function init() {
  // Vérifier que l'élément canvas existe bien dans le DOM
  const canvas = document.getElementById("roverCanvas") as HTMLCanvasElement;
  if (!canvas) {
    console.error("Élément canvas introuvable.");
    return;
  }

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  if (!ctx) {
    console.error("Impossible d'obtenir le contexte du canvas.");
    return;
  }

  let obstacles: { x: number; y: number }[] = [];
  let lastInstruction = ""; // Stocke la dernière instruction envoyée
  const directionIcons: Record<number, string> = {
    0: "⬆️", // Nord
    1: "⬇️", // Sud
    2: "➡️", // Est
    3: "⬅️"  // Ouest
  };

  const gridSize = 10;
  const cellSize = canvas.width / gridSize;
  let rover = { x: 0, y: 0, orientation: 0 };

  function getDirectionIcon(orientation: number): string {
    return directionIcons[orientation] || "❓";
  }

  function computeIntendedPosition(
    instruction: string,
    pos: { x: number; y: number; orientation: number }
  ): { x: number; y: number } {
    let dx = 0, dy = 0;
    if (instruction === "A") { // Avancer
      switch (pos.orientation) {
        case 0: dy = -1; break;
        case 1: dy = 1; break;
        case 2: dx = 1; break;
        case 3: dx = -1; break;
      }
    } else if (instruction === "R") { // Reculer
      switch (pos.orientation) {
        case 0: dy = 1; break;
        case 1: dy = -1; break;
        case 2: dx = -1; break;
        case 3: dx = 1; break;
      }
    }
    return { x: pos.x + dx, y: pos.y + dy };
  }

  function drawGrid(blocked: boolean, collidedObstacle: { x: number; y: number } | null = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.strokeStyle = "#ddd";
      ctx.stroke();
    }
    if (blocked) {
      drawObstacles(collidedObstacle);
    }
    drawRover();
  }

  function drawRover() {
    ctx.font = `${cellSize * 0.8}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const arrow = getDirectionIcon(rover.orientation);
    ctx.fillText(arrow, rover.x * cellSize + cellSize / 2, rover.y * cellSize + cellSize / 2);
  }

  function drawObstacles(collidedObstacle: { x: number; y: number } | null) {
    if (collidedObstacle) {
      ctx.beginPath();
      ctx.fillStyle = "orange";
      ctx.arc(
        collidedObstacle.x * cellSize + cellSize / 2,
        collidedObstacle.y * cellSize + cellSize / 2,
        cellSize / 3,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  function updateRoverPosition(x: number, y: number, orientation: number, blocked: boolean, collidedObstacle: { x: number; y: number } | null = null) {
    rover.x = x;
    rover.y = y;
    rover.orientation = orientation;
    drawGrid(blocked, collidedObstacle);
  }

  const client = new ClientHandler();

  client.onRoverResponse((response: { x: number; y: number; orientation: number }) => {
    const previousX = rover.x;
    const previousY = rover.y;
    const { x, y, orientation } = response;
    const roverPositionElement = document.getElementById("roverPosition");
    if (roverPositionElement) {
      roverPositionElement.innerText = `Rover position: (${x}, ${y})`;
    }
    let isBlocked = false;
    let collidedObstacle = null;

    if ((lastInstruction.toUpperCase() === "A" || lastInstruction.toUpperCase() === "R") &&
      previousX === x && previousY === y) {
      isBlocked = true;
      const intendedPos = computeIntendedPosition(lastInstruction.toUpperCase(), { x: previousX, y: previousY, orientation: rover.orientation });
      collidedObstacle = obstacles.find(obstacle => obstacle.x === intendedPos.x && obstacle.y === intendedPos.y);
      const responseMessageElement = document.getElementById("responseMessage");
      if (collidedObstacle) {
        if (responseMessageElement)
          responseMessageElement.innerText = `Collision avec l'obstacle à (${collidedObstacle.x}, ${collidedObstacle.y}) !`;
      } else {
        if (responseMessageElement)
          responseMessageElement.innerText = `Rover bloqué, mais aucun obstacle identifié à (${intendedPos.x}, ${intendedPos.y})`;
      }
    } else {
      const responseMessageElement = document.getElementById("responseMessage");
      if (responseMessageElement)
        responseMessageElement.innerText = "Réponse du rover reçue !";
    }
    updateRoverPosition(x, y, orientation, isBlocked, collidedObstacle);
  });

  client.onConnect(() => {
    const obstaclePopup = document.getElementById('obstaclePopup');
    if (obstaclePopup) {
      obstaclePopup.style.display = 'flex';
    }
  });

  const addObstacleButton = document.getElementById('addObstacleButton');
  if (addObstacleButton) {
    addObstacleButton.addEventListener('click', () => {
      const obstacleInput = document.getElementById('obstacleInput') as HTMLInputElement;
      if (obstacleInput) {
        const [x, y] = obstacleInput.value.split(',').map(Number);
        if (isNaN(x) || isNaN(y)) {
          alert("Coordonnées invalides !");
          return;
        }
        obstacles.push({ x, y });
        obstacleInput.value = '';
        const submitObstaclesButton = document.getElementById('submitObstaclesButton') as HTMLButtonElement;
        if (submitObstaclesButton) {
          submitObstaclesButton.disabled = obstacles.length === 0;
        }
      }
    });
  }

  const submitObstaclesButton = document.getElementById('submitObstaclesButton');
  if (submitObstaclesButton) {
    submitObstaclesButton.addEventListener('click', () => {
      client.sendObstacles(obstacles);
      const obstaclePopup = document.getElementById('obstaclePopup');
      if (obstaclePopup) {
        obstaclePopup.style.display = 'none';
      }
      drawGrid(false);
    });
  }

  const sendButton = document.getElementById("sendButton");
  if (sendButton) {
    sendButton.addEventListener("click", () => {
      const instructionInput = document.getElementById("instructionInput") as HTMLInputElement;
      if (instructionInput) {
        const instruction = instructionInput.value;
        if (!instruction.trim()) {
          alert("Veuillez entrer une instruction.");
          return;
        }
        lastInstruction = instruction.trim();
        client.sendInstruction(instruction);
      }
    });
  }

  // Affichage initial de la grille
  drawGrid(false);
}

// Lorsque le DOM est complètement chargé, chargez l'UI et initialisez la mission.
// Utilisation d'un setTimeout pour laisser le temps à la mise à jour du DOM.
window.addEventListener('DOMContentLoaded', async () => {
  await loadUI();
  setTimeout(() => {
    init();
  }, 0);
});
