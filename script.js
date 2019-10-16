window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let buttonInitGame = document.querySelector('#button-init-game'),
        containerIndicateName = document.querySelector('#outer-wrapper-indicate-name'),
        inputIndicateName = document.querySelector('#indicate-name__input'),
        containerChooseLevel = document.querySelector('#outer-wrapper-choose-level'),
        buttonLevelEasy = document.querySelector('#levelEasy'),
        buttonLevelNormal = document.querySelector('#levelNormal'),
        buttonLevelHard = document.querySelector('#levelHard'),
        containerEasyMenu = document.querySelector('#wrapper-easy-menu'),
        containerCommonMenu = document.querySelector('#wrapper-common-menu'),
        containerHardMenu = document.querySelector('#outer-wrapper-hard-menu'),
        buttonPlayEasy = document.querySelector('#playEasy'),
        containerEasyGamePlay = document.querySelector('#outer-wrapper-easy-play-field'),
        buttonEasyRepeat = document.querySelector('#easyRepeat'),
        buttonBackLevelsFromEasy = document.querySelector('#backLevelsFromEasy'),
        buttonPlayCommon = document.querySelector('#playCommon'),
        containerCommonGamePlay = document.querySelector('#outer-wrapper-common-play-field'),
        infoTimeCommon = document.querySelector('#time_common'),
        resutInfoTimeCommon = document.querySelector('#tittleTimeCommon'),
        buttonCommonRepeat = document.querySelector('#commonRepeat'),
        buttonBackLevelFromCommon = document.querySelector('#backLevelsFromCommon'),
        buttonPlayHard = document.querySelector('#playHard'),
        containerHardGamePlay = document.querySelector('#outer-wrapper-hard-play-field'),
        infoTimeHard = document.querySelector('#time_hard'),
        resutInfoTimeHard = document.querySelector('#tittleTimeHard'),
        buttonHardRepeat = document.querySelector('#hardRepeat'),
        buttonBackLevelFromHard = document.querySelector('#backLevelsFromHard'),
        buttonLeaderBoard = document.querySelector('#leaderboard'),
        containerLeaderboard = document.querySelector('#outer-wrapper-leaderboard'),
        leaderboardUlPlace = document.querySelector('#leaderboard__result__name'),
        leaderboardOlPlace = document.querySelector('#leaderboard__result__time'),
        buttonBackFromLeaderboard = document.querySelector('#backLevelsFromLeaderboard'),
        buttonBackFromLeaderboardToLevels = document.querySelector('#backFromLeaderBoardToMenu');


    function Player(name) {
        this.name = name;
        this.time = window.result;
    }

    buttonInitGame.addEventListener('click', initGame);

    inputIndicateName.addEventListener('blur', indicateName);
    inputIndicateName.addEventListener('keypress', (e) => {
        if (e.keyCode == 13) {
            indicateName();
        }
    });

    buttonLevelEasy.addEventListener('click', chooseLevel);
    buttonLevelNormal.addEventListener('click', chooseLevel);
    buttonLevelHard.addEventListener('click', chooseLevel);

    buttonPlayEasy.addEventListener('click', playEasy);
    buttonEasyRepeat.addEventListener('click', easyRepeat);
    buttonBackLevelsFromEasy.addEventListener('click', showLevelsFromEasy);

    
    buttonPlayCommon.addEventListener('click', playCommon);
    buttonCommonRepeat.addEventListener('click', commonRepeat);
    buttonBackLevelFromCommon.addEventListener('click', showLevelsFromCommon);

    buttonPlayHard.addEventListener('click', playHard);
    buttonHardRepeat.addEventListener('click', hardRepeat);
    buttonBackLevelFromHard.addEventListener('click', showLevelsFromHard);

    buttonLeaderBoard.addEventListener('click', showLeaderboard);
    buttonBackFromLeaderboard.addEventListener('click', showHardMenu);
    buttonBackFromLeaderboardToLevels.addEventListener('click', showLevelsFromHardMenu);

    function initGame() {
        this.closest('div').style.display = 'none';
        containerIndicateName.style.visibility = 'visible';
    }

    function indicateName() {
        containerIndicateName.style.visibility = 'hidden';
        containerChooseLevel.style.visibility = 'visible';
    }

    function chooseLevel() {
        window.self = this;
        containerChooseLevel.style.visibility = 'hidden';
        if (this.textContent == "Easy") {
            containerEasyMenu.style.visibility = 'visible';
        } else if (this.textContent == "Normal") {
            containerCommonMenu.style.visibility = 'visible';
        } else {
            containerHardMenu.style.visibility = 'visible';
        }
    }
