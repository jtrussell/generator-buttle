'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ButtleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Buttle generator.'));

    var prompts = [{
      type: 'confirm',
      name: 'useLess',
      message: 'Would you like to use LESS for your styles?',
      default: true
    },{
      type: 'confirm',
      name: 'useBootstrap',
      message: 'Would you like to include Twitter Bootstrap?',
      default: true
    },{
      type: 'confirm',
      name: 'useJquery',
      message: 'Would you like to include jQuery?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.useLess = props.useLess;
      this.useBootstrap = props.useBootstrap;
      this.useJquery = props.useJquery;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');

    if(this.useLess) {
      this.copy('app/styles/main.less', 'app/styles/main.less');
    } else {
      this.copy('app/styles/main.css', 'app/styles/main.css');
    }

    this.template('app/_index.html', 'app/index.html', {
      useBootstrap: this.useBootstrap,
      useJquery: this.useJquery
    });

    this.copy('app/scripts/main.js', 'app/scripts/main.js');
    this.copy('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('README.md', 'README.md');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('buttlerc', '.buttlerc');
  }
});

module.exports = ButtleGenerator;
