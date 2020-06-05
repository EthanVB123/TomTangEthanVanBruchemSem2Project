// Variables to declare
var currentHP = 10;
var maxHP = 10;
var HPbar = document.getElementsByClassName('HPbar')[0]
var percentHP = currentHP / maxHP

var enemyHP = 3;
var enemyMaxHP = 3;

var currentMP = 5;
var maxMP = 5;
var MPbar = document.getElementsByClassName('MPbar')[0]
var percentMP = currentMP / maxMP

var currentXP = 0;
var XPToLevelUp = 10;
var currentLevel = 1;
var XPbar = document.getElementsByClassName('XPbar')[0]
var percentXP = currentXP / XPToLevelUp

var strength = 1;
var dexterity = 1;
var magic = 1;
var gold = 10;

var playerx = 5;
var playery = 5;

var enemyx = 3;
var enemyy = 3;

// Weapons are [name, MP, damage, type]
var weapon1 = ['Your fists', 1, strength, 'melee']
var weapon2 = ['Throw a rock', 2, dexterity, 'ranged']
var weapon3 = ['[Empty]', 0, 0, 'blank']
var weapon4 = ['[Empty]', 0, 0, 'blank']
// Items are [name, MP, effect]
var item1 = ['[Empty]', 0, 0]
var item2 = ['[Empty]', 0, 0]
var item3 = ['[Empty]', 0, 0]
var item4 = ['[Empty]', 0, 0]

var currentFloor = 1
var currentRoom = 0
var roomsExplored = [0,0,0,0,0]
// Elements to change

// Rooms
// 0 = empty space
// 1 = wall
// 2 = passage
// 3 = green slime
// 'p' = player
/* 
Room structure
0000000000
0111111110
0100000010
0100000010
0100000010
0100000010
0100000010
0100000010
0111111110
0000000000
*/
var room1fullstringWithoutPlayer = '0000000000011111111001000000100100000010010000001001000000100100000010010000001001111111100000000000'
var room1splitstring = room1fullstringWithoutPlayer
var room1fullstringWithPlayer = room1fullstringWithoutPlayer
var room1fullstringWithEnemies = room1fullstringWithPlayer
// Event listeners
    setInterval(mainGameLoop, 100)
    document.onkeypress=keypresschecker

// Functions
// key Pressed function - what to do if a key is pressed?
// Credit to this code is from
// http://www.javascriptkit.com/javatutors/javascriptkey2.shtml

