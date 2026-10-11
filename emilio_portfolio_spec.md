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
Accent amber:     #b89060   (ONLY for Ignitia / competition tags: IGNIS, LASC 2026)
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
- Nav links: About · Experience · Contact · Projects (dropdown) · Volunteering (dropdown)
- Language toggle: `EN / ES` — remembers preference in localStorage
- CTA button: `Download CV` — dropdown with English and Spanish PDFs

### Footer
- Name + role
- Email · GitHub · LinkedIn
- Copyright line

---

## 5. Site Map

```
/ ................................ Home (single-page scroll)
/projects/ignis ................. IGNIS Flight Computer (flagship)
/projects/fc-2026 ............... redirects to /projects/ignis (old URL)
/projects/satellite ............. LASC 2026 CanSat — Satellite Challenge
/projects/ignitia ............... Ignitia Rocket Lab hub
/projects/frc ................... FIRST Robotics Competition
/projects/wgs ................... Water Growth Solutions
/volunteering/techo ............. TECHO México
/volunteering/fifa-wc ........... FIFA World Cup 2026™ volunteer
```

---

## 6. Page Content

> Source of truth for degree, experience, projects, skills and awards: Emilio's CV
> (`brand_assets/Resume_English.pdf`). Hardware tables come from the public IGNIS repos.

---

### 6.1 Home `/`

#### Hero
- **Name:** Emilio Guadarrama Gutiérrez
- **Title:** Electronics and Semiconductor Engineering Student
- **Subtitle:** Embedded Hardware & PCB Design
- **Role line:** Vice President & Avionics/Electronics Lead at Ignitia Rocket Lab · Tec de Monterrey
- **Description:** "Lead designer of IGNIS, an open-source rocket flight computer flown at LASC 2026, with hands-on work in schematic capture, multilayer layout, bring-up, flight-data analysis and design for manufacturing."
- **Photo:** `brand_assets/photos/hero/photo.png`
- **Buttons:** View Projects · GitHub · LinkedIn · Download CV

#### Stats Bar
| Value | Label |
|---|---|
| IGNIS | Flight computer flown at LASC 2026 (amber) |
| 10th / 100 | LASC 2026 Satellite Challenge |
| v1 → v5 | IGNIS hardware revisions |
| 3 yr | FIRST Robotics experience |

#### About
- **Bio:** "I'm an Electronics and Semiconductor Engineering student at Tecnológico de Monterrey. I design, build and fly rocket flight computers, from multilayer PCB design to lab bring-up, flight testing and failure analysis. Before university I spent three seasons in FIRST Robotics, going from technician to Mechanical Lead."
- **Education:** Tecnológico de Monterrey, Campus Guadalajara · B.S. Electronics and Semiconductor Engineering · Aug 2025 – Jun 2029 (expected)
- **Languages:** Spanish (Native) · English (C1 — TOEFL iBT 99) · German (Elementary)

#### Technical Skills
| Group | Skills |
|---|---|
| Hardware & PCB | Altium Designer · Schematic capture · 4-layer PCB layout · RF layout · Power distribution · BOM management |
| Embedded | ESP32-S3 · C/C++ · Arduino · SPI · I2C · UART · USB · LoRa (RFM95W/SX1276) · GNSS · Sensor integration |
| Lab & Test | Oscilloscope · Signal generator · Bench power supply · Multimeter · Board bring-up · Failure analysis |
| Assembly & Manufacturing | DFM for turnkey SMT (JLCPCB/LCSC) · Stencil printing · Reflow oven · Soldering & hot-air rework |
| Software & Tools | KiCad · LTspice · NI Multisim · Verilog · Python (pandas, PySide6) · Git / GitHub |

#### Experience Timeline
| Period | Role | Organization |
|---|---|---|
| Aug 2025 – Present | Vice President & Avionics/Electronics Lead | Ignitia Rocket Lab — 30-member team, leads the 9-member electronics area |
| Jan 2023 – May 2025 | Mechanical Lead & Mentor | FIRST Robotics — Team Daedalus |
| Aug 2024 – Jun 2025 | Under-Secretary-General | TECMUN GDL |

