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
var map00 = document.getElementsByClassName('00')[0]
var map01 = document.getElementsByClassName('01')[0]
var map02 = document.getElementsByClassName('02')[0]
var map03 = document.getElementsByClassName('03')[0]
var map04 = document.getElementsByClassName('04')[0]
var map05 = document.getElementsByClassName('05')[0]
var map06 = document.getElementsByClassName('06')[0]
var map07 = document.getElementsByClassName('07')[0]
var map08 = document.getElementsByClassName('08')[0]
var map09 = document.getElementsByClassName('09')[0]
var map10 = document.getElementsByClassName('10')[0]
var map11 = document.getElementsByClassName('11')[0]
var map12 = document.getElementsByClassName('12')[0]
var map13 = document.getElementsByClassName('13')[0]
var map14 = document.getElementsByClassName('14')[0]
var map15 = document.getElementsByClassName('15')[0]
var map16 = document.getElementsByClassName('16')[0]
var map17 = document.getElementsByClassName('17')[0]
var map18 = document.getElementsByClassName('18')[0]
var map19 = document.getElementsByClassName('19')[0]
var map20 = document.getElementsByClassName('20')[0]
var map21 = document.getElementsByClassName('21')[0]
var map22 = document.getElementsByClassName('22')[0]
var map23 = document.getElementsByClassName('23')[0]
var map24 = document.getElementsByClassName('24')[0]
var map25 = document.getElementsByClassName('25')[0]
var map26 = document.getElementsByClassName('26')[0]
var map27 = document.getElementsByClassName('27')[0]
var map28 = document.getElementsByClassName('28')[0]
var map29 = document.getElementsByClassName('29')[0]
var map30 = document.getElementsByClassName('30')[0]
var map31 = document.getElementsByClassName('31')[0]
var map32 = document.getElementsByClassName('32')[0]
var map33 = document.getElementsByClassName('33')[0]
var map34 = document.getElementsByClassName('34')[0]
var map35 = document.getElementsByClassName('35')[0]
var map36 = document.getElementsByClassName('36')[0]
var map37 = document.getElementsByClassName('37')[0]
var map38 = document.getElementsByClassName('38')[0]
var map39 = document.getElementsByClassName('39')[0]
var map40 = document.getElementsByClassName('40')[0]
var map41 = document.getElementsByClassName('41')[0]
var map42 = document.getElementsByClassName('42')[0]
var map43 = document.getElementsByClassName('43')[0]
var map44 = document.getElementsByClassName('44')[0]
var map45 = document.getElementsByClassName('45')[0]
var map46 = document.getElementsByClassName('46')[0]
var map47 = document.getElementsByClassName('47')[0]
var map48 = document.getElementsByClassName('48')[0]
var map49 = document.getElementsByClassName('49')[0]
var map50 = document.getElementsByClassName('50')[0]
var map51 = document.getElementsByClassName('51')[0]
var map52 = document.getElementsByClassName('52')[0]
var map53 = document.getElementsByClassName('53')[0]
var map54 = document.getElementsByClassName('54')[0]
var map55 = document.getElementsByClassName('55')[0]
var map56 = document.getElementsByClassName('56')[0]
var map57 = document.getElementsByClassName('57')[0]
var map58 = document.getElementsByClassName('58')[0]
var map59 = document.getElementsByClassName('59')[0]
var map60 = document.getElementsByClassName('60')[0]
var map61 = document.getElementsByClassName('61')[0]
var map62 = document.getElementsByClassName('62')[0]
var map63 = document.getElementsByClassName('63')[0]
var map64 = document.getElementsByClassName('64')[0]
var map65 = document.getElementsByClassName('65')[0]
var map66 = document.getElementsByClassName('66')[0]
var map67 = document.getElementsByClassName('67')[0]
var map68 = document.getElementsByClassName('68')[0]
var map69 = document.getElementsByClassName('69')[0]
var map70 = document.getElementsByClassName('70')[0]
var map71 = document.getElementsByClassName('71')[0]
var map72 = document.getElementsByClassName('72')[0]
var map73 = document.getElementsByClassName('73')[0]
var map74 = document.getElementsByClassName('74')[0]
var map75 = document.getElementsByClassName('75')[0]
var map76 = document.getElementsByClassName('76')[0]
var map77 = document.getElementsByClassName('77')[0]
var map78 = document.getElementsByClassName('78')[0]
var map79 = document.getElementsByClassName('79')[0]
var map80 = document.getElementsByClassName('80')[0]
var map81 = document.getElementsByClassName('81')[0]
var map82 = document.getElementsByClassName('82')[0]
var map83 = document.getElementsByClassName('83')[0]
var map84 = document.getElementsByClassName('84')[0]
var map85 = document.getElementsByClassName('85')[0]
var map86 = document.getElementsByClassName('86')[0]
var map87 = document.getElementsByClassName('87')[0]
var map88 = document.getElementsByClassName('88')[0]
var map89 = document.getElementsByClassName('89')[0]
var map90 = document.getElementsByClassName('90')[0]
var map91 = document.getElementsByClassName('91')[0]
var map92 = document.getElementsByClassName('92')[0]
var map93 = document.getElementsByClassName('93')[0]
var map94 = document.getElementsByClassName('94')[0]
var map95 = document.getElementsByClassName('95')[0]
var map96 = document.getElementsByClassName('96')[0]
var map97 = document.getElementsByClassName('97')[0]
var map98 = document.getElementsByClassName('98')[0]
var map99 = document.getElementsByClassName('99')[0]

// Rooms
// 0 = empty space
// 1 = wall
// 2 = passage
var room1 = ['0000000000','0111121110', '0100000010', '0100000010','0100000010','0100000010','0100000010','0100000010','0111111110','0000000000']
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
    document.getElementsByClassName('00')[0].src = 'PixelDungeonImages/UI/Map/MossWall.png'
    document.getElementsByClassName('77')[0].src = 'PixelDungeonImages/UI/Map/MossWall.png'
}
function mainGameLoop() {
    updateMap()
    console.log('Main game loop activated!')
}