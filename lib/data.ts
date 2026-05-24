import type { ExperienceItem, Project } from "@/types";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiFlutter,
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiJenkins,
  // SiKubernetes
} from "react-icons/si";

import { FaNetworkWired, FaServer } from "react-icons/fa";
import { MdApi } from "react-icons/md";
// import { MdOutlineSyncAlt } from "react-icons/md";


export const NAV_HREF = {
  about: "#about",
  stack: "#stack",
  projects: "#projects",
  experience: "#experience",
  contact: "#contact",
};

type TechStackItem = {
  name: string;
  icon: IconType;
  color: string;
};

// ─── Tech Stack ─────────────────────────────────────────────────────────────
export const TECH_STACK = {
  primary: [
    // Frontend
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },

    // Mobile
    { name: "Flutter", icon: SiFlutter, color: "#54C5F8" },

    // Backend
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "PHP", icon: SiPhp, color: "#8892BF" },
    { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
    { name: "Node.js", icon: SiNodedotjs, color: "#68A063" },
    { name: "Express.js", icon: SiExpress, color: "#ffffff" },

    // Data
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },

    // Tools
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "GitHub", icon: SiGithub, color: "#F05032" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
    // { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    // { name: "CI/CD", icon: MdOutlineSyncAlt, color: "#4F8EF7" }
  ] satisfies TechStackItem[],
  secondary: [
    { name: "Linux", icon: SiLinux, color: "#FCC624" },

    { name: "Networking", icon: FaNetworkWired, color: "#5DADE2" },

    { name: "REST APIs", icon: MdApi, color: "#4F8EF7" },

    { name: "DevOps basics", icon: FaServer, color: "#22D3EE" },

    { name: "System Administration", icon: SiNginx, color: "#009639" },
  ] satisfies TechStackItem[],
};

