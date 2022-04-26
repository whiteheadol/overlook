# Overlook Hotel

<img width="500" alt="hotel home page" src="https://user-images.githubusercontent.com/96206823/165134921-ab545828-f261-42e7-89a7-ddcf756e7c19.png">


## Table of Contents

  - [Introduction & Learning Goals](#introduction-&-learning-goals)
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

![Logging in](https://media.giphy.com/media/TH8grcR66c2emwCpAw/giphy.gif)

Search for a room by type:

![Filtering by room type](https://media.giphy.com/media/InoxdR3Ikf5NQzX2k3/giphy.gif)


## Possible Future Extensions
- I hope to build out **manager** functionality in the future, as laid out in the extension section of the spec.
- I also hope to add a feature that will allow the user to sort their booked rooms by date, either ascending or descending.

## Set Up
1. Clone this repo to your local machine.
2. `cd` into your local directory.
3. Run `npm install`.
4. Run `npm start`.
5. Clone the [project's API](https://github.com/turingschool-examples/overlook-api) to your local machine as well.
6. `cd` into the API directory.
7. Run `npm install` in the API directory.
8. Run `npm start` in the API directory.
9. Once both directories are running in separate tabs of your terminal, copy the local address from the main project's directory into your browser.
10. Enjoy exploring the application!

## Contributors
- Olivia Whitehead (GitHub: whiteheadol)

## Project Specs
- The spec for this project can be found [here](https://frontend.turing.edu/projects/overlook.html).

- The backend API can be found [here](https://github.com/turingschool-examples/overlook-api).

## Project GitHub Repo
- The project repo can be found [here](https://github.com/whiteheadol/overlook).

## Additional Resources
- [Project Board](https://github.com/whiteheadol/overlook/projects/1)
- Ocean image sourced from Pexels, photographer found [here](https://www.pexels.com/@matthardy/).
