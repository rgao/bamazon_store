var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Zubenelakrab",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    var query = "SELECT id, product_name, price FROM products";
    connection.query(query, function (error, response) {
        if (error) throw error;
        console.table(response);
        purchase();
    });
})

function purchase() {
    inquirer.prompt([{
        name: "itemID",
        type: "input",
        message: "Please input the id of the item you would like to purchase.",
        validate: function (value) {
            if (isNaN(parseInt(value)) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: "quantity",
        type: "input",
        message: "How many of this item you would like to purchase?",
        validate: function (value) {
            if (isNaN(parseInt(value)) === false) {
                return true;
            }
            return false;
        }

    }]).then(function (answer) {
        transaction(answer.itemID, answer.quantity)
    });
}

function transaction(userid, userQuantity) {
    var query = "SELECT product_name, stock_quantity, price FROM products WHERE ?";

    connection.query(query, { id: userid }, function (error, response) {
        var currentStock = response[0].stock_quantity;
        var productName = response[0].product_name;
        var cost = response[0].price * userQuantity;

        if (userQuantity > currentStock) {
            console.log("\nWe currently have only " + currentStock + " " + productName + "s in stock.\n");
            purchase();
        } else {
            var newStock = currentStock - userQuantity;
            updateDB(userid, newStock, cost);
        };
    });
}

function updateDB(userid, stock, cost) {
    console.log("\n Your total cost is $" + cost + ". Thank you for your business!\n");

    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [{ stock_quantity: stock }, { id: userid }], function (error) {
        if (error) throw error;
        purchase();
    });
}

function another() {
    inquirer.prompt({
        name: "confirm",
        type: "confirm",
        message: "Would you like to make another purchase?",
        default: true

    }).then(function (answer) {
        if (answer.confirm) {
            console.table("\n", response);
            purchase();
        } else {
            console.log("Sayonara!");
            connection.end();
        };
    });
}