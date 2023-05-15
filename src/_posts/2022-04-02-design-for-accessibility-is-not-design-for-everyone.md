---
title: 'Design for accessibility is not design for everyone'
date: 2022-04-02
tags:
  - Inclusion
  - Accessibility
description: 'As accessibility professionals we often feel that we have to get (corporate) buy-in by saying that "accessibility is not only for disabled people, but for everyone". I think this does a disservice to those most dependent on accessibility work.'
---

## The curb cut effect

As accessibility professionals we often feel that we have to get (corporate)
buy-in by saying that "accessibility is not only for disabled people, but for
everyone", sometimes referring to the [curb cut
effect](https://en.wikipedia.org/wiki/Curb_cut_effect). With this argument, we
hope to make a business case by removing the emphasis on disabled people and
instead put the focus on a vague broader population (a.k.a. the abled). I am
100% guilty of having made this argument in the past, but now I see some
downsides of this type of thinking.

I like to think the definition of "inclusion" being the explicit state in which
people who, in historical and/or socio-economic context, are disadvantaged.
Perhaps due to their gender identity, sexuality or (dis)ability. I emphasize
"explicit" because in order to be inclusive following this definition, you have
to consider the needs and rights of these groups. Nowadays I will be careful
when we start talking about accessibility being "for everyone", since I worry
what the consequences will be for the disadvantaged once we stop explicitly
thinking about their needs.

## Closed captions

In recent years we have seen more videos on the internet having closed
captions. Historically this has been most useful to the deaf and hard of
hearing, since viewers are no longer dependant on sound alone to watch a video.
It is almost as if abled people have recently "discovered" the convenience of
captons. Videos can be consumed in places where we don't want to play audio
(such as waiting rooms), we can hide what we're watching on our phones from
people in the same room and we can continue eating our crisps even during movie
scenes with lots of dialogue. As a result, we see advancements in technologies
such as audio recognition and translation, which unlocks our (cross-border)
media consumption.

However, in this push for widespread caption use, we started making kinetic
(animated) captions that add flashiness to a clip in expense of those who need
the subtitles to appear in a predictable place on the screen without it
disappearing too fast. Captions are appropriated in this way so that movie
trailers can be advertised to us while we're waiting at the dentist's office.
Captions aside, why do native language speakers get to enjoy clips captioned in
their language much more than native sign language speakers?

## How this can translate into web development

To take another example from web development: we often associate JavaScript
with inaccessible websites. They often move away from HTML semantics in favour
of custom and visually-biased implementations, are slow to load and do not
guarantee resillience in the same way HTML and CSS do. We come across
well-intentioned discussions and tutorials online on how we can make
JavaScript-less components, such as CSS-only dropdown or hamburger menus so
that our websites become more performant and better "for everyone". However, in
doing so, we stop caring about how assistive technologies need to know the
semantic relationship between toggle buttons and the elements they disclose,
their ARIA state, their focus order and so on. If we cared about the needs of
disabled people, we would realize that JavaScript is not necessarily the enemy
here. In fact, until we get more modern HTML standards, we often need
JavaScript. This is especially the case when we move away from making HTML
components and towards components that act like (native) UI elements. In many
cases, when you use ARIA, you become responsible to add the appropriate JavaScript
to make sure that the component works in predictable ways.

Do we avoid the focus on the disadvantaged because of stigma? Is it
uncomfortable to talk about? This reminds me of the [person first versus
identity first
debate](https://www.accessibility.com/blog/identity-first-language) and how we
like to pretend very obvious issues do not exist.

Is it internalized ableism that leads abled people to only care about issues if
it affects them? This reminds me of pretty much everything else we encounter in life.

Or that we think that there is less money to be made off of the disabled?

The cause is probably a bit of all of these, as well as many others that I am
not clever enough to think of.

In any case, I hope we can work towards a professional work environment in
which we don't feel the need to appeal to abled people to do the specialist
work that we offer. Let's just say accessibility is for disabled people. And
that that's absolutely okay.
