---
title: "OverTheWire Bandit - Level 1"
description: "Beginner-friendly walkthrough of OverTheWire Bandit Level 1 to Level 2, including SSH, Linux files, filenames beginning with a dash, standard input, command options, cat, paths, and authentication."
platform: "CTF"
category: "OverTheWire - Bandit"
difficulty: "Beginner"
date: "19-06-2026"
tags:
  - OverTheWire
  - Bandit
  - Linux
  - SSH
  - cat
  - Standard Input
  - File Paths
  - Command Options
  - Authentication
  - CTF
---

# OverTheWire Bandit — Level 2

## Introduction

Is challenge ko technically **Bandit Level 1 → Level 2** kaha jata hai.

Is level mein humein `bandit1` user ke home directory mein ek aisi file read karni hai jiska naam sirf ek dash hai:

```text
-
```

Normal file ko read karne ke liye hum command use karte hain:

```bash
cat filename
```

Lekin is challenge mein filename `-` hai. Linux commands mein single dash ka special meaning ho sakta hai. `cat -` ko normally file named `-` ke roop mein nahi, balki standard input ke roop mein interpret kiya jata hai. Isliye humein file ka path explicitly specify karna hoga.

Is level ka safest solution hai:

```bash
cat ./-
```

Is command se `-` file ka content display hoga. Us content mein `bandit2` user ka password stored hai.

## Objective

Humein ye steps complete karne hain:

1. `bandit1` user ke through SSH se login karna.
2. Current directory check karna.
3. Home directory ki files list karna.
4. Dash (`-`) naam wali file identify karna.
5. `cat ./-` command se file read karna.
6. File se mila password copy karna.
7. `bandit2` user ke through SSH login karna.

## Given Credentials

`bandit1` par login karne ke liye:

```text
Host:     bandit.labs.overthewire.org
Port:     2220
Username: bandit1
Password: rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

Next level ke liye:

```text
Next Username: bandit2
```

Password `-` naam wali file ke andar stored hai.

## Main Concept

Is level ka main concept hai:

> Aisi file ko safely read karna jiska naam `-` ho.

Normal command:

```bash
cat -
```

Is challenge mein problem create karegi, kyunki `cat` ke liye `-` standard input ka meaning rakhta hai.

Correct command:

```bash
cat ./-
```

## SSH Login

Pehle `bandit1` user ke through remote Bandit server par login karein:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password:

```text
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

Command ke parts:

| Part | Meaning |
|---|---|
| `ssh` | Secure Shell client start karta hai |
| `bandit1` | Remote server ka username |
| `@` | Username aur hostname ko separate karta hai |
| `bandit.labs.overthewire.org` | Remote Bandit server ka hostname |
| `-p` | Custom port specify karta hai |
| `2220` | Bandit SSH service ka port |

## `pwd` Command

Login ke baad current directory check karein:

```bash
pwd
```

Expected output generally kuch is tarah hota hai:

```text
/home/bandit1
```

Ye Bandit user ki home directory hai. Challenge ki file isi directory mein available hai.

## `ls` Command

Current directory ki files dekhne ke liye:

```bash
ls
```

Expected output:

```text
-
```

Yahan output mein sirf ek dash dikh raha hai. Ye hi actual filename hai.

Important: Ye normal hyphen jaisa dikh raha hai, lekin yahan ye file ka actual naam hai.

## Dash (`-`) Ka Special Meaning

Linux command-line tools mein dash ka use do common purposes ke liye hota hai:

1. Command options ke liye.
2. Standard input ya standard output represent karne ke liye.

Examples:

```bash
ls -l
```

Yahan `-l` ek option hai jo detailed list display karta hai.

```bash
cat -
```

Yahan `-` ko `cat` standard input ke roop mein treat kar sakta hai.

Isliye `cat -` type karne par command file named `-` read karne ke bajay keyboard se input ka wait kar sakti hai.

## Standard Input Kya Hota Hai?

Standard input ko short form mein **stdin** kaha jata hai.

By default, standard input keyboard hota hai. Jab koi program standard input se data read karta hai, to woh user ke keyboard input ka wait karta hai.

