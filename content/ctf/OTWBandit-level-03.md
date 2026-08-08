---
title: "OverTheWire Bandit - Level 3 to Level 4"
description: "Beginner-friendly walkthrough of OverTheWire Bandit Level 3 to Level 4, including hidden files, dotfiles, the inhere directory, cd, ls, ls -la, paths, cat, and SSH login."
platform: "CTF"
category: "OverTheWire - Bandit"
difficulty: "Beginner"
date: "19-06-2026"
tags:
  - OverTheWire
  - Bandit
  - Linux
  - SSH
  - Hidden Files
  - Dotfiles
  - Directories
  - cd
  - ls-la
  - cat
  - CTF
---

# OverTheWire Bandit — Level 3 to Level 4

## Introduction

Is writeup ka heading **Level 3 → Level 4** hai.

Is level mein next level ka password ek hidden file ke andar stored hai. Ye hidden file `inhere` directory ke andar located hai.

Linux mein dot `.` se start hone wali files normally hidden hoti hain. Isliye normal `ls` command run karne par file दिखाई nahi deti. Hidden files dekhne ke liye `ls -la` ya `ls -a` command ka use karna padta hai.

Is challenge mein hidden file ka exact naam hai:

```text
.hidden
```

File read karne ke liye command:

```bash
cat ./.hidden
```

## Objective

Is level mein humein:

1. `bandit3` user se SSH ke through login karna hai.
2. Home directory mein `inhere` directory identify karni hai.
3. `inhere` directory ke andar jaana hai.
4. Hidden file ko discover karna hai.
5. `.hidden` file ka content read karna hai.
6. Password copy karna hai.
7. `bandit4` user se next SSH login karna hai.

## Given Information

Current level par login karne ke liye:

```text
Host:     bandit.labs.overthewire.org
Port:     2220
Username: bandit3
Password: Previous level se mila password
```

Directory:

```text
inhere
```

Hidden file:

```text
.hidden
```

Next level ka username:

```text
bandit4
```

Found password:

```text
2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
```

# Hidden Files Kya Hoti Hain?

Linux mein jo files dot `.` se start hoti hain, unhe hidden files ya dotfiles kaha jata hai.

Examples:

```text
.hidden
.bashrc
.profile
.config
```

Hidden ka matlab ye nahi hota ki file completely inaccessible hai. Iska matlab sirf itna hai ki normal `ls` command unhe default output mein show nahi karti.

Hidden files ko dekhne ke liye:

```bash
ls -a
```

Ya:

```bash
ls -la
```

## `.hidden` Filename Ko Samajhna

Is challenge mein file ka naam hai:

```text
.hidden
```

Filename ka first character dot hai:

```text
.
```

Isliye normal command:

```bash
ls
```

file ko hide kar deti hai.

Lekin ye command file show karegi:

```bash
ls -la
```

# `inhere` Directory

## Directory Kya Hoti Hai?

Directory ko commonly folder bhi kaha jata hai. Directory ke andar files aur doosri directories store hoti hain.

Bandit Level 3 mein home directory ka structure roughly is tarah hai:

```text
/home/bandit3
└── inhere
    └── .hidden
```

Yahan:

- `/home/bandit3` user ki home directory hai.
- `inhere` ek directory hai.
- `.hidden` ek hidden file hai.

## `inhere` Naam Ka Meaning

`inhere` ka meaning roughly `in here` hai, yani challenge ki required file isi directory ke andar present hai.

Pehle home directory mein `inhere` directory ko identify karna hai, phir uske andar hidden file search karni hai.

# Linux Commands

## `pwd` Command

`pwd` ka full form **Print Working Directory** hai.

```bash
pwd
```

Ye current directory ka complete path display karta hai.

Expected output:

```text
/home/bandit3
```

## `ls` Command

`ls` command current directory ki visible files aur directories display karti hai.

```bash
ls
```

Expected output:

```text
inhere
```

## `ls -a` Command

`-a` ka meaning **all** hota hai. Ye hidden files ke saath visible files bhi show karta hai.

```bash
ls -a
```

Is output mein special entries bhi dikh sakti hain:

```text
.
..
.hidden
```

Meaning:

```text
.   → Current directory
..  → Parent directory
```

## `ls -la` Command

```bash
ls -la
```

Yahan:

```text
-l  → Long or detailed listing
-a  → All files, including hidden files
```

`ls -la` file ki detailed information show karta hai:

- File permissions
- File owner
- File group
- File size
- Modification time
- File name

Example:

```text
-rw-r----- 1 bandit4 bandit3 33 Oct 5 06:19 .hidden
```

