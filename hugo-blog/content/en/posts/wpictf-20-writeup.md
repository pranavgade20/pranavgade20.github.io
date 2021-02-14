---
title: WpiCTF Writeup
date: 2020-04-21
description: Writeup for trollcat CTF from 6th Feb, 2021
draft: false
hideToc: false
enableToc: true
enableTocContent: true
tags:
- writeup
- ctf
categories:
- writeup
series:
- CTF Writeups
---

### block gate

This is a writeup for the 'block gate' challenge from WPICTF 2020.

![2020-04-21_19-00](/blog/images/wpictf-20/2020-04-21_19-00.png)

This is a forensics challenge, and we are given a [minecraft world](http://us-east-1.linodeobjects.com/wpictf-challenge-files/block-gate-world.zip). 

As soon as we enter the world, we see a column of water falling--wrecking redstone circuits doubtlessly important to the whole affair.

![2020-04-21_18-06_1](/blog/images/wpictf-20/2020-04-21_18-06_1.png)  

So, after reloading the world, we can use gnembon's [carpet mod](https://github.com/gnembon/fabric-carpet) to stop the flow of water using the `/tick freeze` command. This is how it looks after that:

![2020-04-21_18-04](/blog/images/wpictf-20/2020-04-21_18-04.png)

Now, we can take our time in clearing out the water by filling that region with air using the `/fill`command:

![2020-04-21_18-09](/blog/images/wpictf-20/2020-04-21_18-09.png)

To see the effects, we need to un-freeze the game using `/tick freeze` and boom, the water disappears:

<img src="/blog/images/wpictf-20/2020-04-21_18-09_1.png" alt="2020-04-21_18-09_1"  />![2020-04-21_18-51](/blog/images/wpictf-20/2020-04-21_18-51.png)

Now, we can start looking at the redstone circuit. A closer look shows us that two of the connections might be missing:![2020-04-21_18-10](/blog/images/wpictf-20/2020-04-21_18-10.png)

And we have 2 vacant inputs for the output panel as well: ![2020-04-21_18-09_2](/blog/images/wpictf-20/2020-04-21_18-09_2.png)

We can try connecting them so the circuit is complete:![2020-04-21_18-20](/blog/images/wpictf-20/2020-04-21_18-20.png)

(The repeaters are for extending the signal)

Finally, we can look at the output. It looks like they are 7 segment displays, and a quick google search gives us the corresponding symbols:

![2020-04-21_18-23](/blog/images/wpictf-20/2020-04-21_18-23.png)

We can see the 7 segment displays, and their corresponding symbols.

Now we have practically solved the challenge. All we need to do is read the displays as they light up and we can get our flag! However, since this is repeating in a cyclic pattern, we need to figure out the beginning of the sequence. We do know that the flag is supposed to start with WPI{, so we can use that to find the start of the sequence.

To make writing down the sequence easier, we can use `/tick rate 10` to halve the speed of the sequence(or `/tick rate 5` for quarter speed and so on). Now all we need to do is write down the flag as it appears and we get our flag!
