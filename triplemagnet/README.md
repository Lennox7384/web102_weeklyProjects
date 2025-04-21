# Web Development Project 7 Triple Magnet - *Startup Teams*

Submitted by: **Lennox Magak**

This web app: **Startup Teams, developed under the project name Triple Magnet, is a dynamic web application designed to connect entrepreneurs, innovators, and professionals in the startup ecosystem. Built with React and powered by Supabase for authentication and data management, Startup Teams enables users to create, edit, and manage startup profiles, explore a curated feed of opportunities, and foster collaboration by connecting with potential co-founders, team members, or advisors. The app features a sleek, responsive design with a professional user interface, including an intuitive header for seamless navigation, a polished footer with essential links and social media integration, and interactive elements like animated underlines and hover effects to enhance user engagement. Whether you're launching a new venture or seeking to join an exciting startup, Startup Teams provides a streamlined platform to build and grow your entrepreneurial network.**

Time spent: **68** hours spent in total

## Required Features

The following **required** functionality is completed:


- [X] **The web app contains a page that features a create form to add a new STARTUP**
  - Users can name the crewmate
  - Users can set the crewmate’s attributes by clicking on one of several values
- [X] **The web app includes a summary page of all the user’s added STARTUPS**
  -  The web app contains a summary page dedicated to displaying all the startup the user has made so far
  -  The summary page is sorted by creation date such that the most recently created startup appear at the top
- [X] **A previously created startup can be updated from the list of startup in the summary page**
  - Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - Users can see the current attributes of their crewmate on the update form
  - After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page 
- [X] **A previously created startup can be deleted from the startup list**
  - Using the edit form detailed in the previous _crewmates can be updated_ feature, there is a button that allows users to delete that crewmate
  - After deleting a crewmate, the crewmate should no longer be visible in the summary page
  - [x] **Each startup has a direct, unique URL link to an info page about them**
    - Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
    - The detail page contains extra information about the crewmate not included in the summary page
    - Users can navigate to to the edit form from the detail page

The following **optional** features are implemented:

- [X] A startup can be given a category upon creation which restricts their attribute value options
  - e.g., a Dungeons and Dragons class or a development team role (project manager, product owner, etc.)
  - User can choose a `category` option to describe their crewmate before any attributes are specified
  - Based on the category value, users are allowed to access only a subset of the possible attributes
- [X] A section of the summary page, displays summary statistics about a user’s startupS on their startup page
  - e.g., the percent of members with a certain attribute 
- [X] The summary page displays a custom “success” metric about a user’s startup which changes the look of the startup list
  - e.g., a pirate crew’s predicted success at commandeering a new galley


The following **additional** features are implemented:

* [X] Header and footer for easy navigation
* [X] A login process for authenticity. However for now, to browse the startups, you don't need to log in, to create one, you need to.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://i.imgur.com/bwys1vI.gifv' title='Video Walkthrough' width='' alt='Video Walkthrough' />


GIF created with ...  
[ScreenToGif](https://www.screentogif.com/) for Windows
## Notes

Please notice that crewmate object has been replaced by Startup as the object.
The intended functionality is still achieved. 

## License

    Copyright [2025] [Lennox Magak]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.