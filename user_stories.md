## Goal:  To help BusMall to do market analysis on their proposed product to test the potential customer interest

### User scenarios

As the focus group participants, they'd like to browse all the products easily during the time on bus and probably purchase some popular products in the future.

The marketing research team from BusMall wants to know which products have the potential. They'd like to do research by obtaining data from the app participants use

As the developer, I'd like to make the interface fun and easy to assess for the app users. At the same time, I want to provide a concise and accurate statistical dataset for the marketing research team.

### User stories

As the participants, they'd like to
* have an easy user interface (MVP)
* browse appropriate amount of images every time (MVP)
* does not want to see duplicate images at the same time or just showed before (MVP)
* checkout if the products they choose is popular (MVP)
* has the option to checkout more details for the products (stretch goal)
* has the option to watch a video about the product (stretch goal)

As the marketing research team, they'd like to
* see which product gets the highest rating (MVP)
* see if the rating is related to the times the image has been displayed (MVP)
* want to limit the sample size so they can obtain the dataset quickly (MVP)
* generate a graph based on the data and has more statistical info (stretch goal)

As the developer, I'd like to
* make the interface simple and easy to use (MVP)
* show the images in a nice and simple way (MVP)
* store the click and display data as well as display them for both the research team and the users to review (MVP)
* edit the pictures to make them more attractive (stretch goal)
* at the same time, make the interface look modern (stretch goal)

### Technical Requirement
#### MVP
* images of proposed products
* game logic: 20 images shown in 25 times with 3 images showing side by side each times, and the user click the product they like.
* each click is counted and stored. each time an image showed is counted and stored.
* after the 25 selection, display the click times of the same image, the times an image shown and the ratio of the times that an item was clicked out of the total number of clicks
* need a constructor function for images which will have the following properties:
  - image names
  - filepath
  - number of times shown
  - number of times clicked
  - image id
