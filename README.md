# Using fetch() - POST and PATCH

## Learning Goals

- Explain how to add new data to a backend using POST
- Explain how to update data on the backend using PATCH
- Use forms to initiate data transfer to the server

## Setup

This is a code-along lesson. Please fork and clone this lesson before
continuing.

## Introduction

In the previous lesson, we learned how to using `fetch` to ask our server for
data - how to perform a GET request.

In this lesson, we'll tackle the next step in communicating with the server -
sending data _from_ the Frontend _to_ the Backend.

There are two key HTTP methods we'll be playing around with in this lesson -
`POST` and `PATCH`.

A POST request is used when we want to add entirely new data to our database (in
this case, our `db.json` file).

Imagine that you're YouTube, and you need to allow users to post new videos. Or,
imagine you're Instagram, and your users want to post new pictures.

In each case, you'll need a way to send that data from the Frontend to the
Backend to create a brand new entry in your database. That's what the `POST`
HTTP method is for.

We also send data from the Frontend to the Backend with PATCH, but for different
reasons. Instead of _creating_ new data, we use PATCH to _update_ existing data.

Let's say one of our Instagram users wants to update the caption for an image.
Instagram will need to run a PATCH request to change that information on its
Backend.

We'll dive into talking about POST first!

## Creating New Data - POST Requests

As you may remember, sending a basic `GET` request just involves passing a URL
to fetch:

```JavaScript
fetch('http://localhost:3000/data')
```

A `POST` request is a little bit more complicated. We need to include
information telling our server that we're POSTing data, the type of the data
we're POSTing, and the actual information we want to POST.

In order to do this, we need to pass fetch a second argument - an object
containing all that information.

Here's what that object will look like. We've included a second example object
containing data we want added to our server (let's imagine we have a dog-walking
application and are entering a new dog in our database).

```JavaScript
const newDog = {
  breed: "Boston Terrier",
  age: 7,
  name: "Snurfle"
}

const postObj = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }, 
  body: JSON.stringify(newDog)
}
```

In the example above, the `newDog` object represents the data we want to send to
our server, and the `postObj` object represents the object that we'll pass to
`fetch` as our second argument:

```JavaScript
fetch('http://localhost:3000/dogs', postObj)
```

Let's break down the different pieces of our POST Object

## The POST Object

You'll notice that our postObj has three keys - `method`, `headers`, and `body`.

### Method

The `method` key references the HTTP method that we're using in the request. Our
Backend will look at this HTTP method to determine what it should do with the
data that's being sent up from the Frontend. By using the `POST` HTTP header,
we're telling our backend that we want it to create a new piece of data in our
database.

```JavaScript
method: 'POST' // tells our server how to handling the incoming request
```

### Headers

The `headers` key includes additional "meta-data" about the request. In this
case, our `headers` key references another object, which itself contains two
keys.

```JavaScript
headers: {
   'Content-Type': 'application/json',
    Accept: 'application/json'
}
```

The `Content-Type` key tells the server the type of content that's being set up
from our frontend to our backend. Note that the `Content-Type` key is wrapped in
quotes, as its format means it's a non-standard key.

The `Accept` key specifies the type of data the client will be able to
understand when the server sends back its response.

Both of these are set to the value 'application/json', which is a Multipurpose
Internet Mail Extention (or
[MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types))
type.

### Body

Finally, we have the `body` key, which references the actual data we want to
send up!

In order to send this data from our Backend to our Frontend, we first need to
convert it into JSON. This is where the `JSON.stringify` method comes in.

We pass in our data object to the `JSON.stringify` method which receives it and
returns a JSON-ified version of that object. (You can think of it as the
_opposite_ of the `.json()` method we discussed in the previous lesson.)

```JavaScript
body: JSON.stringify(newDog)
```

Congratulations! You can now send new data from the Frontend to the Backend
using a `POST` request!

## Handling the POST Response

While a `POST` request is different from a `GET` request - we're adding some new
data, rather than requesting existing data - our server is still going to send
some information back to us once the request has completed.

What info does it send back? The newly created piece of data that we sent up!

Why would a Backend be set up to do this? Well, maybe we want to use that newly
added data on the Frontend.

