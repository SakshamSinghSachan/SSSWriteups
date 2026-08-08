---
title: "OverTheWire Bandit - Level 2"
description: "Beginner-friendly walkthrough of OverTheWire Bandit Level 2, including SSH, Linux filenames with spaces, quoting, escaping spaces, pwd, ls, cat, and moving to the next level."
platform: "CTF"
category: "OverTheWire - Bandit"
difficulty: "Beginner"
date: "19-06-2026"
tags:
  - OverTheWire
  - Bandit
  - Linux
  - SSH
  - Linux Commands
  - Filenames
  - Spaces
  - Quoting
  - Escaping
  - cat
  - CTF
---

# OverTheWire Bandit — Level 2

## Introduction

Is writeup ka heading **Level 2** hai. Is challenge ka transition technically **Level 2 → Level 3** hai.

Is level mein password ek aisi file ke andar stored hai jiske naam mein spaces hain:

```text
spaces in this filename
```

Linux terminal mein space ka special meaning hota hai. Shell spaces ko alag-alag arguments ke beech separator samajhta hai. Isliye humein filename ko quotes mein likhna ya spaces ko escape karna seekhna hoga.

## Objective

Level 2 complete karne ke liye humein:

1. `bandit2` user se SSH ke through login karna hai.
2. Home directory ki files dekhni hain.
3. Spaces wale filename ko identify karna hai.
4. Filename ko correctly handle karke uska content read karna hai.
5. Password copy karna hai.
6. `bandit3` user se SSH login karna hai.

## Given Credentials

Current level par login karne ke liye:

```text
Host:     bandit.labs.overthewire.org
Port:     2220
Username: bandit2
Password: Previous level se mila password
```

Challenge ka file name:

```text
spaces in this filename
```

Next level ka username:

```text
bandit3
```

Aapke provided solution ke according next level ka password hai:

