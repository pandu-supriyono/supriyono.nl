---
title: 'Usign Elm in production: what I learned'
date: 2022-07-25
tags:
  - Elm
  - Functional programming
description: "In March, I used Elm to build an appointment picker for one of my clients. There were good parts to the experience and there were bad parts."
---

## Elm

Elm is one of my favourite languages to build front-end applications. It's a ton
of fun to use and it makes you feel clever. If you haven't heard of Elm, it is
a functional programming language that compiles to JavaScript in the browser.
Because it is functional, it is extremely reliable -- its type inference forces
you to check for every possible error case and doesn't allow you to introduce
untyped side effects.

In March, I managed to build an appointment picker app using Elm. It's an app
built as part of the online passport service form for the Embassy of the Republic
of Indonesia in The Hague. I'd like to share my experiences in making this app.

## The good parts

The app I wrote was done within half a day. The type inference and the friendly
error messages that the compiler gave me allowed me to type away with
confidence, without needing to check my browser often. The syntax also allowed
me to be very expressive with how I modeled the domain, so I could make sense of
my code extremely easily. If I did need to check on my browser, the compilation
time was quick which allowed me to switch between my code editor and browser
comfortably.

I'm also a fan of the idea that you need to pattern match every possible error case.
In the appointment picker, this was mostly an area of concern when fetching the available
appointment dates from the server as well as when remotely validating if the selected appointment
slot is (still) available. Pattern matching the error cases allowed me to handle errors appropriately
in a structured manner. 

## The bad parts (which, in hindsight, are not so bad)

The main problem I had during my experience is that there is no built-in
functionality to deal with JavaScript DateTime objects in Elm. The payload I
receive from a server request to, for example, see which appointment slots are
available, return date information in JavaScript DateTime objects. To address
the issues which might arise with regarding to standardization and dates, Elm
developers use Posix instead. I grabbed an external library to parse ISO-8601
date strings (from JSON parsed DateTime objects) to Posix, and used it as a
decoder for my HTTP request.

```elm
import Iso8601 as DateTime

availabilityDecoder : Decoder Availability
availabilityDecoder =
    Decode.map2 Availability
        (field "time" DateTime.decoder)
        (field "slots" Decode.int)
```

I then had to grab another library that contains Posix transformations to be able
to format times in certain timezones.

```elm
import Time exposing (Posix)
import TimeZone exposing (europe__amsterdam)

amsterdamZone : Time.Zone
amsterdamZone =
    europe__amsterdam ()

formatTime : Posix -> String
formatTime posix =
    let
        appendZero str =
            if String.length str == 1 then
                "0" ++ str

            else
                str

        hour =
            posix |> Time.toHour amsterdamZone |> String.fromInt |> appendZero

        minute =
            posix |> Time.toMinute amsterdamZone |> String.fromInt |> appendZero
    in
    hour ++ ":" ++ minute

``` 

For this specific use case, that's all there is to it when it comes to
"not-so-nice" developer experience, although I understand why you would not want
to use ISO-8601 to represent dates in code. ISO-8601 dates sometimes include a
UTC offset, but they are not the same timezones that we use in daily life. They
represent the difference in hours and minutes from Coordinated Universal Time and do not
capture daylight saving times and other social-political restructuring.

I just wish there were more built-in functionalities to deal with parsing and
formatting dates since we need to use it so often. But if that's my only problem with Elm
right now, I'd say I'd probably use it again for a small-scale production app in the future.