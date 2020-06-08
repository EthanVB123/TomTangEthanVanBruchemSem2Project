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

// Enemies are [x, y, #actions, damage, hp, xp, name, maxHP]
// green slimes are 1action 1damage 3hp 4xp
// blue slimes are 2action 3damage 5hp 10xp
// red slimes are 3action 5damage 10hp 25xp
var enemy1 = [3, 3, 1, 1, 3, 4, 'Green Slime', 3]
var enemy2 = [4, 4, 2, 3, 5, 10, 'Blue Slime', 5]
var enemy3 = [3, 5, 3, 5, 10, 25, 'Red Slime', 10]


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

var messages = ['message1', 'message2', 'message3']
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
var room1fullstringWithEnemy1 = room1fullstringWithPlayer
var room1fullstringWithEnemy2 = room1fullstringWithPlayer
var room1fullstringWithEnemy3 = room1fullstringWithPlayer
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
            console.log('Attacked!')
        } else { addNewMessage("You're out of MP! ")}
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
    if (room1fullstringWithoutPlayer[(10*playery+playerx)] == '1' || room1fullstringWithEnemy3[(10*playery+playerx)] == '3') {
        playerx += 1
        currentMP += 1
    }
}
function moveRight() {
    currentMP -= 1
    playerx += 1
    if (room1fullstringWithoutPlayer[(10*playery+playerx)] == '1' || room1fullstringWithEnemy3[(10*playery+playerx)] == '3') {
        playerx -= 1
        currentMP += 1
    }
}
function moveUp() {
    currentMP -= 1
    playery -= 1
    if (room1fullstringWithoutPlayer[(10*playery+playerx)] == '1' || room1fullstringWithEnemy3[(10*playery+playerx)] == '3') {
        playery += 1
        currentMP += 1
    }
}
function moveDown() {
    currentMP -= 1
    playery += 1
    if (room1fullstringWithoutPlayer[(10*playery+playerx)] == '1' || room1fullstringWithEnemy3[(10*playery+playerx)] == '3') {
        playery -= 1
        currentMP += 1
    }
}
// Recall: weapons are ['Name', MPCost, damage, type ('ranged' or 'melee' or 'blank')]
function attack(weapon) {
    if (weapon[3] == 'melee') {
        if (arePlayerAndEnemy1Adjacent() == true) {
            console.log('Enemy 1')
            changeMP(-1*weapon[1])
            changeEnemy1HP(-1*weapon[2])
            addNewMessage('You dealt '+weapon[2]+' damage to an enemy at the cost of '+weapon[1]+' mana points.')
        } else if (arePlayerAndEnemy2Adjacent() == true) {
            console.log('Enemy 2')
            changeMP(-1*weapon[1])
            changeEnemy2HP(-1*weapon[2])
            addNewMessage('You dealt '+weapon[2]+' damage to an enemy at the cost of '+weapon[1]+' mana points.')
        } else if (arePlayerAndEnemy3Adjacent() == true) {
            console.log('Enemy 3')
            changeMP(-1*weapon[1])
            changeEnemy3HP(-1*weapon[2])
            addNewMessage('You dealt '+weapon[2]+' damage to an enemy at the cost of '+weapon[1]+' mana points.')
        }
    } 
    if (weapon[3] == 'ranged') {
        // Currently only attacks enemy 1
        changeMP(-1*weapon[1])
        
        changeEnemy1HP(-1*weapon[2])
        addNewMessage('You dealt '+weapon[2]+' damage to an enemy at the cost of '+weapon[1]+' mana points.')
    } 
    if (weapon[3] == 'blank' ) {
        addNewMessage('No weapon equipped.')
    }
        
}

