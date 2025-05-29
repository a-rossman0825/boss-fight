const heros = [
  {
    name: "luke",
    health: 100,
    gold: 200,
    power: 5,
    level: 1
  },
  {
    name: "leia",
    health: 100,
    power: 5,
    level: 1
  },
  {
    name: "solo",
    health: 100,
    power: 5,
    level: 1
  },
  {
    name: "chewy",
    health: 100,
    power: 5,
    level: 1
  },
];


const villains = [
  {
    name: 'vader',
    health: 100,
    maxHealth: 100,
    power: 5,
    level: 1,
    reward: 20
  },
];

const vader = villains[0]
let forceHeal = 0;
drawHeros();

const deathMarch = new Audio("https://archive.org/embed/StarWarsTheImperialMarchDarthVadersTheme?autoplay=1");
deathMarch.addEventListener("canplaythrough", () => {
  deathMarch.play();
})

function playAudio() {
  deathMarch.play();
}

function calculatePower() {
  let combinedPower = 0;

  for (let i = 0; i < heros.length; i++) {
    const hero = heros[i]
    combinedPower += hero.power
  }
  return combinedPower
}

function attackBoss() {
  let cbVariable = 0
  cbVariable = calculatePower()
  vader.health -= cbVariable
  console.log("health: " + vader.health)
  checkBossDead()
  drawVillain();
}

function attackHeros() {
  heros.forEach((hero) => hero.health -= vader.power);
  console.log(heros);
  drawHeros();
}

function checkBossDead() {
  if (vader.health <= 0) {
    heros[0].gold += vader.reward * vader.level
    bossUpgrade();
    drawHeros();
  }
}

function bossUpgrade() {
  vader.level++
  vader.maxHealth += 50
  vader.health = vader.maxHealth
  console.log(vader)
  drawVillain();
}

function drawHeros() {
  for (let i = 0; i < heros.length; i++) {
    const hero = heros[i]
    const heroElem = document.getElementById(hero.name)
    // heroElem.innerText = `${hero.name}`
    let healthElem = heroElem.querySelector(".health")
    healthElem.innerText = `HP: ${hero.health}`
    let levelElem = heroElem.querySelector(".level")
    levelElem.innerText = `LVL: ${hero.level}`

    if(hero.name == "luke"){
      let goldElem = heroElem.querySelector(".gold")
      goldElem.innerText = `GOLD: ${hero.gold}`
    }
  }
}

function calculateDamagePercent() {
  let damagePercent = 0;
  villains.forEach((villain) => {damagePercent = (villain.health / villain.maxHealth) * 100});
  return damagePercent;
}

function drawVillain() {
  for (let i = 0; i < villains.length; i++) {
    const villain = villains[i];
    const villainElem = document.getElementById('vader');
    villainElem.querySelector(".villain-level").innerHTML = `LVL ${villain.level}`
    let healthElem = villainElem.querySelector('.progress');
    healthElem.innerHTML = 
    `<div class="progress-bar progress-bar-striped bg-danger progress-bar-animated healthbar" role="progressbar" aria-valuenow="${calculateDamagePercent().toString()}" aria-valuemin="0" aria-valuemax="${villain.maxHealth}" style="width: ${calculateDamagePercent()}%">VADER</div>`;
  }
}

function buyForceHeal() {
  if (heros[0].gold >= 50) {
    forceHeal++;
    heros[0].gold -= 50;
    document.getElementById('heal-amount').innerText = `x${forceHeal}`;
  } else {
    window.alert(`You Poor Fool!`);
  }
  drawHeros();
};

function useForceHeal(name) {
  heros.forEach((hero) => {
    if (hero.name == name && forceHeal > 0) {
      hero.health = 100;
      forceHeal--
      document.getElementById('heal-amount').innerText = `x${forceHeal}`;
    }
  })
  drawHeros();
};

  setInterval (attackHeros, 5000)

