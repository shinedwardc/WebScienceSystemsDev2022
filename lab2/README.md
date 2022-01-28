# Edward Shin
# shine2
# Web Science Systems Development
# Lab 1

# Reflection
For this lab, I used an API from openweathermap.org, which provided a standard daily forecast.
First, I used geolocation to get latitude and longitude, so that I could put the location information into the API link to fetch the weather information of the user's location. 
I used getJSON to parse the API's weather data. I could access the element I wanted and added parts of the data to the corresponding HTML id.
I referenced a lot in mdbootstrap's website for card formatting and styling. The website also provided the gif images, from mdbgo.io/ascensus/mdb-advanced/img/. The gif background will change depending on the weather's status.
Overall, there were no parts that I got stuck in the lab in general. However, I could not make the gif weather background perfectly proportionate, even with bg-image.
I believe the API data is organized into three main parts, first for the coordinates, then the country/location's information, lastly with the 'main' weather information, such as temperature, humidity, etc. I believe the data is organized this way so that it is divided into sections, which first determine the location's information (coordinates), followed by a detailed description of that location's weather in an array.

Other APIs I have examined this week include login using social accounts, paying with PayPal, and Twitter bots. 
The login functionality uses the corresponding platforms' API to authenticate the user when the user logins. For example, the user can 'Login with Google', which will then load the application, use the API to check whether or not the user is already logged in or not. If not, a pop-up opens to confirm login information, which is confirmed by the API identification information.

With Paypal, when the 'pay with Paypal' button is pressed, the application sends an 'order', which will then authenticate the user to confirm the information matches the user, using OAuth 2.0 client's ID. If everything matches, the API sends confirmation of payment. The API helps ensure security and does not expose information to the end application.

Twitter bots also use APIs to automatically tweet based on a set of instructions. All of the bots are information fetched from Twitter API. The Twitter API can let bots tweet, or notify something specific when an event happens.



# Sources
For card styling: </br>
https://getbootstrap.com/docs/5.0/getting-started/introduction/ </br>
https://mdbootstrap.com/docs/standard/extended/weather/
</br>
https://mdbootstrap.com/docs/standard/content-styles/background-image/
</br>
Background Image: </br>
https://stock.adobe.com/search?k=%22weather+background%22
</br> </br>
https://tecadmin.net/get-current-date-time-javascript/
</br>
https://www.freecodecamp.org/news/how-to-center-anything-with-css-align-a-div-text-and-more/