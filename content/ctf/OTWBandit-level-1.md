---
title: "OverTheWire Bandit - Level 1 to Level 2"
description: "Beginner-friendly walkthrough of OverTheWire Bandit Level 1 to Level 2, including SSH login, hidden files, ls -la, special filenames, dash options, relative paths, cat, and the ./ technique."
platform: "CTF"
category: "OverTheWire - Bandit"
difficulty: "Beginner"
date: "19-06-2026"
tags:
  - OverTheWire
  - Bandit
  - Linux
  - SSH
  - ls
  - ls-la
  - cat
  - Special Filenames
  - Relative Paths
  - Linux Options
  - CTF
---

# OverTheWire Bandit — Level 1 to Level 2

## Introduction

Is writeup ka heading **Level 1 → Level 2** hai.

Is level mein next level ka password home directory mein ek aisi file ke andar stored hai jiska naam sirf ek hyphen hai:

```text
-
```

Linux command line mein hyphen `-` ka special meaning hota hai. Bahut saare commands mein `-` options ya flags ke liye use hota hai. Isliye agar hum simple command run karein:

```bash
cat -
```

To `cat` isse normal filename ke bajay standard input ke roop mein interpret kar sakta hai. File ko correctly read karne ke liye hum file ka path explicitly denge:

```bash
cat ./-
```

## Objective

Is level mein humein:

1. `bandit1` user se SSH ke through login karna hai.
2. Home directory ki files check karni hain.
3. Hidden files aur detailed file list dekhni hai.
4. Hyphen `-` naam wali file identify karni hai.
5. `./-` path ka use karke file read karni hai.
6. Password copy karna hai.
7. `bandit2` user se next SSH login karna hai.

## Given Credentials

Current level par login karne ke liye:

```text
Host:     bandit.labs.overthewire.org
Port:     2220
Username: bandit1
Password: Previous level se mila password
```

Current level ki file:

```text
-
```

Next level ka username:

```text
bandit2
```

Found password:

```text
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

## Important Concepts

Is level mein hum ye concepts seekhenge:

- SSH login
- PowerShell se SSH connection
- Linux home directory
- `ls` command
- `ls -la` command
- Hidden files
- File permissions
- Filename ke roop mein hyphen
- Command options aur flags
- Standard input
- Relative path
- `./` notation
- `cat` command
- Next-level authentication

# SSH Login

## `bandit1` Par Login Karna

Previous level se mila hua password use karke `bandit1` par login karein:

```powershell
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password prompt par previous level ka password enter karein.

Aap Windows PowerShell se bhi SSH command run kar sakte hain:

```powershell
PS C:\Users\dolla> ssh bandit1@bandit.labs.overthewire.org -p 2220
```

> **Important:** Username `bandit1` hai. Kabhi-kabhi terminal font ya typing ki wajah se `banditl` jaisa dikh sakta hai, lekin yahan last character number `1` hai, lowercase letter `l` nahi.

## SSH Prompt Ko Samajhna

Login ke baad prompt kuch is tarah dikh sakta hai:

```text
bandit1@bandit:~$
```

Iska meaning:

```text
bandit1  → Current username
bandit    → Remote machine ka hostname
~         → Current user ki home directory
$         → Normal user shell prompt
```

# Linux Directory Commands

## `pwd` Command

`pwd` ka full form **Print Working Directory** hai. Ye batata hai ki aap current time par kis directory mein ho.

```bash
pwd
```

Expected output:

```text
/home/bandit1
```

Is level ki file home directory mein located hai.

## `ls` Command

`ls` command current directory ke andar files aur directories ki list show karti hai.

```bash
ls
```

Is level mein simple `ls` ka output confusing ya blank dikh sakta hai, especially agar terminal output copy karte waqt filename `-` clearly visible na ho.

Isliye detailed list ke liye `ls -la` use karna better hai.

## `ls -la` Command

```bash
ls -la
```

Is command mein do options combine kiye gaye hain:

```text
-l  → Long or detailed listing
-a  → All files, including hidden files
```

`ls -la` output mein generally ye information hoti hai:

- File type
- File permissions
- Link count
- File owner
- File group
- File size
- Modification date and time
- File name

Example output format:

```text
-rw-r----- 1 bandit2 bandit1 33 Oct 5 06:19 -
```

Last column mein file ka naam hai:

```text
-
```

## `ls -la` Output Ko Samajhna

Example:

```text
-rw-r----- 1 bandit2 bandit1 33 Oct 5 06:19 -
```

Is line ko parts mein samjhein:

| Part | Meaning |
|---|---|
| `-rw-r-----` | File permissions |
| `1` | Hard link count |
| `bandit2` | File owner |
| `bandit1` | File group |
| `33` | File size in bytes |
| `Oct 5 06:19` | Last modification date and time |
| `-` | Filename |