Linux ke teen standard streams:

| Stream | Short Name | Meaning |
|---|---|---|
| Standard input | stdin | Program ko input deta hai |
| Standard output | stdout | Normal output display karta hai |
| Standard error | stderr | Error messages display karta hai |

Simple flow:

```text
Keyboard Input
      ↓
    stdin
      ↓
   Program
      ↓
   stdout
      ↓
Terminal Output
```

`cat -` mein dash ka meaning stdin ho sakta hai. Isliye command file read karne ke bajay keyboard input ka wait kar sakti hai.

## Correct Command: `cat ./-`

Correct command:

```bash
cat ./-
```

Is command ko parts mein samjhein:

| Part | Meaning |
|---|---|
| `cat` | File content display karta hai |
| `./` | Current directory ko represent karta hai |
| `-` | Actual filename |

`./-` ka complete meaning hai:

```text
Current directory ke andar maujood - naam wali file
```

`./` add karne se `cat` ko clear ho jata hai ki `-` ek file path hai, standard input nahi.

## `./` Ka Meaning

Linux mein:

```text
.
```

current directory ko represent karta hai.

Isliye:

```text
./-
```

ka meaning hai:

```text
Current directory / file named -
```

Agar current directory `/home/bandit1` hai, to:

```bash
./-
```

actually is file ko refer karta hai:

```text
/home/bandit1/-
```

## File Read Karna

Command run karein:

```bash
cat ./-
```

Output mein next level ka password display hoga.

Expected output ka format:

```text
PASSWORD_FOR_BANDIT2
```

Aapke challenge mein password hai:

```text
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

Password ko carefully copy karein. Extra spaces copy na karein.

## Alternative Method 1: `cat -- -`

Kuch Linux commands `--` ko end-of-options marker ke roop mein support karti hain.

Command:

```bash
cat -- -
```

Iska meaning hai:

```text
cat command, options yahan tak khatam ho gaye; ab - ko filename samjho
```

Yahan:

```text
--
```

command ko batata hai ki iske baad aane wali value ko option ki tarah interpret na kare.

Is method kaam kar sakta hai:

```bash
cat -- -
```

Lekin beginners ke liye recommended aur easy method hai:

```bash
cat ./-
```

## Alternative Method 2: Input Redirection

Aap input redirection ka use bhi kar sakte hain:

```bash
cat < -
```

Yahan `<` shell ko batata hai ki input `-` file se lena hai.

Input redirection ka basic format:

```bash
command < input_file
```

Example:

```bash
cat < notes.txt
```

Is command mein `cat` ko input `notes.txt` file se milta hai.

Bandit ke liye:

```bash
cat < -
```

Ye method work kar sakta hai, lekin beginners ke liye `cat ./-` zyada clear hai.

## Recommended Solution

Is level ke liye recommended command:

```bash
cat ./-
```

Iska benefit:

- Easy to understand hai.
- Current directory clearly specify karta hai.
- `-` ko stdin samajhne ki confusion nahi hoti.
- File path explicitly diya jata hai.

## Complete Walkthrough

### Step 1: Terminal Open Karein

Linux Terminal, macOS Terminal, Windows PowerShell, Windows Terminal ya WSL open karein.

### Step 2: `bandit1` Par Login Karein

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password enter karein:

```text
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

### Step 3: Current User Verify Karein

```bash
whoami
```

Expected output:

```text
bandit1
```

### Step 4: Current Directory Check Karein

```bash
pwd
```

Expected output:

```text
/home/bandit1
```

### Step 5: Files Ki List Dekhein

```bash
ls
```

Expected output:

```text
-
```

### Step 6: Dash Filename Read Karein

```bash
cat ./-
```

Output mein `bandit2` ka password milega.

### Step 7: Current SSH Session Close Karein

```bash
exit
```

### Step 8: `bandit2` Par Login Karein

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

Password ke liye `cat ./-` command se mila hua password enter karein.

## Complete Command Sequence

```bash
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
cat ./-
```

```bash
exit
```

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

## Credential Flow

Level 1 se Level 2 ka flow:

```text
Current user:  bandit1
File name:    -
Command:      cat ./-
Result:       bandit2 ka password
Next user:    bandit2
```

General SSH format:

```bash
ssh NEXT_USERNAME@bandit.labs.overthewire.org -p 2220
```

Level 2 ke liye:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

## Common Errors

### 1. `cat -` Input Ka Wait Kar Raha Hai

Agar aap run karte hain:

```bash
cat -
```

to `cat` standard input ka wait kar sakta hai. Keyboard se type ki hui lines screen par display ho sakti hain.

Is situation se exit karne ke liye:

```text
Ctrl + D
```

Phir correct command run karein:

```bash
cat ./-
```

### 2. `No such file or directory`

Error:

```text
cat: ./-: No such file or directory
```

Possible reasons:

- Aap wrong directory mein ho.
- Filename incorrectly type hua hai.
- Aap `bandit1` ke bajay kisi doosre user se logged in ho.

Check karein:

```bash
whoami
pwd
ls
```

### 3. Wrong Username

Next level ke liye username change hota hai:

```text
bandit1 → bandit2
```

Correct command:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

### 4. Permission Denied

Agar file read nahi ho rahi, to permissions check karein:

```bash
ls -l ./-
```

Current user bhi check karein:

```bash
whoami
```

### 5. Password Login Fail Ho Raha Hai

Check karein:

- Password exactly copy hua hai.
- Extra spaces nahi hain.
- Uppercase/lowercase correct hai.
- Username `bandit2` hai.
- Port `2220` use kiya gaya hai.

Correct SSH command:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

## Important Linux Lessons

### Dash Filename Aur Command Option Alag Hote Hain

Linux filesystem ke liye `-` ek valid filename hai. Lekin kai command-line programs `-` ko option ya standard input ke roop mein interpret karte hain.

Isliye filename ko path ke saath specify karna safe hota hai:

```bash
cat ./-
```

### `./` Ambiguity Remove Karta Hai

Ye command:

```bash
cat -
```

ambiguous hai.

Ye command clear hai:

```bash
cat ./-
```

Yahan `./` batata hai ki `-` current directory ke andar ek file hai.

### `--` Options Ko Stop Karta Hai

`--` ka use command ko batane ke liye hota hai ki ab aage aane wali values options nahi, balki filenames ya arguments hain.

Example:

```bash
cat -- -
```

### Stdin Aur File Same Cheez Nahi Hain

`stdin` program ko input provide karta hai. File disk par stored data hoti hai.

`cat -` mein dash stdin ko represent kar sakta hai, jabki `cat ./-` actual file named `-` ko read karta hai.

## Useful Commands Summary

| Command | Purpose |
|---|---|
| `ssh user@host -p 2220` | Remote server par SSH login karta hai |
| `whoami` | Current username dikhata hai |
| `pwd` | Current directory dikhata hai |
| `ls` | Files aur directories list karta hai |
| `cat ./-` | `-` naam wali file read karta hai |
| `cat -- -` | `-` ko filename ke roop mein read karta hai |
| `cat < -` | `-` file se input redirect karta hai |
| `ls -l ./-` | Dash file ki permissions dikhata hai |
| `exit` | SSH session close karta hai |

## Final Solution

`bandit1` par login karein:

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Password:

```text
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

Files list karein:

```bash
ls
```

Dash filename ko read karein:

```bash
cat ./-
```

File ke output mein mila password use karke Level 2 par login karein:

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

## Conclusion

Bandit Level 1 → Level 2 mein humne seekha ki dash (`-`) naam wali file ko kaise read kiya jata hai.

Main lesson ye hai ki:

```bash
cat -
```

mein `-` standard input ka meaning rakh sakta hai, isliye humein file ka explicit path use karna chahiye:

```bash
cat ./-
```

Complete workflow:

```text
SSH Login as bandit1
        ↓
Current Directory Check
        ↓
ls Se File Identify
        ↓
cat ./- Se Password Read
        ↓
SSH Login as bandit2
```

> **Security Note:** SSH ka use sirf un systems par karein jahan aapke paas permission ho. OverTheWire Bandit ek authorized cybersecurity learning environment hai.