If an Instagram user adds a new picture, for example, we want that picture to
immediately display within their list of pictures on the Frontend.

JSON Server is configured to automatically send back the newly created piece of
data as a response. Custom Backends don't _have_ to send back data as a
response, but it's conventional to do so - the needs will often be dictated by
the nature of an application itself.

The manner in which we handle the response is identical to the way we handle a
response in a `GET` request. We'll need to first parse our response using the
`.json` method, then pass that parsed data to whatever functions we want to use
to update our Frontend:

```JavaScript
fetch('http://localhost:3000/dogs', postObj)
.then(r => r.json())
.then(data => {
    // do something with data
})
```

## Updating Data - PATCH Requests

`PATCH` request are actually quite similar to `POST` requests. Like `POST`
requests, we pass `fetch` two arguments when making a `PATCH` request - the
appropriate URL and the configuration obj that we'll use to send data from the
Frontend to the Backend.

However, there are a few subtle differences between the two. Let's explore!

## The PATCH URL

When dealing with `POST` requests, we simply had to pass in the URL of a
specific resource within our Backend - `'http://localhost:3000/dogs'`, for
example.

With `PATCH` requests, we have to be a little bit more specific. Because we're
updating a piece of _existing_ data, we have to point our Backend toward the
specific piece of data we want to update.

We do this by including the ID of a specific resource in the URL of our `fetch`
request: `'http://localhost:3000/dogs/1'`.

This tells our Backend to look within the `dogs` resource for the data entry
that has an ID of `1`.

## The PATCH Config Object

As you may have guessed, our configuration object will also have to be a little
bit different. It will have all of the same keys as our `POST` configuration
object - `method`, `headers`, and `body` - but `method` and `body` will have
slightly different values.

### Method

Perhaps unsuprisingly, the `method` for our `PATCH` config obj will be set to
`'PATCH'`. This tells our server the our client is sending back a `PATCH`
request:

```JavaScript
method: 'PATCH'
```

### Body

The difference between a `PATCH` body and a `POST` body is a little more subtle.

In a `POST` request, we had to send up _all_ the data about a new entry to our
Backend.

In a `PATCH` request, we only need to send up data _about the specific fields
that are being updated_.

Let's say `Snurfle`, our dog from our earlier example, has a birthday! Instead
of being 7, Snurfle is now 8 - we'll need to update that information in our
database.

However, all of Snurfle's other attributes haven't changed. Snurfle is still a
Boston Terrier and is still named "Snurfle" (tragically).

So, instead of sending data that we aren't changing to our server, `PATCH`
allows us to send only the `age` field in the body of our request:

```JavaScript
const updateSnurfle = {
    age: 8
}

const patchObj = {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(updateSnurfle)
}
```

## Handling the PATCH Response

As with our `POST` request, our server will send back the newly updated object
once the request has completed.

Note that while we only send up a _portion_ of the piece of data we're updating,
the server will still send back _all the data_ about that entry in our database.

Once again, a custom Backend will allow you to tweak the rules to fit your
needs, but JSON Server will just send back the full data object as its response.

The format for handling this response is the same as handling responses for both
`GET` and `POST` requests:

```JavaScript
fetch('http://localhost:3000/dogs/1', patchObj)
.then(r => r.json())
.then(data =>{
    // do something with data
})
```

## All Together

All together, our full `PATCH` request might look something like this:

```JavaScript
const updateSnurfle = {
    age: 8
}

const patchObj = {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(updateSnurfle)
}

fetch('http://localhost:3000/dogs/1', patchObj)
.then(r => r.json())
.then(data =>{
    // do something with data
})
```

## Dynamically Setting the URL

Let's look at the previous code example - we're updating Snurfle to have a new
age, which is all well and good, but what if Snurfle didn't have an ID of `1`?
How would we know what ID to add to our `PATCH` URL?

In most cases, we will have to _dynamically_ set the URL on our Frontend. That
means we'll need to somehow capture the ID of whatever piece of data we're
updating, then use string interpolation to add that ID to the URL:

```JavaScript
fetch(`http://localhost:3000/dogs/${id}`, patchObj)
```

### A Working Example

Let's walk through an example of how we can do this.

There is some code set up already in `patch-example.js` that we're using to render some data to the page.

