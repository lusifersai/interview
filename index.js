const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var seats = [];
var rowSize, colSize;

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter the seats as arrays in json notation? ', (answer) => {
            var array = JSON.parse(answer);
            rowSize = Math.max.apply(Math, array.map(e => e[0]));
            colSize = Math.max.apply(Math, array.map(e => e[1]));

            //Identify seats
            var seats = fillWithMAandW(array);

            //print the seats
            printValues(seats, colSize, rowSize)
            resolve()
        })
    })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('enter the number of allocaions ?', (answer) => {
            var limit = answer;
            var obj = {};
            obj = replaceWithNumber("A", 1, seats, colSize, rowSize, limit);
            obj = replaceWithNumber("W", obj.counter, obj.seats, colSize, rowSize, limit);
            obj = replaceWithNumber("M", obj.counter, obj.seats, colSize, rowSize, limit);
            seats = obj.seats;

            //print the seats
            printValues(seats, colSize, rowSize)
            resolve()
        })
    })
}

const main = async () => {
    await question1()
    await question2()
    rl.close()
}

main()

function printValues(seats, colSize, rowSize) {
    var stringJ = ""
    for (var i = 0; i < colSize; i++) {
        for (var j = 0; j < rowSize; j++) {
            if (seats[j] == null || seats[j][i] == null) {

                stringJ += "\t\t  \t "
                continue;
            }
            for (k = 0; k < seats[j][i].length; k++) {
                stringJ += (seats[j][i][k] + "\t");
            }
            stringJ += ",";
        }
        stringJ += "\n"
    }
    console.table(stringJ);
}

function fillWithMAandW(array) {

    for (var i = 0; i < array.length; i++)
        seats.push(Array(array[i][1]).fill().map(() => Array(array[i][0]).~fill("M")));

    for (var i = 0; i < seats.length; i++) {
        for (var j = 0; j < seats[i].length; j++) {
            seats[i][j][0] = "A";
            seats[i][j][seats[i][j].length - 1] = "A";
        }
    }

    for (var i = 0; i < seats[0].length; i++)
        seats[0][i][0] = "W";
    for (var i = 0; i < seats[seats.length - 1].length; i++)
        seats[seats.length - 1][i][(seats[seats.length - 1][i].length) - 1] = "W";

    return seats;
}

function replaceWithNumber(val, counter, seats, colSize, rowSize, limit) {
    for (var i = 0; i < colSize; i++) {
        for (var j = 0; j < rowSize; j++) {
            if (seats[j] == null || seats[j][i] == null || counter > limit)
                continue;
            for (k = 0; k < seats[j][i].length; k++) {
                if (seats[j] != null && seats[j][i] != null && seats[j][i][k] === val) {
                    seats[j][i][k] = counter;
                    counter++;
                }
            }
        }

    }
    return { seats: seats, counter: counter };
}