// updateMap: the room variable is a 100char string variable
function addPlayerToMap() {
    playerIndex = 10*playery + playerx
    room1fullstringWithPlayer = room1fullstringWithoutPlayer.substring(0,playerIndex)+'p'+room1fullstringWithoutPlayer.substring(playerIndex+1)
}
function addEnemy1ToMap() {
    enemyIndex = 10*enemy1[1] + enemy1[0]
    room1fullstringWithEnemy1 = room1fullstringWithPlayer.substring(0,enemyIndex)+'3'+room1fullstringWithPlayer.substring(enemyIndex+1)
}
function addEnemy2ToMap() {
    enemyIndex = 10*enemy2[1] + enemy2[0]
    room1fullstringWithEnemy2 = room1fullstringWithEnemy1.substring(0,enemyIndex)+'4'+room1fullstringWithEnemy1.substring(enemyIndex+1)
}
function addEnemy3ToMap() {
    enemyIndex = 10*enemy3[1] + enemy3[0]
    room1fullstringWithEnemy3 = room1fullstringWithEnemy2.substring(0,enemyIndex)+'5'+room1fullstringWithEnemy2.substring(enemyIndex+1)
}
function updateMap() {
    room1splitstring = room1fullstringWithEnemy3
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
        } else if (room1splitstring[0] == 4) {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/BlueSlime.png'
            room1splitstring = room1splitstring.substring(1)
        } else if (room1splitstring[0] == 5) {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/RedSlime.png'
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
function changeEnemy1HP(amount) {
    if (enemy1[4] + amount >= enemyMaxHP) {
        console.log('Enemy Hp at max, cannot increase higher')
        enemy1[4] = enemyMaxHP
    } else if (enemy1[4] + amount <= 0) {
        enemy1[4] = enemy1[7]
        enemy1[0] = 2
        enemy1[1] = 2
        changeXP(enemy1[5])
        alert('You killed a '+enemy1[6]+' and gained '+enemy1[5]+' experience points!')
    } else {
        enemy1[4] += amount
    }
}
function changeEnemy2HP(amount) {
    if (enemy2[4] + amount >= enemyMaxHP) {
        console.log('Enemy Hp at max, cannot increase higher')
        enemy2[4] = enemyMaxHP
    } else if (enemy2[4] + amount <= 0) {
        enemy2[4] = enemy2[7]
        enemy2[0] = 2
        enemy2[1] = 2
        changeXP(enemy2[5])
        alert('You killed a '+enemy2[6]+' and gained '+enemy2[5]+' experience points!')
    } else {
        enemy2[4] += amount
    }
}
function changeEnemy3HP(amount) {
    if (enemy3[4] + amount >= enemyMaxHP) {
        console.log('Enemy Hp at max, cannot increase higher')
        enemy3[4] = enemyMaxHP
    } else if (enemy3[4] + amount <= 0) {
        enemy3[4] = enemy3[7]
        enemy3[0] = 2
        enemy3[1] = 2
        changeXP(enemy3[5])
        alert('You killed a '+enemy3[6]+' and gained '+enemy3[5]+' experience points!')
    } else {
        enemy3[4] += amount
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
    increaseStrength()
    
    
}
function increaseStrength() {
    if (weapon1[3] == 'melee') {
        weapon1[2] += 1
    }
    if (weapon2[3] == 'melee') {
        weapon2[2] += 1
    }
    if (weapon3[3] == 'melee') {
        weapon3[2] += 1
    }
    if (weapon4[3] == 'melee') {
        weapon4[2] += 1
    }
}
function increaseDexterity() {
    if (weapon1[3] == 'ranged') {
        weapon1[2] += 1
    }
    if (weapon2[3] == 'ranged') {
        weapon2[2] += 1
    }
    if (weapon3[3] == 'ranged') {
        weapon3[2] += 1
    }
    if (weapon4[3] == 'ranged') {
        weapon4[2] += 1
    }
}
// This code following is about the 6 buttons in the Actions panel.


function arePlayerAndEnemyAdjacent(x,y) {
    var listOfAdjacents = [1, 9, 10, 11]
    var differenceOfIndexes = Math.abs((10*playery + playerx)-(10*y + x))
    var enemyAdjacent = listOfAdjacents.includes(differenceOfIndexes)
    return enemyAdjacent
}
function arePlayerAndEnemy1Adjacent() {
    var listOfAdjacents = [1, 9, 10, 11]
    var differenceOfIndexes = Math.abs((10*playery + playerx)-(10*enemy1[1] + enemy1[0]))
    var enemyAdjacent = listOfAdjacents.includes(differenceOfIndexes)
    return enemyAdjacent
}
function arePlayerAndEnemy2Adjacent() {
    var listOfAdjacents = [1, 9, 10, 11]
    var differenceOfIndexes = Math.abs((10*playery + playerx)-(10*enemy2[1] + enemy2[0]))
    var enemyAdjacent = listOfAdjacents.includes(differenceOfIndexes)
    return enemyAdjacent
}
function arePlayerAndEnemy3Adjacent() {
    var listOfAdjacents = [1, 9, 10, 11]
    var differenceOfIndexes = Math.abs((10*playery + playerx)-(10*enemy3[1] + enemy3[0]))
    var enemyAdjacent = listOfAdjacents.includes(differenceOfIndexes)
    return enemyAdjacent
}

// Information panel
function displayHP() {
    enemy1str = enemy1[6] + ': '+ enemy1[5] + ' / ' + enemy1[7]
    document.getElementsByClassName('info1')[0].innerHTML = enemy1str
}

function addNewMessage(str) {
    messages.unshift(str)
}
function displayMessages() {
    document.getElementsByClassName('info4')[0].innerHTML = messages[0]
    document.getElementsByClassName('info5')[0].innerHTML = messages[1]
    document.getElementsByClassName('info6')[0].innerHTML = messages[2]
}
// Enemies are [x, y, #actions, damage, hp, xp, name]
function enemy1turn() {
    for (var i = 0; i < enemy1[2]; i++) {
        if (arePlayerAndEnemyAdjacent(enemy1[0], enemy1[1])) {
            addNewMessage(enemy1[6] + ' dealt ' + enemy1[3] + ' damage to you.')
            changeHP(-1*enemy1[3])
        } else {
            // Move enemy
            var xDistancebetweenEnemyandPlayer = Math.abs(playerx-enemy1[0])
            var yDistancebetweenEnemyandPlayer = Math.abs(playery-enemy1[1])
            var random1or0 = Math.round(Math.random())
            if (xDistancebetweenEnemyandPlayer > yDistancebetweenEnemyandPlayer) {
                if (enemy1[0] > playerx) {
                    enemy1[0] -= 1
                } else {
                    enemy1[0] += 1
                }
            } else if (yDistancebetweenEnemyandPlayer > xDistancebetweenEnemyandPlayer) {
                if (enemy1[1] > playery) {
                    enemy1[1] -= 1
                } else {
                    enemy1[1] += 1
                }
            } else /* This case is where the two are equal */ {
                if (random1or0 == 0) {
                    if (enemy1[0] > playerx) {
                        enemy1[0] -= 1
                    } else {
                        enemy1[0] += 1
                    }
                } else {
                    if (enemy1[1] > playery) {
                        enemy1[1] -= 1
                    } else {
                        enemy1[1] += 1
                    }
                }
        
            }
        }
    }
}

function enemy2turn() {
    for (var i = 0; i < enemy2[2]; i++) {
        if (arePlayerAndEnemyAdjacent(enemy2[0], enemy2[1])) {
            addNewMessage(enemy2[6] + ' dealt ' + enemy2[3] + ' damage to you.')
            changeHP(-1*enemy2[3])
        } else {
            // Move enemy
            var xDistancebetweenEnemyandPlayer = Math.abs(playerx-enemy2[0])
            var yDistancebetweenEnemyandPlayer = Math.abs(playery-enemy2[1])
            var random1or0 = Math.round(Math.random())
            if (xDistancebetweenEnemyandPlayer > yDistancebetweenEnemyandPlayer) {
                if (enemy2[0] > playerx) {
                    enemy2[0] -= 1
                } else {
                    enemy2[0] += 1
                }
            } else if (yDistancebetweenEnemyandPlayer > xDistancebetweenEnemyandPlayer) {
                if (enemy2[1] > playery) {
                    enemy2[1] -= 1
                } else {
                    enemy2[1] += 1
                }
            } else /* This case is where the two are equal */ {
                if (random1or0 == 0) {
                    if (enemy2[0] > playerx) {
                        enemy2[0] -= 1
                    } else {
                        enemy2[0] += 1
                    }
                } else {
                    if (enemy2[1] > playery) {
                        enemy2[1] -= 1
                    } else {
                        enemy2[1] += 1
                    }
                }
        
            }
        }
    }
}

function enemy3turn() {
    for (var i = 0; i < enemy3[2]; i++) {
        if (arePlayerAndEnemyAdjacent(enemy3[0], enemy3[1])) {
            addNewMessage(enemy3[6] + ' dealt ' + enemy3[3] + ' damage to you.')
            changeHP(-1*enemy3[3])
        } else {
            // Move enemy
            var xDistancebetweenEnemyandPlayer = Math.abs(playerx-enemy3[0])
            var yDistancebetweenEnemyandPlayer = Math.abs(playery-enemy3[1])
            var random1or0 = Math.round(Math.random())
            if (xDistancebetweenEnemyandPlayer > yDistancebetweenEnemyandPlayer) {
                if (enemy3[0] > playerx) {
                    enemy3[0] -= 1
                } else {
                    enemy3[0] += 1
                }
            } else if (yDistancebetweenEnemyandPlayer > xDistancebetweenEnemyandPlayer) {
                if (enemy3[1] > playery) {
                    enemy3[1] -= 1
                } else {
                    enemy3[1] += 1
                }
            } else /* This case is where the two are equal */ {
                if (random1or0 == 0) {
                    if (enemy3[0] > playerx) {
                        enemy3[0] -= 1
                    } else {
                        enemy3[0] += 1
                    }
                } else {
                    if (enemy3[1] > playery) {
                        enemy3[1] -= 1
                    } else {
                        enemy3[1] += 1
                    }
                }
        
            }
        }
    }
}

function endTurn() {
    enemy1turn()
    enemy2turn()
    enemy3turn()
    currentMP = maxMP
}
// The main game loop is called every 100ms (at a rate of 10FPS)
function mainGameLoop() {
    addPlayerToMap()
    addEnemy1ToMap()
    addEnemy2ToMap()
    addEnemy3ToMap()
    updateMap()
    drawBars()
    displayMessages()
}
