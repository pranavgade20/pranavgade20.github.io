---
title: CompileGPT - the perfect compiler
date: 2023-04-21
description: Using GPT-4 to compile programs into assembly, plus assembling and linking 
draft: false
hideToc: false
enableToc: true
enableTocContent: true
libraries:
- mermaid
tags:
- gpt
- compilers
- AI
categories:
- AI
---

I love compilers. They make modern software possible, by taking source code humans can work with, and transforming it into code computers can actually execute. However, compilers have a problem - they throw error messages all the time. Wrong syntax? ERROR! Forgot a bracket? ERROR! Missing semicolon? ERROR! This gets really annoying, and is a critical bottleneck in developer productivity. Imagine the thousands of developer-hours that could be saved if we never had to deal with this problem again, especially halfway through perfectly good build pipelines.

Luckily for us, we live in the age of AI! So, we just need to ask OpenAI's GPT nicely to compile programs for us. So, that's exactly what I did. Once we have a compiled program, we can simply assemble, link, and run it. For demonstration, consider this C program, which has a few obvious problems:

```c
#include <stdio.h

int main()
{
    printf("Hello, world!\n")
    return 0
}
```

I modified my [gpt-chat-cli script](https://github.com/pranavgade20/gpt-chat-cli/blob/master/chat.sh) to include a system prompt asking GPT to behave like a compiler, and save the output to a file `a.S`, which can be found [here](https://gist.github.com/pranavgade20/00a242c91134bfac3c8235f662dbe82c). Running the script on a simple C program looks something like this:

````
$ cat a.c | bash compilegpt.sh
GPT:
I found two errors in your code:

1. Missing '>' in '#include <stdio.h'
2. Missing ';' after 'printf("hello, CompileGPT")' and 'return 0'

Here's the corrected version of your code:

```c
#include <stdio.h>

int main() {
    printf("Hello, CompileGPT");
    return 0;
}
```

Now, let's compile it into assembly code using AT&T syntax:

```assembly
    .file   "main.c"
    .section        .rodata
.LC0:
    .string "Hello, CompileGPT"
    .text
    .globl  main
    .type   main, @function
main:
.LFB0:
    .cfi_startproc
    pushq   %rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    movq    %rsp, %rbp
    .cfi_def_cfa_register 6
    subq    $16, %rsp
    movl    $.LC0, %edi
    call    puts
    movl    $0, %eax
    leave
    .cfi_def_cfa 7, 8
    ret
    .cfi_endproc
.LFE0:
    .size   main, .-main
    .ident  "GCC: (GNU) 12.2.1 20220107 (CompileGPT v4.0.0)"
    .section        .note.GNU-stack,"",@progbits
```

````

We can then compile the code written to `a.S` with [gas](https://ftp.gnu.org/old-gnu/Manuals/gas-2.9.1/html_node/as_3.html#SEC3), the  gnu assembler: 

```bash
as a.S -o a.o
```

This gives us an assembled object file, but it hasn't been linked yet. So, it does not know what anything outside the program itself looks like - it has no idea about what `printf` is referring to, for example. To link it, we can use `ld`, the GNU linker:

```bash
ld -m elf_x86_64 -dynamic-linker /lib/ld-linux.so.2 -o a a.o /usr/lib/crt1.o /usr/lib/libc.so /usr/lib/crti.o /usr/lib/crtn.o
```

We can now execute our binary, written to the binary:

```
$ ld.so ./a
Hello, CompileGPT
```

And it works!

To try CompileGPT yourself, you can download the script to call OpenAI APIs [here](https://gist.github.com/pranavgade20/00a242c91134bfac3c8235f662dbe82c), and run the following commands to experience the next generation of compiler technology.

```bash
cat a.c | bash compilegpt.sh
as a.S -o a.o
ld -m elf_x86_64 -dynamic-linker /lib/ld-linux.so.2 -o a a.o /usr/lib/crt1.o /usr/lib/libc.so /usr/lib/crti.o /usr/lib/crtn.o
ld.so ./a
```