#### Featured Projects Grid
| Project | Tag | Link |
|---|---|---|
| IGNIS Flight Computer | LASC 2026 · Flown | `/projects/ignis` |
| LASC 2026 CanSat | LASC 2026 · 10th of 100 | `/projects/satellite` |
| Ignitia Rocket Lab | Rocketry | `/projects/ignitia` |
| FIRST Robotics — Team Daedalus | Robotics | `/projects/frc` |
| Water Growth Solutions | IoT · Sustainability | `/projects/wgs` |
| TECHO México | Volunteering | `/volunteering/techo` |

> IGNIS is the featured/large card. All others are standard size.

#### Achievements (Emilio's own — team awards from before Aug 2025 live only on the Ignitia timeline)
- LASC 2026 — 10th of 100 teams, Satellite Challenge (CanSat Mission Leader)
- FIRST World Championship qualifier — Hermosillo Regional winner, 2024
- ENMICE 2025 — 2nd place, project presentation (WIRIKUTA 1.1 test bench) + Honorary Recognition for Team Conduct
- Tec de Monterrey Engineering Expo 2025 — 1st place, Physical Prototype (Ignitia Rocket Lab)
- TOEFL iBT — Score 99 · C1 CEFR · ETS · April 2025
- Advanced Robotics Course — Asociación de Robótica Aplicada y Ciencias de la Tecnología (UNAM) · July 2024 · 45 h · Final grade 10/10
- Honorable Mention — Bicultural High School · GPA 96/100 · Tec de Monterrey · May 2025

#### Contact
- Email: emilio.guadarrama@outlook.com
- GitHub: https://github.com/Emilio-Guadarrama
- LinkedIn: https://www.linkedin.com/in/emilioguadarrama/
- Location: Monterrey, Nuevo León, Mexico

---

### 6.2 IGNIS Flight Computer `/projects/ignis`

Structured like the CV's technical portfolio: one revision timeline for v1–v5, with
**v2 / v2.2** (the flight hardware) and **v5** (the manufacturing redesign) as the two main sections.

#### Hero
- **Title:** IGNIS Flight Computer
- **Subtitle:** Open-source rocket flight computer · Ignitia Rocket Lab · 2025 – Present
- **Tags:** IGNIS · LASC 2026 (amber) · Avionics · Open source
- **Status:** v2.2 flown at LASC 2026 · v5 redesigned for turnkey assembly
- **Intro:** "Custom flight computer for student rocketry: it senses the flight, detects apogee in real time, fires the recovery charges, streams LoRa telemetry and logs every sample. Each revision was driven by findings from the one before it."
- **Role:** Lead hardware designer — architecture, schematics, 4-layer PCB layout in Altium Designer, RF and power design, sourcing, bring-up and lab debugging.
- **Pyro circuit / co-developer:** Javier Aristóteles Prieto Flores

#### Revision Timeline
| Rev | Status |
|---|---|
| v1 | Fabricated; too large for the rocket, redesigned before assembly |
| v2 | First assembled; bring-up found schematic errors |
| v2.2 | Corrected revision; primary flight computer at LASC 2026 |
| v3 | Incremental update; never fabricated |
| v4 | Two units built; halted by part availability and a USB-C net error |
| v5 | Sourcing-first, all-SMD, turnkey; Ø75 mm board (2027) |

#### v2 / v2.2 — Flight hardware
Hardware (from the IGNIS v2 repo):
| Block | Component |
|---|---|
| MCU | ESP32-S3-WROOM-1-N8R8 |
| RF telemetry | RFM95W — 915 MHz LoRa — SMA antenna |
| Barometer | BMP180 |
| IMU | MPU-6050 (6-DOF) |
| GPS | Adafruit Ultimate GPS breakout |
| Storage | MicroSD — SPI |
| Power | Dual AMS1117 · VBAT → 5 V → 3.3 V |
| Pyro | 2-channel MOSFET deployment |
| PCB | 4-layer · Altium Designer · JLCPCB fab · assembled in-house |

