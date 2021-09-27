

let fs=require("fs");   //fs and path module inport
let path=require("path"); 


let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],   //extension to recognize which type of data this
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}


function organizeFn(dirPath){
   if(dirPath==undefined)
       dirPath=process.cwd();

       let destPath=path.join(dirPath,"organized_files");  // if not present this path thern make folder 
       if(fs.existsSync(destPath)==false){
           fs.mkdirSync(destPath);
       }

       organizeHelper(dirPath,destPath);

   
}
  
function organizeHelper(src,dest){
    let childName=fs.readdirSync(src);

    //1.child adrees path banayenge 
    //2.har ek childre se puchenge tu file ho ya folder 
    //or file hoga tbi organize krenge
    //3.if file then get categry
    //4.print this childre belongs to this categry
    //5.copy and remove and paste in dest path

    for(let i=0;i<childName.length;i++){
        let childPath=path.join(src,childName[i]);
        let isFile=fs.lstatSync(childPath).isFile();
        if(isFile){
            let category=getCategory(childName[i]);

            console.log(childName[i], "belongs to -->",category);

            sendFiles(childPath,dest,category);
        }
    }
}

function sendFiles(srcFilePath,dest,category){
    let categoryPath=path.join(dest,category);

    //check that category path alredy exist or not
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    //now time to copy
    let fileName=path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName,"copied to",category);
}


function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1); //because .pdf-->pdf
    for(let type in types){
        let cArray=types[type];
        for(let i=0;i<cArray.length;i++){
            if(ext==cArray[i]){
                return type;
            }
        }
    }
    return "others";
}


module.exports={
    organizekey:organizeFn
}