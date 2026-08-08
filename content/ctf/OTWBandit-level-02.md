---
title: "OverTheWire Bandit - Level 2 to Level 3"
description: "Beginner-friendly walkthrough of OverTheWire Bandit Level 2 to Level 3, including SSH login, filenames with spaces, shell parsing, quoting, ls, cat, PowerShell, and next-level authentication."
platform: "CTF"
category: "OverTheWire - Bandit"
difficulty: "Beginner"
date: "19-06-2026"
order: 2
tags:
  - OverTheWire
  - Bandit
  - Linux
  - SSH
  - PowerShell
  - Filenames With Spaces
  - Quoting
  - Shell Parsing
  - cat
  - CTF
---

# OverTheWire Bandit — Level 2 to Level 3

## Introduction

Is writeup ka heading **Level 2 → Level 3** hai.

Is level mein next level ka password home directory mein present ek file ke andar stored hai. File ka naam hai:

```text
spaces in this filename
```

Filename mein spaces hone ki wajah se ise terminal mein directly use nahi kar sakte. Shell normally spaces ko separate arguments samajhta hai. Isliye file ko read karne ke liye filename ko double quotes ke andar likhna hoga:

```bash
cat "spaces in this filename"
```

## Objective

Is level mein humein:

1. `bandit2` user se SSH ke through login karna hai.
2. Home directory ki files list karni hain.
3. Spaces wale filename ko identify karna hai.
4. Quotes ka use karke file ko read karna hai.
5. Password copy karna hai.
6. `bandit3` user se next SSH login karna hai.

## Given Information

Current level par login karne ke liye:

```text
Host:     bandit.labs.overthewire.org
Port:     2220
Username: bandit2
Password: Previous level se mila password
```

Current file:

```text
spaces in this filename
```

Next level ka username:

```text
bandit3
```

Found password:

```text
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

# SSH Login

## PowerShell Se Login

Windows PowerShell ya Windows Terminal open karein.

Command:

```powershell
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

Aapke terminal mein command kuch is tarah dikh sakti hai:

```powershell
PS C:\Users\dolla> ssh bandit2@bandit.labs.overthewire.org -p 2220
```

Password prompt par previous level se mila password enter karein.

Successful login ke baad prompt kuch is tarah dikh sakta hai:

```text
bandit2@bandit:~$
```

## Prompt Ko Samajhna

```text
bandit2@bandit:~$
```

Iske parts:

```text
bandit2  → Current username
bandit    → Remote server ka hostname
~         → Current user ki home directory
$         → Normal user shell prompt
```

# Filename Mein Spaces

## File Ka Actual Naam

Is level mein file ka exact naam hai:

```text
spaces in this filename
```

Ye ek single filename hai, chaar separate filenames nahi.

Linux filenames mein spaces allowed hote hain. Lekin command line par spaces ka special meaning hota hai.

## Shell Spaces Ko Kaise Treat Karta Hai?

Shell command ko parts ya arguments mein divide karta hai.

Example:

```bash
cat file.txt
```

Shell is command ko samajhta hai:

```text
Command:  cat
Argument: file.txt
```

Agar hum bina quotes ke ye command run karein:

```bash
cat spaces in this filename
```

To shell ise is tarah interpret kar sakta hai:

```text
Command:   cat
Argument1: spaces
Argument2: in
Argument3: this
Argument4: filename
```

Lekin humein `cat` command ko ek hi complete filename dena hai. Isliye quotes ya escaping ka use karte hain.

# File Read Karne Ke Methods

## Method 1: Double Quotes

Recommended command:

```bash
cat "spaces in this filename"
```

Double quotes shell ko batati hain ki quotes ke andar ka complete text ek single argument hai.

Is command mein:

```text
Command:  cat
Filename: spaces in this filename
```

Double quotes actual filename ka part nahi hoti. Ye sirf shell parsing ke liye use hoti hain.

## Method 2: Single Quotes

Single quotes bhi use kar sakte hain:

```bash
cat 'spaces in this filename'
```

Ye bhi complete filename ko ek single argument ke roop mein treat karne ke liye shell ko batata hai.

## Method 3: Backslash Se Spaces Escape Karna

Har space se pehle backslash lagakar bhi filename read kar sakte hain:

```bash
cat spaces\ in\ this\ filename
```

Backslash shell ko batata hai ki space argument separator nahi, balki filename ka part hai.

## Methods Comparison

| Method | Command |
|---|---|
| Double quotes | `cat "spaces in this filename"` |
| Single quotes | `cat 'spaces in this filename'` |
| Backslash escaping | `cat spaces\ in\ this\ filename` |

Teeno commands same file ka content display karengi.

Beginner ke liye sabse readable command hai:

```bash
cat "spaces in this filename"
```

# Linux Commands

## `ls` Command

`ls` command current directory ke andar available files aur directories ki list show karti hai.

```bash
ls
```

Output:

```text
spaces in this filename
```

Output mein spaces ki wajah se filename multiple words jaisa dikh sakta hai, lekin ye ek hi file hai.

## `pwd` Command

`pwd` ka full form **Print Working Directory** hai.

```bash
pwd
```

Expected output:

```text
/home/bandit2
```

Isse confirm hota hai ki aap `bandit2` ki home directory mein ho.

## `whoami` Command

Current user verify karne ke liye:

```bash
whoami
```

Expected output:

```text
bandit2
```

## `cat` Command

`cat` command file ka content terminal par display karti hai.

Basic format:

```bash
cat filename
```

Spaces wale filename ke liye:

```bash
cat "spaces in this filename"
```

# Complete Walkthrough

## Step 1: PowerShell Open Karein

Windows par PowerShell ya Windows Terminal open karein.

Example:

```powershell
PS C:\Users\dolla>
```

