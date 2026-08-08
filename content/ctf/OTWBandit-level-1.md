---
title: "OverTheWire Bandit - Level 1"
description: "Beginner-friendly walkthrough of OverTheWire Bandit Level 0 to Level 1. Learn how to use SSH, ls, pwd, cat, Linux files, directories, paths, passwords, and remote authentication."
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
  - cat
  - Files
  - Directories
  - Authentication
  - CTF
---

# OverTheWire Bandit — Level 1

## Introduction

Bandit Level 1 ko technically **Level 0 → Level 1** bhi kaha jata hai. Is level mein hum pehle `bandit0` user se SSH ke through login karenge. Login karne ke baad home directory mein maujood `readme` file ko read karna hai.

`readme` file ke andar next level, yani `bandit1`, ka password stored hai. Official challenge ke according, password home directory mein present `readme` file mein hota hai. [web:28]

Is level ka main purpose Linux terminal mein files ko locate karna aur unka content read karna seekhna hai.

## Objective

Humein ye steps complete karne hain:

1. `bandit0` user se SSH ke through login karna.
2. Current directory check karna.
3. Available files ki list dekhna.
4. `readme` file ka content read karna.
5. File se mila password copy karna.
6. Us password se `bandit1` user ke through login karna.

## Given Credentials

Level 0 par login karne ke liye:

```text
Host:     bandit.labs.overthewire.org
Port:     2220
Username: bandit0
Password: bandit0
```

Next level par login karne ke liye username hoga:

```text
bandit1
```

Password `readme` file se milega.

## Important Concepts

Is level mein hum ye concepts seekhenge:

- SSH login
- Remote server
- Linux home directory
- Current working directory
- Files and directories
- `pwd` command
- `ls` command
- `cat` command
- Absolute path
- Relative path
- File permissions ka basic idea
- Password extraction
- Next level SSH login

## Remote Server Kya Hota Hai?

Remote server ek aisa computer hota hai jise hum network ya internet ke through access kar sakte hain. Bandit ka server hamare local computer par nahi hota; hum SSH ke through us par login karte hain.

SSH ke baad terminal mein run ki gayi commands remote Bandit machine par execute hoti hain, local computer par nahi.

## SSH Kya Hota Hai?

SSH ka full form **Secure Shell** hai. SSH ka use kisi remote computer par securely login karne aur commands execute karne ke liye hota hai.

SSH command ka general format:

```bash
ssh username@hostname -p port
```

Bandit ke liye command:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Command ke parts:

| Part | Meaning |
|---|---|
| `ssh` | SSH client start karta hai |
| `bandit0` | Remote server ka username |
| `@` | Username aur hostname ko separate karta hai |
| `bandit.labs.overthewire.org` | Bandit server ka hostname |
| `-p` | Custom port specify karta hai |
| `2220` | Bandit SSH service ka port |

Bandit ka port `2220` hai, isliye command mein `-p 2220` likhna zaroori hai.

## Linux File System Basics

### File Kya Hoti Hai?

File ek container hoti hai jisme information store hoti hai. Example:

```text
readme
password.txt
notes.md
config.conf
```

Is level mein password ek file ke andar store hai:

```text
readme
```

### Directory Kya Hoti Hai?

Directory ko commonly folder bhi kaha jata hai. Iska use files aur doosri directories ko organize karne ke liye hota hai.

Example:

```text
/home
└── bandit0
    └── readme
```

Yahan `home` aur `bandit0` directories hain, jabki `readme` ek file hai.

### Home Directory Kya Hoti Hai?

Har Linux user ki ek personal home directory hoti hai. `bandit0` user ki home directory generally ye hoti hai:

```text
/home/bandit0
```

SSH login ke baad hum usually isi directory se start karte hain. Home directory ko short form mein `~` se represent kiya jata hai.

Example prompt:

```text
bandit0@bandit:~$
```

Yahan `~` ka matlab current user ki home directory hai.

## `pwd` Command

`pwd` ka full form **Print Working Directory** hai. Ye current directory ka complete path display karta hai.

```bash
pwd
```

Expected output:

```text
/home/bandit0
```

Current directory pata hona important hai, kyunki `cat readme` jaise commands current directory mein file search karte hain.

## `ls` Command

`ls` command current directory ke andar available files aur directories ki list show karti hai.

```bash
ls
```

Expected output:

```text
readme
```

Is output ka matlab hai ki current directory mein `readme` naam ki file available hai.

### Useful `ls` Options

Detailed information dekhne ke liye:

```bash
ls -l
```

Hidden files ke saath list dekhne ke liye:

```bash
ls -a
```

Detailed hidden-file list ke liye:

```bash
ls -la
```

Level 1 ke liye simple `ls` command enough hai.

## `cat` Command

`cat` command ka use file ka content terminal par display karne ke liye hota hai. `cat` ka naam **concatenate** se aaya hai, lekin single file read karne ke liye bhi iska bahut use hota hai. [web:16]

Command ka format:

```bash
cat filename
```

`readme` file read karne ke liye:

```bash
cat readme
```

Command run karne ke baad output mein next level ka password display hoga.

Example:

```text
bandit0@bandit:~$ cat readme
PASSWORD_FOR_BANDIT1
```

Actual password aapke terminal ke output mein hoga. Use carefully copy karein.

## Absolute Path Aur Relative Path

### Relative Path

Agar aap already `/home/bandit0` directory mein ho, to file ko sirf naam se read kar sakte ho:

```bash
cat readme
```

