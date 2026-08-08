```markdown
---
title: "OverTheWire Bandit - Level 1"
description: "Beginner-friendly walkthrough of OverTheWire Bandit Level 0 to Level 1, including SSH login, Linux home directory, files, ls command, cat command, passwords, authentication, and moving to the next level."
platform: "CTF"
category: "OverTheWire - Bandit"
difficulty: "Beginner"
date: "19-062026"
tags:
  - OverTheWire
  - Bandit
  - Linux
  - SSH
  - Linux Commands
  - ls
  - cat
  - Files
  - Home Directory
  - Authentication
  - CTF
---

# OverTheWire Bandit — Level 1

## Introduction

Bandit Level 1 ko technically **Level 0 → Level 1** bhi kaha jata hai.

Is level mein humein Bandit Level 0 ke server par login karke ek file ko read karna hai. Us file mein next level, yani `bandit1`, ka password stored hai.

Official challenge ke according, next level ka password home directory mein present `readme` naam ki file ke andar stored hota hai. [28]

Is level mein hum mainly ye Linux commands seekhenge:

- `ls`
- `cat`
- `pwd`
- `cd`
- `exit`

---

## Objective

Level 0 se Level 1 move karne ke liye:

1. `bandit0` user ke through SSH se login karein.
2. Current directory mein available files dekhein.
3. `readme` file ko read karein.
4. File ke andar stored password copy karein.
5. Us password se `bandit1` user ke through login karein.

---

## Provided Credentials

Level 0 par login karne ke liye:

```text
Username: bandit0
Password: bandit0
Host:     bandit.labs.overthewire.org
Port:     2220
```

Next level ke liye humein `readme` file se password find karna hoga.

Challenge ka structure:

```text
Current Level:  bandit0
Required File:  readme
Next User:      bandit1
```

---

## Level 1 Mein Use Hone Wale Concepts

Is level mein hum in concepts ko samjhenge:

- SSH login
- Remote server
- Linux home directory
- Current working directory
- Files and directories
- `pwd` command
- `ls` command
- `cat` command
- Relative file path
- File contents
- Password extraction
- Next level login
- `exit` command

---

# Linux File System Basics

## File Kya Hota Hai?

File ek container hoti hai jisme information store hoti hai.

Examples:

```text
readme
password.txt
notes.md
config.conf
image.png
```

File ke andar text, password, code, configuration ya koi other data ho sakta hai.

Bandit Level 1 mein password ek file ke andar store hai:

```text
readme
```

---

## Directory Kya Hoti Hai?

Directory ko commonly folder bhi kaha jata hai.

Directory ka use files aur doosri directories ko organize karne ke liye hota hai.

Example:

```text
home/
├── bandit0/
│   └── readme
└── bandit1/
```

Yahan:

- `home` ek directory hai.
- `bandit0` ek user directory hai.
- `readme` ek file hai.

Linux mein folders ko generally directories kaha jata hai.

---

## Home Directory Kya Hoti Hai?

Har Linux user ka ek personal home directory hota hai.

`bandit0` user ke liye home directory generally is location par hoti hai:

```text
/home/bandit0
```

Jab aap `bandit0` user se SSH ke through login karte ho, to aap usually us user ki home directory se start karte ho.

Home directory ko short form mein tilde symbol se represent kiya jata hai:

```bash
~
```

Agar prompt kuch is tarah dikhe:

```text
bandit0@bandit:~$
```

To iska matlab hai ki aap `bandit0` user ki home directory mein ho.

---

## Current Working Directory Kya Hoti Hai?

Current working directory woh directory hoti hai jahan aap is waqt kaam kar rahe ho.

Current directory check karne ke liye `pwd` command use hoti hai.

```bash
pwd
```

Expected output:

```text
/home/bandit0
```

`pwd` ka full form hai:

```text
Print Working Directory
```

Agar aap kisi file ko directly access karna chahte ho, to aapko ye pata hona chahiye ki aap kis directory mein ho.

---

# Linux Commands

## 1. `pwd` Command

`pwd` command current working directory ka complete path display karti hai.

Command:

```bash
pwd
```

Expected output:

```text
/home/bandit0
```

Is output ka meaning:

```text
/
```

Root directory ko represent karta hai.

```text
home
```

Users ki home directories ka parent folder hai.

```text
bandit0
```

Current user ki home directory hai.

Complete path:

```text
/home/bandit0
```

---

## 2. `ls` Command

`ls` command current directory ke andar available files aur directories ki list display karti hai.

Command:

```bash
ls
```

Expected output:

```text
readme
```

Iska matlab hai ki current directory mein ek file available hai jiska naam `readme` hai.

`ls` ka full meaning commonly **list** samjha jata hai.

### Basic Usage

```bash
ls
```

Current directory ki files show karega.

### Detailed List

```bash
ls -l
```

Ye files ki detailed information show karega, jaise:

- File permissions
- File owner
- File group
- File size
- File modification time
- File name

Example:

```text
-r-------- 1 bandit1 bandit1 33 Aug 8 20:00 readme
```

### Hidden Files Dekhna

Linux mein dot `.` se start hone wali files hidden hoti hain.

Hidden files dekhne ke liye:

```bash
ls -a
```

Detailed hidden files ke liye:

```bash
ls -la
```

Is level ke liye simple command sufficient hai:

```bash
ls
```

---

## 3. `cat` Command

`cat` command ka use file ka content terminal par display karne ke liye hota hai.

Command ka format:

```bash
cat filename
```

`readme` file read karne ke liye:

```bash
cat readme
```

Command run karne ke baad file ke andar stored password terminal par display hoga.

Example:

```text
bandit0@bandit:~$ cat readme
PASSWORD_FOR_BANDIT1
```

Actual password ko carefully copy karein.

`cat` command ka naam **concatenate** se aaya hai. Iska original purpose multiple files ko combine karna tha, lekin single file ka content display karne ke liye bhi iska bahut use hota hai. [16]

---

## `cat` Command Kaise Kaam Karti Hai?

Jab aap ye command run karte ho:

```bash
cat readme
```

To shell:

1. `cat` program ko execute karta hai.
2. `readme` file ko locate karta hai.
3. File ka content read karta hai.
4. Content ko terminal par print karta hai.

Process:

```text
cat command
     ↓
