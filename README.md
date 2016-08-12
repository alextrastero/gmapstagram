### Description
Please build an application that uses the Google Maps API, and Instagram’s Search API to grab and
display the latest pictures by a location defined on the map, and allow the user to Like any number of
those photos. Please make any assumptions on your own and feel free to simplify or make the solution
more complex. Please write your assumptions if taken.

## Install
```
git clone git@github.com:alextrastero/gmapstagram.git
cd gmapstagram
npm install
npm start
```

### Bonus
```
npm test
```

#### Optional
You may require to have eslinst installed globally 👀

##### Assumptions
So, the app is in what Instagram calls 'Sandbox Mode' that means that only users that are invited to the app's
sandbox can log in. Therefor, the current state of this app is a hardcoded user/access_token which was inivited
the the app's sandbox.

I haven't implemented the LIKE functionality because why would a user Like it's own pictures, that said, if this
app went to production it would be as simple as adding a POST request to `//api.instagram.com/v1/media/{media-id}/likes`
when a user clicks on a like link under the picture.
