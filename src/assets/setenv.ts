/* tslint:disable */
// @ts-nocheck
const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {
    writeFile(targetPath, environmentFileContent, function(err) {
        if(err) {
            console.log(err);
        }
        if(environmentFileContent !== '') {
            console.log(`Wrote variables to ${targetPath}`);
        }
    });
}


const envDirectory = './src/environments';

// creates folder if it doesn't exist
if(!existsSync(envDirectory)){
    mkdirSync(envDirectory);
}

// creates empty files if they don't exist already
writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS(`./src/environments/environment.prod.ts`, '');

const isProduction = environment === 'prod';

const targetPath = isProduction
    ? `./src/environments/environment.prod.ts`
    : `./src/environments/environment.ts`;

const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    API_URI: "${process.env.API_URI}",
    API_KEY: "${process.env.API_KEY}"
};
`;

writeFileUsingFS(targetPath, environmentFileContent);


