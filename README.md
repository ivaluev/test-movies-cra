# Check and update

[x] * reshape state
[ ] * verify solution to store image url (now we import it)
[ ] * check pattern of button component setup (maybe import it to see)
[x] * Add immer
[ ] * Add hook - useStateSelector
[ ] * think about storing constants?


# Mews frontend developer task

You should start with creating a fork of the repository. When you're finished with the task, you should create a pull request.

Your task will be to create a simple movie search application. The application will have 2 views - search and movie detail. The search view is the default view, and should contain search input and display paginated list of found movies with a way to load additional batch. Search should start automatically after typing into the input is finished - there is no need for a search button. Clicking on a movie gets you to the movie detail view where detailed information about the movie should be listed.

To retrieve information about movies, use [TheMovieDb API](https://developers.themoviedb.org/3/getting-started/introduction). You can use our api key to authorize requests:

```
03b8572954325680265531140190fd2a
```

## Required technologies

To test your proficiency with technologies we use the most, we require the solution to be written with use of React, Redux and styled-components. Use of any additional libraries is allowed and it's up to you.

Using the following apis for search

https://api.themoviedb.org/3/search/movie?api_key=03b8572954325680265531140190fd2a&query=Jack+Reacher

Usinf the following api for detail

https://api.themoviedb.org/3/movie/343611?api_key={api_key}
