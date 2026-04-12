# Emilio Guadarrama — Portfolio Website Spec
> Full structure, content, and design system for Claude Code

---

## 1. Project Overview

**Owner:** Emilio Guadarrama Gutiérrez  
**Purpose:** Personal portfolio website showcasing electronics engineering, embedded systems, rocketry, and leadership experience.  
**Target:** Internships, competitions, professional network — not actively job-hunting yet, so content can reflect work in progress.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Routing | React Router |
| i18n | i18next (EN/ES, persisted in localStorage) |
| Component library | shadcn/ui |
| Deployment | Vercel (auto-deploy from GitHub) |

---

## 3. Design System

### Colors
```
Background:       #070707   (near-pure black)
Card surface:     #111111
Border:           #242424
Dividers:         #1a1a1a

Text primary:     #f0f0f0
Text secondary:   #c8c8c8
Text muted:       #424242

Accent white:     #d8d8d8   (headings, CTAs, primary interactive elements)
Accent amber:     #b89060   (ONLY for Ignitia / competition tags: FC-2026, LASC 2026)
Amber tint bg:    #120e06   (background behind amber-tagged elements)
Amber tint border:#28200e
```

### Typography
```
Body font:        Inter
Technical font:   JetBrains Mono
  → Used for: badges, labels, GPIO tables, code snippets, monospace details
```

### Rules
- **No background grid or texture** — flat black only
- **No glow, no blur, no gradients** — hard edges only
- **Borders:** 1px solid #242424 at rest, #2a2a2a on hover
- **Amber rule:** `#b89060` appears ONLY on Ignitia/competition-related tags. Everything else is white-on-black.
- **Monospace only on technical content** — body copy uses Inter

---

## 4. Global Elements

### Navbar
- Logo: `EG` — links to `/`
- Nav links: About · Projects · Experience · Contact
- Language toggle: `EN / ES` — remembers preference in localStorage
- CTA button: `Download CV` — links to PDF (placeholder until PDF is added)

### Footer
- Name + role
- Email · GitHub · LinkedIn
- Copyright line

---

## 5. Site Map

```
/ ................................ Home (single-page scroll)
/projects/fc-2026 ............... FC-2026 Flight Computer (flagship)
/projects/satellite ............. LASC 2026 Satellite Challenge
/projects/ignitia ............... Ignitia Rocket Lab hub
/projects/frc ................... FIRST Robotics Competition
/projects/wgs ................... Water Growth Solutions
/volunteering/techo ............. TECHO México
```

---

## 6. Page Content

---

### 6.1 Home `/`

#### Hero
- **Name:** Emilio Guadarrama Gutiérrez
- **Title:** Mechatronics Engineering Student — Electronics & Embedded Systems
- **Subtitle:** VP & Electronics Lead at Ignitia Rocket Lab · Tec de Monterrey
- **Description:** "Mechatronics Engineering student at Tecnológico de Monterrey focused on electronics, embedded systems, and PCB design. Leading the avionics division of Ignitia Rocket Lab for LASC 2026."
- **Photo:** `Foto_ID_-_copia.png` (high-res formal headshot)
- **Buttons:** View Projects · GitHub · LinkedIn · Download CV

#### Stats Bar
| Value | Label |
|---|---|
| FC-2026 | Flight computer in development |
| 1 km | LASC 2026 target apogee |
| 4+ | Competition achievements |
| 3 yr | Robotics competition experience |

#### About
- **Bio:** "I am a Mechatronics Engineering student at Tecnológico de Monterrey with a strong focus on electronics, embedded systems, and PCB design. My experience in robotics, rocketry, and leadership roles has helped me develop analytical thinking, teamwork, and innovation skills. I aim to contribute to multidisciplinary projects that merge technology, automation, and design."
- **Education:** Tecnológico de Monterrey · B.S. Mechatronics Engineering · 2025–2029
- **Languages:** Spanish (Native) · English (C1 — TOEFL iBT 98) · German (Elementary)

#### Technical Skills
| Group | Skills |
|---|---|
| Hardware | PCB Design · Altium Designer · Embedded Systems · ESP32 / ESP32-S3 |
| Firmware | C · C++ · Arduino · UART / SPI / I2C · IoT Systems |
| Software | Python · React · Git |
| Tools | Altium Designer · JLCPCB / PCBWay workflow · Reflow soldering |