Ye relative path hai, kyunki path current directory ke according diya gaya hai.

### Absolute Path

File ka complete path:

```bash
/home/bandit0/readme
```

Is path ke through bhi file read kar sakte ho:

```bash
cat /home/bandit0/readme
```

Ye absolute path hai, kyunki ye root directory `/` se start hota hai.

## Linux Case Sensitivity

Linux file names case-sensitive hote hain. Ye teen alag file names hain:

```text
readme
Readme
README
```

Bandit mein correct file name hai:

```text
readme
```

Isliye command exactly is tarah run karein:

```bash
cat readme
```

## Complete Walkthrough

### Step 1: Terminal Open Karein

Linux Terminal, macOS Terminal, Windows PowerShell, Windows Terminal ya WSL open karein.

### Step 2: `bandit0` Par Login Karein

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

Learning server ke liye type karein:

```text
yes
```

### Step 3: Current User Verify Karein

```bash
whoami
```

Expected output:

```text
bandit0
```

`whoami` command currently logged-in user ka naam show karti hai.

### Step 4: Current Directory Check Karein

```bash
pwd
```

Expected output:

```text
/home/bandit0
```

### Step 5: Files Ki List Dekhein

```bash
ls
```

Expected output:

```text
readme
```

### Step 6: File Read Karein

```bash
cat readme
```

Output mein jo password aaye, use copy kar lein.

Password type karte waqt extra space add na karein. Linux passwords case-sensitive hote hain.

### Step 7: Current SSH Session Close Karein

```bash
exit
```

Isse aap `bandit0` session se logout ho jaoge.

### Step 8: `bandit1` Par Login Karein

Ab username `bandit0` nahi, balki `bandit1` hoga:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password ke liye `cat readme` command se mila hua actual password enter karein.

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

## Credential Flow

Har Bandit level ka password next level mein login karne ke liye use hota hai.

Level 0 se Level 1 ka flow:

```text
Current user:  bandit0
File:         readme
Action:       cat readme
Result:       bandit1 ka password
Next user:    bandit1
```

General format:

```bash
ssh NEXT_USERNAME@bandit.labs.overthewire.org -p 2220
```

Level 1 ke liye:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

## Common Errors

### `No such file or directory`

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

### `Permission denied`

Error:

```text
cat: readme: Permission denied
```

File permissions check karein:

```bash
ls -l readme
```

Is level mein file normally readable honi chahiye. Agar problem aaye, username aur current directory verify karein.

### SSH Permission Denied

Error:

```text
Permission denied, please try again.
```

Check karein:

- Username `bandit1` hai.
- Port `2220` hai.
- Password `readme` file se copy kiya gaya hai.
- Password ke start ya end mein extra space nahi hai.
- Uppercase aur lowercase characters correct hain.

Correct command:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

### Password Display Nahi Ho Raha

Linux terminal mein password type karte waqt characters ya asterisks display nahi hote. Password normally type karein aur `Enter` press karein.

### Wrong Port

Agar aap port specify nahi karte:

```bash
ssh bandit1@bandit.labs.overthewire.org
```

To SSH default port `22` use karega. Bandit ke liye correct port `2220` hai:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

## Alternative File Reading Commands

`cat` ke alawa file read karne ke liye ye commands bhi use ki ja sakti hain:

```bash
less readme
```

Large files ko page by page read karne ke liye `less` useful hai. Exit karne ke liye `q` press karein.

```bash
more readme
```

File ko screen by screen display karta hai.

```bash
head readme
```

File ki starting lines display karta hai.

```bash
tail readme
```

File ki last lines display karta hai.

Level 1 ke liye simplest command hai:

```bash
cat readme
```

## Security Lessons

Is level se humein ye important lessons milte hain:

- Sensitive information files ke andar stored ho sakti hai.
- File name aur path accurately identify karna zaroori hai.
- Linux commands case-sensitive hoti hain.
- Current working directory ko samajhna important hai.
- `ls` file discovery ke liye useful hai.
- `cat` file contents read karne ke liye useful hai.
- SSH remote authentication provide karta hai.
- Har level ke liye username aur password change ho sakta hai.
- Password ko copy karte waqt extra spaces se bachna chahiye.
- File permissions decide karti hain ki kaun file read kar sakta hai.

## Commands Summary

| Command | Purpose |
|---|---|
| `ssh user@host -p 2220` | Remote server par SSH login karta hai |
| `whoami` | Current username dikhata hai |
| `pwd` | Current directory dikhata hai |
| `ls` | Current directory ki files list karta hai |
| `ls -l` | Files ki detailed information dikhata hai |
| `ls -a` | Hidden files bhi dikhata hai |
| `cat readme` | `readme` file ka content display karta hai |
| `cd directory` | Directory change karta hai |
| `cd ..` | Parent directory mein move karta hai |
| `exit` | SSH session close karta hai |
| `less readme` | File ko page by page read karta hai |

## Final Solution

Pehle `bandit0` par login karein:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

File list karein:

```bash
ls
```

`readme` file read karein:

```bash
cat readme
```

Output mein mila hua password use karke `bandit1` par login karein:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

## Conclusion

Bandit Level 1 mein humne seekha ki SSH ke through remote Linux server par login karke files ko kaise locate aur read kiya jata hai.

Complete workflow:

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

Level 0 se Level 1 complete karne ke baad aap next Bandit challenge ke liye ready hain.

> **Security Note:** SSH ka use sirf un systems par karein jahan aapke paas permission ho. OverTheWire Bandit ek authorized cybersecurity learning environment hai.