function keypresschecker(e){
    var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
    var actualkey=String.fromCharCode(unicode)
    
    if (actualkey=="w") {
        if (currentMP > 0) {
        moveUp() }
     }
    if (actualkey=="a") {
        if (currentMP > 0) {
        moveLeft() }
    }
    if (actualkey=="s") {
        if (currentMP > 0) {
        moveDown() }
    }
    if (actualkey=="d") {
        if (currentMP > 0) {
        moveRight() }
    }
    if (actualkey=='z') {
        endTurn()
    }
    if (actualkey=='x') {
        if (currentMP > 0) {
            changeMP(-1)
            changeHP(1)
            changeXP(1)
        }
    }
    if (actualkey=='1') {
        if (currentMP >= weapon1[1]) {
            attack(weapon1)
        }
    }
    if (actualkey=='2') {
        if (currentMP >= weapon2[1]) {
            attack(weapon2)
        }
    }
    if (actualkey=='3') {
        if (currentMP >= weapon3[1]) {
            attack(weapon3)
        }
    }
    if (actualkey=='4') {
        if (currentMP >= weapon4[1]) {
            attack(weapon4)
        }
    }
}
// The following are movement functions: allows movement, but blocks if move onto: [1] wall
function moveLeft() {
    playerx -= 1
    currentMP -= 1
    if (room1fullstringWithoutPlayer[(10*playery+playerx)] == '1' || room1fullstringWithEnemies[(10*playery+playerx)] == '3') {
        playerx += 1
        currentMP += 1
    }
}
function moveRight() {
    currentMP -= 1
    playerx += 1
    if (room1fullstringWithoutPlayer[(10*playery+playerx)] == '1' || room1fullstringWithEnemies[(10*playery+playerx)] == '3') {
        playerx -= 1
        currentMP += 1
    }
}
function moveUp() {
    currentMP -= 1
    playery -= 1
    if (room1fullstringWithoutPlayer[(10*playery+playerx)] == '1' || room1fullstringWithEnemies[(10*playery+playerx)] == '3') {
        playery += 1
        currentMP += 1
    }
}
function moveDown() {
    currentMP -= 1
    playery += 1
    if (room1fullstringWithoutPlayer[(10*playery+playerx)] == '1' || room1fullstringWithEnemies[(10*playery+playerx)] == '3') {
        playery -= 1
        currentMP += 1
    }
}
// Recall: weapons are ['Name', MPCost, damage, type ('ranged' or 'melee' or 'blank')]
function attack(weapon) {
    if (weapon[3] == 'melee') {
        if (arePlayerAndEnemyAdjacent() == true) {
            changeMP(-1*weapon[1])
            changeEnemyHP(-1*weapon[2])
            console.log('You dealt '+weapon[2]+' damage to an enemy at the cost of '+weapon[1]+' mana points.')
        } else {
            console.log(" You're not adjacent.")
        }
    } 
    if (weapon[3] == 'ranged') {
        changeMP(-1*weapon[1])
        changeEnemyHP(-1*weapon[2])
        console.log('You dealt '+weapon[2]+' damage to an enemy at the cost of '+weapon[1]+' mana points.')
    } 
    if (weapon[3] == 'blank' ) {
        console.log('No weapon equipped.')
    }
        
}
function moveEnemy() {
    var xDistancebetweenEnemyandPlayer = Math.abs(playerx-enemyx)
    var yDistancebetweenEnemyandPlayer = Math.abs(playery-enemyy)
    var random1or0 = Math.round(Math.random())
    if (xDistancebetweenEnemyandPlayer > yDistancebetweenEnemyandPlayer) {
        if (enemyx > playerx) {
            enemyx -= 1
        } else {
            enemyx += 1
        }
    } else if (yDistancebetweenEnemyandPlayer > xDistancebetweenEnemyandPlayer) {
        if (enemyy > playery) {
            enemyy -= 1
        } else {
            enemyy += 1
        }
    } else /* This case is where the two are equal */ {
        if (random1or0 == 0) {
            if (enemyx > playerx) {
                enemyx -= 1
            } else {
                enemyx += 1
            }
        } else {
            if (enemyy > playery) {
                enemyy -= 1
            } else {
                enemyy += 1
            }
        }

    }
}
// updateMap: the room variable is a 100char string variable
function addPlayerToMap() {
    playerIndex = 10*playery + playerx
    room1fullstringWithPlayer = room1fullstringWithoutPlayer.substring(0,playerIndex)+'p'+room1fullstringWithoutPlayer.substring(playerIndex+1)
}
function addEnemyToMap() {
    enemyIndex = 10*enemyy + enemyx
    room1fullstringWithEnemies = room1fullstringWithPlayer.substring(0,enemyIndex)+'3'+room1fullstringWithPlayer.substring(enemyIndex+1)
}
function updateMap() {
    room1splitstring = room1fullstringWithEnemies
    var square = '00'
    var square1 = 0
    var square2 = 0
    for (i = 0; i < 100; i++) {
        if (i < 10) {
            square = '0' + i.toString()
        } else {
            square = i.toString()
        }
        
        if (room1splitstring[0] == 0) {
            
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/Floor.png'
            room1splitstring = room1splitstring.substring(1)

        } else if (room1splitstring[0] == 1) {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/MossWall.png'
            room1splitstring = room1splitstring.substring(1)
        } else if (room1splitstring[0] == 3) {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/GreenSlime.png'
            room1splitstring = room1splitstring.substring(1)
        } else if (room1splitstring[0] == 'p') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/player.png'
            room1splitstring = room1splitstring.substring(1)
        }

    
    
    }
}