#### Experience Timeline
| Period | Role | Organization |
|---|---|---|
| Aug 2025 – Present | VP & Electronics Lead | Ignitia Rocket Lab |
| Jan 2023 – May 2025 | Mechanical Lead & Mentor | FIRST Robotics — Team Daedalus |
| Aug 2024 – Jun 2025 | Under-Secretary-General | TECMUN GDL |

#### Featured Projects Grid
| Project | Tag | Link |
|---|---|---|
| FC-2026 Flight Computer | LASC 2026 · Active | `/projects/fc-2026` |
| LASC 2026 Satellite Challenge | LASC 2026 · Upcoming | `/projects/satellite` |
| Ignitia Rocket Lab | Rocketry | `/projects/ignitia` |
| FIRST Robotics — Team Daedalus | Robotics | `/projects/frc` |
| Water Growth Solutions | IoT · Sustainability | `/projects/wgs` |
| TECHO México | Volunteering | `/volunteering/techo` |

> FC-2026 is the featured/large card. All others are standard size.

#### Achievements
- ENMICE 2025 — 2nd place project presentation (WIRIKUTA 1.1) + Honorific conduct award
- Engineering Expo TEC 2025 — 1st place Physical Prototype category
- ENMICE 2023–2024 — Technical Excellence Award (WATAKAME IA)
- Spaceport America Cup 2023 — First Mexican team to complete full mission profile (rank 79)
- TOEFL iBT — Score 98 · C1 CEFR · ETS · April 2025
- Honorific Mention — Bicultural High School · GPA 96/100 · Tec de Monterrey · May 2025

#### Contact
- Email: emilio.guadarrama@outlook.com
- GitHub: https://github.com/Emilio-Guadarrama
- LinkedIn: https://www.linkedin.com/in/emilioguadarrama/
- Location: Zapopan, Jalisco, Mexico

---

### 6.2 FC-2026 Flight Computer `/projects/fc-2026`

#### Hero Banner
- **Title:** FC-2026 Flight Computer
- **Subtitle:** Ignitia Rocket Lab · LASC 2026 · Avionics
- **Status badge:** Schematic Design In Progress
- **Images:** 4 PCB renders (3D top, 3D angle, 3D bottom, 2D layout)

#### Project Overview
- **What:** Custom SRAD flight computer for LASC 2026 Rocket Challenge (1 km apogee, solid propulsion)
- **Role:** Project lead (electronics) — full schematic design and PCB layout in Altium Designer
- **Partner:** Aristoteles Prieto (pyro circuit sheet)
- **PCB manufacturer:** JLCPCB or PCBWay — team solders components
- **Reflow oven:** LPKF ZelFlow R04 · SAC305 lead-free solder
- **Board:** Rectangular · fits 76mm inner diameter airframe

#### System Architecture
```
Battery (2S3P LiPo — 7.4V nominal / 8.4V max / 6,600mAh)
  └─► Power System (Dual AMS1117 series)
        ├─► VCC_5V ──► WS2812B RGB LEDs (x3) · Buzzer CMI-1275C
        └─► VCC_3V3 ──► MCU (ESP32-S3-WROOM-1-N8R8)
                          ├─► Sensors (I2C)
                          │     ├─ MPU6050 — IMU 6-DOF — 0x68
                          │     ├─ BMP180 — Barometer — 0x77
                          │     └─ SHT40-AD1B-R2 — Temp/Humidity — 0x44
                          ├─► Telemetry (SPI)
                          │     └─ RFM95W-915S2 — LoRa 915MHz — SMA antenna
                          ├─► Navigation (UART)
                          │     └─ PA1616S GPS — 9600 baud — NMEA
                          ├─► Storage (SPI)
                          │     └─ MicroSD (MSD-11-A)
                          ├─► Recovery (Pyro)
                          │     ├─ CH1 — Drogue — IRLML2502 MOSFET — fires at apogee
                          │     └─ CH2 — Main — IRLML2502 MOSFET — fires at ~300m AGL
                          ├─► Indicators
                          │     ├─ WS2812B RGB LEDs (IO6)
                          │     └─ Buzzer (IO14 PWM)
                          └─► Interface
                                └─ USB-C (native USB 1.1 OTG — IO19/IO20)

Redundancy (independent):
  └─► RRC3 Altimeter (Missile Works COTS) — MS5607 — up to 15 flights at 20Hz
```

