let fs=require("fs");
let path =require("path");

function treeFn(dirPath){
    if(dirPath==undefined)
       dirPath=process.cwd();


    treeHelper(dirPath,"");
}

function treeHelper(dirPath,indent){

     let isFile=fs.lstatSync(dirPath).isFile();
     if(isFile){
         let fileName=path.basename(dirPath);
         console.log(indent+ "├──"+fileName );
     }else{
         let dirName=path.basename(dirPath);
         console.log(indent+"└──" +dirName);
         let childrens=fs.readdirSync(dirPath);
         for(let i=0;i<childrens.length;i++){
             let childPath=path.join(dirPath,childrens[i]);
             treeHelper(childPath,indent);
         }
     }
}
module.exports={
    treekey:treeFn
}