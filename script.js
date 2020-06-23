// Variables to declare
var currentHP = 10;
var maxHP = 10;
var HPbar = document.getElementsByClassName('HPbar')[0]
var percentHP = currentHP / maxHP

var hpPotionAmount = 1
var mpPotionAmount = 1

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
var goldReward = 20;
var buffs = 1;
var keys = 0;

var playerx = 6;
var playery = 6;

// Enemies are [x, y, #actions, damage, hp, xp, name, maxHP, charString]
// green slimes are 1action 1damage 3hp 4xp
// blue slimes are 2action 3damage 5hp 10xp
// red slimes are 3action 5damage 10hp 25xp
// skeletons are 2action 4damage 12hp 15xp

// Enemy Bank
var enemy1 = [3, 3, 1, 1, 3, 4, 'Green Slime', 3, 'g']
var enemy2 = [4, 5, 2, 3, 5, 10, 'Blue Slime', 5, 'b']
var enemy3 = [3, 5, 3, 5, 10, 25, 'Red Slime', 10,'r']
var enemy4 = [5, 2, 2, 4, 12, 15, 'Skeleton', 12,'s']
var chest = [7, 6, 0, 0, 1, 's', 'Chest', 1, 'c']
var shop = [2, 2, 0, 0, 1, 's', 'Shop', 1, '$']
var lock = [8, 4, 0, 0, 1, 's', 'Lock', 1, 'L']
var boss1 = [6, 6, 4, 4, 100, 100, 'BOSS King Slime', 100, 'k']
var placeholder = [0,0,0,0,0,0,'Placeholder',0,'z']
// Enemies in play
var currentEnemy1 = enemy1
var currentEnemy2 = enemy2
var currentEnemy3 = enemy3
// enemies are [enemy, enemy, enemy, alive, alive, alive, enemy1.x, enemy1y, enemy2x, enemy2y, enemy3x, enemy3y]
// A bug is thrown if two of the same enemies are in the room!
var room1enemies = [enemy1, lock, shop, 'alive', 'alive', 'alive',3,3, 8,4, 2,2]
var room2enemies = [enemy1, enemy2, placeholder, 'alive', 'alive', 'alive', 3,3, 4,5, 9,9]
var room3enemies = [enemy2, enemy3, placeholder, 'alive', 'alive', 'alive',4,5, 3,5, 0,0]
var room4enemies = [chest, placeholder, placeholder, 'alive', 'alive', 'alive', 7,6, 9,9, 0,0]
var room5enemies = [enemy1, enemy2, placeholder, 'alive', 'alive', 'alive', 3,3, 4,5, 9,9]
var room6enemies = [enemy2, enemy3, placeholder, 'alive', 'alive', 'alive',4,5, 3,5, 0,0]
var room7enemies = [chest, placeholder, placeholder, 'alive', 'alive', 'alive', 7,6, 9,9, 0,0]
var room8enemies = [enemy1, enemy2, enemy3, 'alive', 'alive', 'alive',3,5, 6,4, 4,2]
var room9enemies = [boss1, placeholder, placeholder, 'alive', 'dead', 'dead',3,5, 0,0, 9,9]


