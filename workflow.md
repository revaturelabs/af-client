# Github Actions Workflows

## Add your .env file
``` .env in root
API_URI=serverURI
API_KEY=secretFromFirebase_or_GCP
```
## Front-Dev Branch
To run the dev workflow
- pull and merge with main branch
- push up or set pull request to front-dev
  - git push --set-upstream origin front-dev
- this will deploy the app to  https://ngassignforce.web.app/ 


## Main Branch
By default any pull requests (or pushes to the main branch) will run the prod.yml file
- will deploy to https://assignforceprod.web.app/


## Editing workflows
- create firebase hosting projects 
- generate and save firebase token to repo secrets
- edit .firebaserc aliases with project names using keys mentioned in .yml files
   
## FAQs
- Where are my changes?
  - If pushing to front-dev branch --> https://ngassignforce.web.app/ 
    - _not there? try doing a hard refresh or clearing your cache_
  - If pull request to main was approved --> https://assignforceprod.web.app/
    - _not there? confirm pull request was approved and committed, refresh and/or clear cache_ 
