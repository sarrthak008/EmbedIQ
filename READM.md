# 🚀 EmbedIQ — AI Chatbot SaaS Platform

<div align="center">

![EmbedIQ Banner](https://img.shields.io/badge/EmbedIQ-AI--Powered%20SaaS-blueviolet?style=for-the-badge&logo=openai)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203.x-green?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/Frontend-React%2018-blue?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/Database-MySQL%208-orange?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)

**Turn static websites into interactive AI-driven experiences with a single line of code.**

[🌐 Live here](https://www.embediq.in)

</div>

---

## 🌟 Overview
EmbedIQ is a scalable SaaS platform that enables businesses to create, train, and deploy custom AI chatbots. Users can upload their own business knowledge and embed a fully functional, branded chat widget onto any website using a simple CDN script.

---

## ✨ Features
- **Zero-Code Deployment:** Copy-paste a `<script>` tag to any website.
- **Knowledge Training:** Train bots on custom text data for context-aware responses.
- **UI Customization:** Adjust widget colors, icons, and positioning in real-time.
- **SaaS Architecture:** Secure multi-tenant system with subscription-based limits.
- **Chat Analytics:** Track user interactions and bot performance.
- **Verified Emails:** Integrated with Resend for transactional and welcome emails.

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Client Website] -->|Embed Script| B[EmbedIQ CDN]
    B --> C[React Chat Widget]
    C -->|REST API| D[Spring Boot Backend]
    D --> E[Spring Security/JWT]
    D --> F[AI Service Manager]
    F --> G[LLM Provider]
    D --> H[(MySQL Database)]

# demo here 

 [🌐 demo 1 here](https://careplluss.netlify.app/)


 [🌐 Demo 2 here](https://steady-cupcake-ecf7c7.netlify.app/)