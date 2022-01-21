# Edward Shin
# shine2
# Web Science Systems Development
# Lab 1

# Reflection
For this lab, I first parsed xml news article data with a bunch of rss websites, converted the xml files to one json file.
For the implementation of fetching json data and displaying, I first thought of making an array, which each element holding value objects of a news article's title, link, date, and description. Then, the first 5 articles are appended to id #articles in html, and starting from there the top (first) article (child) is removed, and the next in order pops out. For this, I implemented the create article function, which was mainly for formatting the displayment. I was stuck in a couple of parts, but mostly in thinking how to parse the data effectively. At first, getJson did not work, which made me struggle in figuring out where I was doing wrongly.
I also struggled in finding how to fix this one error I found, which was that when the user is not looking at the page, the first child does not get removed, and the articles keep on stacking up. I still do not know why this happens, but it is probably from a small part of error.

# Sources
https://stackoverflow.com/questions/1144705/best-way-to-store-a-key-value-array-in-javascript/1144737
https://www.gobiznow.com/blog/mastering-jquery/using-jquery-getjson-method/ </ br>
https://getbootstrap.com/docs/4.0/components/card/
