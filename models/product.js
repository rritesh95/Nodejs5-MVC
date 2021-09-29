//const products = []; //will store products data in a file

const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const filePath = path.join(rootDir, 'data', 'products.json');

//Helper function for refactoring
//To Do: Read the file content and send to callback function
const getproductsFromFile = callbackFunc => {
    fs.readFile(filePath, (err, fileContent) => { //readFIle here works asynchronously
        //so code calling this method has to implement a way to wait for it's completion
        //her we will do it by implementing callbacks
        if(err){
            callbackFunc([]);
        }
        else{
            callbackFunc(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(t){
        this.title = t;
    }

    save(){
        getproductsFromFile( products => {
            products.push(this);

            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
        // fs.readFile(filePath, (err, fileContent) => { //refactored the code
        //     let products = [];
        //     if(!err){
        //         products = JSON.parse(fileContent);
        //     }
        //     products.push(this); //this = current product object
        //     //this considered as an product object because we have used arrow function here
        //     //otherwise the context of this would have got changed
        //     fs.writeFile(filePath, JSON.stringify(products), (err) => {
        //         console.log(err);
        //     });
        // });
        //products.push(this); //was pushing to local products variable
    }

    static fetchAll(callbackFunc){
        //return products; //was returning local products variable
        getproductsFromFile(callbackFunc);
    }
}