readme file locate
     ↓
File content read
     ↓
Terminal par output
```

---

## 4. `cd` Command

`cd` command ka use ek directory se doosri directory mein move karne ke liye hota hai.

`cd` ka full form hai:

```text
Change Directory
```

Example:

```bash
cd /home/bandit0
```

Home directory par wapas jaane ke liye:

```bash
cd ~
```

Ya simply:

```bash
cd
```

Ek directory ke andar jaane ke liye:

```bash
cd directory_name
```

Ek level peeche jaane ke liye:

```bash
cd ..
```

Level 1 ke basic solution mein `cd` ki zaroorat nahi padti kyunki login ke baad hum already home directory mein hote hain.

---

## 5. `exit` Command

`exit` command current shell ya SSH session ko close karti hai.

Command:

```bash
exit
```

Is command ke baad aap remote Bandit server se logout ho jaoge aur apne local terminal par return kar jaoge.

Alternative keyboard shortcut:

```text
Ctrl + D
```

---

# File Paths

## Absolute Path

Absolute path file ka complete location batata hai.

Example:

```text
/home/bandit0/readme
```

Is path ka meaning:

```text
/
└── home
    └── bandit0
        └── readme
```

Absolute path hamesha root directory `/` se start hota hai.

Aap file ko absolute path ke through bhi read kar sakte ho:

```bash
cat /home/bandit0/readme
```

---

## Relative Path

Relative path current directory ke according file ka location batata hai.

Agar aap already `/home/bandit0` directory mein ho, to:

```bash
cat readme
```

Linux automatically current directory mein `readme` file search karega.

Comparison:

```bash
cat readme
```

Ye relative path hai.

```bash
cat /home/bandit0/readme
```

Ye absolute path hai.

---

## File Name Case Sensitivity

Linux file names case-sensitive hote hain.

Ye files alag-alag samjhi jayengi:

```text
readme
Readme
README
```

Bandit Level 1 mein correct file name hai:

```text
readme
```

Isliye command exactly is tarah run karein:

```bash
cat readme
```

Agar aap ye run karte ho:

```bash
cat Readme
```

To error aa sakta hai:

```text
cat: Readme: No such file or directory
```

---

# Complete Walkthrough

## Step 1: Terminal Open Karein

Apne computer par terminal open karein.

Aap in tools ka use kar sakte hain:

- Linux Terminal
- macOS Terminal
- Windows PowerShell
- Windows Terminal
- Kali Linux Terminal
- WSL Terminal

---

## Step 2: Bandit Level 0 Par Login Karein

Command run karein:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Alternative format:

```bash
ssh -p 2220 bandit0@bandit.labs.overthewire.org
```

Password enter karein:

```text
bandit0
```

Agar pehli baar connect kar rahe hain, to SSH host authenticity ke baare mein pooch sakta hai:

```text
Are you sure you want to continue connecting
(yes/no/[fingerprint])?
```

Type karein:

```text
yes
```

---

## Step 3: Current User Verify Karein

Login ke baad check karein ki aap correct user ke through logged in hain:

```bash
whoami
```

Expected output:

```text
bandit0
```

Agar output `bandit0` hai, to aap correct account mein ho.

---

## Step 4: Current Directory Check Karein

Command:

```bash
pwd
```

Expected output:

```text
/home/bandit0
```

Is directory mein hi `readme` file present hai.

---

## Step 5: Files Ki List Dekhein

Command:

```bash
ls
```

Expected output:

```text
readme
```

Isse confirm hota hai ki current directory mein `readme` naam ki file available hai.

---

## Step 6: `readme` File Read Karein

Command:

```bash
cat readme
```

Output kuch is format mein hoga:

```text
PASSWORD_FOR_BANDIT1
```

Actual output ko carefully copy karein.

Password ke start ya end mein extra space add na karein.

---

## Step 7: Bandit Level 0 Se Logout Karein

Remote session close karne ke liye:

```bash
exit
```

Output kuch is tarah aa sakta hai:

```text
logout
Connection to bandit.labs.overthewire.org closed.
```

---

## Step 8: Bandit Level 1 Par Login Karein

Ab username change hoga:

```text
bandit0 → bandit1
```

Command:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password ke roop mein `readme` file se mila hua password enter karein.

Example format:

```text
Username: bandit1
Password: PASSWORD_FROM_README
Host:     bandit.labs.overthewire.org
Port:     2220
```

Aap directly current session se bhi new SSH session start kar sakte ho:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

---

# Important Credential Flow

Har Bandit level par password flow kuch is tarah hota hai:

```text
Current Level
     ↓