// Easy playground

    function playEasy() {
        containerEasyMenu.style.visibility = 'hidden';
        containerEasyGamePlay.style.visibility = 'visible';
        let arr = range(1, 9);
        shuffle(arr);
        createTableEasy('easy-play-field__table', arr, 3, 3);
    }


    function createTableEasy(parentId, arr, trNum, tdNum) {
        let veryGood = ['V', 'E', 'R', 'Y', 'G', 'O', 'O', 'D', '!']
        let tdArr = [];
        let num = 1;
        let checkResult = [];
        window.table = document.createElement('table');
        document.getElementById(parentId).appendChild(table);
        for (let i = 0; i < trNum; i++) {
            let tr = document.createElement('tr');
            table.appendChild(tr);
            for (let j = 0; j < tdNum; j++) {
                let td = document.createElement('td');
                td.className = "easygame";
                tr.appendChild(td);
                td.addEventListener('click', function () {
                    if (this.innerHTML == num) {
                        this.style.background = 'rgb(94, 255, 0)';
                        checkResult.push(num);
                        num++;
                        for (let i = 0; i < arr.length; i++) {
                            if (checkResult.length == 9) {
                                tdArr[i].innerHTML = veryGood[i];
                                tdArr[i].style.fontSize = "35px";
                                tdArr[i].style.color = "rgba(255,0,151,1)";
                            }
                        }
                    };
                })
                tdArr.push(td);
            }
        }
        for (let i = 0; i < arr.length; i++) {
            tdArr[i].innerHTML = arr[i];
            if (checkResult.length == 9) {
                tdArr[i].innerHTML = veryGood[i]
            }
        }

    }

    function easyRepeat() {
       window.table.remove();
       let arr = range(1, 9);
        shuffle(arr);
        createTableEasy('easy-play-field__table', arr, 3, 3);
    }

    function showLevelsFromEasy() {
        window.table.remove();
        containerEasyGamePlay.style.visibility = 'hidden';
        containerChooseLevel.style.visibility = 'visible';
    }

    // The end of easy playground

    // Common playground
    function playCommon(){
        let i = 16;
        infoTimeCommon.textContent = i;
        resutInfoTimeCommon.textContent = 'Remains only: ' + infoTimeCommon.textContent + ' seconds';
     
        window.commonTimerId = setInterval(() => {
            infoTimeCommon.textContent =  i;
            i--;
            resutInfoTimeCommon.textContent = 'Remains only: ' + infoTimeCommon.textContent + ' seconds';
            if (i < 0) {
                resutInfoTimeCommon.innerHTML = "YOU LOSED";
                clearInterval(window.commonTimerId);
                window.tableCommon.style.pointerEvents = 'none';
            }
        }, 1000);

        containerCommonMenu.style.visibility = 'hidden';
        containerCommonGamePlay.style.visibility = 'visible';
        
        let arr = range(1, 16);
        shuffle(arr);
        createTableCommon('common-play-field__table', arr, 4, 4);
    }

    function createTableCommon(parentId, arr, trNum, tdNum) {
        let tdArr = [];
        let num = 1;
        let checkResult = [];
        window.tableCommon = document.createElement('table');
        document.getElementById(parentId).appendChild(tableCommon);
        for (let i = 0; i < trNum; i++) {
            let tr = document.createElement('tr');
            tableCommon.appendChild(tr);
            for (let j = 0; j < tdNum; j++) {
                let td = document.createElement('td');
                td.className = "s" + getRandomInt(1,5);
                tr.appendChild(td);
                td.addEventListener('click', function () {
                    if (this.innerHTML == num) {
                        this.style.background = 'rgb(94, 255, 0)';
                        checkResult.push(num);
                        num++;
                        for (let i = 0; i < arr.length; i++) {
                            if (checkResult.length == 16) {
                                tdArr[i].style.fontSize = "35px";
                                tdArr[i].style.color = "rgba(255,0,151,1)";
                                resutInfoTimeCommon.innerHTML = "YOU WIN";
                                clearInterval(window.commonTimerId);

                            }
                        }
                    };
                })
                tdArr.push(td);
            }
        }
        for (let i = 0; i < arr.length; i++) {
            tdArr[i].innerHTML = arr[i];
        }

    }

    function commonRepeat() {
        clearInterval(window.commonTimerId);
        window.tableCommon.remove();
        playCommon();
    }

    
    function showLevelsFromCommon() {
        clearInterval(window.commonTimerId);
        window.tableCommon.remove();
        containerCommonGamePlay.style.visibility = 'hidden';
        containerChooseLevel.style.visibility = 'visible';
    }


    // The end of common playground


    // The hard playground

    function playHard(){
        let i = 0;
        infoTimeHard.textContent = i;
        resutInfoTimeHard.textContent = 'Your time is:' + infoTimeHard.textContent;
     
        window.hardTimerId = setInterval(() => {
            infoTimeHard.textContent =  i;
            i++;
            window.result = i;
            resutInfoTimeHard.textContent = 'Your time is:' + infoTimeHard.textContent;
        }, 1000);
      

        containerHardMenu.style.visibility = 'hidden';
        containerHardGamePlay.style.visibility = 'visible';
        
        let arr = range(1, 25);
        shuffle(arr);
        createTableHard('hard-play-field__table', arr, 5, 5);
    }

    function createTableHard(parentId, arr, trNum, tdNum) {
        let tdArr = [];
        let num = 1;
        let checkResult = [];
        window.tableHard = document.createElement('table');
        document.getElementById(parentId).appendChild(tableHard);
        for (let i = 0; i < trNum; i++) {
            let tr = document.createElement('tr');
            tableHard.appendChild(tr);
            for (let j = 0; j < tdNum; j++) {
                let td = document.createElement('td');
                td.className = "s" + getRandomInt(5,13);
                tr.appendChild(td);
                td.addEventListener('click', function () {
                    if (this.innerHTML == num) {
                        this.classList.add('checkColor');
                        checkResult.push(num);
                        num++;
                        
                       
                    }
                     if (num > 1 && this.innerHTML != num && this.classList.contains('checkColor')) {
                        
                    }
                else {
                    num = 1;
                    checkResult.length = 0;
                    tdArr.forEach(function(td){
                    td.classList.remove('checkColor')
                    })
                    
                }
                for (let i = 0; i < arr.length; i++) {
                    if (checkResult.length == 25) {
                        tdArr[i].style.fontSize = "35px";
                        tdArr[i].style.color = "rgba(255,0,151,1)";
                        resutInfoTimeHard.innerHTML = "Your result is:  " + window.result + " seconds";
                        let player = new Player(inputIndicateName.value);
                        localStorage.setItem(inputIndicateName.value, player.time);
                        clearInterval(window.hardTimerId);
                    }
                }
                })
                tdArr.push(td);
                
            
            }
        }
        for (let i = 0; i < arr.length; i++) {
            tdArr[i].innerHTML = arr[i];
        }
     
          
    }

    function hardRepeat() {
        clearInterval(window.hardTimerId);
        window.tableHard.remove();
        playHard();
    }

    
    function showLevelsFromHard() {
        clearInterval(window.hardTimerId);
        window.tableHard.remove();
        containerHardGamePlay.style.visibility = 'hidden';
        containerHardMenu.style.visibility = 'visible';
    }

    function showLeaderboard() {
        containerHardMenu.style.visibility = 'hidden';
        containerLeaderboard.style.visibility = 'visible';
       

    }

    function showHardMenu() {
        containerLeaderboard.style.visibility = 'hidden';
        containerHardMenu.style.visibility = 'visible';
    }

    function showLevelsFromHardMenu() {
        containerHardMenu.style.visibility = 'hidden';
        containerChooseLevel.style.visibility = 'visible';
    }

// Help functions

    function range(from, to) {
        let arr = [];
        for (let i = from; i <= to; i++) {
            arr.push(i);
        }
        return arr;
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    let keys = Object.keys(localStorage);
    for(let key of keys) {
    let li = document.createElement('li');
    let liOl = document.createElement('li');
    liOl.innerHTML = `${localStorage.getItem(key)} seconds`;
    li.innerHTML = `${key}`;
    leaderboardUlPlace.appendChild(li);
    leaderboardOlPlace.appendChild(liOl);
}

 
});
