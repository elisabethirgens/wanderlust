# Wanderlust

## CS50 Final Project

Wanderlust is a personal travel journal — using 9 years of data from my Untappd account — to savour memories from past trips.

Once upon a time, back in the days of a pre-pandemic world, I had the privilege of enjoying a lot of travel. My idea for [CS50 Final Project](https://cs50.harvard.edu/x/2021/project/) is to leverage my interest in traveling — and in this way make sure that I really do “create something that outlives this course” — because this is likely something I will continue to work on also after submitting this project.

I have registered beers on Untappd since 2013. I do like beer, but most of all, this application just happens to also be a rich source of data on where in the world I have been the past decade.

The main feature of the official Untappd service is a feed of what your friends are drinking. In addition to that, if you have a paid account, you can also access personal statistics. But those are focused on beers and breweries, which badges you have earned, your highest rated beers, and most frequently visited venues. I can for example see a list of top 5 countries, but those are country of origin for beers I have had — not countries where I have checked in. The content I am looking is different from what the official application (and their business model) revolve around. I want to figure out how to present different data — for me personally — focusing less on the beers and more on places I have visited.

---

## Researching the API 🕵🏻‍♀️

- Public Untappd API: [untappd.com/api/docs](https://untappd.com/api/docs)
- Untappd For Business: [docs.business.untappd.com](https://docs.business.untappd.com/)

Venues and breweries might be interested in [Untappd for Business](https://utfb.untappd.com/) but the public API is for developers like me, though you do have to apply for access. My application has been approved, and I have a personal API key consisting of Client ID and Client Secret. **Which endpoints will I be interested in?**

### User Activity Feed

- HTTP Method: `GET`
- Endpoint: `/v4/user/checkins/USERNAME`
- [untappd.com/api/docs#useractivityfeed](https://untappd.com/api/docs#useractivityfeed)

This gets me my check-in feed, which sounds exactly what I am looking for. What I don’t quite understand yet, is the `limit` parameter. The default is 25, but is 25 also the maximum number of check-ins I get from this endpoint? That’s no good when I want to access ~2500 check-ins 😅

```
https://api.untappd.com/v4/method_name?client_id=CLIENTID&client_secret=CLIENTSECRET
```

Okay we really should read up on [REST APIs](https://idratherbewriting.com/learnapidoc/) and figure out how to poke about responses in a browser. I can see now where the credentials go, and then where to insert the endpoint for user activity. I can add `&limit=5` to use the limit parameter, and playing around with it I soon discover that while 25 is not the maximum, I never get more than 50. That’s a hurdle, but I don’t yet see if it is a show stopper or not.

### Venue Info

- HTTP Method: `GET`
- Endpoint: `/v4/venue/info/VENUE_ID`
- [untappd.com/api/docs#venueinfo](https://untappd.com/api/docs#venueinfo)

There is also a `compact` parameter to remove recent check-ins, top beers +++ which sounds useful for my purposes. Example response excerpt:

```json
{
  "venue": {
    "venue_id": 182152,
    "venue_name": "BrewDog Nottingham"
    "location": {
      "venue_city": "Nottingham",
      "venue_country": "United Kingdom",
      "lat": 52.9541092,
      "lng": -1.1436979
    },
}
```

### Perhaps I don’t actually need API calls?! 🤯

I remember from previous years of having a paid account, that one of the perks is **exporting data**. Let’s see what data we get access to then. Oh my… okay. So how I understand it after studying my export:

The way these APIs are designed — my best approach to get the data for a personal travel journal is to skip the API — and instead export my data as `csv` or `json`. Current conclusion is that I don't need the API for any of the most important things I want to do, but I can definitly hang on to the opportunity as an add-on later. Perhaps something like making a request for additional [Beer Info](https://untappd.com/api/docs#beerinfo) or [Brewery Info](https://untappd.com/api/docs#breweryinfo)?!

## Export Data

My first thought was that the export could get me past the limit in the API, then I could call the API to get additional info. But I see now that the export already has _everything_ I am interested in, all the venue info and even `photo_url`. Each check-in comes with over 30 data points, here is an example excerpt of the most relevant:

```json
[
  {
    "beer_name": "Svartediket Black IPA",
    "brewery_name": "7 Fjell Bryggeri",
    "venue_name": "Apollon Platebar",
    "venue_city": "Bergen",
    "venue_country": "Norge",
    "venue_lat": "60.3897",
    "venue_lng": "5.32309",
    "created_at": "2015-01-31 21:36:51",
    "photo_url": null
  }
]
```