#### Subsystems Detail

**Power System**
- Battery: 2S3P LiPo — 7.4V nominal / 8.4V max / 6.0V cutoff / 6,600mAh
- Connector: XT30 or JST-PH
- Stage 1: AMS1117-5.0 LDO (SOT-223) — VBAT → VCC_5V — 10µF + 100nF in/out
- Stage 2: AMS1117-3.3 LDO (SOT-223) — VCC_5V → VCC_3V3 — 10µF + 100nF in/out
- Battery monitor: 100kΩ / 47kΩ voltage divider → IO3 (ADC) — max 2.69V at 8.4V
- Pyro rail: direct VBAT via arm switch (hardware disconnect)

**Sensors — I2C Bus (IO21 SDA / IO38 SCL)**
- Pull-ups: 4.7kΩ on SCL and SDA — on MCU sheet only
- MPU6050: 6-DOF IMU · address 0x68 · AD0 pull-down 10kΩ · INT → IO46
- BMP180: Barometer · address 0x77 · CSB pull-up to VCC_3V3 · near pressure vent
- SHT40-AD1B-R2: Temp & Humidity · address 0x44 · 100nF decoupling

**Telemetry**
- RFM95W-915S2: LoRa 915MHz
- Interface: SPI (shared bus with SD)
- CS: IO10 · INT DIO0: IO7 · RESET: IO8
- Antenna: SMA connector (BWSMA-KE-Z001) — 50Ω impedance
- Decoupling: 10µF + 100nF on 3.3V pin

**Recovery (Pyro — Aristoteles Prieto)**
- CH1: Drogue parachute — fires at apogee — gate IO4 — continuity IO1
- CH2: Main parachute — fires at ~300m AGL — gate IO5 — continuity IO2
- MOSFET: IRLML2502 (SOT-23, logic-level, 20V/4.2A) — 100Ω gate resistor
- Continuity sensing: 10kΩ pull-up + BZX84C3V3 Zener protection
- Pyro rail cap: 470µF/16V electrolytic
- Arm switch: IO47 — hardware disconnect in series with VBAT → pyro rail
- Connectors: JST-XH 2-pin locking per channel

**Navigation & Logging**
- GPS: PA1616S — UART 9600 baud — NMEA — IO17 TX / IO18 RX
- GPS EN: pulled HIGH via 10kΩ (always on)
- MicroSD: MSD-11-A — SPI — CS: IO9 — Detect: IO42
- SD pull-ups: 10kΩ on MOSI/MISO/CLK

**Redundancy**
- RRC3 (Missile Works) — barometric dual-deploy altimeter
- Operates fully independently from FC-2026
- MS5607 pressure sensor — records up to 15 flights at 20Hz altitude/velocity

#### Key Design Decisions
| Decision | Reason |
|---|---|
| ESP32-S3 as MCU | Native USB 1.1 OTG (no CH340C), dual-core LX7 240MHz, 8MB Octal PSRAM for flight logging |
| Dual AMS1117 instead of XL4005 buck | XL4005 not available in Mexico; thermal analysis: 0.95W on 5V stage, 0.68W on 3.3V — acceptable for short flight duration |
| LoRa 915MHz | Long range, low power, license-free band in Latin America |
| Rectangular PCB | Changed from circular — better component placement, easier manufacturing |
| I2C pull-ups on MCU sheet only | Prevents conflicts in hierarchical Altium schematic |

#### PCB Gallery
- `Screenshot_2026-04-10_075237.png` — 3D top view (front face, Ignitia branding)
- `Screenshot_2026-04-11_112025.png` — 3D angled view (full board perspective)
- `Screenshot_2026-04-11_112053.png` — 3D bottom view (back face)
- `Screenshot_2026-04-11_112114.png` — PCB layout (Altium 2D)
- Placeholder slots for future renders when design is complete

#### Status Tracker
```
[●] Schematic Design    ← current
[ ] PCB Layout
[ ] Gerber Review
[ ] Manufacturing
[ ] Assembly & Testing
[ ] LASC 2026 — September 2026 · Iacanga, São Paulo, Brazil
```

#### Documents & Resources
- Download Technical Report — placeholder, PDF when ready
- GitHub Repository — link when ready (to be created by Emilio)
- LASC 2026 — external competition link

---

### 6.3 Satellite Challenge `/projects/satellite`