// This section of the code that follows is about the HP, MP and XP bars.
function drawBars() {
    var barFill = '|__________|'
    percentHP = currentHP/maxHP
    percentMP = currentMP/maxMP
    percentXP = currentXP/XPToLevelUp
    
    if (percentHP > 0.95) {
        barFill = '|==========|'
    } else if (percentHP > 0.85) {
        barFill = '|=========_|'
    } else if (percentHP > 0.75) {
        barFill = '|========__|'
    } else if (percentHP > 0.65) {
        barFill = '|=======___|'
    } else if (percentHP > 0.55) {
        barFill = '|======____|'
    } else if (percentHP > 0.45) {
        barFill = '|=====_____|'
    } else if (percentHP > 0.35) {
        barFill = '|====______|'
    } else if (percentHP > 0.25) {
        barFill = '|===_______|'
    } else if (percentHP > 0.15) {
        barFill = '|==________|'
    } else if (percentHP > 0.05) {
        barFill = '|=_________|'
    } else {
        barFill = '|__________|'
    }
    document.getElementsByClassName('HPbar')[0].innerHTML = 'HP '+ barFill+' '+currentHP+'/'+maxHP

    if (percentMP > 0.95) {
        barFill = '|==========|'
    } else if (percentMP > 0.85) {
        barFill = '|=========_|'
    } else if (percentMP > 0.75) {
        barFill = '|========__|'
    } else if (percentMP > 0.65) {
        barFill = '|=======___|'
    } else if (percentMP > 0.55) {
        barFill = '|======____|'
    } else if (percentMP > 0.45) {
        barFill = '|=====_____|'
    } else if (percentMP > 0.35) {
        barFill = '|====______|'
    } else if (percentMP > 0.25) {
        barFill = '|===_______|'
    } else if (percentMP > 0.15) {
        barFill = '|==________|'
    } else if (percentMP > 0.05) {
        barFill = '|=_________|'
    } else {
        barFill = '|__________|'
    }
    document.getElementsByClassName('MPbar')[0].innerHTML = 'MP '+ barFill+' '+currentMP+'/'+maxMP

    if (percentXP > 0.95) {
        barFill = '|==========|'
    } else if (percentXP > 0.85) {
        barFill = '|=========_|'
    } else if (percentXP > 0.75) {
        barFill = '|========__|'
    } else if (percentXP > 0.65) {
        barFill = '|=======___|'
    } else if (percentXP > 0.55) {
        barFill = '|======____|'
    } else if (percentXP > 0.45) {
        barFill = '|=====_____|'
    } else if (percentXP > 0.35) {
        barFill = '|====______|'
    } else if (percentXP > 0.25) {
        barFill = '|===_______|'
    } else if (percentXP > 0.15) {
        barFill = '|==________|'
    } else if (percentXP > 0.05) {
        barFill = '|=_________|'
    } else {
        barFill = '|__________|'
    }
    document.getElementsByClassName('XPbar')[0].innerHTML = 'XP '+ barFill+' '+currentXP+'/'+XPToLevelUp + ' LV '+currentLevel

}
function changeHP(amount) {
    if (currentHP + amount >= maxHP) {
        console.log('Hp at max, cannot increase higher')
        currentHP = maxHP
    } else if (currentHP + amount <= 0) {
        currentHP = 0
        alert('ur dead n00b')
    } else {
        currentHP += amount
        
    }
}
function changeEnemyHP(amount) {
    if (enemyHP + amount >= enemyMaxHP) {
        console.log('Enemy Hp at max, cannot increase higher')
        enemyHP = enemyMaxHP
    } else if (enemyHP + amount <= 0) {
        enemyHP = 3
        enemyx = 2
        enemyy = 2
        changeXP(5)
        alert('You killed a green slime and gained 5 experience points!')
    } else {
        enemyHP += amount
    }
}

function changeMP(amount) {
    if (currentMP + amount >= maxMP) {
        currentMP = maxMP
    } else if (currentMP + amount <= 0) {
        currentMP = 0
    } else {
        currentMP += amount
    }
}
function changeXP(amount) {
    if (currentXP + amount >= XPToLevelUp) {
        currentXP += amount
        levelUp()
    } else if (currentXP + amount <= 0) {
        currentXP = 0
    } else {
        currentXP += amount
    }
}
function levelUp() {
    currentXP -= XPToLevelUp
    currentLevel += 1
    XPToLevelUp += 10
    currentHP += 5
    maxHP += 5
    currentMP += 2
    maxMP += 2
    strength += 1
}
// This code following is about the 6 buttons in the Actions panel.
function btn1pressed() {
    console.log('btn1 is pressed')
}
function btn2pressed() {
    console.log('btn2 is pressed')
}
function btn3pressed() {
    console.log('btn3 is pressed')
}
function btn4pressed() {
    console.log('btn4 is pressed')
}
function btn5pressed() {
    console.log('btn5 is pressed')
}
function btn6pressed() {
    console.log('btn6 is pressed')
}

function arePlayerAndEnemyAdjacent() {
    var listOfAdjacents = [1, 9, 10, 11]
    var differenceOfIndexes = Math.abs((10*playery + playerx)-(10*enemyy + enemyx))
    var enemyAdjacent = listOfAdjacents.includes(differenceOfIndexes)
    return enemyAdjacent
}
function endTurn() {
    if (arePlayerAndEnemyAdjacent() == true) {
        changeHP(-1)
    } else {
        moveEnemy()
    }
    currentMP = maxMP
}
// The main game loop is called every 100ms (at a rate of 10FPS)
function mainGameLoop() {
    addPlayerToMap()
    addEnemyToMap()
    updateMap()
    drawBars()
}