// ─── Projects ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  // Netpass app
  {
    "id": "netpass",
    "title": "NetPass",
    "description": {
      "en": "Hotspot & PPPoE management platform with MikroTik integration and real-time analytics.",
      "fr": "Plateforme de gestion Hotspot & PPPoE avec intégration MikroTik et analytics en temps réel."
    },
    "longDescription": {
      "en": "NetPass is a complete hotspot and PPPoE management platform designed for ISPs and network operators. It centralizes user management, subscriptions, billing, voucher generation and active session monitoring in a single dashboard. The platform integrates directly with MikroTik RouterOS to automate provisioning, bandwidth policies and session lifecycle management. It also exposes a REST API for integrations and provides real-time analytics, reporting and responsive administration tools.",
      "fr": "NetPass est une plateforme de gestion complète pour les hotspots et les services PPPoE, conçue pour les FAI et les opérateurs de réseaux. Elle centralise la gestion des utilisateurs, des abonnements, de la facturation, de la génération de vouchers et du suivi des sessions actives sur un seul tableau de bord. La plateforme s'intègre directement avec MikroTik RouterOS pour automatiser le provisionnement, les politiques de bande passante et la gestion du cycle de vie des sessions. Elle expose également une API REST pour les intégrations et fournit des analyses en temps réel, des rapports et des outils d'administration réactifs."
    },
    "tags": ["PHP", "MySQL", "RouterOS API", "Tailwind CSS", "REST API", "Docker"],
    category: "Full Stack",
    github: "https://github.com/mahensraz/netpass",   // ← replace with real URL
    images: [
      // Replace these with your actual screenshot paths in /public/screenshots/
      "/screenshots/netpass_app/Page_de_connexion.png",
      "/screenshots/netpass_app/Admin_Dashboard.png",
      "/screenshots/netpass_app/Configuration_Router.png",
      "/screenshots/netpass_app/Formulaire_Ajout_profile_hotspot.png",
      "/screenshots/netpass_app/Formulaire_Ajout_profile_pppoe.png",
      "/screenshots/netpass_app/Admin_Gestion-abonnement_hotspot.png",
      "/screenshots/netpass_app/Admin_Gestion-abonnement_pppoe.png",
      "/screenshots/netpass_app/Formulaire_Renouvelement_abonnement_Hotspot.png",
      "/screenshots/netpass_app/Formulaire_Renouvelement_abonnement_Pppoe.png",
      "/screenshots/netpass_app/Gestion_des_Utilisateur.png",
      "/screenshots/netpass_app/Page_Vente_de_ticket.png",
      "/screenshots/netpass_app/Page_Vente&Rapport.png",
      "/screenshots/netpass_app/Session_Active.png",
      "/screenshots/netpass_app/vendeur/Historique_des-Ventes.png",
      "/screenshots/netpass_app/vendeur/Page_connexion_router-hors_ligne.png",

    ],
    featured: true,
    gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
    icon: "📡",
  },

  // GeoHetra app
  {
    id: "impot-local",
    title: "GeoHetra",
    description: {
      en: "Offline-first municipal management platform combining a React web dashboard and a Flutter mobile application for field data collection, automated tax calculation, and geospatial monitoring for local governments.",
      fr: "Plateforme de gestion municipale offline-first combinant un tableau de bord web React et une application mobile Flutter pour la collecte de données terrain, le calcul automatique des impôts locaux et le suivi cartographique des zones administratives."
    },
    longDescription: {
      en: "GeoHetra is a complete digital solution designed to modernize local tax collection for municipalities. It replaces traditional paper-based processes with a centralized and reliable system. The platform is built on three main components: a React-based web dashboard for administrators (zone and agent management, tax configuration, payment tracking, and interactive mapping); a Flutter mobile application for field agents that operates fully offline, allowing data collection, forms, and embedded maps without internet connectivity, with automatic synchronization once a connection is restored; and a Laravel REST API backend with MySQL for secure data storage, synchronization, and reporting. Key features include automated tax computation based on property attributes, generation of tax notices, real-time payment tracking, and an interactive Leaflet/OpenStreetMap visualization showing covered and uncovered areas. The system implements role-based access control for administrators, field agents, and decision-makers.",
      fr: "GeoHetra est une solution complète conçue pour moderniser la gestion des impôts locaux au niveau des collectivités. Elle remplace les processus papier par un système centralisé, fiable et évolutif. La plateforme repose sur trois composants principaux : un tableau de bord web en React pour les administrateurs (gestion des zones et des agents, configuration des taxes, suivi des paiements et cartographie interactive) ; une application mobile Flutter pour les agents de terrain fonctionnant entièrement hors ligne, permettant la collecte de données, les formulaires et les cartes intégrées sans connexion internet, avec synchronisation automatique dès le retour du réseau ; et une API REST Laravel avec MySQL pour le stockage sécurisé, la synchronisation et la génération de rapports. Les fonctionnalités principales incluent le calcul automatique des impôts selon les caractéristiques des biens, la génération des avis d’imposition, le suivi des paiements en temps réel et une visualisation cartographique Leaflet/OpenStreetMap des zones couvertes et non couvertes. Le système intègre une gestion des accès par rôles (administrateurs, agents, décideurs)."
    },
    tags: [
      "React",
      "Flutter",
      "Laravel",
      "MySQL",
      "REST API",
      "Leaflet",
      "OpenStreetMap",
      "Offline-first architecture",
      "Data Synchronization"
    ],
    category: "Full Stack · Mobile · Civic Tech",
    github: "https://github.com/mahensraz/gestion-impots-locaux",
    images: [
      "/screenshots/impot_app/dashboard.png",
      "/screenshots/impot_app/map3.png",
      "/screenshots/impot_app/construction.png",
      "/screenshots/impot_app/details_construction.png",
      "/screenshots/impot_app/Suivi.png",
      "/screenshots/impot_app/mobile/login.png",
      "/screenshots/impot_app/mobile/side_nav.png",
      "/screenshots/impot_app/mobile/map.png",
      "/screenshots/impot_app/mobile/map_zoom.png",
      "/screenshots/impot_app/mobile/construction.png",
      "/screenshots/impot_app/mobile/details_construction.png",
      "/screenshots/impot_app/mobile/ajout_proprietaire.png",
      "/screenshots/impot_app/mobile/ajout_personne.png",
      "/screenshots/impot_app/mobile/ajout_logement.png",
      "/screenshots/impot_app/mobile/ajout_ifpb.png",
      "/screenshots/impot_app/mobile/export_data.png",
      "/screenshots/impot_app/mobile/Screenshot_20251210-154029.png"
    ],
    featured: true,
    gradient: "from-amber-600/20 via-orange-500/10 to-transparent",
    icon: "🏛️"
  },


  // Complaint management app
  {
    id: "complaint-system",
    title: "Complaint_app",
    description: {
      en: "Full stack web platform for complaint management with automatic priority scoring, geolocation mapping, and multi-role workflows — built during internship at TAKALOU, Fort-Dauphin.",
      fr: "Plateforme web full stack de gestion des doléances avec priorisation automatique, cartographie géolocalisée et workflows multi-rôles — réalisée en stage chez TAKALOU, Fort-Dauphin.",
    },
    longDescription: {
      en: "Designed and developed during a 3-month internship at TAKALOU Sarl (Fort-Dauphin), this application digitizes the entire complaint management lifecycle — previously handled on paper. Three types of users interact with the system: citizens (complainants) who submit complaints online with geolocation and file attachments; technicians who consult and process their assigned complaints via interactive maps; and administrators who oversee the full pipeline through a real-time dashboard. The backend (Laravel/MySQL) handles automatic priority scoring based on complaint type weight, assignment workflows with automated notifications at each status change, and role-based access control. The frontend (ReactJS + Material UI) integrates Leaflet with the LocationIQ geocoding API to display color-coded complaint markers on an interactive map (red = urgent, blue = high, green = medium, grey = low priority). The system follows a 3-tier MVC architecture designed and modeled with the 2TUP method and UML.",
      fr: "Conçue et développée lors d'un stage de 3 mois chez TAKALOU Sarl (Fort-Dauphin), cette application digitalise l'intégralité du cycle de vie des doléances — gérées manuellement sur papier auparavant. Trois types d'utilisateurs interagissent avec le système : les plaignants qui soumettent leurs doléances en ligne avec géolocalisation et pièces jointes ; les techniciens qui consultent et traitent les doléances qui leur sont assignées via des cartes interactives ; et les administrateurs qui supervisent l'ensemble du processus via un tableau de bord en temps réel. Le backend (Laravel/MySQL) gère la priorisation automatique selon un score par type de doléance, les workflows d'affectation avec notifications automatiques à chaque changement de statut, et le contrôle d'accès par rôle. Le frontend (ReactJS + Material UI) intègre Leaflet avec l'API de géocodage LocationIQ pour afficher des marqueurs colorés sur une carte interactive (rouge = urgent, bleu = forte priorité, vert = moyenne, gris = faible). Le système suit une architecture MVC 3 tiers, conçu et modélisé avec la méthode 2TUP et UML.",
    },
    tags: [
      "ReactJS",
      "Laravel",
      "MySQL",
      "REST API",
      "Leaflet",
      "LocationIQ API",
      "Material UI",
      "MVC",
    ],
    category: "Enterprise",
    github: "https://github.com/mahensraz/gestion-doleances",
    images: [
      "/screenshots/doleance_app/Baniere2.png",
      "/screenshots/doleance_app/type_doleance.png",
      "/screenshots/doleance_app/add_type_doleance.png",
      "/screenshots/doleance_app/formullaire_ajout_doleance.png",
      "/screenshots/doleance_app/assignation_doleance.png",
      "/screenshots/doleance_app/traiter_doleance.png",
      "/screenshots/doleance_app/dashboard_admin.png",
      "/screenshots/doleance_app/dashboard_technicien.png",
      "/screenshots/doleance_app/dashboard_plaignant.png",
      "/screenshots/doleance_app/visualisation_cartographique_doleance.png",
    ],
    featured: true,
    gradient: "from-purple-600/20 via-pink-500/10 to-transparent",
    icon: "📋",
  },



  // agriconnect app
  {
    "id": "agri-connect",
    "title": "AgriConnect",
    "description": {
      "en": "Agricultural marketplace platform connecting farmers and collectors with product management, map-based discovery, order workflows, real-time messaging, and analytics.",
      "fr": "Plateforme de mise en relation agricole entre paysans et collecteurs avec gestion des produits, recherche cartographique, workflows de commandes, messagerie temps réel et tableaux de bord analytiques."
    },
    "longDescription": {
      "en": "AgriConnect is a multi-role agritech web platform designed to streamline agricultural trade between farmers, collectors, and administrators. Farmers can publish and manage their products, track availability, and monitor order activity through a dedicated dashboard. Collectors can discover products using an interactive map, filter results by region and distance, create purchase requests, and negotiate through a built-in messaging system. The application also includes analytics views, role-based access control, profile management, and an admin area for supervising users, products, orders, and platform activity. The backend was built with NestJS and PostgreSQL, while the frontend uses React, TypeScript, Vite, Tailwind CSS, Radix UI, Leaflet, Socket.IO, React Hook Form, Axios, and Recharts.",
      "fr": "AgriConnect est une plateforme web agritech multi-rôles conçue pour simplifier les échanges agricoles entre paysans, collecteurs et administrateurs. Les paysans peuvent publier et gérer leurs produits, suivre leur disponibilité et visualiser l’activité liée aux commandes via un tableau de bord dédié. Les collecteurs peuvent découvrir les produits à l’aide d’une carte interactive, filtrer les résultats par région et par distance, créer des demandes d’achat et négocier via un système de messagerie intégré. L’application inclut aussi des vues analytiques, une gestion des accès par rôles, la gestion de profil et un espace administrateur pour superviser les utilisateurs, les produits, les commandes et l’activité de la plateforme. Le back-end a été développé avec NestJS et PostgreSQL, tandis que le frontend utilise React, TypeScript, Vite, Tailwind CSS, Radix UI, Leaflet, Socket.IO, React Hook Form, Axios et Recharts."
    },
    "tags": [
      "React",
      "NestJS",
      "PostgreSQL",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "Leaflet",
      "Socket.IO",
    ],
    "category": "Agritech",
    github: "https://github.com/Andohenri/agriConnect",
    images: [
      "/screenshots/agriconnect_app/login.png",
      "/screenshots/agriconnect_app/proposition_produit.png",
      "/screenshots/agriconnect_app/img4.jpeg",
      "/screenshots/agriconnect_app/img3.jpeg",
      "/screenshots/agriconnect_app/img2.jpeg",
      "/screenshots/agriconnect_app/img1.jpeg",
      "/screenshots/agriconnect_app/discussion.png",
    ],
    "featured": true,
    "gradient": "from-emerald-600/20 via-lime-500/10 to-transparent",
    "icon": "🌾"
  },

];

