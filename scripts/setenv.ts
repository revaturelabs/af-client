const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
    ? `../src/environments/environment.prod.ts`
    : `../src/environments/environment.ts`;

const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    API_URI: "${process.env.API_URI}",
    API_KEY: "${process.env.API_KEY}"
};
`;

writeFile(targetPath, environmentFileContent, function(err) {
    if(err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});
