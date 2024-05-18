# Prompt-Ai

This app was inspired by Adrian Hajdin from JSmastery and serves a collection of very useful and reuseable ai prompts from different creators. Built with nextjs and next-auth. With this app you can create and authenticate (login and sign up) a user with google OAuth and the google cloud platform, create a reuseable prompt, fetch prompts that belong to you and all other creators, edit and delete your own prompts.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This app is was built with Nextjs, next-auth, tailwind and nextjs api for the backend

## Features

- Create user.
- login/logout user.
- Email validation by google OAuth.
- create new prompts.
- client validation for prompts and prompt-tags.
- fetch all existing prompts.
- search functionality for getting specific prompts, users, or tags by search keywords.
- edit a single prompt.
- delete a single prompt.
- any visitor can view any creator's profile and copy their shared prompts.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/timmbach/hux-assessment-frontend.git
   ```

2. Navigate into the project directory:

```
cd hux-assessment-frontend
```

3. Install dependencies

```
npm install
```

4. Start nextjs app

```
npm run dev
```