v2 → v2.2 changes (from Emilio's notes):
- Removed the SHT40 — humidity wasn't useful for avionics; temperature already comes from the barometer.
- Corrected the barometer configuration on the I²C bus after finding how one of its interface pins had been handled in v2.
- Fixed the footprint of the addressable RGB LEDs, which didn't match the real part.
- Added hardware continuity LEDs to both recovery channels for an immediate visual check on the board.

Build & test: assembled in-house (laser-cut stencil, reflow, rework); bench-tested the pyro channels with the IMU and barometer; command-tested the pyro system.

Flight at LASC 2026 (Brazil): primary flight computer. Flight logs analyzed with Python/pandas:
- 188 ms barometric apogee-detection latency measured
- 40.2% telemetry packet loss traced, which led to a dual-antenna ground station

#### Failure analysis (from bench and flight logs)
| Symptom | Root cause | Fix |
|---|---|---|
| Barometer read 497 hPa instead of ~830 hPa | Floating chip-select pin | Fixed in v2.2; v5 defines every strap pin |
| IMU invalid for 12,970 log rows while the barometer on the same I²C bus kept working | Floating address pin, after impact | Address pin defined in the v5 design |
| False liftoff in testing — hand movement triggered "boost" | 40 ms debounce | 250 ms debounce plus a 30 m minimum-altitude interlock before any deployment |

#### v5 — Designed for manufacturing
Hardware (from the IGNIS v5 repo):
| Block | Component |
|---|---|
| MCU | ESP32-S3-WROOM-1-N16R8 · 16 MB flash / 8 MB PSRAM |
| RF telemetry | RFM95W · 915 MHz LoRa · SMA antenna port |
| GNSS | u-blox SAM-M10Q · integrated patch antenna |
| IMU | LSM6DSV32X · 6-DOF · ±32 g / ±4000 dps |
| Barometer | Infineon DPS368 (BMP280 drop-in compatible) |
| Storage | MicroSD · SPI · card detect |
| Power | Dual AMS1117 · VBAT → 5 V → 3.3 V · battery voltage monitoring |
| USB | USB-C 2.0 · ESD protected · native USB programming |
| Pyro | 2 channels, optically isolated MOSFET deployment with continuity sensing |
| PCB | 4-layer · Ø75 mm circular · JLCPCB fabrication and assembly |

- Redesigned for turnkey SMT assembly at JLCPCB (109 placements, 40 BOM lines) after component-availability problems on v4.
- Stock and lifecycle checked before layout; standardized 0603/0805 passives; alternate parts for the IMU and barometer.
- 37 of 40 BOM lines also stocked by a Mexican distributor for local repair.
- Mounted across the airframe instead of along it, shortening the avionics bay to fit the team's smallest rocket.
- Manufacturing package for repeatable production independent of the original designer.

#### Platform hardware (all revisions)
4-layer stackup with a dedicated ground reference for the RF microstrip · via-fenced RF keepout · via-in-pad MCU thermal pad · opto-isolated MOSFET pyro drivers with continuity sensing · USB-C with ESD protection.

#### Firmware & ground segment
- Firmware requirements defined by Emilio (C++), validated through bench and flight testing: 8-state flight state machine, barometric apogee detection, safety interlocks, LoRa telemetry, SD logging.
- Ground station: Python/PySide6 with live charts, CSV logging and dual-antenna diversity receivers.

#### Key design decisions
| Decision | Reason |
|---|---|
| ESP32-S3 as MCU | Native USB (no USB-UART bridge), dual-core LX7 at 240 MHz, octal PSRAM for flight logging |
| Dual AMS1117 instead of XL4005 buck | XL4005 not available in Mexico; thermal analysis: 0.95 W on the 5 V stage, 0.68 W on 3.3 V — acceptable for a short flight |
| LoRa 915 MHz | Long range, low power, license-free band in Latin America |

#### Tools
Altium Designer · ESP32-S3 · RFM95W LoRa · u-blox GNSS · C/C++ · Python · JLCPCB / LCSC

#### Links
- github.com/IgnitiaRocketLab/IGNIS-v2-FlightComputer
- github.com/Emilio-Guadarrama/IGNIS-v5-FlightComputer
- LASC 2026 — latinamericanspacechallenge.com

---

### 6.3 LASC 2026 CanSat `/projects/satellite`

#### Hero
- **Title:** LASC 2026 CanSat — Satellite Challenge
- **Role:** Mission Leader · Ignitia Rocket Lab · 2026
- **Result:** 10th of 100 teams
- **Tag:** LASC 2026

#### Overview
- Led the team's CanSat mission, providing technical direction and supervision.
- The avionics are a simplified derivative of IGNIS, with added sensors that measure the vibration environment affecting the rocket's flight, LoRa telemetry and independent parachute recovery.
- Mass ~300 g · budget ~$800 USD
- **Competition:** LASC 2026 — Latin American Space Challenge · Brazil · September 2026
- **Tools:** ESP32 · RFM95W LoRa · Environmental and vibration sensors · Python
- Links: `/projects/ignis` · `/projects/ignitia`

---

### 6.4 Ignitia Rocket Lab `/projects/ignitia`

#### Hero
- **Title:** Ignitia Rocket Lab
- **Subtitle:** Tecnológico de Monterrey · Campus Guadalajara
- **Tagline:** Pasión con Impacto
- **Emilio's role:** Vice President & Avionics/Electronics Lead — 30-member team; leads the 9-member electronics area and trains new members on flight-computer design and assembly
- **Contact:** ignitia.rocketlab@gmail.com · @ignitia.rocketlab

#### Mission Timeline
| Year | Event | Details |
|---|---|---|
| 2022 | AKIRA II Validation Mission | 1,000m apogee · flight stability, recovery, and onboard electronics validation |
| 2023 | Watakame I Launch | Team milestone |
| 2023 | Spaceport America Cup | WATAKAME I · First Mexican team to complete full mission profile · Rank 79 |
| 2023–2024 | ENMICE | WATAKAME IA · 5,000m apogee design · Technical Excellence Award |
| Oct 2025 | WATI I Qualification Mission | First successful launch · 124m apogee · avionics, ignition, recovery validated |
| 2025 | ENMICE 2025 | WATI I launch (129m) · WIRIKUTA 1.1 test bench · 2nd place presentation · Honorary Recognition for Team Conduct |
| 2025 | Engineering Expo TEC | 1st place Physical Prototype |
| 2025 | FIL Guadalajara | Scientific outreach exhibition |
| Sep 2026 | LASC 2026 · Brazil | IGNIS v2.2 flown as primary flight computer · Satellite Challenge: 10th of 100 |

#### Achievements Cards
- LASC 2026: 10th of 100 teams, Satellite Challenge
- ENMICE 2025: 2nd place presentation (WIRIKUTA 1.1) + Honorary Recognition for Team Conduct
- Engineering Expo TEC 2025: 1st place Physical Prototype
- ENMICE 2023–2024: Technical Excellence Award (WATAKAME IA)
- Spaceport America Cup 2023: First Mexican team to complete full mission

#### Photo gallery
LASC 2026, ENMICE 2025 and team launch-day photos (see §8).

#### Team Composition
| Role | Name |
|---|---|
| President | Maximiliano Funoy Serrano |
| Vice President · Avionics Lead | Emilio Guadarrama Gutiérrez |
| Avionics Sub-Lead | Damaris Mariscal |
| Physical Modelling Lead | Fernanda Ivet Acevedo Ávalos |
| Structural Lead | Luis Humberto Mota Reyes |
| Propulsion Lead | José David Lagunes Higareda |
| Faculty Advisor | José Luis Henríquez Mercado |
| Faculty Advisor | Luis Manuel Rico Gutiérrez |

#### Subproject Links
- → IGNIS Flight Computer (`/projects/ignis`)
- → LASC 2026 CanSat (`/projects/satellite`)

---

### 6.5 FIRST Robotics `/projects/frc`

#### Hero
- **Title:** FIRST Robotics Competition
- **Team:** Team Daedalus (7102)
- **Period:** Jan 2023 – May 2025
- **Location:** Zapopan, Jalisco

#### Season Timeline
| Season | Game | Role | Highlights |
|---|---|---|---|
| 2023 | Charged Up | Robotics Technician | Drive team, scouting and mechanical maintenance |
| 2024 | Crescendo | Mechanical Lead | Led manufacturing and was on the drive team · Won the Hermosillo Regional · Qualified for the FIRST World Championship in Houston |
| 2025 | Reefscape | Mechanical Lead & Mentor | Led the team's manufacturing and mentored new members through the Monterrey and León Regionals |

#### Key Achievement Callout
- FIRST World Championship Houston 2024 — qualified by winning the Hermosillo Regional

#### Photo gallery
One group per season (see §8).

---

### 6.6 Water Growth Solutions `/projects/wgs`

#### Hero
- **Title:** Smart Irrigation System — Water Growth Solutions (WGS)
- **Context:** Team project · Sustainable Technology & Renewable Energy

#### Overview
- **What:** Automated vertical irrigation system with Arduino, sensors, pumps and solar power, aligned with six UN Sustainable Development Goals
- **Emilio's role:** Arduino code · Electronic control system · Web interface · Real-time monitoring and automation

#### Technologies
Arduino · Sensors · Bluetooth/Wi-Fi · Web interface · Solar power

#### Media
> Demo screenshots / photos to be provided by Emilio — placeholders for now

---

### 6.7 TECHO México `/volunteering/techo`

#### Hero
- **Title:** TECHO México
- **Role progression:** Volunteer → Crew Co-Leader → Crew Leader → Area Monitor
- **Period:** Aug 2024 – Present
- **Location:** Jalisco, Mexico

#### Construction History
| Date | Role | Location |
|---|---|---|
| Aug 2024 | Volunteer | Comunidad Indígena Sergio Barrios, Tlajomulco |
| Sep 2025 | Crew Co-Leader | Comunidad Indígena Sergio Barrios, Tlajomulco |
| — | Crew Leader | Comunidad de Jauja, Tonalá (photos pending) |
| Dec 2025 | — | Lomas del Refugio |
| Sep 2026 | Area Monitor — supervised the crews in the area | Lomas del Refugio |

#### Description
"Built emergency housing alongside families in vulnerable communities across Jalisco, first as a volunteer and later leading crews and monitoring the crews of a whole area."

#### Photo gallery
One group per build (see §8).

---

### 6.8 FIFA World Cup 2026™ `/volunteering/fifa-wc`

- **Role:** Pre-Match Ceremony Cast Volunteer
- **Functional area:** Ceremonies
- **Venue:** Guadalajara Stadium (Estadio Akron), Guadalajara
- **Dates:** June 11 – July 19, 2026 — the first 48-team FIFA World Cup™
- **Source:** FIFA Volunteer Certificate and Letter of Recommendation (not published on the site)

---

## 7. Bilingual Content Notes

- Language toggle: EN / ES — persisted in localStorage
- All page content needs EN and ES versions
- Technical terms (ESP32-S3, LoRa, MOSFET, etc.) stay in English in both languages
- Competition names (LASC, ENMICE, FIRST) stay in English in both languages
- Amber-tagged labels (IGNIS, LASC 2026) stay in English in both languages
- Spanish degree name: Ingeniería en Electrónica y Semiconductores

---

## 8. Assets Reference

Originals live in `brand_assets/photos/`. The site serves resized copies from
`public/photos/<section>/` (long edge ≤ 1600 px, EXIF stripped).

| Folder | Used In |
|---|---|
| `photos/hero/photo.png` | Home hero |
| `photos/fc2026/V1/` | IGNIS timeline — v1 |
| `photos/fc2026/V2 and 2V2/` | IGNIS v2 / v2.2 section — board, renders, layers, reflow, bench videos |
| `photos/fc2026/V4/` | IGNIS timeline — v4 |
| `photos/fc2026/WhatsApp … 8.14.03 PM.jpeg` | IGNIS — silkscreen detail |
| `photos/LASC 2026/` | IGNIS flight section, Satellite page, Ignitia gallery |
| `photos/ENMICE 2025/`, `photos/Ignitia General/` | Ignitia gallery |
| `photos/FRC/1`, `2 championship`, `3` | FRC gallery — 2023, 2024, 2025 seasons |
| `photos/volunteering/Techo/*` | TECHO gallery, one group per build |
| `photos/volunteering/FIFA World Cup 2026/` | FIFA page |
| `Resume_English.pdf`, `Resume_Spanish.pdf` | Download CV dropdown (served from `public/brand_assets/`) |

---

## 9. Pending Assets

- [ ] Spanish CV with the new degree (Emilio will replace it manually)
- [ ] IGNIS v5 render or photo
- [ ] TECHO Jauja build photos
- [ ] WGS project photos / demo
- [ ] Ignitia Rocket Lab LinkedIn URL

---

## 10. Contact Info (reference)

| Channel | Value |
|---|---|
| Email | emilio.guadarrama@outlook.com |
| GitHub | https://github.com/Emilio-Guadarrama |
| LinkedIn | https://www.linkedin.com/in/emilioguadarrama/ |
| Location | Monterrey, Nuevo León, Mexico |
| Phone | +52 (477) 873 2813 |
