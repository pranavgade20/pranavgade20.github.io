---
title: TrollcatCTF Writeup
date: 2021-02-08
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

I participated in TrollCAT CTF with my team, [Pwnzorz](https://ctftime.org/team/120438), this weekend, and we placed 2nd! Considering that this was our first CTF in quite a while, we did really well, thanks to my amazing teammates [Aayushman](https://www.aayushman.me/), [Nils](https://www.nilsand.re/), and [Uzay-G](https://www.uzpg.me/). Here are the writeups for the challenges I completed.

### Reversing -  Solver

The challenge, archived [here](https://github.com/cscodershub/TrollCAT-CTF/tree/main/Reversing/rev/solver), says `can you guess the password?` and gives you a binary to reverse. Using ghidra, we get the following disassembly:

{{< highlight c>}}

if ((int)input[3] + (int)*input == 100) { 
     if ((int) input[0x12] + (int) input[1] == 0xd6) { 
       if ((int) input[4] + (int) input[2] == 0xb2) { 
         if ((char) (input[6] ^ input[5]) == 0x4c) { 
           if ((int) input[8] - (int) input[7] == 0x11) { 
             if ((int) input[10] - (int) input[9] == 0x3b) { 
               if (((int) input[0xb] + (int) input[0xc]) - (int) input[0xd] == 0x45) { 
                 if (((int) input[0xe] + (int) input[0xf]) - (int) input[0x10] == 0x1f) { 
                   if (((int) input[0x11] + (int) input[0x10]) - (int) input[0x12] == 0x58) { 
                     if ((char) (input[0x15] ^ input[0x13] ^ input[0x14]) == 0x45) {

{{< /highlight >}}

Now, you could be smart, and know that you are supposed to use [the z3 solver](https://github.com/Z3Prover/z3), or you could be me. I thought that it did not look very complex, so I got a pen and paper and started solving it manually. For example, the first line wants the sum of the fourth and first characters to be 100. So, I just assumed both of them to equal 50, which is 2 in ASCII. Similarly, I solved all of them manually in about 30 minutes. Finally, one input satisfying all the conditions is `2lY2Y4xAR?zEEE@@aajEEE`. Finally, after connecting to the server using nc, we are asked the key. Giving it `2lY2Y4xAR?zEEE@@aajEEE` gives us the flag!

### Web - Nested Exploration

The challenge is a link, and a hint saying something nice happens when we submit 69 times.

Looking at the requests in devtools, we can see that a POST request is made, followed by a GET request. The response of the POST request is empty, and the response of the GET request is the webpage with n forms, where n is the number of times we have submitted the form. I noticed that the request parameter has a number, and tried changing it to 69. However, this still gave me the same response. Then, I tried to look at the cookies set by the website. Sure enough, there was a cookie with a number that increased every time I submitted the form. I just set this to 68 and submitted the form, and sure enough, the flag was in a div in the end.