```text
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

## Important Concepts

Is level mein hum ye concepts seekhenge:

- SSH login
- Remote Linux server
- Home directory
- Current working directory
- Files and directories
- `pwd` command
- `ls` command
- `cat` command
- Filename mein spaces
- Shell arguments
- Quoting
- Single quotes
- Double quotes
- Backslash escaping
- Tab completion
- Next level login

## Linux Filename Mein Space

Linux files ke naam mein spaces allowed hote hain.

Example:

```text
my file.txt
```

Ye ek single filename hai, lekin shell ise normally do alag words samajh sakta hai:

```text
my
file.txt
```

Bandit Level 2 mein filename hai:

```text
spaces in this filename
```

Ye ek hi file ka naam hai, chaar alag filenames nahi.

## Shell Space Ko Kaise Samajhta Hai?

Jab hum terminal mein command type karte hain, shell command ko parts ya arguments mein divide karta hai.

Example:

```bash
cat file.txt
```

Shell ise do parts ke roop mein samajhta hai:

```text
Command:  cat
Argument: file.txt
```

Ab agar hum bina quotes ke ye command run karein:

```bash
cat spaces in this filename
```

Shell ise is tarah samajh sakta hai:

```text
Command:   cat
Argument1: spaces
Argument2: in
Argument3: this
Argument4: filename
```

Lekin humein `cat` ko ek hi complete filename dena hai:

```text
spaces in this filename
```

Is problem ko solve karne ke liye quotes ya backslash ka use karte hain.

## `pwd` Command

`pwd` ka full form **Print Working Directory** hai.

Ye command batati hai ki aap abhi kis directory ke andar ho.

```bash
pwd
```

Expected output:

```text
/home/bandit2
```

Bandit Level 2 mein file home directory ke andar located hai, isliye login ke baad normally `cd` command ki zaroorat nahi padti.

## `ls` Command

`ls` command current directory ke andar available files aur directories ki list display karti hai.

```bash
ls
```

Expected output:

```text
spaces in this filename
```

Output mein spaces ki wajah se filename visually multiple words jaisa dikhta hai, lekin ye ek single file hai.

Detailed information dekhne ke liye:

```bash
ls -l
```

Hidden files ke saath list dekhne ke liye:

```bash
ls -la
```

## `cat` Command

`cat` command file ka content terminal par display karti hai.

Basic format:

```bash
cat filename
```

Normal filename ke liye example:

```bash
cat readme
```

Spaces wale filename ke liye filename ko correctly represent karna zaroori hai.

## Method 1: Single Quotes

Filename ko single quotes ke andar likh sakte hain:

```bash
cat 'spaces in this filename'
```

Single quotes shell ko batati hain ki quotes ke andar ka complete text ek hi argument hai.

Is command mein:

```text
Command:  cat
Filename: spaces in this filename
```

Single quotes filename ka actual part nahi hoti. Ye sirf shell ko filename correctly samjhane ke liye use hoti hain.

## Method 2: Double Quotes

Aap double quotes ka bhi use kar sakte hain:

```bash
cat "spaces in this filename"
```

Ye bhi shell ko complete filename ko ek single argument treat karne ke liye kehta hai.

Beginner ke liye dono commands easy hain:

```bash
cat 'spaces in this filename'
```

```bash
cat "spaces in this filename"
```

## Method 3: Backslash Se Spaces Escape Karna

Backslash `\\` ka use spaces ko escape karne ke liye kiya ja sakta hai.

```bash
cat spaces\ in\ this\ filename
```

Yahan har space se pehle backslash lagaya gaya hai:

```text
spaces\ in\ this\ filename
```

Backslash shell ko batata hai ki uske baad wala space argument separator nahi, balki filename ka actual part hai.

Ye command bhi correct hai:

```bash
cat spaces\ in\ this\ filename
```

## Quoting Aur Escaping Ka Comparison

| Method | Command |
|---|---|
| Single quotes | `cat 'spaces in this filename'` |
| Double quotes | `cat "spaces in this filename"` |
| Backslash escaping | `cat spaces\ in\ this\ filename` |

Teeno methods same file ka content display karengi.

Beginner ke liye sabse readable method single quotes hai:

```bash
cat 'spaces in this filename'
```

## Tab Completion

Linux terminal mein Tab key filename complete karne mein help karti hai.

Aap type karein:

```bash
cat spa
```

Ab `Tab` press karein.

Terminal automatically filename complete kar sakta hai, jaise:

```bash
cat spaces\ in\ this\ filename
```

Tab completion ke benefits:

- Typing mistakes kam hoti hain.
- Long filenames easily complete hote hain.
- Spaces aur special characters automatically handle ho sakte hain.
- Commands fast type hoti hain.

## Complete Walkthrough

### Step 1: Terminal Open Karein

Linux Terminal, macOS Terminal, Windows PowerShell, Windows Terminal ya WSL open karein.

### Step 2: `bandit2` Par Login Karein

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

Password ke roop mein previous level se mila hua password enter karein.

### Step 3: Current User Verify Karein

```bash
whoami
```

Expected output:

```text
bandit2
```

### Step 4: Current Directory Check Karein

```bash
pwd
```

Expected output:

```text
/home/bandit2
```

### Step 5: Files Ki List Dekhein

```bash
ls
```

Expected output:

```text
spaces in this filename
```

### Step 6: Spaces Wali File Read Karein

Recommended command:

```bash
cat 'spaces in this filename'
```

Alternative command:

```bash
cat "spaces in this filename"
```

Another valid command:

```bash
cat spaces\ in\ this\ filename
```

Output mein next level ka password display hoga:

```text
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

### Step 7: Current Session Close Karein

```bash
exit
```

### Step 8: `bandit3` Par Login Karein

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

Password enter karein:

