# 🔭 The Data Observatory — Souhrid Dey's Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Styling-Vanilla_CSS_Modules-purple?style=for-the-badge&logo=css3" alt="Vanilla CSS"/>
  <img src="https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase"/>
  <img src="https://img.shields.io/badge/Animations-Framer_Motion-E11D48?style=for-the-badge&logo=framer" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel"/>
</p>

An immersive, storytelling-driven portfolio website designed around the metaphor of **"The Data Observatory"**. This digital portfolio highlights Souhrid Dey's interdisciplinary journey, spanning 6+ years of enterprise financial analytics (Maersk, Genpact, Eaton) and cutting-edge Data Science & Machine Learning (UT Austin McCombs / Great Lakes PGP, 4.07/4.33 GPA).

---

## 🌟 Key Highlights

- **The Data Observatory Metaphor**: Atmospheric, sleek dark-mode aesthetic with an interactive celestial-neural constellation canvas, cosmic violet lighting, and lens-focus scroll interactions powered by Framer Motion.
- **4-Tier Project Architecture**:
  - **Tier 1 (⭐ Hero)**: 4 flagship machine learning, predictive analytics, and visualization case studies with deep-dive metrics (Capstone Churn, US Visa, Shinkansen Satisfaction Hackathon Rank 2, Tableau Insurance Risk).
  - **Tier 2 (Supporting)**: Core unsupervised clustering (AllLife Bank), econometric regression (ShowTime OTT), and enterprise SQL analytics (New-Wheels).
  - **Tier 3 (Compact)**: Foundational analytics & hypothesis testing case studies (INN Hotels, Austo Automobiles, Inferential Statistics).
  - **Tier 4 (Dey'r Dynamics Lab)**: 3 modern agentic GenAI applications leveraging Google Gemini 2.0 Flash and Claude 3.5 Sonnet, highlighting autonomous LLM tool-calling.
- **Full Social & Platform Integration**: Direct verified connections to LinkedIn, GitHub, Kaggle, LeetCode, Tableau Public, and direct email.

---

## 🏗️ System Architecture & Workflow

This portfolio was engineered to bridge the gap between rigorous data science and modern, high-performance web development.

### Application Architecture

```mermaid
graph TD
    Client[Client Browser] -->|Next.js App Router| Layout[Root Layout]
    
    subgraph Frontend [React Components]
        Layout --> Canvas["Constellation Canvas<br/>HTML5 Canvas Element"]
        Layout --> Nav[Navigation/Header]
        Layout --> Main[Main Content Sections]
        Layout --> Detail["Dynamic Route<br/>/project/[id]"]
        
        Main --> Hero[Hero Section]
        Main --> Skills[Skills & Capabilities]
        Main --> Projects[The Project Observatory]
        Main --> Lab[Dey'r Dynamics Lab]
        Main --> Contact[Contact Protocol]
    end

    subgraph Data Layer [JSON Config Files]
        Projects -.->|Injects data| ProjectsJSON(projects.json)
        Lab -.->|Injects data| ProjectsJSON
        Detail -.->|Static Generation| ProjectsJSON
        Skills -.->|Injects data| SkillsJSON(skills.json)
    end
    
    subgraph Backend [BaaS Integration]
        Contact -->|POST Contact Info| Supabase[(Supabase PostgreSQL)]
    end

    style Frontend fill:#1c153d,stroke:#8b5cf6,stroke-width:2px,color:#fff
    style Data Layer fill:#1c153d,stroke:#4ade80,stroke-width:2px,color:#fff
    style Backend fill:#1c153d,stroke:#3ECF8E,stroke-width:2px,color:#fff
```

### Development & Build Workflow

```mermaid
sequenceDiagram
    participant Dev as Developer / AI Agent
    participant Data as JSON Data Layer
    participant Next as Next.js 14 Build
    participant Vercel as Vercel Edge Network
    
    Dev->>Data: Updates projects.json / skills.json
    Dev->>Next: Commits UI changes (CSS/Framer Motion)
    Next->>Next: npm run build
    Next->>Data: Reads JSON data at build time
    Next->>Next: generateStaticParams() for /project/[id]
    Next->>Next: Compiles SSG pages & CSS Modules
    Next->>Vercel: Deploys optimized static bundle
    Vercel->>Client: Serves pages with Edge Caching
```

---

## 🛠️ Repository Organization

```
portfolio-website/
├── public/                  # Static assets (fonts, generated images)
│   └── images/projects/     # Generated 16:9 project cover images
├── src/                     
│   ├── app/                 # Next.js 14 App Router layout & pages
│   │   └── project/[id]/    # Dynamic routing for project case studies
│   ├── components/          # Reusable React UI components (Hero, FadeIn, etc.)
│   ├── data/                # JSON Data Layer (skills, projects, experience)
│   ├── lib/                 # Utility functions and Supabase clients
│   └── styles/              # Global CSS tokens and modular component styles
├── references/              # Project research & public design guidelines
└── README.md                # System documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/Souhrid-Dey/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [https://portfolio-website-kappa-two-12.vercel.app](https://portfolio-website-kappa-two-12.vercel.app) with your browser to explore the live observatory, or run locally on `http://localhost:3000`.

---

## 🔒 Privacy & Security

All internal ideation prompts, agentic instructions (`PROMPT.MD`), scratchpad workflows, and raw academic transcripts used to generate this context have been strictly excluded via `.gitignore` to maintain data privacy and professional operational security. 

---
*Uncovering the subtle patterns in complex data to drive high-impact strategic decisions.*
