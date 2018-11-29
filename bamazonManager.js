var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Zubenelakrab",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n");

    menu();
})

function menu() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"]

    }).then(function (response) {
        switch (response.options) {
            case "View Products for Sale": viewInventory("all");
                break;

            case "View Low Inventory": viewInventory(5);
                break;

            case "Add to Inventory": updateQuantity();
                break;

            case "Add New Product": addProduct();
                break;
        };
    });
}

function viewInventory(limit) {
    var query = "";

    if (limit === "all") {
        query = "SELECT * FROM products";
        connection.query(query, function (error, response) {
            console.table("\n", response);
            next();
        })
    } else {
        query = "SELECT * FROM products WHERE stock_quantity <= " + limit;
        connection.query(query, function (error, response) {
            console.table("\n", response);
            next();
        })
    }
}

function updateQuantity() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Enter the ID of the product that you would like to update.",
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
            message: "Enter the new stock number for this product",
            validate: function (value) {
                if (isNaN(parseInt(value)) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function (answer) {
        var query = "UPDATE products SET ? WHERE ?";

        connection.query(query, [{ stock_quantity: answer.quantity }, { id: answer.item }], function (error) {
            if (error) throw error;

            console.log("\nUpdate Successful!");
            next();
        });
    });
}

function addProduct() {
    inquirer.prompt([
        {
            name: "newItem",
            type: "input",
            message: "Please enter the name of the new product.",
        },
        {
            name: "newDept",
            type: "input",
            message: "Please enter the product's department.",
        },
        {
            name: "newPrice",
            type: "input",
            message: "Please enter the price of the product.",
            validate: function (value) {
                if (isNaN(parseFloat(value)) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "newQuantity",
            type: "input",
            message: "Please enter how many of the product we have in stock.",
            validate: function (value) {
                if (isNaN(parseInt(value)) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function (answer) {
        var query = "INSERT INTO products SET ?";

        connection.query(query, {
            product_name: answer.newItem,
            department_name: answer.newDept,
            price: answer.newPrice,
            stock_quantity: answer.newQuantity
        }, function (error) {
            if (error) throw error;

            console.log("\nUpdate Successful!")
            next();
        });
    });
}

function next() {
    inquirer.prompt({
        name: "confirm",
        type: "confirm",
        message: "Would you like to do anything else?",
        default: true

    }).then(function (answer) {
        if (answer.confirm) {
            console.log("\n");
            menu();
        } else {
            console.log("Sayonara!");
            connection.end();
        };
    });
}