// Variables to declare
var currentHP = 10;
var maxHP = 10;
var HPbar = document.getElementsByClassName('HPbar')[0]
var percentHP = currentHP / maxHP


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

// Enemies are [x, y, #actions, damage, hp, xp, name, maxHP, id letter]
// green slimes are 1action 1damage 3hp 4xp g
// blue slimes are 2action 3damage 5hp 10xp b
// red slimes are 3action 5damage 10hp 25xp r
// skeletons are 2action 4damage 12hp 15xp s

// Enemy Bank
var enemy1 = [3, 3, 1, 1, 3, 4, 'Green Slime', 3, 'g']
var enemy2 = [4, 4, 2, 3, 5, 10, 'Blue Slime', 5]
var enemy3 = [3, 5, 3, 5, 10, 25, 'Red Slime', 10]
var enemy4 = [5, 2, 2, 4, 12, 15, 'Skeleton', 12]
// Enemies in play
var currentEnemy1 = enemy1
var currentEnemy2 = enemy2
var currentEnemy3 = enemy3

var room1enemies = [enemy1, enemy2, enemy3, 'alive', 'alive', 'alive']
var room2enemies = [enemy2, enemy3, enemy4, 'alive', 'alive', 'alive']
var currentEnemies = room1enemies
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
var room = 1
var currentRoom = room1fullstringWithoutPlayer
var roomsExplored = [0,0,0,0,0,0,0,0,0]

var messages = ['message1', 'message2', 'message3']
// Elements to change

// Rooms
// 0 = empty space
// w = wall
// 1-9 = passage
// Green slime is g, blue slime is b, red slime is r
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
var room1fullstringWithoutPlayer = '00000000000wwww2www00w000000w00w000000w00w000000w00w000000w00w000000w00w000000w00wwwwwwww00000000000'
var room2fullstringWithoutPlayer = '00000000000wwwwwwww00ww0000ww00w000000w00w000000w00w000000w00w000000w00ww0000ww00wwww1www00000000000'