```text
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

## Complete Command Sequence

```bash
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
cat 'spaces in this filename'
```

```bash
exit
```

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

## Incorrect Command Aur Error

Agar aap ye command run karte hain:

```bash
cat spaces in this filename
```

To shell ise multiple arguments ke roop mein interpret kar sakta hai. Is wajah se error aa sakta hai:

```text
cat: spaces: No such file or directory
cat: in: No such file or directory
cat: this: No such file or directory
cat: filename: No such file or directory
```

Correct commands:

```bash
cat 'spaces in this filename'
```

Ya:

```bash
cat spaces\ in\ this\ filename
```

## Common Errors

### `No such file or directory`

Possible reasons:

- Filename ko quotes mein nahi likha.
- Spaces escape nahi kiye.
- Filename mein spelling mistake hai.
- Aap wrong directory mein ho.

Check karein:

```bash
pwd
ls
```

Recommended command:

```bash
cat 'spaces in this filename'
```

### Filename Not Found

Linux filenames case-sensitive hote hain. Ye names alag-alag hain:

```text
spaces in this filename
Spaces in this filename
spaces In this filename
```

Command mein exact filename use karein:

```bash
cat 'spaces in this filename'
```

### SSH Permission Denied

Agar next level par login karte waqt error aaye:

```text
Permission denied, please try again.
```

Check karein:

- Username `bandit3` hai.
- Port `2220` use ho raha hai.
- Password exactly copy hua hai.
- Password ke start ya end mein extra space nahi hai.
- Similar characters carefully check kiye gaye hain.

Correct command:

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

### Password Screen Par Show Nahi Hota

Linux terminal password type karte waqt characters ya asterisks display nahi karta. Password type karein aur `Enter` press karein.

## File Name Aur Command Argument

Command line mein space normally arguments ko separate karta hai.

Example:

```bash
command argument1 argument2
```

Yahan command ko do arguments milte hain.

Agar ek argument ke andar spaces hon, to quotes use karni padti hain:

```bash
command "argument with spaces"
```

Bandit Level 2 mein:

```bash
cat 'spaces in this filename'
```

Yahan `cat` ko ek hi filename argument milta hai.

## Security Lessons

Is level se humein ye important lessons milte hain:

- Linux filenames mein spaces allowed hote hain.
- Shell spaces ko argument separators samajhta hai.
- Quotes complete text ko ek argument ke roop mein preserve karti hain.
- Backslash special characters ko escape karta hai.
- Tab completion typing errors reduce karta hai.
- File ko read karne se pehle uska exact name verify karna chahiye.
- Linux filenames case-sensitive hote hain.
- User input aur shell parsing ko samajhna cybersecurity mein important hai.
- Special characters wali files ke saath carefully kaam karna chahiye.

## Commands Summary

| Command | Purpose |
|---|---|
| `ssh user@host -p 2220` | Remote server par SSH login karta hai |
| `whoami` | Current username show karta hai |
| `pwd` | Current working directory show karta hai |
| `ls` | Files aur directories ki list show karta hai |
| `ls -l` | Detailed file information show karta hai |
| `cat 'file name'` | Spaces wale filename ka content read karta hai |
| `cat "file name"` | Quotes ke through file read karta hai |
| `cat file\ name` | Escaped spaces ke through file read karta hai |
| `cd directory` | Directory change karta hai |
| `exit` | SSH session close karta hai |

## Final Solution

Pehle `bandit2` par login karein:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

Files dekhein:

```bash
ls
```

Spaces wale filename ko quotes ke saath read karein:

```bash
cat 'spaces in this filename'
```

Password:

```text
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

Ab `bandit3` par login karein:

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

## Conclusion

Bandit Level 2 mein humne seekha ki Linux terminal mein spaces wale filename ke saath kaise kaam kiya jata hai.

Complete workflow:

```text
SSH Login as bandit2
        ↓
Current Directory Check
        ↓
Files List Karna
        ↓
Spaces Wala Filename Identify Karna
        ↓
Quotes Ya Backslash Ka Use Karna
        ↓
File Ka Password Read Karna
        ↓
SSH Login as bandit3
```

Is level ka sabse important command hai:

```bash
cat 'spaces in this filename'
```

> **Security Note:** SSH ka use sirf un systems par karein jahan aapke paas permission ho. OverTheWire Bandit ek authorized cybersecurity learning environment hai.