var currentEnemies = room1enemies
// Weapons are [name, MP, damage, type]
var weapon1 = ['Small knife', 1, strength, 'melee']
var weapon2 = ['Bow', 2, dexterity, 'ranged']
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
var roomsExplored = [1,0,0,0,0,0,0,0,0]
var lock18unlocked = false
var lock89unlocked = false
var messages = ['No message', 'No message', 'No message', 'No message', 'No message', '11%', '22%', '33%', '44%', '55%', '66%', '77%', '88%', '100%']
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
var room1fullstringWithoutPlayer = '0000w0w0000wwww2www00w$00000w00w000000ww0w000000800w000000ww0w000000w00w000000w00wwww5www00000w0w000'
var room2fullstringWithoutPlayer = '00000000000wwwwwwww00ww0000www0w000000300w000000ww0w000000w00w000000w00ww0000ww00wwww1www00000w0w000'
var room3fullstringWithoutPlayer = '00000000000wwwwwwww00ww0000ww0ww000000ww0200000040ww000000ww0w000000w00ww0000ww00wwwwwwww00000000000'
var room4fullstringWithoutPlayer = '00000000000wwwwwwww00ww0000ww0ww000000w003000K00w0ww000000w00w00000cw00ww0000ww00wwwwwwww00000000000'
var room5fullstringWithoutPlayer = '0000w0w0000wwww1www00ww0000ww00w000000ww0w000000600w000000ww0w000000w00ww0000ww00wwwwwwww00000000000'
var room6fullstringWithoutPlayer = '00000000000wwwwwwww00ww0000ww0ww000000ww0500000070ww000000ww0w000000w00ww0000ww00wwwwwwww00000000000'
var room7fullstringWithoutPlayer = '00000000000wwwwwwww00ww0000ww0ww000000w006000K00w0ww000000w00w00000cw00ww0000ww00wwwwwwww00000000000'
var room8fullstringWithoutPlayer = '00000000000wwwwwwww00ww0000ww0ww000000ww0100000090ww000000ww0w000000w00ww0000ww00wwwwwwww00000000000'
var room9fullstringWithoutPlayer = '00000000000wwwwwwww00ww0000ww0ww000000w008000000w0ww000000w00w000000w00ww0000ww00wwwwwwww00000000000'

var splitstring = room1fullstringWithoutPlayer
var fullstringWithPlayer = room1fullstringWithoutPlayer
var fullstringWithEnemy1 = fullstringWithPlayer
var fullstringWithEnemy2 = fullstringWithPlayer
var fullstringWithEnemy3 = fullstringWithPlayer
// Event listeners
    setInterval(mainGameLoop, 100)
    document.onkeypress=keypresschecker
    initialiseRoom1()

// Functions
// key Pressed function - what to do if a key is pressed?
// Credit to this code is from
// http://www.javascriptkit.com/javatutors/javascriptkey2.shtml

