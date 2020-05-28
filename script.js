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

function mainGameLoop() {
    break;
}