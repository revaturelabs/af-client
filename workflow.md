# Github Actions Workflows
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
- create firebase hosting project(s) 
- generate and save firebase token to repo secrets
  -  firebase login:ci // to get firebase token for repository secret
- edit .firebaserc aliases with project names using keys mentioned in .yml files
  - dev -> ngassignforce and prod -> training-team-253916
   
## FAQs
- Where are my changes?
  - If pull request to main was approved --> https://training-team-253916.web.app/
    - _not there? confirm pull request was approved and committed, refresh and/or clear cache_ 
  - If pushing to any branch (not main) --> https://ngassignforce.web.app/ 
    - _not there? try doing a hard refresh or clearing your cache_
