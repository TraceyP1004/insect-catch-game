const screens = document.querySelectorAll('.screen');
const chooseBunnyBtns = document.querySelectorAll('.choose-bunny-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selectedBunny = {};

startBtn.addEventListener('click', () => screens[0].classList.add('up'));

chooseBunnyBtns.forEach(btn => {
    btn.addEventListener ('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    selectedBunny = { src, alt };
    screens[1].classList.add('up');
    setTimeout(createBunny, 1000);
    startGame();
    });
});
    function startGame() {
        setInterval(increaseTime, 1000);
    }

    function increaseTime() {
        let m = Math.floor(seconds / 60);
        let s = seconds % 60;
        m = m < 10 ? `0${m}` : m;
        s = s < 10 ? `0${s}` : s;
        timeEl.innerHTML = `Time: ${m}:${s}`;
        seconds++;
    }

    function createBunny() {
        const bunny = document.createElement('div');
        bunny.classList.add('bunny');
        const { x, y } = getRandomLocation();
        bunny.style.top = `${y}px`;
        bunny.style.left = `${x}px`;
        bunny.innerHTML = `<img src="${selectedBunny.src}" alt="${selectedBunny.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

        bunny.addEventListener('click', bopBunny);

        gameContainer.appendChild(bunny);
    }

    function getRandomLocation() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const x = Math.random() * (width - 200) + 100;
        const y = Math.random() * (height - 200) + 100;
        return { x, y };
    }

    function bopBunny() {
        increaseScore();
        this.classList.add('caught');
        setTimeout(() => this.remove(), 200);
        addBunnies();
    }

    function addBunnies() {
        setTimeout(createBunny, 1000);
        setTimeout(createBunny, 1500);
    }

    function increaseScore() {
        score++;
        if (score > 19) {
            message.classList.add('visible');
        }
        scoreEl.innerHTML = `Score: ${score}`;
    }