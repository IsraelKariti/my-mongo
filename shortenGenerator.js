
const linkPairs = {
    "/goog": "https://www.google.co.il/",
    "/face": "https://www.facebook.com/"
}

module.exports = function createUniqueRandomShortUrl(){
    // keep creating url untill unique found
    for(;;){
        var randUrl = createRandomShortUrl();
        // check if the url doesn't already exist
        if(Object.keys(linkPairs).indexOf(randUrl) == -1){
            randUrl = '/'+randUrl;
            return randUrl;
        }
    }
}

// create a random string of 7 alphanumeric
function createRandomShortUrl(){
    var randUrl = "";
    for(var i = 0 ;i < 7;i++){
        randUrl = randUrl + getRandomAlphanumeric();
    }
    return randUrl;
}

function getRandomAlphanumeric(){
    var rand = getRandomInt();
    return alphanumerics[rand];
}
function getRandomInt() {
    return Math.floor(Math.random() * 62); 
}

const alphanumerics = {
    0: 'a', 
    1: 'b', 
    2: 'c', 
    3: 'd', 
    4: 'e',
    5: 'f',
    6: 'g', 
    7: 'h', 
    8: 'i', 
    9: 'j', 
    10: 'k',
    11: 'l',
    12: 'm',
    13: 'n',
    14: 'o',
    15: 'p',
    16: 'q',
    17: 'r',
    18: 's',
    19: 't',
    20: 'u',
    21: 'v',
    22: 'w',
    23: 'x',
    24: 'y',
    25: 'z',
    26: 'A',
    27: 'B',
    28: 'C',
    29: 'D',
    30: 'E',
    31: 'F',
    32: 'G',
    33: 'H',
    34: 'I',
    35: 'J',
    36: 'K',
    37: 'L',
    38: 'M',
    39: 'N',
    40: 'O',
    41: 'P',
    42: 'Q',
    43: 'R',
    44: 'S',
    45: 'T',
    46: 'U',
    47: 'V',
    48: 'W',
    49: 'X',
    50: 'Y',
    51: 'Z',
    52: '0',
    53: '1',
    54: '2',
    55: '3',
    56: '4',
    57: '5',
    58: '6',
    59: '7',
    60: '8',
    61: '9'
}

 