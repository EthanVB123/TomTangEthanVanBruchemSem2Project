// Variables to declare
var currentHP = 10;
var maxHP = 10;

var currentMP = 5;
var maxMP = 5;

var currentXP = 0;
var XPToLevelUp = 10;
var currentLevel = 0;

var strength = 1;
var dexterity = 1;
var magic = 1;
var gold = 10;

var playerx = 5;
var playery = 5;

// Weapons are [name, MP, damage]
var weapon1 = ['Your fists', 1, strength]
var weapon2 = ['[Empty]', 0, 0]
var weapon3 = ['[Empty]', 0, 0]
var weapon4 = ['[Empty]', 0, 0]
// Items are [name, MP, effect]
var item1 = ['Restore 5 HP', 1, changeHP(5)]
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
var room1fullstringWithoutPlayer = '0000000000011111111001000000100100000010010003001001000000100100000010010000001001111111100000000000'
var room1splitstring = room1fullstringWithoutPlayer
var room1fullstringWithPlayer = room1fullstringWithoutPlayer
// Event listeners
    setInterval(mainGameLoop, 100)
    document.addEventListener('keydown', keyPressed())
// Functions
// key Pressed function - what to do if a key is pressed?
function keyPressed() {
    console.log('Key is pressed!')
    if (event.key == 39) {
        playerx += 1
    }

}
// change HP: use positive number to heal, use negative number to take damage
function changeHP(amount) {
    currentHP += amount
    if (currentHP > maxHP) {
        currentHP = maxHP
    }
}
// updateMap: the room variable is a 10x10 array variable
function addPlayerToMap() {
    playerIndex = 10*playery + playerx
    room1fullstringWithPlayer = room1fullstringWithoutPlayer.substring(0,playerIndex)+'p'+room1fullstringWithoutPlayer.substring(playerIndex+1)
    console.log(room1fullstringWithPlayer)
}
function updateMap() {
    room1splitstring = room1fullstringWithPlayer
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
function mainGameLoop() {
    addPlayerToMap()
    updateMap()
    
}