Starting character `-` ka ek meaning file type ke context mein regular file bhi ho sakta hai. Lekin is challenge mein last column mein jo `-` hai, woh actual filename hai.

Example mein do hyphen dikh sakte hain:

```text
-rw-r----- ... -
```

Pehla hyphen permissions ka part hai. Last hyphen filename hai.

# Hyphen Filename Problem

## Filename Sirf `-` Hai

Is level ki file ka naam hai:

```text
-
```

Ye filename unusual hai kyunki command-line tools mein hyphen ka special use hota hai.

Examples:

```bash
command -option
```

Yahan `-option` command ka option ho sakta hai.

## Options Aur Filenames Mein Difference

Linux commands mein hyphen aksar options introduce karta hai.

Example:

```bash
ls -l
```

Yahan `-l` ek option hai jo detailed listing show karta hai.

Agar file ka naam bhi `-` ho, to command confuse ho sakti hai ki:

```text
- ek option hai?
Ya
- ek filename hai?
```

Is ambiguity ko solve karne ke liye file ka path explicitly specify karte hain.

# `cat` Command

## Normal `cat` Usage

`cat` command file ka content terminal par display karti hai.

Normal filename ke liye:

```bash
cat filename
```

Example:

```bash
cat readme
```

## Problematic Command

Agar hum run karein:

```bash
cat -
```

To `cat` hyphen ko filename ke bajay standard input ke roop mein treat kar sakta hai.

Standard input ka matlab hota hai terminal ya kisi doosre input source se data read karna. Is wajah se command expected file content nahi dikhayegi aur terminal input ka wait kar sakti hai.

Agar aisa ho jaye, to stop karne ke liye press karein:

```text
Ctrl + C
```

## Correct Command: `cat ./-`

Correct command:

```bash
cat ./-
```

Is command mein:

```text
cat  → File content read karne wali command
./   → Current directory
-    → Actual filename
```

Complete path:

```text
./-
```

Iska meaning hai:

```text
Current directory ke andar `-` naam wali file
```

`./` shell ko clear batata hai ki `-` ek filename hai, command option nahi.

## `./` Kya Hota Hai?

Linux mein:

```text
.   → Current directory
..  → Parent directory
```

Isliye:

```text
./-
```

ka meaning hai:

```text
Current directory ke andar file named `-`
```

Ye technique un filenames ke liye useful hai jo hyphen se start hote hain ya command options jaise dikhte hain.

## Alternative Correct Methods

### Method 1: `./` Path

```bash
cat ./-
```

Ye is level ka recommended method hai.

### Method 2: `--` Option Terminator

Kuch commands `--` ko options ke end ke roop mein support karti hain:

```bash
cat -- -
```

Iska meaning hai:

```text
Ab iske baad aane wali value ko option nahi, filename samjho.
```

### Method 3: Absolute Path

Agar current directory `/home/bandit1` hai, to absolute path use kar sakte hain:

```bash
cat /home/bandit1/-
```

Sabse easy aur beginner-friendly command:

```bash
cat ./-
```

# Complete Walkthrough

## Step 1: PowerShell Open Karein

Windows par PowerShell ya Windows Terminal open karein.

Example prompt:

```powershell
PS C:\Users\dolla>
```

## Step 2: `bandit1` Par Login Karein

```powershell
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password prompt par previous level se mila password enter karein.

Successful login ke baad prompt kuch is tarah dikh sakta hai:

```text
bandit1@bandit:~$
```

## Step 3: Current User Verify Karein

```bash
whoami
```

Expected output:

```text
bandit1
```

## Step 4: Current Directory Check Karein

```bash
pwd
```

Expected output:

```text
/home/bandit1
```

## Step 5: Normal File List Dekhein

```bash
ls
```

Agar output blank ya confusing lage, to detailed listing run karein:

```bash
ls -la
```

## Step 6: File Identify Karein

Detailed listing mein file ka last column dekhein. Aapko filename milega:

```text
-
```

Yahan dhyan rakhein ki output line ka starting hyphen permissions ka part ho sakta hai, lekin last column ka hyphen actual filename hai.

## Step 7: File Read Karein

Wrong command:

```bash
cat -
```

Correct command:

```bash
cat ./-
```

Output:

```text
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

## Step 8: Password Copy Karein

Found password:

```text
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

Password ke start ya end mein extra space copy na karein.

## Step 9: SSH Session Close Karein

```bash
exit
```

## Step 10: `bandit2` Par Login Karein

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

Password enter karein:

```text
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

# Actual Terminal Session

Aapka terminal session roughly is tarah dikh sakta hai:

```text
PS C:\Users\dolla> ssh bandit1@bandit.labs.overthewire.org -p 2220
bandit1@bandit.labs.overthewire.org's password:
bandit1@bandit:~$ ls
bandit1@bandit:~$ ls -la
total 24
-rw-r----- 1 bandit2 bandit1   33 Oct  5 06:19 -
drwxr-xr-x 2 root    root    4096 Oct  5 06:19 .
drwxr-xr-x 70 root   root    4096 Oct  5 06:20 ..
-rw-r--r-- 1 root    root     220 Jan  6  2022 .bash_logout
-rw-r--r-- 1 root    root    3771 Jan  6  2022 .bashrc
-rw-r--r-- 1 root    root     807 Jan  6  2022 .profile
bandit1@bandit:~$ cat ./-
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
bandit1@bandit:~$ exit
```

Uske baad next level par login karein:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

## Complete Command Sequence

```powershell
ssh bandit1@bandit.labs.overthewire.org -p 2220
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
ls -la
```

```bash
cat ./-
```

```bash
exit
```

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

# Common Errors

## `cat -` Input Ka Wait Kar Raha Hai

Agar aap ye command run karte hain:

```bash
cat -
```

To terminal input ka wait kar sakta hai. Iska reason hai ki `cat` hyphen ko standard input ke roop mein interpret kar raha hai.

Command stop karne ke liye:

```text
Ctrl + C
```

Phir correct command run karein:

```bash
cat ./-
```

## `No such file or directory`

Error:

```text
cat: ./-: No such file or directory
```

Possible reasons:

- Aap home directory mein nahi ho.
- Filename galat type hua hai.
- Aapne hyphen ki jagah koi doosra character type kiya hai.

Check karein:

```bash
pwd
ls -la
```

## SSH Permission Denied

Error:

```text
Permission denied, please try again.
```

Check karein:

- Current username `bandit1` hai.
- Next level username `bandit2` hai.
- Port `2220` use kiya gaya hai.
- Password exactly copy kiya gaya hai.
- Password ke start ya end mein extra space nahi hai.

Next level ka correct command:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

## `banditl` Aur `bandit1` Ka Difference

Correct username:

```text
bandit1
```

Incorrect-looking version:

```text
banditl
```

Correct username mein last character number `1` hai, lowercase letter `l` nahi.

## File Permissions Samajh Nahi Aa Rahi

Example:

```text
-rw-r----- 1 bandit2 bandit1 33 Oct 5 06:19 -
```

Starting `-` regular file ko represent karta hai. Last `-` actual filename hai.

File permission details ko future Bandit levels mein aur deeply study kiya jayega.

# Security Lessons

Is level se humein ye important lessons milte hain:

- Linux commands mein hyphen options ke liye use ho sakta hai.
- Filename agar `-` ho, to command ambiguity create kar sakti hai.
- `./` path filename ko clearly identify karta hai.
- `--` options ke end ko represent kar sakta hai.
- `ls -la` hidden files aur detailed metadata dekhne ke liye useful hai.
- File permissions file access control karti hain.
- Standard input aur filename ke beech difference samajhna zaroori hai.
- Unusual filenames ko safely handle karna command-line skill hai.
- Passwords ko carefully copy karna chahiye.
- Har completed level ke baad next username ke saath new SSH login karna hota hai.

# Commands Summary

| Command | Purpose |
|---|---|
| `ssh user@host -p 2220` | Remote server par SSH login karta hai |
| `whoami` | Current username show karta hai |
| `pwd` | Current directory show karta hai |
| `ls` | Normal file listing show karta hai |
| `ls -la` | Detailed listing aur hidden files show karta hai |
| `cat -` | Standard input read kar sakta hai; is challenge mein avoid karein |
| `cat ./-` | `-` naam wali file read karta hai |
| `cat -- -` | `-` ko filename ke roop mein treat karta hai |
| `exit` | SSH session close karta hai |

# Final Solution

`bandit1` par login karein:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Files ki detailed list dekhein:

```bash
ls -la
```

Hyphen naam wali file ko read karein:

```bash
cat ./-
```

Password:

```text
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

Ab `bandit2` par login karein:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

# Conclusion

Bandit Level 1 → Level 2 mein humne seekha ki hyphen naam wali file ko Linux terminal mein kaise read kiya jata hai.

Complete workflow:

```text
SSH Login as bandit1
        ↓
Home Directory Check
        ↓
ls -la
        ↓
Hyphen Filename Identify
        ↓
cat ./-
        ↓
Password Find
        ↓
SSH Login as bandit2
```

Is level ka sabse important command hai:

```bash
cat ./-
```

> **Security Note:** SSH ka use sirf un systems par karein jahan aapke paas permission ho. OverTheWire Bandit ek authorized cybersecurity learning environment hai.