var splitstring = room1fullstringWithoutPlayer
var fullstringWithPlayer = room1fullstringWithoutPlayer
var fullstringWithEnemy1 = fullstringWithPlayer
var fullstringWithEnemy2 = fullstringWithPlayer
var fullstringWithEnemy3 = fullstringWithPlayer
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
    if (actualkey=='c') {
        cheat()
    }
}
// Player can't move into whatever is in collisionList
// Collision list contains Wall, Green Slime, Blue Slime, Red Slime
var collisionList = ['w','g','b','r']
function canYouGoHere() {
    var x = true
    for (i = 0; i < collisionList.length; i++) {
        if (fullstringWithEnemy3[(10*playery+playerx)] == collisionList[i]) {
            x = false
        }
    }
    return x
}
function moveLeft() {
    playerx -= 1
    currentMP -= 1
    if (canYouGoHere() == false) {
        playerx += 1
        currentMP += 1
    }
}
function moveRight() {
    currentMP -= 1
    playerx += 1
    if (canYouGoHere() == false) {
        playerx -= 1
        currentMP += 1
    } 
}
function moveUp() {
    currentMP -= 1
    playery -= 1
    if (canYouGoHere() == false) {
        playery += 1
        currentMP += 1
    } else if (room1fullstringWithoutPlayer[(10*playery+playerx)] == '2' ) {
        room = 2
        playerx = 5
        playery = 7
        initialiseRoom2()
    }
}
function moveDown() {
    currentMP -= 1
    playery += 1
    if (canYouGoHere() == false) {
        playery -= 1
        currentMP += 1
    } else if (room2fullstringWithoutPlayer[(10*playery+playerx)] == '1' ) {
        room = 1
        playerx = 5
        playery = 2
        initialiseRoom1()
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
            console.log(-1*weapon[2])
        } else { addNewMessage("You're not adjacent.")}
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
// The add player function also changes the room
function addPlayerToMap() {
    if (room == 1) {
        currentRoom = room1fullstringWithoutPlayer
    } else if (room == 2) {
        currentRoom = room2fullstringWithoutPlayer
    }
    playerIndex = 10*playery + playerx
    fullstringWithPlayer = currentRoom.substring(0,playerIndex)+'p'+currentRoom.substring(playerIndex+1)
}
function addEnemy1ToMap() {
    if (room1enemies[3] == 'alive') {
        enemyIndex = 10*currentEnemy1[1] + currentEnemy1[0]
        fullstringWithEnemy1 = fullstringWithPlayer.substring(0,enemyIndex)+'g'+fullstringWithPlayer.substring(enemyIndex+1)
    } else {
        enemyIndex = 0
        currentEnemy1.splice(0, 2, 0, 0)
        fullstringWithEnemy1 = fullstringWithPlayer
    }
}
function addEnemy2ToMap() {
    if (room1enemies[4] == 'alive') {
        enemyIndex = 10*currentEnemy2[1] + currentEnemy2[0]
        fullstringWithEnemy2 = fullstringWithEnemy1.substring(0,enemyIndex)+'b'+fullstringWithEnemy1.substring(enemyIndex+1)
    } else {
        enemyIndex = 0
        currentEnemy2.splice(0, 2, 0, 0)
        fullstringWithEnemy2 = fullstringWithEnemy1
    }
}
function addEnemy3ToMap() {
if (room1enemies[5] == 'alive') {
    enemyIndex = 10*currentEnemy3[1] + currentEnemy3[0]
    fullstringWithEnemy3 = fullstringWithEnemy2.substring(0,enemyIndex)+'r'+fullstringWithEnemy2.substring(enemyIndex+1)
} else {
    enemyIndex = 0
    currentEnemy3.splice(0, 2, 0, 0)
    fullstringWithEnemy3 = fullstringWithEnemy2
}
}
function updateMap() {
    splitstring = fullstringWithEnemy3
    passages = [1,2,3,4,5,6,7,8,9]
    var square = '00'
    var square1 = 0
    var square2 = 0
    for (i = 0; i < 100; i++) {
        if (i < 10) {
            square = '0' + i.toString()
        } else {
            square = i.toString()
        }
        
        if (splitstring[0] == 0) {
            
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/Floor.png'
            splitstring = splitstring.substring(1)

        } else if (splitstring[0] == 'w') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/MossWall.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == 'g') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/GreenSlime.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == 'p') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/player.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == 'b') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/BlueSlime.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == 'r') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/RedSlime.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '1') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/WoodenWall.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '2') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/WoodenWall.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '3') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/WoodenWall.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '4') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/WoodenWall.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '5') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/WoodenWall.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '6') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/WoodenWall.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '7') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/WoodenWall.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '8') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/WoodenWall.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '9') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/WoodenWall.png'
            splitstring = splitstring.substring(1)
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
    if (currentEnemy1[4] + amount >= currentEnemy1[7]) {
        console.log('Enemy Hp at max, cannot increase higher')
        currentEnemy1[4] = currentEnemy1[7]
    } else if (currentEnemy1[4] + amount <= 0) {
        currentEnemy1[4] = currentEnemy1[7]
        currentEnemy1[0] = 2
        currentEnemy1[1] = 2
        changeXP(currentEnemy1[5])
        alert('You killed a '+currentEnemy1[6]+' and gained '+currentEnemy1[5]+' experience points!')
        room1enemies[3] = 'dead' 
    } else {
        currentEnemy1[4] += amount
    }

}
function changeEnemy2HP(amount) {
    if (currentEnemy2[4] + amount >= currentEnemy2[7]) {
        console.log('Enemy Hp at max, cannot increase higher')
        currentEnemy2[4] = currentEnemy2[7]
    } else if (currentEnemy2[4] + amount <= 0) {
        currentEnemy2[4] = currentEnemy2[7]
        currentEnemy2[0] = 2
        currentEnemy2[1] = 2
        changeXP(currentEnemy2[5])
        alert('You killed a '+currentEnemy2[6]+' and gained '+currentEnemy2[5]+' experience points!')
        room1enemies[4] = 'dead' 
    } else {
        currentEnemy2[4] += amount
    }
}
function changeEnemy3HP(amount) {
    if (currentEnemy3[4] + amount >= currentEnemy3[7]) {
        console.log('Enemy Hp at max, cannot increase higher')
        currentEnemy3[4] = currentEnemy3[7]
    } else if (currentEnemy3[4] + amount <= 0) {
        currentEnemy3[4] = currentEnemy3[7]
        currentEnemy3[0] = 999
        currentEnemy3[1] = 999
        changeXP(currentEnemy3[5])
        alert('You killed a '+currentEnemy3[6]+' and gained '+currentEnemy3[5]+' experience points!')
        room1enemies[5] = 'dead'
    } else {
        currentEnemy3[4] += amount
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
    currentXP += amount
    while (currentXP >= XPToLevelUp) {
        levelUp()
    } 
    if (currentXP + amount <= 0) {
        currentXP = 0
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
    increaseDexterity()
    
    
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
    var differenceOfIndexes = Math.abs((10*playery + playerx)-(10*currentEnemy1[1] + currentEnemy1[0]))
    var enemyAdjacent = listOfAdjacents.includes(differenceOfIndexes)
    return enemyAdjacent
}
function arePlayerAndEnemy2Adjacent() {
    var listOfAdjacents = [1, 9, 10, 11]
    var differenceOfIndexes = Math.abs((10*playery + playerx)-(10*currentEnemy2[1] + currentEnemy2[0]))
    var enemyAdjacent = listOfAdjacents.includes(differenceOfIndexes)
    return enemyAdjacent
}
function arePlayerAndEnemy3Adjacent() {
    var listOfAdjacents = [1, 9, 10, 11]
    var differenceOfIndexes = Math.abs((10*playery + playerx)-(10*currentEnemy3[1] + currentEnemy3[0]))
    var enemyAdjacent = listOfAdjacents.includes(differenceOfIndexes)
    return enemyAdjacent
}

// Information panel
function displayHP() {
    if (room1enemies[3] == 'alive') {
        enemy1str = currentEnemy1[6] + ': '+ currentEnemy1[4] + ' / ' + currentEnemy1[7]
    } else {
        enemy1str = '-- No Enemy --'
    }
    if (room1enemies[4] == 'alive') {
        enemy2str = currentEnemy2[6] + ': '+ currentEnemy2[4] + ' / ' + currentEnemy2[7]
    } else {
        enemy2str = '-- No Enemy --'
    }
    if (room1enemies[5] == 'alive') {
        enemy3str = currentEnemy3[6] + ': '+ currentEnemy3[4] + ' / ' + currentEnemy3[7]
        
    } else {
        enemy3str = '-- No Enemy --'
    }
    document.getElementsByClassName('info1')[0].innerHTML = enemy1str
    document.getElementsByClassName('info2')[0].innerHTML = enemy2str
    document.getElementsByClassName('info3')[0].innerHTML = enemy3str
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
    for (var i = 0; i < currentEnemy1[2]; i++) {
        if (arePlayerAndEnemyAdjacent(currentEnemy1[0], currentEnemy1[1])) {
            addNewMessage(currentEnemy1[6] + ' dealt ' + currentEnemy1[3] + ' damage to you.')
            changeHP(-1*currentEnemy1[3])
        } else {
            // Move enemy
            var xDistancebetweenEnemyandPlayer = Math.abs(playerx-currentEnemy1[0])
            var yDistancebetweenEnemyandPlayer = Math.abs(playery-currentEnemy1[1])
            var random1or0 = Math.round(Math.random())
            if (xDistancebetweenEnemyandPlayer > yDistancebetweenEnemyandPlayer) {
                if (currentEnemy1[0] > playerx) {
                    currentEnemy1[0] -= 1
                } else {
                    currentEnemy1[0] += 1
                }
            } else if (yDistancebetweenEnemyandPlayer > xDistancebetweenEnemyandPlayer) {
                if (currentEnemy1[1] > playery) {
                    currentEnemy1[1] -= 1
                } else {
                    currentEnemy1[1] += 1
                }
            } else /* This case is where the two are equal */ {
                if (random1or0 == 0) {
                    if (currentEnemy1[0] > playerx) {
                        currentEnemy1[0] -= 1
                    } else {
                        currentEnemy1[0] += 1
                    }
                } else {
                    if (currentEnemy1[1] > playery) {
                        currentEnemy1[1] -= 1
                    } else {
                        currentEnemy1[1] += 1
                    }
                }
        
            }
        }
    }
}

function enemy2turn() {
    for (var i = 0; i < currentEnemy2[2]; i++) {
        if (arePlayerAndEnemyAdjacent(currentEnemy2[0], currentEnemy2[1])) {
            addNewMessage(currentEnemy2[6] + ' dealt ' + currentEnemy2[3] + ' damage to you.')
            changeHP(-1*currentEnemy2[3])
        } else {
            // Move enemy
            var xDistancebetweenEnemyandPlayer = Math.abs(playerx-currentEnemy2[0])
            var yDistancebetweenEnemyandPlayer = Math.abs(playery-currentEnemy2[1])
            var random1or0 = Math.round(Math.random())
            if (xDistancebetweenEnemyandPlayer > yDistancebetweenEnemyandPlayer) {
                if (currentEnemy2[0] > playerx) {
                    currentEnemy2[0] -= 1
                } else {
                    currentEnemy2[0] += 1
                }
            } else if (yDistancebetweenEnemyandPlayer > xDistancebetweenEnemyandPlayer) {
                if (currentEnemy2[1] > playery) {
                    currentEnemy2[1] -= 1
                } else {
                    currentEnemy2[1] += 1
                }
            } else /* This case is where the two are equal */ {
                if (random1or0 == 0) {
                    if (currentEnemy2[0] > playerx) {
                        currentEnemy2[0] -= 1
                    } else {
                        currentEnemy2[0] += 1
                    }
                } else {
                    if (currentEnemy2[1] > playery) {
                        currentEnemy2[1] -= 1
                    } else {
                        currentEnemy2[1] += 1
                    }
                }
        
            }
        }
    }
}

function enemy3turn() {
    for (var i = 0; i < currentEnemy3[2]; i++) {
        if (arePlayerAndEnemyAdjacent(currentEnemy3[0], currentEnemy3[1])) {
            addNewMessage(currentEnemy3[6] + ' dealt ' + currentEnemy3[3] + ' damage to you.')
            changeHP(-1*currentEnemy3[3])
        } else {
            // Move enemy
            var xDistancebetweenEnemyandPlayer = Math.abs(playerx-currentEnemy3[0])
            var yDistancebetweenEnemyandPlayer = Math.abs(playery-currentEnemy3[1])
            var random1or0 = Math.round(Math.random())
            if (xDistancebetweenEnemyandPlayer > yDistancebetweenEnemyandPlayer) {
                if (currentEnemy3[0] > playerx) {
                    currentEnemy3[0] -= 1
                } else {
                    currentEnemy3[0] += 1
                }
            } else if (yDistancebetweenEnemyandPlayer > xDistancebetweenEnemyandPlayer) {
                if (currentEnemy3[1] > playery) {
                    currentEnemy3[1] -= 1
                } else {
                    currentEnemy3[1] += 1
                }
            } else /* This case is where the two are equal */ {
                if (random1or0 == 0) {
                    if (currentEnemy3[0] > playerx) {
                        currentEnemy3[0] -= 1
                    } else {
                        currentEnemy3[0] += 1
                    }
                } else {
                    if (currentEnemy3[1] > playery) {
                        currentEnemy3[1] -= 1
                    } else {
                        currentEnemy3[1] += 1
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

// The following functions initialise new rooms and are called when you enter them
function initialiseRoom1() {
    currentEnemy1 = room1enemies[0]
    currentEnemy2 = room1enemies[1]
    currentEnemy3 = room1enemies[2]
}
function initialiseRoom2() {
    currentEnemy1 = room2enemies[0]
    currentEnemy2 = room2enemies[1]
    currentEnemy3 = room2enemies[2]
}
// The main game loop is called every 100ms (at a rate of 10FPS)
function mainGameLoop() {
    addPlayerToMap()
    addEnemy1ToMap()
    addEnemy2ToMap()
    addEnemy3ToMap()
    updateMap()
    drawBars()
    displayHP()
    displayMessages() 
}

// Cheat function
function cheat() {
    currentHP = 1000
    maxHP = 1000
    currentMP = 1000
    maxMP = 1000
    changeXP(1000)
}