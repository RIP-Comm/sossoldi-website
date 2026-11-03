---
title: "Launching an open source app — my 2 year journey"
description: "What I learned building Sossoldi from a Discord call to the App Store: roles that don't work, tutorial hell, and why the first users of an open source project are the other developers."
date: 2025-02-14T20:53:18Z
author: "Marco Perugini"
cover: "/assets/img/blog/launching-sossoldi.webp"
coverWidth: 1600
coverHeight: 963
translationKey: "launching-sossoldi"
category: "Open source"
---

In the last 3/4 years I've been following **[Mr.RIP](http://mr.rip)**, a blogger turned streamer who talks about **career** related stuff (mostly for people with a Computer Science background) and **personal finance**. Thanks to him, a little over two years ago, I joined his [Discord](http://mr.rip/discord) for a call with some other people that I had never met to talk about creating an app for tracking our net worth.

The idea was to start simple by first letting the user just track his income and expenses and then expand the app to help them track more assets like stocks, bonds, commodities and so on. Also the cardinal point was that the app should be [**open source** and free to use](http://sossoldi.com) (at least until any cost comes up). Seems simple, right? Wrong.

In this post I'll talk about all the **great and not so great things** that I learned during this journey. If you don't want to spend the time to read it and you are just wondering if it was worth it then I can answer you pretty briefly: **100% YES**.

## The start

I have to say that the call that I joined wasn't the first one of the project. There were already some people involved that were working on deciding the **language** and **framework** to use, and some screens were already there.

They landed on **Flutter** as the framework because they wanted the possibility to easily build on more than one platform, possibly supporting both desktop and mobile with only one repo.

I don't remember the exact details of that call, but two things stood out:

1. **Everyone** there was really excited about the project and wanted to help as much as they could.
2. **There wasn't any structure**, and what was done until that moment was by individual contributors who basically tried to implement each feature in the way they felt was more natural to them.

I was also really keen to help, but there was a big issue: I had never written a single line of Dart (the language used by Flutter) in my life.

During the call I discovered that there was someone who had actually started working on designing the app UX and UI. This someone was [Federico](http://federicopozzato.it). He did a fantastic job looking at what was currently on the market, and was starting to create a [Figma](https://www.figma.com/file/6NyY9yqunpbU7HIkbNEAL3/Sossoldi-App?node-id=0%3A1) with the screens just around that time. It was at this moment that it came to me that my job could be to **help build some structure** in the project by writing a Product Brief that could explain what each screen should do. That way the developers would know a bit more what they were implementing, and we could also discuss with Federico if something was either unclear or too difficult to implement at that time. That's how, without even knowing much about developing a mobile app, I became the **Project Manager of Sossoldi**.

## Your first clients are the developers

![A section of the Product Brief](/assets/img/blog/journey-132152.jpg)

A section of the Product Brief

It took some work, but after a few days [**the first version of the document**](https://docs.google.com/document/d/1dVLjDCQJEZb8yul7fIoL48q4DEtYOyED4_M0-A8pyBQ/edit?tab=t.0#heading=h.iq5rgyi97k3x) was ready: ~15 pages of screenshots and bullet points. At the start I also added a table with different roles (project manager, maintainer, frontend and backend contributor) in which everyone could write their name. The idea was to **start defining some roles** and clarify who could overlook each section of the app.

Unfortunately, this approach **wasn't effective**. It definitely helped a little bit in counting how many people were more or less involved, but what I didn't understand at the time was that this is not like working at a company: **you can't expect people to do something just because they said they might be interested**. What you need is to "sell" them the idea of the project and make them really feel like they are doing something important. This was probably the most important lesson that I learned while contributing to this project: in open source, if you are not going to do 90% or more of the work, then **the first clients are the other developers themselves**.

It took me a while to understand this, and it's probably why it took this much time to arrive at a beta. For long periods of time we expected that people would just come and build stuff because an issue on GitHub would say so, but it is much more complicated. You need to **interact** as much as possible, **communicate** what you are doing, try to **understand** if there are pain points that need to be resolved, and most of all show that there is more to it and that you have a **plan** for the future.

## Writing some code

![My first PR in the project](/assets/img/blog/journey-132351.jpg)

My first PR in the project

After some time spent writing docs and talking about what the app should do and look like, I felt like this couldn't be enough. How can I be the person who tries to overview the project **without actually contributing to it**? I'm a software engineer, I must be able to help with something even if I haven't done much in mobile development yet.

Here is where I made the same mistake that I always make when I want to try something new: I went down the **[tutorial hell](https://www.youtube.com/watch?v=343EWZS9O88)**. I started watching and searching for the perfect Flutter course, both free and paid. This was justified in my head because I also wanted to gather some resources for other people who maybe wanted to be part of the project but needed a place to start from.

After several days and a lot of hours on YouTube I realized that I **didn't really learn** much, and that if I wanted to actually learn how to use Flutter I should **just pick an issue and try to tackle it**.

After looking at all the open ones I saw one that seemed interesting: it was about creating a widget to display line graphs in the app. I felt like it wouldn't be too difficult — I just had to find a good library and then make it work for our use case.

I struggled with it for an entire weekend, but in the end, with a lot of googling and some help from ChatGPT (I try not to overuse it, but it can be a pretty good tool) I was able to get a good enough solution. So I opened the PR and then I waited.

The review process went **smoothly**, and the PR was **merged** with minimal changes. That was one of the **best** moments since I joined the project: seeing your work be **recognised** and merged is a great feeling. After that I also contributed to other sections of the app, mostly small changes, but in the future I want to try and challenge myself with **bigger parts** and see if I can actually do it.

## Achilles and the tortoise

After a few months the project was going great: a lot of people came and went, but there was pretty much always some activity.

The app looked great and we were adding everything bit by bit, to the point that I felt like a beta was just around the corner. I kept telling people that we were just a few months away, but after some time I realised that **for every step forward, we fell two steps behind the finish line**.

We even had a call with Mr. RIP in which we said that we were pretty much done and that we could **start planning a live with him** to present the project. That call was **9 months ago**.

This wasn't the fault of anyone specific, but we had to find a way out of it. That's when, after a few calls, we really defined what the *Minimum Viable Product* could be and decided to basically ignore everything else. *The dark theme resets every time you restart the app? Who cares.* We needed to focus on the **basics** and have them good enough.

This is when things really turned around, and we were **actually** getting closer.

## Getting there, finally

![The release announcement](/assets/img/blog/journey-132459.jpg)

On December 4th, 2024 we finally made a silent release on GitHub. We shared it with the people inside the project to see if it was good enough. We started finding some bugs here and there, but fortunately **nothing major** that should block the release — in the end this would be a beta, and people shouldn't be surprised to find bugs.

This is when we started the procedure to publish the app in both the App Store and Google Play. Fortunately one of the maintainers, [Luca](https://github.com/lucaantonelli), already had a developer account on both and offered to use them, without going through the hassle of creating a new one ad hoc.

Finally, after going through the review process on February 14th and more than 2 years since I joined the project, Sossoldi was available both for [**Android**](https://play.google.com/store/apps/details?id=com.ripster.sossoldi) and [**iOS**](https://apps.apple.com/app/id6740497000).

## Closing thoughts and what's ahead

This has been an **incredible journey**, and the thing that thrills me the most is that this is just the **beginning**. I had the pleasure of meeting a lot of beautiful and really talented people.

I had to learn a lot, and not only about Flutter or mobile development but also about **communicating** effectively, **planning**, and in general **easing** people into doing their best.

In the next weeks there are some changes that will take place. First of all we are going to focus on releasing the **first stable version** of the app, in which we will fix most of the bugs found but also add the possibility to **back up your data** into a CSV file. If you are interested in this project I invite you to **[join it](https://github.com/RIP-Comm/sossoldi)**, **try the app** and let us know what you think.

If you read this entire blog post I really appreciate it. I'll see you in the **next one**.
