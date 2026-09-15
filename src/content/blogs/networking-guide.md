---
title: "A Journey of Internet"
date: "2026-09-15"
author: "Uday"
tags: ["Linux", "Networking", "Internet"]
summary: "A beginner-friendly journey for networking, learn how things work. Explore the depth of working mechanics of modern internet and how it changed over the time"
---

![youtube](https://www.youtube.com/watch?v=eVc5sY-ZxF8)

_Dive into the full video above to see these exact configurations unfold in real-time, or follow the deep-dive breakdown below!_

Ever wonder what actually happens when you hit `Enter` in your browser? We all know the theory: DNS resolves, packets fly, routers route. But theory is boring.

Today, we are moving from theory to reality. We are going to physically trace the internet, break through a Carrier-Grade NAT (CGNAT) firewall, host a raw Minecraft server to the public via Dockerized tunneling, and finally, intercept our own packets to see what secrets leak over the wire.

Let's dive into the terminal.

---

## Act I: Naming the Void (DNS & Routing)

### 1. The Real Address

Computers don't understand domains. They only understand IP addresses. The Domain Name System (DNS) is the phonebook of the internet. Let's ask it for directions to Discord.

```bash
nslookup discord.com
```

_Boom._ In milliseconds, a DNS resolver hands us back a public IPv4 address. We now have a target.

### 2. The Physical Path

Data doesn't just teleport. It physically hops through copper wires, fiber optics, and oceanic cables to reach its destination. Let's trace every single router between us and Cloudflare's massive `1.1.1.1` DNS resolver.

```bash
traceroute 1.1.1.1
```

Watch the latency jump as your packet leaves your ISP, hits a backbone router, and traverses the country. The internet is a physical place, and you just mapped it.

---

## Act II: The Invisible Walls (NAT & Discovery)

### 3. Revealing the Illusion

If you check your IP address locally, you'll probably see something like `192.168.1.5` or `10.0.0.2`.

```bash
ip a | grep -w inet
```

That is a **private IP**. You are sitting behind a NAT (Network Address Translation). Your router acts as a bouncer, letting you talk to the internet, but preventing the internet from talking directly to you.

### 4. Reconnaissance

To see what doors are open on a network, we use `nmap` (Network Mapper). It aggressively probes ports to see what services are listening. Let's scan our own perimeter for Web and Game ports.

```bash
nmap -sV -p 80,443,25565 localhost
```

_Note: Only scan networks you own or have permission to scan!_

---

## Act III: Bypassing the Wall (Cloudflare Tunnels)

So, you are trapped behind a NAT (or worse, CGNAT) and want to host a website. You can't port-forward. What do you do? You punch a hole from the _inside_ out.

### 5. The Local Server

First, let's create a dead-simple webpage and spin up a local HTTP server on Port 8080.

```bash
echo "<h1>Hello from the internal network</h1>" > index.html
python3 -m http.server 8080
```

Right now, only your `localhost` can see this. Let's change that.

### 6. The Web Hole

Using `cloudflared`, we can create a secure, outbound tunnel to Cloudflare's edge network. Cloudflare gives us a public URL, and traffic flows backward through the tunnel to our local machine.

```bash
cloudflared tunnel --url http://localhost:8080
```

_(In the video, notice how both terminals operate !)_ In seconds, you get a `.trycloudflare.com` link. Send that to anyone in the world, and they are browsing your local laptop, completely bypassing your router's firewall.

---

## Act IV: The Game Tunnel (Minecraft & Playit.gg)

HTTP is easy. What about TCP/UDP game servers? Let's host a Minecraft server using `playit.gg`, a global proxy that assigns you a static public IP without requiring any router configuration.

### 7. The Bare-Metal Game Server

First, we boot up the dedicated Minecraft server manually. No gimmicks, just raw Java execution allocating 2GB of RAM:

```bash
java -Xmx2G -jar server.jar nogui
```

### 8. The Dockerized Agent

Instead of installing a bunch of messy dependencies for the network tunnel, we are going to containerize the Playit.gg agent using **Docker Compose**. We pass in our pre-authorized `SECRET_KEY` so it connects to our account instantly.

Create a `docker-compose.yml` file:

```yaml
# version: "3"
services:
  playit:
    image: ghcr.io/playit-cloud/playit-agent:latest
    network_mode: host
    environment:
      - SECRET_KEY=<playit-secret-key-here>
```

Run it:

```bash
docker-compose up -d
```

Once linked, Playit gives you a dedicated public IP. Your friends can instantly join your bare-metal Minecraft world. No port-forwarding, no exposing your home network, no messing with router admin panels.

---

## Act V: Eyes on the Wire (Packet Sniffing)

The internet relies on trust, but the wire sees everything. Let's intercept our own network traffic using `tcpdump`.

### 9. The Danger of Cleartext (HTTP)

If you request a file over HTTP (Port 8080), your data is sent in plain text. Let's trigger a curl request and sniff the wire.

**Terminal 1 (The Sniffer):**

```bash
sudo tcpdump -l -i any 'tcp port 8080' -A
```

**Terminal 2 (The Target):**

```bash
curl -A "Mozilla/5.0 Chrome/120.0" http://localhost:8080/secret.txt
```

_(Check the video footage for this!)_ The sniffer terminal instantly fills with raw HTTP headers, metadata, and the exact User-Agent string. This is exactly why SSL/TLS (HTTPS) became mandatory.

### 10. The SNI Flaw (HTTPS is not invisible)

HTTPS encrypts the payload, but before encryption begins, your computer has to tell the server which website it wants to connect to. This is called **Server Name Indication (SNI)**, and it is sent in _plain text_ during the initial TLS handshake.

Let's prove it by targeting Netflix.

**Terminal 1 (The Sniffer):**

```bash
sudo tcpdump -l -i any 'tcp port 443' -A | grep -a -i --color=always "netflix"
```

**Terminal 2 (The Target):**

```bash
curl -I https://netflix.com
```

Instantly, Terminal 1 catches the leak. Even though the connection is perfectly encrypted, anyone snooping on your network (like your ISP or a hacker on public Wi-Fi) can see exactly _which_ websites you are visiting, just not _what_ you are doing on them.

---

### 🚀 Conclusion

The terminal isn't just a place to type commands—it's a window into the absolute raw reality of the internet. We resolved routing, bypassed firewalls with tunnels, exposed raw game servers via Dockerized proxies, and revealed the invisible leaks in encrypted traffic.

There are no walls on the wire.