Challenge solve karo
     ↓
Password find karo
     ↓
Next username ke saath SSH login karo
```

Level 0 se Level 1 ka flow:

```text
Login User:     bandit0
File:           readme
Found Password: readme file ke andar stored password
Next User:      bandit1
```

General SSH command:

```bash
ssh NEXT_USERNAME@bandit.labs.overthewire.org -p 2220
```

Level 1 ke liye:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

---

# Expected Commands

Complete command sequence:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

```bash
whoami
```

```bash
pwd
```

```bash
ls
```

```bash
cat readme
```

```bash
exit
```

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

---

# One-Line Solution

Agar aapko direct solution dekhna ho:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Login ke baad:

```bash
cat readme
```

File ke output mein jo password milega, usse next command run karein:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

---

# Common Errors

## 1. `No such file or directory`

Error:

```text
cat: readme: No such file or directory
```

Possible reasons:

- Aap wrong directory mein ho.
- File name galat type kiya gaya hai.
- File name mein uppercase ya lowercase mistake hai.
- Aapne `readme` ke badle `Readme` type kiya hai.

Current directory check karein:

```bash
pwd
```

Files check karein:

```bash
ls
```

Correct command:

```bash
cat readme
```

---

## 2. `Permission denied`

Error:

```text
cat: readme: Permission denied
```

Iska matlab ho sakta hai ki current user ko file read karne ki permission nahi hai.

File permissions check karein:

```bash
ls -l readme
```

Output kuch is tarah ho sakta hai:

```text
-r-------- 1 bandit0 bandit0 33 Aug 8 20:00 readme
```

Linux file permissions ko baad ke Bandit levels mein detail mein study kiya jayega.

---

## 3. `Permission denied, please try again`

SSH login ke waqt:

```text
Permission denied, please try again.
```

Possible reasons:

- Username galat hai.
- Password galat hai.
- Password copy karte waqt extra space aa gaya.
- Aapne old level ka password use kiya.
- Username `bandit1` ki jagah `bandit0` reh gaya.

Correct Level 1 username:

```text
bandit1
```

Correct command:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

---

## 4. Wrong Port

Agar aap port specify nahi karte:

```bash
ssh bandit1@bandit.labs.overthewire.org
```

To SSH default port `22` use karne ki try karega.

Bandit ke liye correct port:

```text
2220
```

Correct command:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

---

## 5. Password Copy Karne Mein Mistake

Password copy karte waqt dhyan rakhein:

- Extra spaces copy na hon.
- Password ke start mein space na ho.
- Password ke end mein space na ho.
- Uppercase aur lowercase characters same rahen.
- Similar characters ko carefully check karein.

Examples of confusing characters:

```text
O  and  0
l  and  1
I  and  l
```

Linux passwords case-sensitive hote hain.

---

# Alternative File Reading Commands

`cat` ke alawa Linux mein file read karne ke kuch aur commands bhi hain.

## `less`

```bash
less readme
```

`less` large files ko page by page read karne ke liye useful hai.

Exit karne ke liye:

```text
q
```

## `more`

```bash
more readme
```

Ye bhi file ko screen by screen display karta hai.

## `head`

```bash
head readme
```

Ye file ki starting lines display karta hai.

## `tail`

```bash
tail readme
```

Ye file ki last lines display karta hai.

Level 1 ke liye simplest command:

```bash
cat readme
```

---

# Security Lessons

Is level se humein kuch important cybersecurity lessons milte hain:

- Sensitive information files ke andar stored ho sakti hai.
- File names aur paths ko accurately identify karna zaroori hai.
- Linux commands ke exact syntax ka importance hota hai.
- File permissions decide karti hain ki kaun file read kar sakta hai.
- Passwords ko securely handle karna chahiye.
- Har level ke liye alag username aur password ho sakta hai.
- SSH remote authentication provide karta hai.
- Current directory ko samajhna file access ke liye important hai.
- Linux commands case-sensitive hoti hain.
- CTF challenges mein simple information gathering bhi important skill hai.

---

# Commands Summary

| Command | Purpose |
|---|---|
| `ssh user@host -p 2220` | Remote server par SSH login karta hai |
| `whoami` | Current logged-in username dikhata hai |
| `pwd` | Current working directory dikhata hai |
| `ls` | Current directory ki files list karta hai |
| `ls -l` | Files ki detailed information dikhata hai |
| `ls -a` | Hidden files bhi dikhata hai |
| `cat readme` | `readme` file ka content display karta hai |
| `cd directory` | Directory change karta hai |
| `cd ..` | Parent directory mein move karta hai |
| `exit` | Current SSH session close karta hai |
| `less readme` | File ko page by page read karta hai |
| `head readme` | File ki starting lines dikhata hai |
| `tail readme` | File ki ending lines dikhata hai |

---

# Final Solution

Level 0 par login karein:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Current directory ki files dekhein:

```bash
ls
```

Expected output:

```text
readme
```

Password read karein:

```bash
cat readme
```

Ab `readme` file se mila password use karke Level 1 par login karein:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password:

```text
readme
```

Yahan `readme` ka matlab file ka naam hai. Actual login password woh value hai jo aapko `cat readme` command run karne ke baad output mein milegi.

---

## Conclusion

Bandit Level 1 mein humne seekha ki remote Linux server par SSH ke through login karke files ko kaise locate aur read kiya jata hai.

Is level ka main workflow tha:

```text
SSH Login
    ↓
Current Directory Check
    ↓
Files List Karna
    ↓
readme File Read Karna
    ↓
Password Find Karna
    ↓
bandit1 User Se Login Karna
```

Level 0 se Level 1 successfully complete karne ke baad aap next challenge ke liye ready hain.

> **Security Note:** SSH ka use sirf unhi systems par karein jahan aapke paas permission ho. OverTheWire Bandit ek authorized cybersecurity learning environment hai.
```
