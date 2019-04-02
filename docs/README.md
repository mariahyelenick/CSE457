Wanna Date-a?

https://mariahyelenick.github.io/CSE457/

Running Notes and Ideas

3/24 Minutes

Discussing designs
- We are scrapping the idea of using a map as our primary design - our locations are more limited than previously thought and we believe there are better ways to represent the average users on OkCupid

- Showing mostly breadth and a little bit of depth of data, we are thinking of using a sunburst diagram, where ideally a user could pick an order of categories to filter data. This would be really could if someone wanted to see the number of profiles that fit into each hierarchy. One could look for, say, women in the bay area who have a pet.

- Maybe users could include/exclude specific categories as well? Still considering that option

Categories for the Sunburst
- Age (by groupings)
- Gender
- Location (categorical)
- Orientation
- Sign (categorical)
- Religion (categorical)

More Brainstorming
- The biggest concerns we have with the sunburst is that groups may get really small and difficult to view the further out from the center you go, so we might also want to have a visualization that allows for more depth for the user to explore data. Maybe some kind of clustering graph?

- We'd also like to represent the personal essays somehow, so a third part could be a senten tree of the text data, that could be filtered through interaction with the sunburst (and maybe the more in-depth graph if it's feasible to implement that)


Resources Used
- https://bl.ocks.org/kerryrodden/766f8f6d31f645c39f488a0befa1e3c8 (Sunburst Help)
- https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5 (Simpler Sunburst Help)
- https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript (finding objects with specific attributes)
- https://github.com/SortableJS/Sortable (drag order of attributes for sunburst)

3/28 Minutes
- We got the sunburst to work! 
- Right now you have to change the categories from the backend
- The draggable sortable options work but don't update the categories yet

To-Do's
- Update color schemes
- Get the draggable things
- Sententree when you click on a category

3/31 Minutes
- We were reviewing things and we realized that a lot of our data wasn't working anymore
- We fixed this by changing our checks in the csv file to all caps true
- We also created the github pages page for our repo so that it can be viewed by others.
- We aren't sure how to handle missing data like when people didn't fill out the ethnicity column or something like that
    - Should we leave it as a blank wedge or leave it filled in as None or space out the rest of the data to fill in the gap?
    
4/2 In Class Critiques

Critique 1
•	Are these clickable? – say that it’s draggable
•	What has changed? – show the new order
•	What is the data? People who responded to a survey? – need to have an intro blurb
    o	Seems like people who submitted info about themselves
•	How does relate to the title?
•	Hover placement is confusing
•	Add labels – not clear whatever is displayed is top three, can label within the sunburst
•	Consider different color scales
•	Can draw conclusions on the people that use the website
•	Pick top three priorities, generate a match
•	Separate the three in the circle from the rest of the list

Critique 2
•	What am I doing here?
•	Seems to figure out what the purpose is by title
•	Need to prompt to drag
•	Seems to be ordering by preference, except only the top three are actually relevant
•	Picking categories for soulmate
•	Like interaction with categories
•	Add two labels: give instruction with list, give hint about what the colors mean
•	Visualization makes sense
•	Is the circle one use or a group of users?
•	Give the top three partners – on click display a sample of profiles that fit the categories?
•	Not sure about the profile words; might get tricky

