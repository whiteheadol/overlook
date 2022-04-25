# Overlook Hotel

<img width="500" alt="hotel home page" src="https://user-images.githubusercontent.com/96206823/165134921-ab545828-f261-42e7-89a7-ddcf756e7c19.png">

## Table of Contents

  - [Introduction & Learning Goals](#introduction-&-learning-goals)
  - [Learning Goals](#learning-goals)
  - [Technologies](#technologies)
  - [Features](#features)
  - [Page Demo](#page-demo)
  - [Possible Future Extensions](#possible-future-extensions)
  - [Set Up](#set-up)
  - [Contributors](#contributors)
  - [Project Specs](#project-specs)
  - [Project GitHub Repo](#project-github-repo)
  - [Additional Resources](#additional-resources)

## Introduction & Learning Goals
The Overlook Hotel was a solo project assigned for Turing School of Software and Design's Front End Module 2. Students were given a seven day sprint to produce a hotel booking application with a minimum functionality laid out in the spec.

The goals for students while completing this project included the following:
- Incorporating Get and Post requests to communicate with a backend API
- Utilizing effective object oriented programing
- Writing comprehensive tests for each class, including both its properties and methods
- Prioritizing their app's accessibility
- Building in effective and comprehensive error handling

Personally, my biggest wins were gaining a deeper understanding of fetch calls and their timing (we were not allowed to use async/await) and the hands on practice with error handling.

My biggest challenge, is related to one of my wins, as understanding the timing of various Fetch calls was difficult. This project spec also provided much less guidance than with previous applications, and this was both challenging and exciting.

## Technologies
  - Javascript
  - HTML
  - CSS
  - Mocha
  - Chai
  - Fetch API
  - Webpack
  - NPM
  - Lighthouse (accessibility)
  - Wave (accessibility)

## Features
- When the browser first loads, the user will see a login page with two input fields. They can login with the following credentials:

   `username: customer50` (any customer number between 1 & 50 is valid)

   `password: overlook2021`

- A successful login will load the user's dashboard, and an unsuccessful login will result in an error message.
- Upon loading the user's dashboard, the user will see a personalized greeting, a list of all of their room bookings, the total amount they've spent on bookings, and a button that allows them to navigate to a new bookings page.
- When they navigate to the new bookings page, they will see a new set of thumbnails as well as two search fields. Filling out these fields will allow them to narrow down their room search.
- When they find a room they like, they can book it by clicking `book now`.
- When a room is booked, it will disappear from the list of available rooms. Then, when a user navigates back to their dashboard, the total amount spent will be updated, and the new booking will appear in their booked thumbnails.

## Page Demo
Logging in to view a user dashboard:

![Favoriting a recipe](https://media.giphy.com/media/1NsLtAmPAbZIs9WU9E/giphy.gif)


## Possible Future Extensions
- At the moment, a user is instantiated from an array of user objects, and the information for these user objects is pulled from a database. We would love to add functionality for a site visiter to actually provide their information and instantiate their own user object.
- We would also love to add the ability for a user to rate the recipes they've cooked or to leave notes for themselves about the recipe.
- Users are only able to filter by one tag at a time, but we hope to update this in the future so that they can filter by multiple tags at once.

## Set Up
1. Fork and clone this repo.
2. Read this README thoroughly.
3. Type `cd whats_cookin` to move into the root directory.
4. run `npm install` to install neccessary dependencies.
5. Run `npm start`.
6. Copy the url given by running `npm start` and open in your browser.
7. Enjoy exploring the recipe database.

## Contributors
- Stephanie Roe (GitHub: stephanie-roe)
- Ross Landino (GitHub: mrlandino)
- Olivia Whitehead (GitHub: whiteheadol)

## Project Specs
- The specs parts one and two of this project can be found [here](https://frontend.turing.edu/projects/What%27sCookin-PartOne.html) and [here](https://frontend.turing.edu/projects/whats-cookin-part-two.html).

- The backend API can be found [here](https://github.com/turingschool-examples/whats-cookin-api).

## Project GitHub Repo
- The project repo can be found [here](https://github.com/whiteheadol/whats-cookin).

## Additional Resources
- [Figma Wireframe](https://www.figma.com/file/ZpXIc9Qrf5QWYVkUAs7iJ0/Whats-Cookin-Mod-2-Group-Proj?node-id=0%3A1)
- [Standup Log](https://docs.google.com/spreadsheets/d/1MZotFEv9hxh9mh32oMXeKmdRtaM0Y_BEl9TlVCWziGg/edit?usp=sharing)
- [Project Board](https://github.com/whiteheadol/whats-cookin/projects/1)







# Webpack Starter Kit
This is a test.

## Clone This Repo

That's right, _clone_ not fork. You will use this repo multiple times, but you can only fork a repository once. So here is what you need to do to clone the repo and still be able to push changes to your repo:

1. Clone down this repo. Since you don't want to name your project "webpack-starter-kit", you can use an optional argument when you run `git clone` (you replace the `[...]` with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
1. Remove the default remote: `git remote rm origin` (notice that `git remote -v` not gives you back nothing)
1. Create a new repo on GitHub with the name of `[what you want to name the repo]` to be consistent with naming
1. Copy the address that you would use to clone down this repo - something like `git@github.com:...`
1. Add this remote to your cloned down repo: `git remote add origin [address you copied in the previous step]` - do not include the brackets

Now try to commit something (just add a line in the README) and push it up to your new repo. If everything is setup correctly, you should see the changes on GitHub.

## Setup

After one person has gone through the steps of cloning down this repo and editing the remote, everyone should clone down the repo.

Then install the library dependencies. Run:

```bash
npm install
```

To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see a page with the Turing logo image and a beautiful gradient background. If that's the case, you're good to go. Enter `control + c` in your terminal to stop the server at any time.

## Where to Add Your Code

### JavaScript

You have to be very intentional with where you add your feature code. This repo uses a tool called [webpack](https://webpack.js.org/) to combine many JavaScript files into one big file. Webpack enables you to have many, separate JavaScript files to keep your code organized and readable. Webpack expects all of your code files to be in a specific place, or else it doesn't know how to combine them all behind the scenes.

**Create all of your feature code files in the `src` directory.**

Since code is separated into multiple files, you need to use the `import` and `export` syntax to share code across file.

Here is a video that walks through some information about [import and export](https://www.youtube.com/watch?v=_3oSWwapPKQ). There are a lot of resources out there about `import` and `export`, and resources will sometimes call them `ES6 modules`. It's something you will see in React and beyond.

### HTML

Add the HTML you need in the `index.html` file in the `./dist` directory. There is some boilerplate HTML that exists from the start that you can modify.

### Images

Add your image files in the `src/images` directory. Similar to CSS files, you need to `import` image files in the JavaScript entry file (`scripts.js`). Then go into the HTML and add an `img` element with the `src` attribute pointing to the `images` directory. There is an example in the `index.html` file for you to see.

## How to View Your Code in Action

In the terminal, run:

```bash
npm start
```

You will see a bunch of lines output to your terminal. One of those lines will be something like:

```bash
Project is running at http://localhost:8080/
```

Go to `http://localhost:8080/` in your browser to view your code running in the browser.

---

## Test Files Organization

Similar to feature code, your test code needs to be put in a specific place for it to run successfully.

**Put all of your test files in the `test` directory.** As a convention, all test filenames should end with `-test.js`. For instance: `box-test.js`.

## Running Your Tests

Run your test suite using the command:

```bash
npm test
```

The test results will output to the terminal.

---

## Linting Your Code

Run the command in your terminal `npm run lint` to run the linter on your JavaScript code. There will be errors and warnings right from the start in this starter kit - the linter is still running successfully.

Your linter will look at the JavaScript files you have within the `src` directory and the `test` directory.

## Webpack?

If you look in the `package.json` file, you'll see one of the library dependencies called `webpack`. If you're interested in learning more about what Webpack is and how it works behind the scenes, take a look through the [Webpack configuration documentation](https://webpack.js.org/concepts/).

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