## Step 2: `bandit2` Par Login Karein

```powershell
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

Password prompt par previous level ka password enter karein.

## Step 3: Current User Check Karein

```bash
whoami
```

Output:

```text
bandit2
```

## Step 4: Current Directory Check Karein

```bash
pwd
```

Output:

```text
/home/bandit2
```

## Step 5: Files Ki List Dekhein

```bash
ls
```

Output:

```text
spaces in this filename
```

## Step 6: Spaces Wali File Read Karein

Double quotes ka use karein:

```bash
cat "spaces in this filename"
```

Output:

```text
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

## Step 7: Password Copy Karein

Found password:

```text
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

Password copy karte waqt:

- Extra space copy na karein.
- Uppercase aur lowercase characters same rakhein.
- Password ke beginning aur ending ko carefully check karein.

## Step 8: SSH Session Close Karein

```bash
exit
```

Aap `Ctrl + D` bhi press kar sakte hain.

## Step 9: `bandit3` Par Login Karein

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

Password enter karein:

```text
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

# Actual Terminal Session

Aapka terminal session roughly is tarah dikh sakta hai:

```text
PS C:\Users\dolla> ssh bandit2@bandit.labs.overthewire.org -p 2220
bandit2@bandit.labs.overthewire.org's password:
bandit2@bandit:~$ ls
spaces in this filename
bandit2@bandit:~$ cat "spaces in this filename"
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
bandit2@bandit:~$ exit
logout
```

Uske baad next level par login karein:

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

# Complete Command Sequence

```powershell
ssh bandit2@bandit.labs.overthewire.org -p 2220
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
cat "spaces in this filename"
```

```bash
exit
```

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

# Common Errors

## `No such file or directory`

Agar aap ye command run karte hain:

```bash
cat spaces in this filename
```

To shell filename ko multiple arguments ke roop mein treat kar sakta hai.

Possible error:

```text
cat: spaces: No such file or directory
cat: in: No such file or directory
cat: this: No such file or directory
cat: filename: No such file or directory
```

Correct command:

```bash
cat "spaces in this filename"
```

## Filename Spelling Error

Linux filenames case-sensitive hote hain. Ye filenames alag-alag hain:

```text
spaces in this filename
Spaces in this filename
spaces In this filename
```

Correct filename exactly ye hai:

```text
spaces in this filename
```

## SSH Permission Denied

Error:

```text
Permission denied, please try again.
```

Check karein:

- Username `bandit3` hai.
- Port `2220` use ho raha hai.
- Password exact copy hua hai.
- Password ke start ya end mein extra space nahi hai.
- Similar characters carefully check kiye gaye hain.

Correct command:

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

## Password Display Nahi Hota

Linux terminal password type karte waqt characters ya asterisks display nahi karta. Password normally type karein aur `Enter` press karein.

## Prompt Par Extra `|` Character

Kabhi-kabhi terminal copy karte waqt prompt ke baad `|` ya koi extra cursor character dikh sakta hai.

Example:

```text
bandit2@bandit:~$ |
```

Ye usually cursor ya copied terminal formatting hoti hai. Isse password ka part na samjhein.

# Shell Parsing Ko Samajhna

Shell command ko execute karne se pehle uski parsing karta hai.

Command:

```bash
cat "spaces in this filename"
```

Shell ise samajhta hai:

```text
Program:  cat
Argument: spaces in this filename
```

Without quotes:

```bash
cat spaces in this filename
```

Shell ise multiple arguments mein divide kar sakta hai:

```text
Program:   cat
Argument1: spaces
Argument2: in
Argument3: this
Argument4: filename
```

Quotes ka purpose shell parsing ko control karna hai.

# Security Lessons

Is level se humein ye important lessons milte hain:

- Linux filenames mein spaces allowed hote hain.
- Shell spaces ko argument separators samajhta hai.
- Quotes complete filename ko single argument banati hain.
- Backslash spaces ko escape kar sakta hai.
- Exact filename identify karna zaroori hai.
- Linux filenames case-sensitive hote hain.
- Command-line parsing ko samajhna cybersecurity mein important hai.
- Passwords ko carefully copy karna chahiye.
- Har level complete hone ke baad next username ke saath new SSH login karna hota hai.

# Commands Summary

| Command | Purpose |
|---|---|
| `ssh user@host -p 2220` | Remote server par SSH login karta hai |
| `whoami` | Current username show karta hai |
| `pwd` | Current working directory show karta hai |
| `ls` | Current directory ki files list karta hai |
| `cat "spaces in this filename"` | Spaces wale filename ka content read karta hai |
| `cat 'spaces in this filename'` | Single quotes ke through file read karta hai |
| `cat spaces\ in\ this\ filename` | Escaped spaces ke through file read karta hai |
| `exit` | SSH session close karta hai |

# Final Solution

`bandit2` par login karein:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

Files dekhein:

```bash
ls
```

Spaces wale filename ko double quotes ke saath read karein:

```bash
cat "spaces in this filename"
```

Password:

```text
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

Ab `bandit3` par login karein:

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

# Conclusion

Bandit Level 2 → Level 3 mein humne seekha ki spaces wale filename ko Linux terminal mein correctly kaise access kiya jata hai.

Complete workflow:

```text
SSH Login as bandit2
        ↓
Current Directory Check
        ↓
ls Command
        ↓
Spaces Wala Filename Identify
        ↓
Quotes Ka Use
        ↓
cat Command
        ↓
Password Find
        ↓
SSH Login as bandit3
```

Is level ka sabse important command hai:

```bash
cat "spaces in this filename"
```

> **Security Note:** SSH ka use sirf un systems par karein jahan aapke paas permission ho. OverTheWire Bandit ek authorized cybersecurity learning environment hai.
