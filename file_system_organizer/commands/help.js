function helpFn(){
    console.log(
        `
        List of All the commands:
                     praksh tree "directoryPath"
                     praksh organize "directoryPath"
                     praksh help
        `
    )
}

module.exports={
    helpkey:helpFn  // object for help function whereever want use that object 
}