// ─── Experience ───────────────────────────────────────────────────────────────

export const EXPERIENCE: ExperienceItem[] = [

  // ── Projets Freelance ────────────────────────────────────────────────────────
  {
    id: "netpass-freelance",
    role: {
      en: "Freelance Full Stack Developer — NetPass",
      fr: "Développeur Full Stack Freelance — NetPass",
    },
    company: "Freelance",
    period: "Avril 2026",
    description: {
      en: "Architected and shipped a production-grade hotspot and PPPoE management platform with direct MikroTik RouterOS API integration, subscription billing, and real-time analytics dashboard.",
      fr: "Architecture et livraison d'une plateforme de gestion hotspot et PPPoE en production avec intégration directe de l'API MikroTik RouterOS, facturation par abonnement et tableau de bord analytique en temps réel.",
    },
    tags: ["Laravel", "PHP", "MySQL", "MikroTik API", "REST API", "Freelance"],
    type: "project",
  },

  {
    id: "geohetra-freelance",
    role: {
      en: "Freelance Full Stack Developer — GeoHetra",
      fr: "Développeur Full Stack Freelance — GeoHetra",
    },
    company: "Freelance",
    period: "Octobre 2025",
    description: {
      en: "Designed and built an offline-first civic platform for local tax management, combining a React web dashboard for administrators and a Flutter mobile app for field agents with automatic sync.",
      fr: "Conception et développement d'une plateforme civique offline-first pour la gestion des impôts locaux, combinant un tableau de bord React pour les administrateurs et une application mobile Flutter pour les agents de terrain avec synchronisation automatique.",
    },
    tags: ["React", "Flutter", "Laravel", "MySQL", "Offline-first", "Leaflet", "Freelance"],
    type: "project",
  },

  // ── Stage de Licence ─────────────────────────────────────────────────────────
  {
    id: "internship-takalou",
    role: {
      en: "Software Developer Intern — L3 Internship",
      fr: "Développeur Logiciel — Stage de Licence",
    },
    company: "TAKALOU Sarl, Fort-Dauphin",
    period: "2024",
    description: {
      en: "Built a full production complaint management system during a 3-month internship: geolocation-based routing, automatic priority scoring, technician assignment workflows, and multi-role dashboards.",
      fr: "Développement en production d'un système de gestion des doléances durant un stage de 3 mois : routage géolocalisé, priorisation automatique, workflows d'affectation aux techniciens et tableaux de bord multi-rôles.",
    },
    tags: ["ReactJS", "Laravel", "MySQL", "Leaflet", "Stage Licence", "Production"],
    type: "work",
  },

  // ── Projet Scolaire ──────────────────────────────────────────────────────────
  {
    id: "agriconnect-school",
    role: {
      en: "Full Stack Developer — AgriConnect (School Project)",
      fr: "Développeur Full Stack — AgriConnect (Projet Scolaire)",
    },
    company: "École Nationale d'Informatique (ENI)",
    period: "2024 – 2025",
    description: {
      en: "Developed a multi-role agritech marketplace as a school project, connecting farmers and collectors through product listings, interactive map discovery, order workflows, and real-time messaging.",
      fr: "Développement d'un marketplace agritech multi-rôles en projet scolaire, mettant en relation paysans et collecteurs via des annonces de produits, une carte interactive, des workflows de commandes et une messagerie temps réel.",
    },
    tags: ["React", "NestJS", "PostgreSQL", "TypeScript", "Socket.IO", "Leaflet", "Projet ENI"],
    type: "project",
  },

  // ── Formation ────────────────────────────────────────────────────────────────
  {
    id: "master2",
    role: {
      en: "Master's Student — Software Engineering",
      fr: "Étudiant Master 2 — Génie Logiciel",
    },
    company: "École Nationale d'Informatique (ENI)",
    period: "2024 – Présent",
    description: {
      en: "Currently pursuing a specialized Master's degree in Computer Science at ENI, focused on advanced software architecture, design patterns, and engineering best practices.",
      fr: "Master spécialisé en Informatique à l'ENI, axé sur l'architecture logicielle avancée, les patrons de conception et les bonnes pratiques du génie logiciel.",
    },
    tags: ["Master M2", "Génie Logiciel", "ENI", "Software Architecture"],
    type: "education",
  },

  {
    id: "licence",
    role: {
      en: "Bachelor's Graduate — Software Engineering",
      fr: "Diplômé Licence Professionnelle — Génie Logiciel",
    },
    company: "École Nationale d'Informatique (ENI)",
    period: "2021 – 2024",
    description: {
      en: "Completed a professional Bachelor's degree in Computer Science at ENI, specializing in software engineering and databases. Graduated with an internship project at TAKALOU.",
      fr: "Licence Professionnelle en Informatique obtenue à l'ENI, spécialisation Génie Logiciel et Base de Données. Diplômé avec un projet de stage chez TAKALOU.",
    },
    tags: ["Licence Professionnelle", "Génie Logiciel", "ENI", "Bases de Données"],
    type: "education",
  },
  {
    id: "bac",
    role: {
      en: "High School Graduate — Baccalauréat série C",
      fr: "Baccalauréat série C",
    },
    company: "SJC Ambalavao",
    period: "2020 – 2021",
    description: {
      en: "Graduated with a scientific Baccalauréat (série C — Mathematics & Physics) before joining ENI.",
      fr: "Obtention du Baccalauréat scientifique série C (Mathématiques & Physique) avant l'intégration de l'ENI.",
    },
    tags: ["Baccalauréat", "Série C", "Sciences", "SJC Ambalavao"],
    type: "education",
  },
];

// ─── Profile ─────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Mahens Raz",
  initials: "MR",
  image: "/images/Me.jpg",
  email: "razakatiambolaphillipe@gmail.com",
  github: "https://github.com/mahensraz",
  linkedin: "https://linkedin.com/in/mahensraz",
  location: "Madagascar",
  available: true,
};

