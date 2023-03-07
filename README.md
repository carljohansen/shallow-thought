# Shallow Thought
Demonstration of a chess playing engine in Angular 15.  Please see [here](https://carljohansen.wordpress.com/2017/06/26/shallow-thought-an-angular-2-chess-player/) for an in-depth discussion of the code.

## Introduction
This is a bit of fun to show some Angular concepts PLUS a chess engine - all in one package.  In homage to 'Deep Thought' (the granddaddy of chess engines) and in honest recognition of my engine's feeble playing strength, I have named it Shallow Thought.  I hope you enjoy playing around with it as much as I enjoyed building it.

Since this is primarily a learning exercise, it's accompanied by a series of articles that will hopefully explain what's happening (see link above).

Here's a screenshot showing Shallow Thought (Black) getting pounded by Houdini (White)!

![Shallow Thought game screenshot](https://carljohansen.files.wordpress.com/2017/06/screenshot2.png)

### Disclaimer
This is my first serious attempt at using Angular 15.  Coming from a Visual Studio background, this project was also my first use of the following:
* Node.js
* Npm
* Webpack
* Git
* RxJS
* Web workers (i.e. browser background threads)

I hope it's clear: this is not a masterclass in any of the above (or in writing chess engines, for that matter).  Your comments and suggestions are welcome.

## Building
To run the app follow these steps:

1. Make sure you have a recent version of [Node.js/npm](https://nodejs.org/) installed.
1. Download the master branch as a [zip file](https://github.com/carljohansen/shallow-thought/archive/refs/heads/master.zip) from GitHub.
1. Extract it to a local folder.
1. Start a Node.js command prompt.
1. Switch to the 'shallow-thought' folder (the one that has /src as a sub-folder).
1. run ```npm install``` and let it finish.
1. run ```npm start``` and wait for it to show "compiled successfully."
1. Open [http://localhost:4200](http://localhost:4200) in a browser (I find that Microsoft Edge gives the best performance).
1. You play white and the computer plays black.  Click on a white piece and then click on the square to which you want to move it.
