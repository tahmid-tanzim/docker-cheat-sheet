# SMASH
Experimenting with [SailsJS](http://sailsjs.org) & [Angular 2](https://angular.io/)

### 1. Installing [Node.js](https://nodejs.org/en/) via [nvm (Node Version Manager)](https://github.com/creationix/nvm) on Ubuntu Linux.
##### 1.1. Installing [NVM](https://github.com/creationix/nvm) :
```
sudo apt-get install git git-core curl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```
By [GNU Wget](https://www.gnu.org/software/wget/) :
```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```
##### 1.2. Append the NVM path in `~/.bashrc` OR `~/.bash_profile`:
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```
##### 1.3. Load ~/.bashrc and Check if NVM successfully installed :
```
source ~/.bashrc
nvm
```
##### 1.4. Installing [Node.js](https://nodejs.org/en/) and Set default [version](https://nodejs.org/en/download/releases/) :
```
nvm install 4.3.0
nvm alias default 4.3.0
node --version
nvm list
```
### 2. Installing Sails.js Project
```
npm install sails -g
git clone https://github.com/tahmid-tanzim/smash.git
cd smash && npm install
```
*To run the app*: You need to type `sails lift` in the terminal and visit `localhost:1337` from the web browser.

### 3. Configuring Database Support

#### 3.1. MySQL database with Sails.js
```
npm install --save sails-mysql
```
##### 3.1.1 config/connections.js
Consider the following code of the `config/connections.js` file:
```javascript
   module.exports.connections = {
      mysqlAdapter: {
         adapter:   'sails-mysql',
         host:      'localhost',
         user:      'root',
         password:  '',
         database:  'sampleDB'
      }
   };
```
##### 3.1.2. config/models.js
The following is the content of the `config/models.js` file:
```javascript
   module.exports.models = {
      connection: 'mysqlAdapter'
   };
```
______
#### 3.2. MongoDB database with Sails.js
```
npm install --save sails-mongo
```
##### 3.2.1 config/connections.js
Consider the following code of the `config/connections.js` file:
```javascript
   module.exports.connections = {
      mongoAdapter: {
          adapter:  'sails-mongo',
          host:     'localhost',
          port:     27017
      }
   };
```
##### 3.2.2. config/models.js
The following is the content of the `config/models.js` file:
```javascript
   module.exports.models = {
      connection: 'mongoAdapter'
   };
```
### 4. Configuring the Grunt task runner file with [JSHint](http://jshint.com/)
```
npm install -g grunt
npm install grunt-contrib-jshint --save-dev
```
Once it is installed, we need to create a new `jshint.js` filename in the `tasks/config` folder.
```javascript
  module.exports = function (grunt) {
    grunt.config.set('jshint', {
      jshint: {
        myFiles: ['../../api/controllers/**/*.js']
      }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
  };
```
Once the task file is created, we need to register the task (that is, *jshint*) in the `default.js` file present in the `config/register` folder.
```javascript
  module.exports = function (grunt) {
    grunt.registerTask('default', ['jshint', 'compileAssets', 'linkAssets', 'watch']);
  };
```
Now run the `grunt` command in the terminal, *JSHint* will run first.