Last column mein actual filename hai:

```text
.hidden
```

## `cd` Command

`cd` ka full form **Change Directory** hai.

Directory ke andar jaane ke liye:

```bash
cd inhere
```

Trailing slash ke saath bhi likh sakte hain:

```bash
cd inhere/
```

Dono commands same kaam karti hain.

## Home Directory Par Wapas Jaana

Home directory par wapas jaane ke liye:

```bash
cd
```

Ya:

```bash
cd ~
```

Parent directory mein jaane ke liye:

```bash
cd ..
```

## `cat` Command

`cat` command file ka content terminal par display karti hai.

Hidden file ko read karne ke liye:

```bash
cat .hidden
```

Agar current directory `inhere` hai, to ye command kaam karegi.

Explicit relative path ke saath:

```bash
cat ./.hidden
```

Dono commands same file ko read karti hain.

# Path Concepts

## Current Directory

Current directory woh location hai jahan aap is waqt kaam kar rahe ho.

Agar prompt ye hai:

```text
bandit3@bandit:~/inhere$
```

To aap `inhere` directory ke andar ho.

## Relative Path

Relative path current directory ke according file ka location batata hai.

Agar aap `inhere` directory mein ho:

```bash
cat .hidden
```

Aur:

```bash
cat ./.hidden
```

Dono relative paths hain.

## Absolute Path

Absolute path file ka complete location batata hai:

```bash
cat /home/bandit3/inhere/.hidden
```

Ye command kisi bhi directory se run ki ja sakti hai, agar permissions available hon.

## `./` Ka Meaning

Linux mein:

```text
.   → Current directory
..  → Parent directory
```

Isliye:

```bash
cat ./.hidden
```

ka meaning hai:

```text
Current directory ke andar `.hidden` file read karo.
```

# Complete Walkthrough

## Step 1: Terminal Open Karein

Linux Terminal, macOS Terminal, Windows PowerShell, Windows Terminal ya WSL open karein.

## Step 2: `bandit3` Par Login Karein

Windows PowerShell se command:

