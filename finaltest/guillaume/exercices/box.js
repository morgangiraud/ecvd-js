var app,
    start = document.querySelector('#start'),
    divTime = document.querySelector('#timer'),
    table = document.querySelector('#scoreTable'),
    screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

// constants
var step = 10,
    maxTime = 10000;

// init
app = init();

function init(){

    var score = 0,
        timer = null,
        width = 500,
        height = 500,
        hardeningCoef = 0.9,
        highscores = [],
        interval,
        username;

    function restart() {

        document.querySelector('#highscores').style.display = 'none';

        score = 0;
        timer = maxTime;
        width = 500;
        height = 500;
        hardeningCoef = 0.9;
        highscores = [];
        screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        start.style.display = 'none';
        table.innerHTML = '';

        document.querySelector('#score').innerHTML = score;

        startTimer();
        generateNewSquare();
    }

    function getRandomInBetween(min, max) {
        return  Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function setBoxAttributes(box) {
        box.className = 'box';
        box.style.width = width;
        box.style.background = 'red';
        box.style.height = height;
        box.style.position = 'absolute';
        box.style.left = getRandomInBetween(0, screenWidth - width) + 'px';
        box.style.top = getRandomInBetween(0, screenHeight - height) + 'px';
    }

    function generateNewSquare() {
        var box = document.createElement('div');

        setBoxAttributes(box);

        box.onclick = function() {
            nextTurn();
        };

        document.querySelector('#playground').appendChild(box);
    }

    function nextTurn() {
        incrementScore();
        timer = maxTime;
        makeTheGameHarder();
        generateNewSquare();
    }

    function removeBox() {
        document.querySelector('.box').remove();
    }

    function makeTheGameHarder() {
        if(getRandomInBetween(0, 1) === 1) width = width * hardeningCoef;
        if(getRandomInBetween(0, 1) === 1) height = height * hardeningCoef;
        removeBox();
    }

    function incrementScore() {
        score++;
        document.querySelector('#score').innerHTML = score;
    }

    function startTimer() {

        interval = setInterval(function() {
            if(timer <= 0) {
                endGame();
            } else {
                timer = timer - step;
                divTime.textContent = 'Time left: '+timer;
            }
        }, step);
    }

    function save() {

        for (var i = 0; i < 10; i++) {
            if(score > sessionStorage.getItem(i)) {
                orderScores(i);
                return;
            }
        }
    }

    function orderScores(i) {
        var tmp = sessionStorage.getItem(i);
        var tmp_name = sessionStorage.getItem('user'+i);

        sessionStorage.setItem(i, score);
        sessionStorage.setItem('user'+i, username);

        var tmp2;
        var tmp2_name;

        i = i + 1;

        while(i < 10) {
            tmp2 = sessionStorage.getItem(i);
            tmp2_name = sessionStorage.getItem('user'+i);

            sessionStorage.setItem(i, tmp);
            sessionStorage.setItem('user'+i, tmp_name);

            tmp = tmp2;
            tmp_name = tmp2_name;
            i++;
        }
    }

    function endGame() {
        removeBox();
        clearInterval(interval);

        username = prompt('what is your name ?');
        save();
        load();
    }

    function load() {

        document.querySelector('#highscores').style.display = 'block';

        for (var i = 0; i < 10; i++) {
            var div = document.createElement('div');

            if(sessionStorage.getItem(i) === null) {
                div.textContent = 0;
            } else {
                div.textContent = sessionStorage.getItem(i) + ' ' +sessionStorage.getItem('user'+i);
            }
            
            table.appendChild(div);
        }
    }

    start.addEventListener('click', function() {
        return restart();
    });

    document.querySelector('#restart').addEventListener('click', function() {
        return restart();
    });
}
console.log(JSON.stringify(sessionStorage));

