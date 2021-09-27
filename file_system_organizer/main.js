#!/usr/bin/env node      //shabang syntax to make global
let inputArr=process.argv.slice(2);  //for remove node main.js and take input
let fs=require("fs");   //fs and path module inport
let path=require("path");  
let helpObj=require("./commands/help");   //for take function help tree organize so require 
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],   //extension to recognize which type of data this
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

let command=inputArr[0];   //first input is our command

switch(command){  //this switch is for what action we want to do
    case "tree":
        treeObj.treekey(inputArr[1]);
        break;
    
    case "organize":
        organizeObj.organizekey(inputArr[1]);
        break;

    case "help":
        helpObj.helpkey();
        break;

    default:
        console.log("please input right command");
        break;
}


