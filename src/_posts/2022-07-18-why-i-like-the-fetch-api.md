---
title: Why I like the Fetch API
date: 2022-07-18
tags:
  - JavaScript
description: A short thought on why I really like the Fetch API over some other HTTP APIs.
---

In JavaScript, I often see one of three libraries/APIs used to handle remote HTTP requests: (Node) Fetch, Axios and Got.
My experience with Got is limited, so in this article I will talk about Fetch and Axios. I like Axios since it provides
a great feature: the Axios instance. It allows you to create an instance of Axios with a prepared configuration, saving
lots of boilerplate within a larger project. It also has a nice [interceptor feature](https://axios-http.com/docs/interceptors)
which is kind of like a middleware for HTTP requests (I use it a lot to refresh access tokens).

## Errors are data

However, there is something about Fetch that I like a lot. Namely: how it handles errors. Let's take a look at the
[Fetch response interface](https://github.com/node-fetch/node-fetch/blob/main/%40types/index.d.ts):

```ts
export class Response {
	// ... Omitted
	readonly headers: Headers;
	readonly ok: boolean;
	readonly status: number;
	readonly statusText: string;
	// ...
}
```

As you can see, the response object returns a property "ok" so that you can
safely check if your request has or has not succeeded. It knows this by checking
if the status code is between 200 and 299. Once narrowed down, you could then
use it to parse your response body:

```ts
// Code simplified for demonstration purposes. May or may not work!

try {
  const response = await fetch('http://your.http/request')

  if (response.ok) {
    const payload = await response.json()

    return renderSuccess(payload)
  }

  const payload = await response.json()

  return renderError(payload)

} catch(err) {
  // handle thrown network errors
}

```

The difference with the error that is thrown and the error in the request object
is that the thrown errors are network errors (i.e. connection interrupted or
lost) and the errors in the response object are HTTP errors.

Many people don't like this interface as you can get the impression that you
need to handle errors twice. In my opinion, that's a good thing. The way users
experience network errors is very different from how users experience HTTP
errors.  This impacts how you should handle the error. Allow me to illustrate:

An unauthorized error (status code 401) often results in a friendly error
message and/or redirect. The user does not have the valid credentials required
to access what they want to access. There is a degree of recoverability that
requires user effort. You may even call this a "business error". That is, errors
that belong to the business logic of your application.

If the user's connection is lost during a request, Fetch should throw an error.
This is further away from a "business error", as it may mean that there is a
problem with the user's internet connection or device. Perhaps they are in a
tunnel? You could handle such errors by automatically retrying the request, for
example. In this way, you consider the chance that the user may have reconnected
to the internet.

Classifying our reasoning with regards to errors and handling them properly
helps you as a developer handle errors in a nice and pleasant way so that your
users get better user experiences. Errors are data after all, and do not need to
be handled as an afterthought.

## Caveats

Of course, these features are useless if the HTTP API you are consuming does not
make use of standardized status codes.  In some cases, every response (even
error or invalid responses) are received as a 200 response and you would have to
parse your requests manually according to the API you are consuming.

Additionally, Fetch is not great at detecting network timeouts (in fact, it doesn't have built in timeout handling at all).
[Sometimes it is not that great at detecting network errors in the first place](https://medium.com/to-err-is-aaron/detect-network-failures-when-using-fetch-40a53d56e36).

## It's more about mindset

Reasoning errors in such a way does not require a specific library. If you have
the discipline, you can safely and pleasantly handle errors that are thrown so
that you can use Axios or Got (or any other library) and make use of its
fantastic features.

## Also check out Elm

In recent months I've played around with [Elm](http://elm-lang.org/), a language for making client-side
apps that compiles to JavaScript. I won't go into details here, but in Elm you
must pattern match all the possible responses you could get from a HTTP request
so that you explicitly handle the different possible cases. It won't
compile if you don't do this.