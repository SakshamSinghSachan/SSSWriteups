---
title: "OverTheWire Bandit - Level 0 to Level 1"
description: "Complete beginner-friendly walkthrough of OverTheWire Bandit Level 0 to Level 1, including SSH login, Linux terminal, home directory, ls, cat, readme, passwords, authentication, and next-level login."
platform: "CTF"
category: "OverTheWire - Bandit"
difficulty: "Beginner"
date: "19-06-2026"
tags:
  - OverTheWire
  - Bandit
  - Linux
  - SSH
  - Terminal
  - ls
  - cat
  - Files
  - Passwords
  - Authentication
  - CTF
---

# OverTheWire Bandit — Level 0 to Level 1

## Introduction

Bandit Level 0 se Level 1 challenge mein humein SSH ke through `bandit0` user ke account par login karna hai. Login karne ke baad home directory mein present `readme` file ko read karna hai.

`readme` file ke andar next level, yani `bandit1`, ka password stored hai. Password milne ke baad us password ka use karke `bandit1` user ke through new SSH session start karna hota hai.

Official challenge ka objective bhi yehi hai: `readme` file se password read karke `bandit1` mein login karna. [web:28]

## Objective

Is level mein humein:

1. `bandit0` user se SSH ke through login karna hai.
2. Home directory ki files dekhni hain.
3. `readme` file identify karni hai.
4. `cat` command se file read karni hai.
5. File ke andar stored password copy karna hai.
6. `bandit1` username aur found password se next level par login karna hai.

## Given Credentials

Level 0 par login karne ke liye:

```text
Host:     bandit.labs.overthewire.org
Port:     2220
Username: bandit0
Password: bandit0
```

> **Important:** Username `bandit0` mein last character zero `0` hai, letter `o` nahi. Kabhi-kabhi terminal font ki wajah se `bandit0` aur `bandito` similar dikh sakte hain.

Next level ke liye:

```text
Next Username: bandit1
Password:      readme file se mila hua password
```

## Important Concepts

Is level mein hum ye concepts seekhenge:

- SSH
- Remote server
- Hostname
- Port
- Username
- Password
- Authentication
- Terminal
- Shell
- Linux home directory
- Current working directory
- Files and directories
- `ls` command
- `cat` command
- Password discovery
- Next-level login
- SSH session exit

# SSH Basics

## SSH Kya Hota Hai?

SSH ka full form **Secure Shell** hai. SSH ka use kisi remote computer ya server par securely login karne ke liye hota hai.

SSH ke through hum:

- Remote server par login kar sakte hain.
- Remote commands execute kar sakte hain.
- Files access kar sakte hain.
- Server ko terminal se manage kar sakte hain.

SSH command ka general format:

```bash
ssh username@hostname -p port
```

Bandit Level 0 ke liye command:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

## SSH Command Ko Samajhna

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

| Part | Meaning |
|---|---|
| `ssh` | SSH client start karta hai |
| `bandit0` | Remote server ka username |
| `@` | Username aur hostname ko separate karta hai |
| `bandit.labs.overthewire.org` | Bandit server ka hostname |
| `-p` | Custom port specify karta hai |
| `2220` | Bandit SSH service ka port |

Normally SSH port `22` par run karta hai, lekin OverTheWire Bandit port `2220` use karta hai. Isliye command mein `-p 2220` likhna zaroori hai.

## Hostname Aur Port

`bandit.labs.overthewire.org` server ka hostname hai. Hostname human-readable naam hota hai jise computer DNS ke through IP address mein convert karta hai.

`2220` port number hai. Port ek specific network service tak pahunchne ka endpoint hota hai.

Complete destination:

```text
bandit.labs.overthewire.org:2220
```

## Username Aur Password

Username batata hai ki hum kis account se login karna chahte hain:

```text
bandit0
```

Password prove karta hai ki humein is account ko access karne ki permission hai:

```text
bandit0
```

Username aur password milkar authentication process ka part bante hain.

## Authentication Kya Hota Hai?

Authentication ka matlab hota hai identity verify karna.

Server check karta hai:

```text
Username: bandit0
Password: bandit0
```

Agar details correct hoti hain, to server login allow kar deta hai.

Authentication aur authorization different concepts hain:

- **Authentication:** Aap kaun ho?
- **Authorization:** Aap login ke baad kya kar sakte ho?

# Linux Terminal Basics

## Terminal Kya Hota Hai?

Terminal ek program hai jisme hum commands type karke computer ke saath interact karte hain.

Aap in tools ka use kar sakte ho:

- Linux Terminal
- macOS Terminal
- Windows PowerShell
- Windows Terminal
- WSL Terminal
- Kali Linux Terminal

