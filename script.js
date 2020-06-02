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
// Elements to change


// Rooms
// 0 = empty space
// 1 = wall
// 2 = passage
var room1 = ['0000000000','0111121110', '0100000010', '0100000010','0100000010','0100000010','0100000010','0100000010','0111111110','0000000000']
var room1fullstring = '0000000000011111111001000000100100000010010000001001000000100100000010010000001001111111100000000000'
var room1splitstring = room1fullstring
// Event listeners
    setInterval(mainGameLoop, 100)
// Functions
// change HP: use positive number to heal, use negative number to take damage
function changeHP(amount) {
    currentHP += amount
    if (currentHP > maxHP) {
        currentHP = maxHP
    }
}
// updateMap: the room variable is a 10x10 array variable

function updateMap() {
    room1splitstring = room1fullstring
    var square = '00'
    var square1 = 0
    var square2 = 0
    for (i = 0; i < 100; i++) {
        if (i < 10) {
            square = '0' + i.toString()
        } else {
            square = i.toString()
        }
        console.log(square)
        if (room1splitstring[0] == 0) {
            console.log('Statement called')
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/entirelyWhiteSquare.png'
            room1splitstring = room1splitstring.substring(1)

        } else if (room1splitstring[0] == 1) {
            document.getElementsByClassName(square)[0].src = 'PixelDungeonImages/UI/Map/MossWall.png'
            room1splitstring = room1splitstring.substring(1)
        }

    
    
    }
}
function mainGameLoop() {
    updateMap()
    console.log('Main game loop activated!')
}
