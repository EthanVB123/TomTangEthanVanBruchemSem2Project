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
// Player's location: x=0 y=0 is the top left
var playerx = 5
var playery = 5
// Elements to change


// Rooms
// 0 = empty space
// 1 = wall
// 2 = passage
// 3 = green slime
// p = player
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
var room1fullstring = '0000000000011111111001000000100100000010010003001001000000100100000010010000001001111111100000000000'
var room1splitstring = room1fullstring
// Event listeners
    setInterval(mainGameLoop, 100)
// Functions

// This function places the player on the map.
function placePlayerOnMap() {
    indexOfPlayerInRoomString = 10*playery + playerx
    room1fullstring = room1fullstring.substring(0,indexOfPlayerInRoomString) + 'p' + room1fullstring.substring(indexOfPlayerInRoomString, 100)
    console.log(room1fullstring)
}
// change HP: use positive number to heal, use negative number to take damage
function changeHP(amount) {
    currentHP += amount
    if (currentHP > maxHP) {
        currentHP = maxHP
    }
}
// updateMap: the room variable is a 10x10 array variable

function updateMap() {
    indexOfPlayerInRoomString = 10*playery + playerx
    room1splitstring = room1fullstring
    var square = '00'
    
    for (i = 0; i < 100; i++) {
        if (i < 10) {
            square = '0' + i.toString()
        } else {
            square = i.toString()
        }
        
        if (i = indexOfPlayerInRoomString) {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/Zombie.png'
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
            console.log('Player found')
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/Creatures/Zombie.png'
        }

    
    
    }
}
function mainGameLoop() {
//    placePlayerOnMap()
    updateMap()
}