```powershell
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

Password prompt par previous level se mila password enter karein.

Successful login ke baad prompt kuch is tarah dikh sakta hai:

```text
bandit3@bandit:~$
```

## Step 3: Current User Verify Karein

```bash
whoami
```

Expected output:

```text
bandit3
```

## Step 4: Current Directory Check Karein

```bash
pwd
```

Expected output:

```text
/home/bandit3
```

## Step 5: Visible Files Dekhein

```bash
ls
```

Output:

```text
inhere
```

## Step 6: `inhere` Directory Mein Jaayein

```bash
cd inhere
```

Ab current prompt kuch is tarah ho sakta hai:

```text
bandit3@bandit:~/inhere$
```

## Step 7: Normal Listing Check Karein

```bash
ls
```

Is command ka output blank ho sakta hai, kyunki directory ke andar sirf hidden file hai.

## Step 8: Hidden Files Dekhein

```bash
ls -la
```

Output mein `.hidden` file dikhni chahiye:

```text
.hidden
```

## Step 9: Hidden File Read Karein

Recommended command:

```bash
cat ./.hidden
```

Output:

```text
2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
```

## Step 10: Password Copy Karein

Found password:

```text
2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
```

Password ke start ya end mein extra space copy na karein.

## Step 11: SSH Session Close Karein

```bash
exit
```

Aap `Ctrl + D` bhi press kar sakte hain.

## Step 12: `bandit4` Par Login Karein

```bash
ssh bandit4@bandit.labs.overthewire.org -p 2220
```

Password enter karein:

```text
2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
```

# Actual Terminal Session

Aapka terminal session roughly is tarah dikh sakta hai:

```text
PS C:\Users\dolla> ssh bandit3@bandit.labs.overthewire.org -p 2220
bandit3@bandit.labs.overthewire.org's password:
bandit3@bandit:~$ pwd
/home/bandit3
bandit3@bandit:~$ ls
inhere
bandit3@bandit:~$ cd inhere/
bandit3@bandit:~/inhere$ ls
bandit3@bandit:~/inhere$ ls -la
total 12
drwxr-xr-x 2 root    root    4096 Oct  5 06:19 .
drwxr-xr-x 3 root    root    4096 Oct  5 06:19 ..
-rw-r----- 1 bandit4 bandit3   33 Oct  5 06:19 .hidden
bandit3@bandit:~/inhere$ cat ./.hidden
2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
bandit3@bandit:~/inhere$ exit
logout
```

Uske baad next level par login karein:

```bash
ssh bandit4@bandit.labs.overthewire.org -p 2220
```

# Complete Command Sequence

```powershell
ssh bandit3@bandit.labs.overthewire.org -p 2220
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
cd inhere
```

```bash
ls
```

```bash
ls -la
```

```bash
cat ./.hidden
```

```bash
exit
```

```bash
ssh bandit4@bandit.labs.overthewire.org -p 2220
```

# Common Errors

## Hidden File `ls` Mein Nahi Dikh Rahi

Agar aap sirf ye command run karte hain:

```bash
ls
```

To dot se start hone wali hidden files display nahi hongi.

Correct command:

```bash
ls -la
```

Ya:

```bash
ls -a
```

## `No Such File or Directory`

Error:

```text
cat: ./.hidden: No such file or directory
```

Possible reasons:

- Aap `inhere` directory ke andar nahi ho.
- Filename galat type hua hai.
- Dot `.` miss ho gaya hai.

Check karein:

```bash
pwd
ls -la
```

Agar aap home directory mein ho, to direct absolute path use kar sakte hain:

```bash
cat /home/bandit3/inhere/.hidden
```

## Wrong Directory

Agar prompt ye hai:

```text
bandit3@bandit:~$
```

To aap home directory mein ho.

Pehle `inhere` directory mein jaayein:

```bash
cd inhere
```

Phir file read karein:

```bash
cat ./.hidden
```

## SSH Permission Denied

Error:

```text
Permission denied, please try again.
```

Check karein:

- Current username `bandit3` hai.
- Next username `bandit4` hai.
- Port `2220` use ho raha hai.
- Password exactly copy hua hai.
- Password ke beginning ya ending mein extra space nahi hai.

Correct next-level command:

```bash
ssh bandit4@bandit.labs.overthewire.org -p 2220
```

## Password Screen Par Show Nahi Hota

Linux terminal password type karte waqt characters ya asterisks display nahi karta. Password normally type karein aur `Enter` press karein.

# Security Lessons

Is level se humein ye important lessons milte hain:

- Linux dot se start hone wali files ko hidden files ke roop mein treat karta hai.
- Hidden ka matlab inaccessible nahi hota.
- `ls -a` hidden files show karta hai.
- `ls -l` detailed file metadata show karta hai.
- `ls -la` dono options combine karta hai.
- Directory navigation ke liye `cd` command use hoti hai.
- Current directory ko samajhna file access ke liye important hai.
- Relative aur absolute paths dono useful hote hain.
- File permissions access control provide karti hain.
- Sensitive data hidden file mein stored ho sakta hai.
- CTF challenges mein hidden files ko identify karna important skill hai.

# Commands Summary

| Command | Purpose |
|---|---|
| `ssh user@host -p 2220` | Remote server par SSH login karta hai |
| `whoami` | Current username show karta hai |
| `pwd` | Current working directory show karta hai |
| `ls` | Visible files aur directories show karta hai |
| `ls -a` | Hidden files ke saath all entries show karta hai |
| `ls -la` | Hidden files ki detailed listing show karta hai |
| `cd inhere` | `inhere` directory mein enter karta hai |
| `cd ..` | Parent directory mein wapas jaata hai |
| `cat .hidden` | Hidden file read karta hai |
| `cat ./.hidden` | Current directory ki hidden file read karta hai |
| `exit` | SSH session close karta hai |

# Final Solution

`bandit3` par login karein:

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

Home directory ki files dekhein:

```bash
ls
```

`inhere` directory mein jaayein:

```bash
cd inhere
```

Hidden files ki detailed list dekhein:

```bash
ls -la
```

`.hidden` file read karein:

```bash
cat ./.hidden
```

Password:

```text
2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
```

Ab `bandit4` par login karein:

```bash
ssh bandit4@bandit.labs.overthewire.org -p 2220
```

# Conclusion

Bandit Level 3 → Level 4 mein humne hidden files ko identify karna, `inhere` directory ke andar jaana aur `.hidden` file ka password read karna seekha.

Complete workflow:

```text
SSH Login as bandit3
        ↓
Home Directory Check
        ↓
inhere Directory Identify
        ↓
cd inhere
        ↓
ls -la
        ↓
.hidden File Identify
        ↓
cat ./.hidden
        ↓
Password Find
        ↓
SSH Login as bandit4
```

Is level ke sabse important commands hain:

```bash
ls -la
```

Aur:

```bash
cat ./.hidden
```

> **Security Note:** SSH ka use sirf un systems par karein jahan aapke paas permission ho. OverTheWire Bandit ek authorized cybersecurity learning environment hai.