//Seems that capital letters dont work when I pressed cap lock. Tried to fix with || operater but all buttons acts like Z after that --- Tom
function keypresschecker(e){
    var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
    var actualkey=String.fromCharCode(unicode)
    
    if (actualkey=='w') {
        if (currentMP > 0) {
        moveUp() }
     }
    if (actualkey=='a') {
        if (currentMP > 0) {
        moveLeft() }
    }
    if (actualkey=='s') {
        if (currentMP > 0) {
        moveDown() }
    }
    if (actualkey=='d') {
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
    if (actualkey=='5') {
        hpPotion()
        removehpPotion()
    }
    if (actualkey=='6') {
        mpPotion()
        removempPotion()
    }
    if (actualkey=='c') {
        cheat()
    }
    if (actualkey=='b') {
        grantBuff()
    }
}
// HP and MP potions' functions
function hpPotion() {
    currentHP = maxHP
}
function removehpPotion() {
    hpPotionAmount = 0
}

function mpPotion() {
    currentMP = maxMP
}
function removempPotion() {
    mpPotionAmount = 0
}

// Player can't move into whatever is in collisionList
// Collision list contains Wall, Green Slime, Blue Slime, Red Slime, and more.
var collisionList = ['w','g','b','r','s','k','$','c']
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
    } else if (currentRoom[(10*playery+playerx)] == 'K') {
        if (room = 4) {
            getRoom4Key()
        } else if (room = 7) {
            getRoom7Key()
        }

    }
        else if (currentRoom[(10*playery+playerx)] == '1' ) {
        if (lock18unlocked == true) {
            room = 1
            playerx = 5
            playery = 7
            initialiseRoom1()
        } else if (keys > 0) {
            keys -= 1
            alert('You consumed a key. This door is now unlocked.')
            room = 1
            playerx = 5
            playery = 7
            initialiseRoom1()
            lock18unlocked = true
        } else {
            playerx += 1
            currentMP += 1
            alert('The door is locked. You need a key to get in.')
        }
        
    } else if (currentRoom[(10*playery+playerx)] == '2' ) {
        room = 2
        playerx = 5
        playery = 7
        initialiseRoom2()
    } else if (currentRoom[(10*playery+playerx)] == '3' ) {
        room = 3
        playerx = 5
        playery = 7
        initialiseRoom3()
    } else if (currentRoom[(10*playery+playerx)] == '4' ) {
        room = 4
        playerx = 5
        playery = 7
        initialiseRoom4()
    } else if (currentRoom[(10*playery+playerx)] == '5' ) {
        
        if (lock89unlocked == true) {
            room = 5
            playerx = 5
            playery = 7
            initialiseRoom5()
        } else if (keys > 0) {
            keys -= 1
            alert('You consumed a key. This door is now unlocked.')
            room = 5
            playerx = 5
            playery = 7
            initialiseRoom5()
            lock89unlocked = true
        } else {
            playerx += 1
            currentMP += 1
            alert('The door is locked. You need a key to get in.')
        }
    } else if (currentRoom[(10*playery+playerx)] == '6' ) {
        room = 6
        playerx = 5
        playery = 7
        initialiseRoom6()
    } else if (currentRoom[(10*playery+playerx)] == '7' ) {
        room = 7
        playerx = 5
        playery = 7
        initialiseRoom7()
    } else if (currentRoom[(10*playery+playerx)] == '8' ) {
        room = 8
        playerx = 5
        playery = 7
        initialiseRoom8()
    } else if (currentRoom[(10*playery+playerx)] == '9' ) {
        room = 9
        playerx = 5
        playery = 7
        initialiseRoom9()
    } 
}
function moveRight() {
    currentMP -= 1
    playerx += 1
    if (canYouGoHere() == false) {
        playerx -= 1
        currentMP += 1
    } else if (currentRoom[(10*playery+playerx)] == 'K') {
        if (room = 4) {
            getRoom4Key()
        } else if (room = 7) {
            getRoom7Key()
        }

    } else if (currentRoom[(10*playery+playerx)] == '1' ) {
        room = 1
        playerx = 5
        playery = 7
        initialiseRoom1()
    } else if (currentRoom[(10*playery+playerx)] == '2' ) {
        room = 2
        playerx = 5
        playery = 7
        initialiseRoom2()
    } else if (currentRoom[(10*playery+playerx)] == '3' ) {
        room = 3
        playerx = 5
        playery = 7
        initialiseRoom3()
    } else if (currentRoom[(10*playery+playerx)] == '4' ) {
        room = 4
        playerx = 5
        playery = 7
        initialiseRoom4()
    } else if (currentRoom[(10*playery+playerx)] == '5' ) {
        room = 5
        playerx = 5
        playery = 7
        initialiseRoom5()
    } else if (currentRoom[(10*playery+playerx)] == '6' ) {
        room = 6
        playerx = 5
        playery = 7
        initialiseRoom6()
    } else if (currentRoom[(10*playery+playerx)] == '7' ) {
        room = 7
        playerx = 5
        playery = 7
        initialiseRoom7()
    } else if (currentRoom[(10*playery+playerx)] == '8' ) {
        
        if (lock18unlocked == true) {
            room = 8
            playerx = 5
            playery = 7
            initialiseRoom8()
        } else if (keys > 0) {
            keys -= 1
            alert('You consumed a key. This door is now unlocked.')
            room = 8
            playerx = 5
            playery = 7
            initialiseRoom8()
            lock18unlocked = true
        } else {
            playerx -= 1
            currentMP += 1
            alert('The door is locked. You need a key to get in.')
        }
    } else if (currentRoom[(10*playery+playerx)] == '9' ) {
        
        if (lock89unlocked == true) {
            room = 9
            playerx = 5
            playery = 7
            initialiseRoom9()
        } else if (keys > 0) {
            keys -= 1
            alert('You consumed a key. This door is now unlocked.')
            room = 9
            playerx = 5
            playery = 7
            initialiseRoom9()
            lock89unlocked = true
        } else {
            playerx -= 1
            currentMP += 1
            alert('The door is locked. You need a key to get in.')
        }
    } 
}
function moveUp() {
    currentMP -= 1
    playery -= 1
    if (canYouGoHere() == false) {
        playery += 1
        currentMP += 1
    } else if (currentRoom[(10*playery+playerx)] == 'K') {
        if (room = 4) {
            getRoom4Key()
        } else if (room = 7) {
            getRoom7Key()
        }

    } else if (currentRoom[(10*playery+playerx)] == '1' ) {
        room = 1
        playerx = 5
        playery = 7
        initialiseRoom1()
    } else if (currentRoom[(10*playery+playerx)] == '2' ) {
        room = 2
        playerx = 5
        playery = 7
        initialiseRoom2()
    } else if (currentRoom[(10*playery+playerx)] == '3' ) {
        room = 3
        playerx = 5
        playery = 7
        initialiseRoom3()
    } else if (currentRoom[(10*playery+playerx)] == '4' ) {
        room = 4
        playerx = 5
        playery = 7
        initialiseRoom4()
    } else if (currentRoom[(10*playery+playerx)] == '5' ) {
        room = 5
        playerx = 5
        playery = 7
        initialiseRoom5()
    } else if (currentRoom[(10*playery+playerx)] == '6' ) {
        room = 6
        playerx = 5
        playery = 7
        initialiseRoom6()
    } else if (currentRoom[(10*playery+playerx)] == '7' ) {
        room = 7
        playerx = 5
        playery = 7
        initialiseRoom7()
    }else if (currentRoom[(10*playery+playerx)] == '8' ) {
        room = 8
        playerx = 5
        playery = 7
        initialiseRoom8()
    } else if (currentRoom[(10*playery+playerx)] == '9' ) {
        room = 9
        playerx = 5
        playery = 7
        initialiseRoom9()
    } 
}
function moveDown() {
    currentMP -= 1
    playery += 1
    if (canYouGoHere() == false) {
        playery -= 1
        currentMP += 1
    } else if (currentRoom[(10*playery+playerx)] == 'K') {
        if (room = 4) {
            getRoom4Key()
        } else if (room = 7) {
            getRoom7Key()
        }

    } else if (currentRoom[(10*playery+playerx)] == '1' ) {
        room = 1
        playerx = 5
        playery = 7
        initialiseRoom1()
    } else if (currentRoom[(10*playery+playerx)] == '2' ) {
        room = 2
        playerx = 5
        playery = 7
        initialiseRoom2()
    } else if (currentRoom[(10*playery+playerx)] == '3' ) {
        room = 3
        playerx = 5
        playery = 7
        initialiseRoom3()
    } else if (currentRoom[(10*playery+playerx)] == '4' ) {
        room = 4
        playerx = 5
        playery = 7
        initialiseRoom4()
    } else if (currentRoom[(10*playery+playerx)] == '5' ) {
        room = 5
        playerx = 5
        playery = 7
        initialiseRoom5()
    } else if (currentRoom[(10*playery+playerx)] == '6' ) {
        room = 6
        playerx = 5
        playery = 7
        initialiseRoom6()
    } else if (currentRoom[(10*playery+playerx)] == '7' ) {
        room = 7
        playerx = 5
        playery = 7
        initialiseRoom7()
    }else if (currentRoom[(10*playery+playerx)] == '8' ) {
        room = 8
        playerx = 5
        playery = 7
        initialiseRoom8()
    } else if (currentRoom[(10*playery+playerx)] == '9' ) {
        room = 9
        playerx = 5
        playery = 7
        initialiseRoom9()
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
    } else if (room == 3) {
        currentRoom = room3fullstringWithoutPlayer
    } else if (room == 4) { 
        currentRoom = room4fullstringWithoutPlayer
    } else if (room == 5) {
        currentRoom = room5fullstringWithoutPlayer
    } else if (room == 6) {
        currentRoom = room6fullstringWithoutPlayer
    } else if (room == 7) {
        currentRoom = room7fullstringWithoutPlayer
    } else if (room == 8) {
        currentRoom = room8fullstringWithoutPlayer
    } else if (room == 9) {
        currentRoom = room9fullstringWithoutPlayer
    }
    playerIndex = 10*playery + playerx
    fullstringWithPlayer = currentRoom.substring(0,playerIndex)+'p'+currentRoom.substring(playerIndex+1)
}
function addEnemy1ToMap() {
    if (currentEnemies[3] == 'alive') {
        enemyIndex = 10*currentEnemy1[1] + currentEnemy1[0]
        fullstringWithEnemy1 = fullstringWithPlayer.substring(0,enemyIndex)+currentEnemy1[8]+fullstringWithPlayer.substring(enemyIndex+1)
    } else {
        enemy1[0] = 100
        enemy1[1] = 100
        fullstringWithEnemy1 = fullstringWithPlayer
    }
}
function addEnemy2ToMap() {
    if (currentEnemies[4] == 'alive') {
        enemyIndex = 10*currentEnemy2[1] + currentEnemy2[0]
        fullstringWithEnemy2 = fullstringWithEnemy1.substring(0,enemyIndex)+currentEnemy2[8]+fullstringWithEnemy1.substring(enemyIndex+1)
    } else {
        enemy2[0] = 100
        enemy2[1] = 100
        fullstringWithEnemy2 = fullstringWithEnemy1
    }
}
function addEnemy3ToMap() {
if (currentEnemies[5] == 'alive') {
    enemyIndex = 10*currentEnemy3[1] + currentEnemy3[0]
    fullstringWithEnemy3 = fullstringWithEnemy2.substring(0,enemyIndex)+currentEnemy3[8]+fullstringWithEnemy2.substring(enemyIndex+1)
} else {
    enemy3[0] = 100
    enemy3[1] = 100
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
        } else if (splitstring[0] == 's') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/Bony.png'
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
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/Lock.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '9') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/Lock.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == 'k') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/KingSlime.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == 'z') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/Floor.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == 'c') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Others/Chest.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == '$') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Others/Shop.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == 'L') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/Lock.png'
            splitstring = splitstring.substring(1)
        } else if (splitstring[0] == 'K') {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Icons/Items/Key.png'
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
        alert('Ur Dead N00B!!!')
        location.reload()
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
        currentEnemy1[0] = 999
        currentEnemy1[1] = 999
        if (Number.isInteger(currentEnemy1[5])) {
            changeXP(currentEnemy1[5])
            alert('You killed a '+currentEnemy1[6]+' and gained '+currentEnemy1[5]+' experience points!')
        } else if (currentEnemy1[5] = 's') {
            alert('You killed a '+currentEnemy1[6]+' and gained '+lootBox())
        } else {
            keys += 1
            alert(`You found a key! You now have ${keys} keys!`)
        }
            currentEnemies[3] = 'dead' 
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
        if (Number.isInteger(currentEnemy2[5])) {
            changeXP(currentEnemy2[5])
            alert('You killed a '+currentEnemy2[6]+' and gained '+currentEnemy2[5]+' experience points!')
        } else if (currentEnemy2[5] = 's') {
            alert('You killed a '+currentEnemy2[6]+' and gained '+lootBox())
        } else {
            keys += 1
            alert(`You found a key! You now have ${keys} keys!`)
        }
        currentEnemies[4] = 'dead' 
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
        if (Number.isInteger(currentEnemy3[5])) {
            changeXP(currentEnemy3[5])
            alert('You killed a '+currentEnemy3[6]+' and gained '+currentEnemy3[5]+' experience points!')
        } else if (currentEnemy3[5] = 's') {
            alert('You killed a '+currentEnemy3[6]+' and gained '+lootBox())
        } else {
            keys += 1
            alert(`You found a key! You now have ${keys} keys!`)
        }
        currentEnemies[5] = 'dead'
    } else {
        currentEnemy3[4] += amount
    }
} // Alerts are not working =(
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
    buffs += 2
    
    
}
function increaseStrength() {
    strength += 1
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
    dexterity += 1
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
function grantBuff() {
    var chosenBuff = prompt(`Leveling Up! Please select a buff!  You have ${buffs+1} buffs remaining.  Type melee for a melee damage buff, ranged for a ranged damage buff, magic for a magic damage buff, hp for a hitpoints buff, mp for a mana points buff, or gold for a one-time gold bonus.`)
    switch (chosenBuff) {
        case 'melee':
            increaseStrength()
            alert('Your Strength increased')
            break
        case 'ranged':
            increaseDexterity()
            alert('Your Dexterity increased')
            break
        case 'hp':
            maxHP += 5
            changeHP(5)
            alert('Your HP increased')
            break
        case 'mp':
            maxMP += 2
            changeMP(2)
            alert('Your MP increased')
            break
        case 'gold':
            gold += goldReward
            alert('Your gold increased')
            break
        case 'magic':
            alert('Your magic increased')
            break
        default:
            alert('Failed buff, please retry')
            buffs += 1
    }
}
function updateStats() {
    document.getElementsByClassName('strength')[0].innerHTML = 'STRENGTH '+strength
    document.getElementsByClassName('dexterity')[0].innerHTML = 'DEXTERITY '+dexterity
    document.getElementsByClassName('magic')[0].innerHTML = 'MAGIC '+magic
    document.getElementsByClassName('gold')[0].innerHTML = 'GOLD $'+gold
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
    if (currentEnemies[3] == 'alive') {
        enemy1str = currentEnemy1[6] + ': '+ currentEnemy1[4] + ' / ' + currentEnemy1[7]
    } else {
        enemy1str = 'Placeholder: 0 / 0'
    }
    if (currentEnemies[4] == 'alive') {
        enemy2str = currentEnemy2[6] + ': '+ currentEnemy2[4] + ' / ' + currentEnemy2[7]
    } else {
        enemy2str = 'Placeholder: 0 / 0'
    }
    if (currentEnemies[5] == 'alive') {
        enemy3str = currentEnemy3[6] + ': '+ currentEnemy3[4] + ' / ' + currentEnemy3[7]
        
    } else {
        enemy3str = 'Placeholder: 0 / 0'
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
    document.getElementsByClassName('info7')[0].innerHTML = messages[3]
    document.getElementsByClassName('info8')[0].innerHTML = messages[4]
    document.getElementsByClassName('info9')[0].innerHTML = messages[5]
}
//Changes the explored percentage.
function changeFloorInfo1() {
    document.getElementsByClassName('info10')[0].innerHTML = messages[6]
}
function changeFloorInfo2() {
    document.getElementsByClassName('info10')[0].innerHTML = messages[7]
}
function changeFloorInfo3() {
    document.getElementsByClassName('info10')[0].innerHTML = messages[8]
}
function changeFloorInfo4() {
    document.getElementsByClassName('info10')[0].innerHTML = messages[9]
}
function changeFloorInfo5() {
    document.getElementsByClassName('info10')[0].innerHTML = messages[10]
}
function changeFloorInfo6() {
    document.getElementsByClassName('info10')[0].innerHTML = messages[11]
}
function changeFloorInfo7() {
    document.getElementsByClassName('info10')[0].innerHTML = messages[12]
}
function changeFloorInfo8() {
    document.getElementsByClassName('info10')[0].innerHTML = messages[13]
}
function changeFloorInfo9() {
    document.getElementsByClassName('info10')[0].innerHTML = messages[14]
}
// Weapons are [name, MP, damage, type]
function updateWeaponsAndItems() {
    document.getElementsByClassName('w1')[0].innerHTML = weapon1[0] + ' ' + weapon1[1] + 'MP ' + weapon1[3]
    document.getElementsByClassName('w2')[0].innerHTML = weapon2[0] + ' '+ weapon2[1] + 'MP ' + weapon2[3]
    document.getElementsByClassName('w3')[0].innerHTML = weapon3[0] +' '+ weapon3[1] + 'MP ' + weapon3[3]
    document.getElementsByClassName('w4')[0].innerHTML = 'Key x'+keys
}
// Enemies are [x, y, #actions, damage, hp, xp, name]
function enemy1turn() {
    for (var i = 0; i < currentEnemy1[2]; i++) {
        console.log(currentEnemy1[2])

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
        console.log(currentEnemy2[2])
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
        console.log(currentEnemy3[2])
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
    room = 1
    currentEnemy1 = room1enemies[0]
    changeEnemy1HP(1)
    currentEnemy2 = room1enemies[1]
    currentEnemy3 = room1enemies[2]
    currentEnemy1[0] = room1enemies[6]
    currentEnemy1[1] = room1enemies[7]
    currentEnemy2[0] = room1enemies[8]
    currentEnemy2[1] = room1enemies[9]
    currentEnemy3[0] = room1enemies[10]
    currentEnemy3[1] = room1enemies[11]
    currentEnemies = room1enemies
    playerx = 6
    playery = 6
    addNewMessage('Welcome to Room 1!')
    roomsExplored[0] = 1
}
function initialiseRoom2() {
    room = 2
    currentEnemy1 = room2enemies[0]
    currentEnemy2 = room2enemies[1]
    currentEnemy3 = room2enemies[2]
    currentEnemy1[0] = room2enemies[6]
    currentEnemy1[1] = room2enemies[7]
    currentEnemy2[0] = room2enemies[8]
    currentEnemy2[1] = room2enemies[9]
    currentEnemy3[0] = room2enemies[10]
    currentEnemy3[1] = room2enemies[11]
    currentEnemies = room2enemies
    addNewMessage('Welcome to Room 2!')
    roomsExplored[1] = 1
}
function initialiseRoom3() {
    room = 3
    currentEnemy1 = room3enemies[0]
    currentEnemy2 = room3enemies[1]
    currentEnemy3 = room3enemies[2]
    currentEnemy1[0] = room3enemies[6]
    currentEnemy1[1] = room3enemies[7]
    currentEnemy2[0] = room3enemies[8]
    currentEnemy2[1] = room3enemies[9]
    currentEnemy3[0] = room3enemies[10]
    currentEnemy3[1] = room3enemies[11]
    currentEnemies = room3enemies
    playerx = 2
    playery = 4
    addNewMessage('Welcome to Room 3!')
    roomsExplored[2] = 1
}
function initialiseRoom4() {
    room = 4
    currentEnemy1 = room4enemies[0]
    currentEnemy2 = room4enemies[1]
    currentEnemy3 = room4enemies[2]
    currentEnemy1[0] = room4enemies[6]
    currentEnemy1[1] = room4enemies[7]
    currentEnemy2[0] = room4enemies[8]
    currentEnemy2[1] = room4enemies[9]
    currentEnemy3[0] = room4enemies[10]
    currentEnemy3[1] = room4enemies[11]
    currentEnemies = room4enemies
    playerx = 2
    playery = 4
    addNewMessage('Welcome to Room 4!')
    roomsExplored[3] = 1
}
function initialiseRoom5() {
    room = 5
    currentEnemy1 = room5enemies[0]
    currentEnemy2 = room5enemies[1]
    currentEnemy3 = room5enemies[2]
    currentEnemy1[0] = room5enemies[6]
    currentEnemy1[1] = room5enemies[7]
    currentEnemy2[0] = room5enemies[8]
    currentEnemy2[1] = room5enemies[9]
    currentEnemy3[0] = room5enemies[10]
    currentEnemy3[1] = room5enemies[11]
    currentEnemies = room5enemies
    playerx = 5
    playery = 2
    addNewMessage('Welcome to Room 5!')
    roomsExplored[4] = 1
}
function initialiseRoom6() {
    room = 6
    currentEnemy1 = room6enemies[0]
    changeEnemy1HP(1)
    currentEnemy2 = room6enemies[1]
    changeEnemy2HP(1)
    currentEnemy3 = room6enemies[2]
    changeEnemy3HP(1)
    currentEnemy1[0] = room6enemies[6]
    currentEnemy1[1] = room6enemies[7]
    currentEnemy2[0] = room6enemies[8]
    currentEnemy2[1] = room6enemies[9]
    currentEnemy3[0] = room6enemies[10]
    currentEnemy3[1] = room6enemies[11]
    currentEnemies = room6enemies
    playerx = 2
    playery = 4
    addNewMessage('Welcome to Room 6!')
    roomsExplored[5] = 1
}
function initialiseRoom7() {
    room = 7
    currentEnemy1 = room7enemies[0]
    currentEnemy2 = room7enemies[1]
    currentEnemy3 = room7enemies[2]
    currentEnemy1[0] = room7enemies[6]
    currentEnemy1[1] = room7enemies[7]
    currentEnemy2[0] = room7enemies[8]
    currentEnemy2[1] = room7enemies[9]
    currentEnemy3[0] = room7enemies[10]
    currentEnemy3[1] = room7enemies[11]
    currentEnemies = room7enemies
    playerx = 2
    playery = 4
    addNewMessage('Welcome to Room 7!')
    roomsExplored[6] = 1
}
function initialiseRoom8() {
    room = 8
    currentEnemy1 = room8enemies[0]
    currentEnemy2 = room8enemies[1]
    currentEnemy3 = room8enemies[2]
    currentEnemy1[0] = room8enemies[6]
    currentEnemy1[1] = room8enemies[7]
    currentEnemy2[0] = room8enemies[8]
    currentEnemy2[1] = room8enemies[9]
    currentEnemy3[0] = room8enemies[10]
    currentEnemy3[1] = room8enemies[11]
    currentEnemies = room8enemies
    playerx = 2
    playery = 4
    addNewMessage('Welcome to Room 8!')
    roomsExplored[7] = 1
}
function initialiseRoom9() {
    room = 9
    currentEnemy1 = room9enemies[0]
    currentEnemy2 = room9enemies[1]
    currentEnemy3 = room9enemies[2]
    currentEnemy1[0] = room9enemies[6]
    currentEnemy1[1] = room9enemies[7]
    currentEnemy2[0] = room9enemies[8]
    currentEnemy2[1] = room9enemies[9]
    currentEnemy3[0] = room9enemies[10]
    currentEnemy3[1] = room9enemies[11]
    currentEnemies = room9enemies
    playerx = 2
    playery = 4
    addNewMessage('Welcome to Room 9!')
    roomsExplored[8] = 1
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
    updateStats()
    checkforBuff()
    floorInformation()
    updateWeaponsAndItems()
}

// Cheat function
function cheat() {
    currentHP = 1000
    maxHP = 1000
    currentMP = 1000
    maxMP = 1000
}
function checkforBuff() {
    if (buffs > 0) {
        buffs -= 1
        grantBuff()
    }
}
function floorInformation() {
    var count = 0
    for (i = 0; i <= 9; i++) {
        if (roomsExplored[i] == 1) {
            count += 1
        }
    }
    var num = count/9
    var num2 = num.toFixed(2)
    num2 *= 100
    Math.round((num + 0.00001) * 100) / 100
    Math.round((num2 + 0.00001) * 100) / 100
    function roundToTwo(num2) {    
        return +(Math.round(num2 + "e+2")  + "e-2");
    }
    roundToTwo();
    // it seems that 56. 00000000001% explored is still displayed after this ~~~
    document.getElementsByClassName('floorinfo')[0].innerHTML = `Floor: 1 --- ${Math.round(num2)}% explored`
}
//Now it works.

function lootBox() {
    var randomN = Math.random()
    if (randomN > 0.9) {
        changeXP(15)
        return '15 experience points'
        alert('You gained 15 XP from the chest!')
    } else if (randomN > 0.7) {
        gold += 30
        return '30 gold'
        alert('You gained 30 gold from the chest!')
    } else if (randomN > 0.4) {
        gold += 10
        return '10 gold'
        alert('You gained 10 gold from the chest!')
    } else {
        gold += 1
        return 'Only one gold piece :('
        alert('You gained 1 gold from the chest :(')
    }
}

// Functions to remove keys
function getRoom4Key() {
    keys += 1
    room4fullstringWithoutPlayer = room4fullstringWithoutPlayer.substr(0, 45) + '0' + room4fullstringWithoutPlayer.substr(46,99)
    addNewMessage('You got the Room 4 key!')
}
function getRoom7Key() {
    keys += 1
    room7fullstringWithoutPlayer = room7fullstringWithoutPlayer.substr(0, 45) + '0' + room7fullstringWithoutPlayer.substr(46,99)
    addNewMessage('You got the room 7 key!')
}