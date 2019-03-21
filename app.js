var mysql = require('mysql')
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "snibor21",
    database: "bamazon"
});

function printItems(){
    console.log('Here are our products:')
    connection.query("SELECT * FROM products", function(err, data){
        if(err) throw err;
        for(var i=0;i<data.length;i++){
            console.log('----------------------------------------------------')
            console.log('ID: ' + data[i].item_id)
            console.log('Product name: ' + data[i].product_name)
            console.log('Price: $' + data[i].price)
        }
        return init()
    })
}



function askAgain(){
    inquirer.prompt({
        message:'Would you like to search for another item?',
        type:'list',
        choices: ['Yes','No'],
        name:'answer'
    }).then(function(answer){
        if(answer.answer === 'Yes'){
            printItems()
        } else {
            console.log('Come again!')
            process.exit(0)
        }
    })    
}

function init(){
    inquirer.prompt([
        {message:'What is the ID of the item you would like to buy?',
        type: 'input',
        name:'ID'}, 
        {message:'How many would you like?',
        type:'input',
        name:'number'}
    ]).then(function(response){
        connection.query("SELECT * FROM products WHERE(?)", {item_id:response.ID}, function(err, data){
            if (err) throw err;
            if(parseInt(data[0].stock_quantity) >= parseInt(response.number)){
                console.log('You have just purchased ' + response.number + ' ' +data[0].product_name + '(s) for a total of $' + (data[0].price * response.number))
                
                connection.query("UPDATE products SET stock_quantity =(?) WHERE item_id=(?)",[data[0].stock_quantity - response.number, response.ID],function(err,data){
                    if (err) throw err;
                    askAgain()
                })
            } else {
                console.log('Sorry, we do not have enough in stock.')
                askAgain()
            }
        })
       
    })
}

printItems()