#### Hero
- **Title:** LASC 2026 Satellite Challenge
- **Status:** In Development
- **Tag:** LASC 2026

#### Overview
- **Competition:** LASC 2026 — Latin American Space Challenge · Iacanga, São Paulo, Brazil · September 2026
- **Type:** CanSat / PocketQube / CubeSat (TBD)
- **Constraints:** No propulsion · Budget ≤ $1,000 USD · Operation ≥ 4 hours
- **Scoring:** Readiness/TORL 55% · Mission report 20% · Team effort 10% · Design 10% · Bonus 5%

#### Placeholder
- "Design and development in progress. This page will be updated as the project evolves."
- Link back to: `/projects/ignitia`

---

### 6.4 Ignitia Rocket Lab `/projects/ignitia`

#### Hero
- **Title:** Ignitia Rocket Lab
- **Subtitle:** Tecnológico de Monterrey · Campus Guadalajara
- **Tagline:** Pasión con Impacto
- **Emilio's role:** Vice President & Electronics / Avionics Lead
- **Contact:** ignitia.rocketlab@gmail.com · @ignitia.rocketlab

#### Team Overview
- Mission: Design, development, and testing of experimental rocket systems
- Competing at LASC 2026 (Rocket Challenge + Satellite Challenge)
- Links: Ignitia LinkedIn (URL to be added) · Instagram: @ignitia.rocketlab

#### Mission Timeline
| Year | Event | Details |
|---|---|---|
| 2022 | AKIRA II Validation Mission | 1,000m apogee · flight stability, recovery, and onboard electronics validation |
| 2023 | Watakame I Launch | Team milestone |
| 2023 | Spaceport America Cup | WATAKAME I · First Mexican team to complete full mission profile · Rank 79 |
| 2023–2024 | ENMICE | WATAKAME IA · 5,000m apogee design · Technical Excellence Award |
| Oct 2025 | WATI I Qualification Mission | First successful launch · 124m apogee · avionics, ignition, recovery validated |
| 2025 | ENMICE 2025 | WATI I launch (129m) · WIRIKUTA 1.1 test bench · 2nd place presentation · Honorific conduct award |
| 2025 | Engineering Expo TEC | 1st place Physical Prototype |
| 2025 | FIL Guadalajara | Scientific outreach exhibition |
| Sep 2026 | LASC 2026 | Upcoming · Iacanga, São Paulo, Brazil |

#### Achievements Cards
- ENMICE 2025: 2nd place presentation (WIRIKUTA 1.1) + Honorific conduct award
- Engineering Expo TEC 2025: 1st place Physical Prototype
- ENMICE 2023–2024: Technical Excellence Award (WATAKAME IA)
- Spaceport America Cup 2023: First Mexican team to complete full mission

#### Image Carousel
> Photos to be provided by Emilio — placeholders for now
- Team photos from ENMICE 2025
- WATI I launch (Oct 2025)
- WIRIKUTA 1.1 test bench
- FIL Guadalajara exhibition
- Spaceport America Cup 2023

#### LinkedIn Posts Section
- Link cards to Emilio's relevant LinkedIn posts:
  - Post 1: WATI I first successful launch (Oct 5, 2025 · apogee 124m)
  - Post 2: ENMICE 2025 results (2nd place + honorific award · WATI I 129m)
- External link to Ignitia Rocket Lab LinkedIn page (URL to be added)

#### Team Composition
| Role | Name |
|---|---|
| President | Maximiliano Funoy Serrano |
| Vice President | Emilio Guadarrama Gutiérrez |
| Avionics Lead | Braulio García Rayas |
| Avionics Sub-Lead | Julia Blanco Sánchez |
| Physical Modelling Lead | Fernanda Ivet Acevedo Ávalos |
| Structural Lead | Luis Humberto Mota Reyes |
| Propulsion Lead | José David Lagunes Higareda |
| Faculty Advisor | José Luis Henríquez Mercado |
| Faculty Advisor | Luis Manuel Rico Gutiérrez |

#### Subproject Links
- → FC-2026 Flight Computer (`/projects/fc-2026`)
- → LASC 2026 Satellite Challenge (`/projects/satellite`)

---

### 6.5 FIRST Robotics `/projects/frc`

#### Hero
- **Title:** FIRST Robotics Competition
- **Team:** Team Daedalus
- **Period:** Jan 2023 – May 2025
- **Location:** Zapopan, Jalisco

