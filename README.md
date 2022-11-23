
<div align="center" id="top">
  <div>
  <img width="100" src="src/assets/images/rev-logo.png"> 
  <p>presents ...</p>
  </div>
  <h1 align="center">AssignForce</h1>  
</div>


<div align="center">

<- [Tech Stack](#tech-stack) - > < - [Features](#features) - > < - [Getting Started](#getting-started) - > < - [License](#license) ->
</div>


<hr>


<h2 align="center" id="tech-stack">Tech Stack</h2>


* [Angular (v11)](https://angular.io/guide/setup-local)
  * [Material](https://material.angular.io/)
  * [Google-Maps](https://github.com/angular/components/tree/master/src/google-maps) _(wrapper component for Google Maps JavaScript API)_
  * [Bootstrap](https://ng-bootstrap.github.io/#/home)
* [Firebase](https://firebase.google.com/docs/cli) _(Hosting with GitHub CI)_
* [GitHub Actions](https://github.com/marketplace/actions/deploy-to-firebase-hosting)

<br> 

<hr>
<p align="right"> <a href="#top">^ to top</a> </p>
<h2 align="center" id="features">Features</h2>




### Trainers
* Registration and Signin
* Manage Personal Reservations
  * View, Edit, Add, and Cancel
* Change Password
  
### Admins 
* Inherit all Trainer Permissions 
* Resolve New User Requests
* Manage Locations
  * Inspect, Add, Edit, and Delete

<hr>
<p align="right"> <a href="#top">^ to top</a> </p>
<h2 align="center" id="getting-started">Getting Started</h2>




1. ### Cloning GitHub Repo 
    > NOTE: don't forget to cd into your preferred folder, the project will be cloned into a new folder (named 'af-client' by default) inside the current directory ... 
    > _adding localname is optional_

    <details>
    <summary>HTTPS Method</summary>

    ```bash
    git clone https://github.com/Batch-944-Adam-Ranieri/af-client.git <localname>
    ```
    </details>

    <details>
    <summary>SSH Method</summary>

    ```bash
    git clone git@github.com:Batch-944-Adam-Ranieri/af-client.git <localname>
    ```
    </details>

    <details>
    <summary>GitHub CLI Method</summary>

    ```bash
    gh repo clone Batch-944-Adam-Ranieri/af-client <localname>
    ```
    </details>

<br>        
    
2. ### NPM Installation

    #### Confirm node.js and npm are installed on your machine


    ```bash
    # as of 04.13.21, Node.js -> LTS v14.16.1, Current v15.14.0
    node -v
    # v15.8.0

    # as of 04.13.21, npm installed with node.js lts -> v6.14.12,  Current v7.7.6
    npm -v
    # 7.8.0
    ```

    #### Node and/or NPM not found? -> Try these options

    - [Using Pre-Built installer for Node.js and NPM](https://nodejs.org/en/download/)
    - [Using package manager (brew, yum, nvm)](https://nodejs.org/en/download/package-manager/)

    #### Confirmed NPM and Node versions? -> CD into your newly cloned project folder and run npm install

    ```bash 
    # note: project folder name will be af-client by default
    cd localname && npm i
    ```

<br>

3. ### Angular CLI Installation
    #### Confirm Angular CLI is installed on your machine
    
    ```bash
    # as of 04.13.21, Angular CLI 11.2.8
    ng --version

    # sample response below ...
    # Angular CLI: 11.2.3
    # Node: 15.8.0
    # OS: darwin x64

    # Angular: 
    # ... 
    # Ivy Workspace: 

    # Package                      Version
    # ------------------------------------------------------
    # @angular-devkit/architect    0.1102.3 (cli-only)
    # @angular-devkit/core         11.2.3 (cli-only)
    # @angular-devkit/schematics   11.2.3 (cli-only)
    # @schematics/angular          11.2.3 (cli-only)
    # @schematics/update           0.1102.3 (cli-only)
    ```

    #### Angular CLI Not Found?
    
      ```bash
      # install with NPM
      npm i -g @angular/cli@latest
      ```
    #### running older version? -> [Updating Angular CLI](https://www.npmjs.com/package/@angular/cli#updating-angular-cli)

    #### Installation Help? -> [Installation Guide](https://www.npmjs.com/package/@angular/cli#prerequisites)

<br>

4. ### Running Locally
    #### Open in your browser using ng serve

    ```bash
    ng s -o
    # or use ng serve --open
    ```

    > NOTE: _if you installed the latest version of the CLI you may receive a warning, you can ignore for now, this because our global CLI version is newer than the local one used for the project, it will automatically default to the local version but you'll continue to see the error until you either update the local version or disable the warning_

<br>

<hr>
<p align="right"> <a href="#top">^ to top</a> </p>
<h2 align="center" id="license">License</h2>


By default, this project uses the [MIT License](LICENSE.txt)
<hr>
