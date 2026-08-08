---
title: "OverTheWire Bandit - Level 0"
description: "Complete beginner-friendly walkthrough of OverTheWire Bandit Level 0, including SSH, Linux shell, networking, DNS, IP addresses, TCP, ports, authentication, encryption, and remote access."
platform: "CTF"
category: "OverTheWire - Bandit"
difficulty: "Beginner"
date: "19-06-2026"
tags:
  - OverTheWire
  - Bandit
  - Linux
  - SSH
  - Networking
  - DNS
  - TCP
  - Ports
  - Authentication
  - Encryption
---

# OverTheWire Bandit — Level 0

## Introduction

[OverTheWire Bandit](https://overthewire.org/wargames/bandit/) ek Linux-based Capture The Flag (CTF) wargame hai. Iska purpose beginners ko practical Linux, networking aur cybersecurity concepts sikhana hai.

Bandit ko multiple levels mein divide kiya gaya hai. Har level par ek naya Linux command, security concept, vulnerability ya technique sikhne ko milti hai.

Level 0 Bandit ka starting level hai.

Is level ka objective hai SSH ka use karke OverTheWire ke remote server par login karna.

---

## Objective

Level 0 mein humein SSH ke through Bandit server par login karna hai.

Challenge ke connection details ye hain:

```text
Host:     bandit.labs.overthewire.org
Port:     2220
Username: bandit0
Password: bandit0
```

---

## Level 0 Mein Use Hone Wale Concepts

Is level ko samajhne ke liye humein in concepts ko samajhna hoga:

- Remote server
- Client and server
- SSH
- Hostname
- DNS
- IP address
- Port
- TCP
- Username and password
- Authentication
- Authorization
- Encryption
- Terminal
- Shell

---

## 1. Server Kya Hota Hai?

Server ek computer hota hai jo doosre computers ko koi service provide karta hai.

Example ke liye, jab hum koi website open karte hain, tab:

- Hamara browser client hota hai.
- Website ka computer server hota hai.
- Client server ko request bhejta hai.
- Server client ko response bhejta hai.

Bandit mein OverTheWire ne ek remote Linux server provide kiya hai. Humein us server par connect karke challenges solve karne hote hain.

Simple diagram:

```text
Your Computer  ───────────>  Bandit Server
    Client                    Remote Server
```

Hamari computer client hai kyunki connection hum initiate kar rahe hain.

Bandit machine server hai kyunki woh connection accept kar rahi hai aur humein Linux shell provide kar rahi hai.

---

## 2. Remote Connection Kya Hota Hai?

Remote connection ka matlab hai kisi doosre computer ko network ke through access karna.

Aap physically India mein baithe ho sakte ho, lekin Bandit server kisi doosri location par hosted ho sakta hai. Network ki madad se aap us remote machine par commands run kar sakte ho.

SSH ke through login karne ke baad terminal mein type ki gayi commands aapke local computer par nahi, balki Bandit ke remote server par execute hoti hain.

Example:

```bash
pwd
```

Ye command login ke baad remote Bandit machine ki current directory display karegi.

---

## 3. SSH Kya Hota Hai?

SSH ka full form **Secure Shell** hai.

SSH ek network protocol hai jiska use kisi remote computer par securely login karne aur commands execute karne ke liye hota hai.

SSH ka use commonly in logon ke dwara kiya jata hai:

- System administrators
- Cloud engineers
- Developers
- Cybersecurity professionals
- Penetration testers
- DevOps engineers

SSH ki madad se hum:

- Remote computer par login kar sakte hain.
- Remote commands execute kar sakte hain.
- Files transfer kar sakte hain.
- Servers manage kar sakte hain.
- Secure network tunnels create kar sakte hain.

SSH command ka basic format:

```bash
ssh username@hostname
```

Bandit ke liye command:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

---

## 4. SSH Command Ko Samajhna

Command:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Ab is command ke har part ko samajhte hain.

### `ssh`

```text
ssh
```

Ye batata hai ki hum SSH client ka use karke connection establish karna chahte hain.

SSH client hamare computer par installed ek program hota hai jo SSH server se connect karta hai.

### `bandit0`

```text
bandit0
```

Ye remote server par login karne wala username hai.

Ek server par multiple users ke accounts ho sakte hain. Username batata hai ki hum kis account se login karna chahte hain.

### `@`

```text
@
```

`@` symbol username aur hostname ko separate karta hai.

General format:

```text
username@hostname
```

Example:

```text
alice@example.com
```

Iska matlab:

```text
Username: alice
Host:     example.com
```

### `bandit.labs.overthewire.org`

```text
bandit.labs.overthewire.org
```

Ye Bandit server ka hostname hai.

Hostname kisi computer ya network service ka human-readable naam hota hai.

### `-p`

```text
-p
```

`-p` option SSH ko batata hai ki connection ke liye ek specific port ka use karna hai.

### `2220`

```text
2220
```

Ye woh port number hai jahan Bandit ka SSH service run kar raha hai.

Normally SSH ka default port `22` hota hai, lekin Bandit port `2220` use karta hai.

Isliye command mein `-p 2220` likhna zaroori hai.

---

## 5. Hostname Kya Hota Hai?

Hostname kisi computer ya service ka readable naam hota hai.

Hum usually numerical IP address yaad rakhne ke bajay hostname use karte hain.

Example:

```text
bandit.labs.overthewire.org
```

Is hostname ko parts mein samjha ja sakta hai:

```text
bandit       → Specific server ya subdomain
labs         → Project ya organization ka section
overthewire  → Main domain
org          → Top-level domain
```

Hostname hamare computer ko batata hai ki kis server se connect karna hai.

---

## 6. DNS Kya Hota Hai?

DNS ka full form **Domain Name System** hai.

DNS hostname ko IP address mein convert karta hai.

Example:

```text
bandit.labs.overthewire.org
```

DNS lookup ke baad ye hostname ek IP address mein convert ho sakta hai:

```text
176.9.9.172
```

Computer network par server ko locate karne ke liye IP address ka use karta hai.

Process:

```text
Hostname
    ↓
DNS Lookup
    ↓
IP Address
    ↓
Network Connection
```

Humein normally manually IP address find karne ki zaroorat nahi hoti. Jab hum SSH command run karte hain, operating system automatically DNS lookup karta hai.

DNS ko manually test karne ke liye:

```bash
nslookup bandit.labs.overthewire.org
```

Ya:

```bash
dig bandit.labs.overthewire.org
```

Aap `ping` command bhi use kar sakte ho:

```bash
ping bandit.labs.overthewire.org
```

Note: Kuch servers ping requests ko block kar dete hain. Aise case mein ping fail ho sakta hai, chahe server available ho.

---

## 7. IP Address Kya Hota Hai?

IP address ek numerical address hota hai jo network par kisi device ya service ko identify karta hai.

IPv4 address ka example:

```text
192.168.1.10
```

Public server ka example:

```text
176.9.9.172
```

IP address ko postal address ki tarah samajh sakte hain. Ye network traffic ko correct computer tak pahunchne mein help karta hai.

Lekin sirf IP address se connection complete nahi hota. Humein port number bhi chahiye hota hai.

Complete destination:

```text
IP Address + Port
```

Example:

```text
176.9.9.172:2220
```

Iska matlab:

```text
IP Address: 176.9.9.172
Port:       2220
```

---

## 8. Port Kya Hota Hai?

Port ek numbered communication endpoint hota hai.

Ek server ek hi time par multiple services provide kar sakta hai. Ports ki madad se operating system incoming traffic ko correct service tak pahunchata hai.

Common ports:

| Service | Common Port |
|---|---:|
| HTTP | 80 |
| HTTPS | 443 |
| SSH | 22 |
| DNS | 53 |
| Bandit SSH Service | 2220 |

Ports ko ek building ke doors ki tarah samajh sakte hain:

```text
IP Address = Building ka address
Port       = Building ka specific door
Service    = Door ke peeche available service
```

Bandit ka destination:

```text
bandit.labs.overthewire.org:2220
```

Normally SSH port `22` par run karta hai, lekin Bandit port `2220` ka use karta hai.

Agar hum ye command run karein:

```bash
ssh bandit0@bandit.labs.overthewire.org
```

To SSH by default port `22` par connect karne ki try karega. Connection fail ho sakta hai kyunki Bandit SSH service port `2220` par run kar rahi hai.

Correct command:

```bash
ssh -p 2220 bandit0@bandit.labs.overthewire.org
```

---

## 9. TCP Kya Hota Hai?

TCP ka full form **Transmission Control Protocol** hai.

TCP ek transport-layer protocol hai jo do devices ke beech reliable connection establish karta hai.

SSH ko reliable connection ki zaroorat hoti hai kyunki:

- Commands correct order mein deliver honi chahiye.
- Password data lose nahi hona chahiye.
- Server responses accurately receive hone chahiye.
- Missing data ko dobara bhejna zaroori hota hai.

TCP ke important features:

- Connection establish karna
- Data ko correct order mein deliver karna
- Lost data detect karna
- Missing data ko retransmit karna
- Data delivery verify karna

Simplified TCP connection:

```text
Client  ─── Connection Request ───>  Server
Client  <── Connection Accepted ─── Server
Client  <──── Reliable Data ──────> Server
```

Bandit se connect karte waqt aapka computer is destination par TCP connection create karta hai:

```text
bandit.labs.overthewire.org:2220
```

SSH isi TCP connection ke upar secure remote shell provide karta hai.

---

## 10. Authentication Kya Hota Hai?

Authentication ka matlab hota hai apni identity prove karna.

Jab hum username aur password enter karte hain, server verify karta hai ki credentials correct hain ya nahi.

Bandit Level 0 ke credentials:

```text
Username: bandit0
Password: bandit0
```

Username ka question hota hai:

```text
Aap kis account ko access karna chahte ho?
```

Password ka question hota hai:

```text
Kya aap prove kar sakte ho ki aapko is account ka access milna chahiye?
```

Authentication ke common methods:

- Password authentication
- SSH key authentication
- Multi-factor authentication
- Certificate-based authentication

Bandit Level 0 mein password authentication ka use hota hai.

---

## 11. Authentication Aur Authorization Mein Difference

Authentication aur authorization alag concepts hain.

### Authentication

Authentication verify karta hai ki aap kaun ho.

Example:

```text
Kya aap bandit0 user ho?
```

### Authorization

Authorization decide karta hai ki login ke baad aap kya kar sakte ho.

Example:

```text
Kya bandit0 user is file ko read kar sakta hai?
Kya bandit0 user is command ko execute kar sakta hai?
```

Simple example:

```text
Authentication = Aapki identity verify karna
Authorization  = Aapki permissions check karna
```

Bandit server par successfully login karna authentication hai. Login ke baad available files aur commands authorization rules ke according decide hote hain.

---

## 12. Encryption Kya Hota Hai?

Encryption readable information ko unreadable format mein convert karta hai.

Iska purpose ye hota hai ki agar koi network traffic ko monitor bhi kare, to woh actual data ko samajh na sake.

SSH connection ko encrypt karta hai.

Without encryption, attacker potentially ye information dekh sakta hai:

```text
Username: bandit0
Password: bandit0
Typed Commands
Server Responses
```

SSH encryption ke saath ye data protected form mein network par travel karta hai.

Simplified encryption process:

```text
Readable Data
     ↓
Encryption
     ↓
Unreadable Network Data
     ↓
Decryption by Destination
     ↓
Readable Data
```

SSH ke through:

- Commands encrypted hoti hain.
- Password encrypted hota hai.
- Server responses encrypted hote hain.
- Connection data protected hota hai.

Important point:

SSH connection ko protect karta hai, lekin weak password ko strong nahi bana deta. Encryption data ko transmit hote waqt protect karta hai. Hamesha strong aur unique passwords ka use karna chahiye.

---

## 13. SSH Host Key Verification

Jab aap pehli baar kisi SSH server se connect karte ho, to SSH ek warning dikha sakta hai:

```text
The authenticity of host 'bandit.labs.overthewire.org' can't be established.
Are you sure you want to continue connecting
(yes/no/[fingerprint])?
```

Ye isliye hota hai kyunki aapke computer ne is server ko pehle contact nahi kiya hai.

Aapko type karna hota hai:

```text
yes
```

SSH server ki identity ke liye ek host key save karta hai. Ye key local file mein store hoti hai:

```text
~/.ssh/known_hosts
```

Future connections par SSH saved host key ko new host key se compare karta hai.

Agar keys match karti hain, to connection normal continue hota hai.

Agar key change ho jaye, to SSH warning dikha sakta hai. Iska reason ho sakta hai:

- Server reinstall hua ho.
- Server administrator ne host key change ki ho.
- DNS kisi doosre server par point kar raha ho.
- Man-in-the-middle attack attempt ho raha ho.

Real-world systems par host key warning ko ignore nahi karna chahiye.

---

## 14. Terminal Kya Hota Hai?

Terminal ek program hota hai jiske through hum commands type karke computer ke saath interact karte hain.

### Linux

Linux par application menu se ye open karein:

```text
Terminal
```

### macOS

macOS par open karein:

```text
Terminal
```

### Windows

Windows par aap use kar sakte hain:

```text
PowerShell
```

Ya:

```text
Windows Terminal
```

Modern Windows versions mein OpenSSH client generally available hota hai.

SSH installed hai ya nahi check karne ke liye:

```bash
ssh -V
```

Agar SSH installed hai, to version information display hogi.

---

## 15. Shell Kya Hota Hai?

Shell ek command interpreter hota hai.

Ye aapki typed commands ko read karta hai, execute karta hai aur output display karta hai.

Common shells:

- Bash
- Zsh
- Fish
- PowerShell

Terminal aur shell mein difference:

```text
Terminal = Jahan aap commands type karte ho
Shell    = Jo commands ko samajhkar execute karta hai
```

SSH se Bandit server par login karne ke baad aapko remote Linux shell milti hai.

Is shell ko test karne ke liye:

```bash
whoami
```

Expected output:

```text
bandit0
```

`whoami` command currently logged-in user ka username display karti hai.

---

## Solution

### Step 1: Terminal Open Karein

Apne operating system ka terminal open karein.

### Step 2: SSH Command Run Karein

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Is command ka doosra valid format:

```bash
ssh -p 2220 bandit0@bandit.labs.overthewire.org
```

Aap `-l` option ka use bhi kar sakte hain:

```bash
ssh -l bandit0 -p 2220 bandit.labs.overthewire.org
```

Teeno commands same server aur same user account se connect karti hain.

### Step 3: Host Identity Confirm Karein

Pehli baar connection par SSH ye question pooch sakta hai:

```text
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Type karein:

```text
yes
```

### Step 4: Password Enter Karein

Password prompt aane par enter karein:

```text
bandit0
```

Password type karte waqt screen par kuch bhi visible nahi hoga. Na letters dikhenge aur na hi asterisks.

Ye Linux terminal ka normal security behavior hai.

Password type karke `Enter` press karein.

---

## Expected Result

Successful login ke baad aapko ek welcome banner aur shell prompt dikh sakta hai.

Banner ka exact design future mein change ho sakta hai.

Login verify karne ke liye run karein:

```bash
whoami
```

Expected output:

```text
bandit0
```

Current directory dekhne ke liye:

```bash
pwd
```

`pwd` ka full form **Print Working Directory** hai.

Ye command aapki current directory ka path display karti hai.

Current machine ka hostname dekhne ke liye:

```bash
hostname
```

---

## Server Se Exit Kaise Karein?

Remote Bandit shell se bahar nikalne ke liye:

```bash
exit
```

Ya keyboard shortcut use karein:

```text
Ctrl + D
```

Isse remote connection close ho jayega aur aap apne local terminal par wapas aa jaoge.

---

## Common Errors

### 1. Connection Timed Out

Error:

```text
ssh: connect to host ... port 2220: Connection timed out
```

Possible reasons:

- Internet connection problem
- Firewall ne connection block kiya hai
- Bandit server temporarily unavailable hai
- Hostname ya port galat hai

Command dobara check karein:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

---

### 2. Could Not Resolve Hostname

Error:

```text
Could not resolve hostname
```

Iska matlab ho sakta hai ki DNS hostname ko IP address mein convert nahi kar pa raha.

Internet connection check karein:

```bash
ping google.com
```

Bandit hostname ka DNS lookup karein:

```bash
nslookup bandit.labs.overthewire.org
```

---

### 3. Connection Refused

Error:

```text
Connection refused
```

Iska matlab ho sakta hai ki server reachable hai, lekin specified port par koi service connection accept nahi kar rahi.

Port check karein:

```bash
ssh -p 2220 bandit0@bandit.labs.overthewire.org
```

Dhyan rakhein ki Bandit port `2220` use karta hai, port `22` nahi.

---

### 4. Permission Denied

Error:

```text
Permission denied, please try again.
```

Username aur password check karein:

```text
Username: bandit0
Password: bandit0
```

Linux passwords case-sensitive hote hain.

Isliye ye dono different passwords hain:

```text
bandit0
Bandit0
```

Bandit Level 0 ke liye correct password:

```text
bandit0
```

---

### 5. Password Screen Par Show Nahi Ho Raha

Jab Linux terminal mein password type kiya jata hai, to normally kuch bhi display nahi hota.

Na characters dikhte hain aur na hi asterisks.

Password normally type karein:

```text
bandit0
```

Phir `Enter` press karein.

---

### 6. SSH Command Not Found

Error:

```text
ssh: command not found
```

Iska matlab SSH client installed nahi hai ya system PATH mein available nahi hai.

SSH version check karein:

```bash
ssh -V
```

Linux par OpenSSH install karne ke liye Debian/Ubuntu-based systems par:

```bash
sudo apt update
sudo apt install openssh-client
```

Windows par PowerShell ya Windows Terminal mein SSH try karein:

```powershell
ssh -V
```

---

## Useful Commands

| Command | Purpose |
|---|---|
| `ssh user@host` | Remote host se SSH connection establish karta hai |
| `ssh -p 2220 user@host` | Specific port ke through SSH connection karta hai |
| `whoami` | Current username display karta hai |
| `pwd` | Current directory display karta hai |
| `hostname` | Current machine ka hostname display karta hai |
| `exit` | Remote shell close karta hai |
| `nslookup host` | DNS lookup perform karta hai |
| `dig host` | Detailed DNS information display karta hai |
| `ping host` | Basic network reachability test karta hai |
| `ssh -V` | SSH client ka version display karta hai |

---

## Level 0 Se Milne Wale Security Lessons

Level 0 beginner-friendly hai, lekin ismein real-world cybersecurity ke important concepts introduce hote hain:

- Servers remote network connections accept kar sakte hain.
- Hostnames DNS ke through IP addresses mein convert hote hain.
- IP address network par machine ko identify karta hai.
- Ports specific network services ko identify karte hain.
- TCP reliable communication provide karta hai.
- SSH encrypted remote access provide karta hai.
- Username account ko identify karta hai.
- Password authentication ke liye use hota hai.
- Authentication identity verify karta hai.
- Authorization permissions decide karta hai.
- Terminal ke through remote commands execute ki ja sakti hain.
- Host keys SSH server ki identity verify karne mein help karti hain.
- Linux passwords case-sensitive hote hain.
- Default port ke alawa custom port par bhi services run kar sakti hain.

Ye concepts aage chal kar in fields mein useful honge:

- Cloud computing
- Linux system administration
- Ethical hacking
- Penetration testing
- Network security
- Digital forensics
- Incident response
- DevOps
- Capture The Flag competitions

---

## Final Command

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Password:

```text
bandit0
```

Successful login ke baad aapne **OverTheWire Bandit Level 0** complete kar liya hai.

Ab aap Level 1 ke liye ready hain.

---

## Important Security Note

SSH ka use sirf unhi systems par karein jahan aapke paas permission ho.

OverTheWire Bandit ek intentionally designed learning environment hai jo cybersecurity education ke liye banaya gaya hai. Kisi unauthorized server ya system par login karne ki koshish karna illegal ho sakta hai.
````

Official Level 0 ke host, port, username aur password details OverTheWire ke page par di gayi hain. [overthewire](https://overthewire.org/wargames/bandit/bandit0.html)
