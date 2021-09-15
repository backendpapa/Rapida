const fs=require('fs/promises')
const path=require('path')
const process=require('process')
const { exec } = require('child_process');


module.exports={

    create:(FOLDER_NAME)=>{

        console.log('Creating folder in directory:')
        console.log(path.join(process.cwd(),FOLDER_NAME))
        // 1. Create the folder in the current directory

        fs.mkdir(FOLDER_NAME).then(()=>{

            console.log(`${FOLDER_NAME} created`)
            console.log('Writing folders and files')

            
        }).then(()=>{

            // 2 Cd into folder
            process.chdir(`${FOLDER_NAME}`)
            console.log(process.cwd())

        }).then(()=>{

            // 3 Run npm init default
            
            exec('npm init -y', (err, stdout, stderr) => {

                if(err){

                    console.log("ERROR: Package.json not created")
                    throw err

                }else if(stderr!==""){
                    
                    console.log(stderr)
                    process.exit(1)

                }else{

                    console.log(path.join(process.cwd(),'package.json'))

                }



            })

        }).then(()=>{
            
            // 4 create index.js file

            exec('touch index.js',(err,stdout,stderr)=>{

                if(err){

                   throw err;

                }else if(stderr!==""){

                    console.log(stderr)
                    process.exit(1)

                }else{
                    
                    // Copy content into index.js
                    exec(`cat ${path.join(__dirname,'dindex.txt')} >index.js`,(err,stdout,stderr)=>{
                        if(err){

                            throw err;
                            
                        }else if(stderr!==""){

                            console.log(stderr)
                            process.exit(1)

                        }else{

                            console.log(stdout)

                        }

                    })

                }
            })
        }).then(()=>{

            exec('mkdir controllers routes',(err,stdout,stderr)=>{

                if(err){
                    
                    throw err;

                }else if(stderr!==""){
                    console.log(err)
                    process.exit(0)
                }else{
                    console.log(stdout)
                }
            })
        }).catch(err=>{

            // 1N print error if main folder wasnt successful
            console.log(err)
            console.log('ERROR: Boilerplate not created')

        })
    }
}