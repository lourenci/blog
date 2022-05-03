---
title: Your computer has two clocks
date: 2022-04-29T20:12:00.000Z
updates: [2022-05-03T17:44:00.000+10:00]
tags:
- Technology
draft: false
---
You cannot realise that, but your computer has a battery inside it only to get your computer clock running. Back in the 90s, when the rechargeable (lithium-ion) battery was not cheap, we used to disassemble our computers to replace their clock battery when the computer could not keep the clock "on time" anymore. Yeah, your computer clock is a "thing".

Like your old wall-clock, it’s impossible to get the computer ones ticking at the precise time. Your OS tries its best to put it in sync, bringing a more accurate time from the internet (NTP servers), but it is its best after all.

## NTP Servers

Once in a while, your OS goes to the internet to prevent your computer's clock from falling (much) behind or ahead of time. Those servers are called NTP servers.

NTP servers are explicitly designed to tell other computers the "right" time. They, generally, have specific timer devices attached to them, like atomic clocks and GPS receivers. The communication your computer does with them is over a particular protocol called **N**etwork **T**ime **P**rotocol.

When your computer tries to reach an NTP server to its clock, other things have to be taken into account:

- your computer could take several seconds to talk to the server, so this "delay" (latency) should be considered;
- the server can potentially have the wrong time, like your computer.

NTP protocol is designed with specific algorithms to solve those (and more) issues.

![NTP servers](Pasted%20image%2020220428200328.png "NTP servers trying to get the most accurate time")

With that in mind, your OS provides you with two different clocks: the real-time clock and the monotonic clock.

## Real-time clock

The real-time clock is that one you stare at your computer when you are hungry and eagerly waiting for noon to have your lunch. When your computer clock gets out of sync, and the OS detects that through the NTP servers, the clock will be adjusted automatically.

Note that your clock could be ahead (or behind) of that time returned by the NTP server. The OS will adjust your computer clock accordingly.

## Monotonic clock

This is the clock that led me to write this post in the first place. I had no idea of this concept until I came across recently on it in the excellent book [Designing Data-Intensive Applications](https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications) by Martin Kleppmann.

This clock is a relative time since some base date that you get from your OS. The most popular is the Epoch one: number of seconds since 1 January 1970 (UTC).

When your OS detects through the NTP servers that its clock is ahead (or behind), the OS will not adjust this clock jump to that time but, instead, it will start to adapt its pace slower/faster to get it in sync with the more accurate date. This clock is guaranteed to never get back in time.

## Why is this important?

Your code should never rely on clocks, let alone the real-time ones! The problem is even worst in a distributed system when multiple machines are involved where each one has its concept of "now".

**Remember**: clocks are not stable and precise. The real-time clock can even go back in time.
