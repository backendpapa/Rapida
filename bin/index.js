#!/usr/bin/env node

const yargs = require("yargs");
const os=require('os')
const fs=require('fs');
const { option } = require("yargs");
const {create}=require('../utils/defaultExpress')

const options = yargs
 .usage("Usage: Create Express Boilerplate")
 .option("c", { alias: "create", describe: "Generate a default standalone express boilerplate", type: "string", demandOption: true , })
 .argv
if(options.create!=="" || options.create!==null){
    create(options.create)
}
// const greeting = `Hello, ${options.name}!`;
// fs.mkdir('./newExp',()=>{
//     console.log("done")
// })

// console.log(greeting);