#### Season Timeline
| Season | Role | Highlights |
|---|---|---|
| 2023 | Robotics Technician | Scouting, drive team, mechanical systems |
| 2024 | Mechanical Lead | Led mechanical area and drive team · Won Regional Hermosillo · Qualified FIRST World Championship Houston |
| 2025 | Mechanical Lead & Mentor | Guided team's final high-school season · Mentored new members · Participated Monterrey and León Regionals |

#### Key Achievement Callout
- FIRST World Championship Houston 2024 — qualified by winning Regional Hermosillo

#### Image Carousel
> Photos to be provided by Emilio — placeholders for now

---

### 6.6 Water Growth Solutions `/projects/wgs`

#### Hero
- **Title:** Smart Irrigation System — Water Growth Solutions (WGS)
- **Context:** Sustainable Technology & Renewable Energy Initiative

#### Overview
- **What:** Sustainable irrigation and vertical garden system for rural communities
- **Goal:** Improve irrigation efficiency and food security through sustainable automation
- **Emilio's role:** Arduino code · Electronic control system · Web interface (React) · Real-time monitoring and automation

#### Technologies
Arduino · React · IoT · Bluetooth/Wi-Fi Communication · Solar Energy · Web Interface

#### Team
- Emilio: electronics, firmware, web interface
- Other teammates: mobile app, sustainability framework (UN SDGs), documentation

#### Media
> Demo screenshots / photos to be provided by Emilio — placeholders for now

---

### 6.7 TECHO México `/volunteering/techo`

#### Hero
- **Title:** TECHO México
- **Role progression:** Volunteer → Crew Co-Leader → Crew Leader
- **Period:** Oct 2024 – Present
- **Location:** Jalisco, Mexico

#### Construction History
| # | Role | Location |
|---|---|---|
| 1st | Volunteer | Comunidad Indígena Sergio Barrios, Tlajomulco, Jalisco |
| 2nd | Crew Co-Leader | Comunidad Indígena Sergio Barrios, Tlajomulco, Jalisco |
| 3rd | Crew Leader | Comunidad de Jauja, Tonalá, Jalisco |

#### Description
"Participated in the construction of emergency housing for families in vulnerable communities. Strengthened teamwork, communication, and leadership skills while collaborating with local communities across Jalisco."

#### Image Carousel
> Photos to be provided by Emilio — placeholders for now

---

## 7. Bilingual Content Notes

- Language toggle: EN / ES — persisted in localStorage
- All page content needs EN and ES versions
- Technical terms (ESP32-S3, LoRa, MOSFET, etc.) stay in English in both languages
- Competition names (LASC, ENMICE, FIRST) stay in English in both languages
- Amber-tagged labels (FC-2026, LASC 2026) stay in English in both languages

---

## 8. Assets Reference

| File | Used In |
|---|---|
| `Foto_ID_-_copia.png` | Hero photo (all pages — navbar avatar + hero section) |
| `Screenshot_2026-04-10_075237.png` | FC-2026 gallery — 3D top view |
| `Screenshot_2026-04-11_112025.png` | FC-2026 gallery — 3D angled view |
| `Screenshot_2026-04-11_112053.png` | FC-2026 gallery — 3D bottom view |
| `Screenshot_2026-04-11_112114.png` | FC-2026 gallery — PCB 2D layout |
| `Emilio_Guadarrama_ResumeCV.pdf` | Download CV button |

---

## 9. Pending Assets (placeholders until provided)

- [ ] Ignitia launch photos (WATI I, WATAKAME, ENMICE)
- [ ] FRC competition photos (Team Daedalus)
- [ ] TECHO México construction photos
- [ ] WGS project photos / demo
- [ ] FC-2026 GitHub repository URL
- [ ] Ignitia Rocket Lab LinkedIn URL
- [ ] LinkedIn post URLs (WATI I launch, ENMICE 2025)
- [ ] Satellite project details (development not started)
- [ ] CV PDF final version

---

## 10. Contact Info (reference)

| Channel | Value |
|---|---|
| Email | emilio.guadarrama@outlook.com |
| GitHub | https://github.com/Emilio-Guadarrama |
| LinkedIn | https://www.linkedin.com/in/emilioguadarrama/ |
| Location | Zapopan, Jalisco, Mexico |
| Phone | +52 (477) 873 2813 |