## Shell Kya Hota Hai?

Shell ek command interpreter hota hai. Ye aapki typed commands ko read karke execute karta hai.

Simple difference:

```text
Terminal = Jahan commands type ki jaati hain
Shell    = Jo commands ko interpret karke execute karta hai
```

SSH ke baad humein Bandit server par remote Linux shell milti hai.

## Prompt Ko Samajhna

Login ke baad prompt kuch is tarah dikh sakta hai:

```text
bandit0@bandit:~$
```

Prompt ke parts:

```text
bandit0  → Current username
@        → Username aur machine name separator
bandit   → Remote machine ka hostname
:~       → Current user ki home directory
$        → Normal user shell prompt
```

## `bandit0` Aur `bandito` Mein Difference

Correct username hai:

```text
bandit0
```

Yahan last character number zero `0` hai.

Ye incorrect username hai:

```text
bandito
```

Yahan last character lowercase letter `o` hai.

Correct SSH command:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Agar aap `bandito` type karoge, to SSH wrong user ke account mein login karne ki try karega aur authentication fail ho sakti hai.

# Linux File System Basics

## File Kya Hoti Hai?

File ek container hoti hai jisme information store hoti hai.

Examples:

```text
readme
password.txt
notes.md
config.conf
```

Is level mein password `readme` naam ki file ke andar stored hai.

## Directory Kya Hoti Hai?

Directory ko commonly folder bhi kaha jata hai. Directory ke andar files aur doosri directories store hoti hain.

Example:

```text
/home
└── bandit0
    └── readme
```

Yahan:

- `/home` ek directory hai.
- `/home/bandit0` user ki home directory hai.
- `readme` ek file hai.

## Home Directory Kya Hoti Hai?

Har Linux user ki ek personal home directory hoti hai.

`bandit0` user ki home directory generally hoti hai:

```text
/home/bandit0
```

SSH login ke baad user normally apni home directory se start karta hai. Prompt mein `~` current user ki home directory ko represent karta hai.

Example:

```text
bandit0@bandit:~$
```

## Current Working Directory

Current working directory woh directory hoti hai jahan aap is waqt kaam kar rahe ho.

Current directory check karne ke liye:

```bash
pwd
```

Expected output:

```text
/home/bandit0
```

# Linux Commands

## `whoami` Command

`whoami` command current logged-in username display karti hai.

```bash
whoami
```

Expected output:

```text
bandit0
```

Agar output `bandit0` hai, to aap correct user ke account mein login ho.

## `pwd` Command

`pwd` ka full form **Print Working Directory** hai.

```bash
pwd
```

Expected output:

```text
/home/bandit0
```

Ye confirm karta hai ki aap `bandit0` ki home directory mein ho.

## `ls` Command

`ls` command current directory ke andar available files aur directories ki list display karti hai.

```bash
ls
```

Expected output:

```text
readme
```

Is output ka matlab hai ki current directory mein `readme` naam ki file available hai.

### Detailed List

```bash
ls -l
```

Ye file permissions, owner, group, size aur modification time ki information show karta hai.

### Hidden Files

```bash
ls -a
```

Ye hidden files bhi display karta hai.

Level 0 se Level 1 ke liye simple command enough hai:

```bash
ls
```

## `cat` Command

`cat` command file ka content terminal par display karti hai.

Basic format:

```bash
cat filename
```

`readme` file read karne ke liye:

```bash
cat readme
```

Is command ke baad file ke andar stored password terminal par print hoga.

`cat` command ka naam **concatenate** se aaya hai. Single file ka content display karne ke liye bhi iska commonly use hota hai. [web:16]

## `exit` Command

`exit` command current shell ya SSH session close karti hai.

```bash
exit
```

Iske baad remote server se logout ho jayega aur aap local terminal par wapas aa jaoge.

Alternative:

```text
Ctrl + D
```

# Complete Walkthrough

## Step 1: Terminal Open Karein

Apne operating system ka terminal open karein.

## Step 2: `bandit0` Par Login Karein

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Password enter karein:

```text
bandit0
```

Pehli baar connection par SSH host verification ke liye pooch sakta hai:

```text
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Type karein:

```text
yes
```

Password type karte waqt screen par characters ya asterisks display nahi honge. Ye normal behavior hai.

## Step 3: Current User Check Karein

```bash
whoami
```

Output:

```text
bandit0
```

## Step 4: Current Directory Check Karein

```bash
pwd
```

Output:

```text
/home/bandit0
```

## Step 5: Files Ki List Dekhein

```bash
ls
```

Output:

```text
readme
```

## Step 6: `readme` File Read Karein

```bash
cat readme
```

Output:

```text
NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
```

Yahi `bandit1` user ka password hai.

## Step 7: Password Save Ya Copy Karein

Found password:

```text
NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
```

Password copy karte waqt dhyan rakhein:

- Start mein extra space na ho.
- End mein extra space na ho.
- Uppercase aur lowercase characters same rahen.
- Similar characters carefully check karein.

## Step 8: Current SSH Session Se Exit Karein

```bash
exit
```

Expected message kuch is tarah ho sakta hai:

```text
logout
Connection to bandit.labs.overthewire.org closed.
```

## Step 9: `bandit1` Par Login Karein

Ab username change hoga:

```text
bandit0 → bandit1
```

Command:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password:

```text
NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
```

## Actual Terminal Session

Aapka terminal session roughly is tarah dikh sakta hai:

```text
bandit0@bandit:~$ ls
readme
bandit0@bandit:~$ cat readme
NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
bandit0@bandit:~$ exit
logout
```

Uske baad next level par login karein:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

## Complete Command Sequence

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

# Credential Flow

Bandit mein har level ka password next level mein login karne ke liye use hota hai.

Level 0 se Level 1 ka flow:

```text
Current User:  bandit0
Current File:  readme
Command:       cat readme
Found Password: NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
Next User:     bandit1
```

General SSH format:

```bash
ssh NEXT_USERNAME@bandit.labs.overthewire.org -p 2220
```

Is level ke liye:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

# Common Errors

## `Permission denied`

Error:

```text
Permission denied, please try again.
```

Possible reasons:

- Username galat hai.
- `bandit0` mein zero ke badle letter `o` type kiya gaya hai.
- Password galat hai.
- Password copy karte waqt extra space aa gaya hai.
- Port `2220` specify nahi kiya gaya.

Correct command:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

## `No such file or directory`

Error:

```text
cat: readme: No such file or directory
```

Possible reasons:

- Aap wrong directory mein ho.
- File name galat type hua hai.
- Uppercase/lowercase mistake hai.

Check karein:

```bash
pwd
ls
```

Correct command:

```bash
cat readme
```

## Password Show Nahi Ho Raha

Linux terminal password type karte waqt kuch display nahi karta. Na characters dikhte hain aur na hi asterisks.

Password normally type karein aur `Enter` press karein.

## Wrong Username: `bandito`

Agar aap ye command type karte hain:

```bash
ssh bandito@bandit.labs.overthewire.org -p 2220
```

To username wrong hoga, kyunki `bandito` mein last character letter `o` hai.

Correct username:

```text
bandit0
```

Correct command:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

## Wrong Port

Agar aap `-p 2220` nahi likhte, to SSH default port `22` use karega.

Incorrect:

```bash
ssh bandit0@bandit.labs.overthewire.org
```

Correct:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

# Security Lessons

Is level se humein ye important lessons milte hain:

- Remote systems ko SSH ke through access kiya ja sakta hai.
- Hostname aur port dono connection ke liye important hote hain.
- Username mein ek character ki mistake login fail kar sakti hai.
- Linux terminal commands exact syntax follow karti hain.
- `ls` files discover karne ke liye use hota hai.
- `cat` file contents read karne ke liye use hota hai.
- Sensitive passwords files ke andar stored ho sakte hain.
- Passwords ko carefully copy aur handle karna chahiye.
- Authentication identity verify karta hai.
- Har level ke liye alag username aur password ho sakta hai.
- Linux file names aur commands case-sensitive hote hain.

# Commands Summary

| Command | Purpose |
|---|---|
| `ssh user@host -p 2220` | Remote server par SSH login karta hai |
| `whoami` | Current username show karta hai |
| `pwd` | Current working directory show karta hai |
| `ls` | Current directory ki files list karta hai |
| `ls -l` | Files ki detailed information show karta hai |
| `ls -a` | Hidden files bhi show karta hai |
| `cat readme` | `readme` file ka content display karta hai |
| `exit` | SSH session close karta hai |

# Final Solution

Bandit Level 0 par login karein:

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

Password:

```text
NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
```

Ab Level 1 par login karein:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password enter karein:

```text
NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
```

# Conclusion

Bandit Level 0 se Level 1 mein humne SSH ke through remote Linux server par login karna, current directory check karna, files list karna aur `cat` command se file ka password read karna seekha.

Complete workflow:

```text
SSH Login as bandit0
        ↓
Home Directory Open
        ↓
ls Command
        ↓
readme File Identify
        ↓
cat readme
        ↓
Password Find
        ↓
SSH Login as bandit1
```

Is level ka sabse important command hai:

```bash
cat readme
```

> **Security Note:** SSH ka use sirf un systems par karein jahan aapke paas permission ho. OverTheWire Bandit ek authorized cybersecurity learning environment hai.
