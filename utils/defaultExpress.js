const fs=require('fs/promises')
const path=require('path')
const process=require('process')
const { exec } = require('child_process');
const chalk = require('chalk');  
const boxen = require('boxen');


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
            let defaultPackage=`{
                "name": "${FOLDER_NAME}",
                "version": "1.0.0",
                "description": "",
                "main": "index.js",
                "scripts": {
                  "test": "echo Error: no test specified && exit 1",
                  "start":"node index.js"
                },
                "keywords": [],
                "author": "",
                "license": "ISC",
                "dependencies": {
                  "cors": "^2.8.5",
                  "express": "^4.17.1"
                }
              }`.toString()
              
            
            exec(`touch package.json && echo '${defaultPackage}'  > package.json`, (err, stdout, stderr) => {

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

            // Make directory for routes and controllers
            exec('mkdir controllers routes && touch ./controllers/helloController.js && touch ./routes/hello.js',(err,stdout,stderr)=>{

                if(err){
                    
                    throw err;

                }else if(stderr!==""){
                    console.log(err)
                    process.exit(0)
                }else{
                    console.log(path.join(process.cwd(),'controllers'))
                    console.log(path.join(process.cwd(),'routes'))
                    console.log(path.join(process.cwd(),'controllers','helloController.js'))
                    console.log(path.join(process.cwd(),'routes','hello.js'))
                }
            })
        }).then(()=>{

            // Add boilerplate to controller
            exec(`cat ${path.join(__dirname,'controllerDefault.txt')} > ./controllers/helloController.js && cat ${path.join(__dirname,'routeDefault.txt')} >./routes/hello.js`,(err,stdout,stderr)=>{
                if(err){

                    throw err;
                    
                }else if(stderr!==""){

                    console.log(stderr)
                    process.exit(1)

                }else{

                    console.log(stdout)

                }

            })

        
        
        }).then(()=>{

            // Output info
           setTimeout(() => {
            console.log( chalk.hex('#AFFDDB')(`${FOLDER_NAME} created successfully`))
            console.log(chalk.hex('#AFFDDB')(`cd ${FOLDER_NAME}`))
            console.log( chalk.hex('#AFFDDB')(`npm install`))
            console.log(chalk.hex('#AFFDDB')(`npm start`))
            
           }, 2000);
        }).catch(err=>{

            // 1N print error if main folder wasnt successful
            console.log(err)
            const er = chalk.hex('#FF0000')('ERROR: Boilerplate not created');
            console.log(er)

        })
    }
}