import type {
  ExperienceItem,
  LocalizedString,
  LocalizedStringArray,
  Project,
} from "@/types";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiFlutter,
  SiGithub,
  SiJavascript,
  SiJenkins,
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
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { FaNetworkWired, FaServer } from "react-icons/fa";
import { MdApi } from "react-icons/md";

export function getLocalizedText(
  value: LocalizedString,
  lang: "en" | "fr",
): string {
  return typeof value === "string" ? value : value[lang];
}

export function getLocalizedList(
  value: LocalizedStringArray,
  lang: "en" | "fr",
): string[] {
  return Array.isArray(value) ? value : value[lang];
}

export const NAV_HREF = {
  about: "#about",
  stack: "#stack",
  projects: "#projects",
  experience: "#experience",
  contact: "#contact",
};

type TechStackItem = {
  name: LocalizedString;
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
    { name: "Prisma", icon: SiPrisma, color: "#5A67D8" },

    // Tools
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "GitHub", icon: SiGithub, color: "#F05032" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
  ] satisfies TechStackItem[],
  secondary: [
    { name: "Linux", icon: SiLinux, color: "#FCC624" },
    {
      name: { en: "Networking", fr: "Réseaux" },
      icon: FaNetworkWired,
      color: "#5DADE2",
    },
    {
      name: { en: "REST APIs", fr: "API REST" },
      icon: MdApi,
      color: "#4F8EF7",
    },
    {
      name: { en: "DevOps Basics", fr: "Bases DevOps" },
      icon: FaServer,
      color: "#22D3EE",
    },
    {
      name: { en: "System Administration", fr: "Administration système" },
      icon: SiNginx,
      color: "#009639",
    },
  ] satisfies TechStackItem[],
};

// ─── Projects ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  // HOTICKET (M2 Internship at TANJAKAI)
  {
    id: "hoticket",
    title: "HOTICKET",
    description: {
      en: "HOTICKET is a multiservice booking platform developed as part of my Master's internship in Software Engineering and Databases at TANJAKAI. The project covers several sectors, including accommodation, transportation, restaurants, and events. I contribute to the platform's Full Stack development, from the Next.js, React, and TypeScript frontend to the Express.js, PostgreSQL, and Prisma backend.",
      fr: "HOTICKET est une plateforme multiservice de réservation développée dans le cadre de mon stage de Master 2 en Génie Logiciel et Bases de Données chez TANJAKAI. Le projet couvre plusieurs secteurs, notamment l'hébergement, le transport, la restauration et les événements. J'interviens sur le développement Full Stack de la plateforme, du frontend Next.js, React et TypeScript au backend Express.js, PostgreSQL et Prisma.",
    },
    longDescription: {
      en: "HOTICKET is a multiservice booking platform developed as part of my Master's internship in Software Engineering and Databases at TANJAKAI. The project covers several sectors, including accommodation, transportation, restaurants, and events. I contribute to the platform's Full Stack development, from the Next.js, React, and TypeScript frontend to the Express.js, PostgreSQL, and Prisma backend.\n\nCurrently in development around a modular architecture, the platform provides dedicated spaces planned for customers, partners, and administrators to simplify booking journeys, service and establishment management, and partner activity monitoring.",
      fr: "HOTICKET est une plateforme multiservice de réservation développée dans le cadre de mon stage de Master 2 en Génie Logiciel et Bases de Données chez TANJAKAI. Le projet couvre plusieurs secteurs, notamment l'hébergement, le transport, la restauration et les événements. J'interviens sur le développement Full Stack de la plateforme, du frontend Next.js, React et TypeScript au backend Express.js, PostgreSQL et Prisma.\n\nActuellement en cours de développement autour d'une architecture modulaire, la plateforme prévoit des espaces dédiés aux clients, aux partenaires et aux administrateurs afin de simplifier les parcours de réservation, la gestion des établissements et des offres, ainsi que le suivi des activités des partenaires.",
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma",
    ],
    category: "Full Stack",
    images: [
      "/screenshots/hoticket/Acceuil.png",
      "/screenshots/hoticket/Booking Hotels.png",
      "/screenshots/hoticket/Details Hotels.png",
      "/screenshots/hoticket/Details Hotels 2.png",
      "/screenshots/hoticket/Espace administrateur.png",
      "/screenshots/hoticket/espace operateur de transport.png",
      "/screenshots/hoticket/creation de compte merchant.png",
      "/screenshots/hoticket/Page de connexion.png",
    ],
    featured: true,
    icon: "🎫",
  },

  // NetPass
  {
    id: "netpass",
    title: "NetPass",
    description: {
      en: "Hotspot and PPPoE network management platform built with native PHP, MySQL, MikroTik RouterOS API integration, and Docker.",
      fr: "Plateforme de gestion des réseaux Hotspot et PPPoE développée en PHP natif avec MySQL, intégration de l'API MikroTik RouterOS et Docker.",
    },
    longDescription: {
      en: "NetPass is a hotspot and PPPoE management platform designed for Internet service providers and network operators. It centralizes user management, subscriptions, billing, connection voucher generation, and active session monitoring.\n\nThrough its MikroTik RouterOS API integration, the platform automates several network device and connection management operations. Built with native PHP and MySQL, the application is containerized with Docker and published on GitHub and Docker Hub.",
      fr: "NetPass est une plateforme de gestion des réseaux Hotspot et PPPoE destinée aux fournisseurs d'accès Internet et aux opérateurs réseau. Elle centralise la gestion des utilisateurs, des abonnements, de la facturation, de la génération des tickets de connexion et du suivi des sessions actives.\n\nGrâce à son intégration avec l'API MikroTik RouterOS, elle permet d'automatiser plusieurs opérations de gestion des équipements et des connexions réseau. Développé en PHP natif avec MySQL, le projet est conteneurisé avec Docker et dispose d'un dépôt GitHub public ainsi que d'une publication sur Docker Hub.",
    },
    tags: {
      en: [
        "PHP",
        "MySQL",
        "MikroTik RouterOS API",
        "Docker",
        "REST API",
        "Tailwind CSS",
      ],
      fr: [
        "PHP",
        "MySQL",
        "MikroTik RouterOS API",
        "Docker",
        "API REST",
        "Tailwind CSS",
      ],
    },
    category: "Full Stack",
    github: "https://github.com/mahensraz/netpass",
    images: [
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
    icon: "📡",
  },

  // GeoHetra
  {
    id: "impot-local",
    title: "GeoHetra",
    description: {
      en: "Local tax management solution for municipalities combining a React web dashboard, an offline-first Flutter mobile app, and a Laravel/MySQL REST API.",
      fr: "Solution complète de gestion des impôts locaux pour les collectivités, combinant un tableau de bord web React, une application mobile Flutter offline-first et une API REST Laravel/MySQL.",
    },
    longDescription: {
      en: "GeoHetra is a comprehensive solution designed to modernize local tax management for municipalities. It replaces paper-based processes with a centralized system combining web administration, mobile field data collection, and geospatial management.\n\nThe platform consists of a React dashboard for administrators, an offline-first Flutter application for field agents, and a Laravel REST API with MySQL for data storage, synchronization, and reporting.\n\nIts main features include zone and agent management, tax configuration, automatic tax calculation based on property characteristics, tax notice generation, and payment tracking. Interactive mapping powered by Leaflet and OpenStreetMap helps visualize covered and uncovered areas.\n\nThe system also includes role-based access control and automatic synchronization of field data when an internet connection becomes available. The application has been deployed on Render and Vercel.",
      fr: "GeoHetra est une solution complète conçue pour moderniser la gestion des impôts locaux des collectivités. Elle remplace les processus papier par un système centralisé associant administration web, collecte mobile et gestion des données géographiques.\n\nLa plateforme comprend un tableau de bord React destiné aux administrateurs, une application Flutter pour les agents de terrain fonctionnant entièrement hors ligne et une API REST Laravel avec MySQL pour le stockage, la synchronisation et la génération de rapports.\n\nElle permet notamment de gérer les zones et les agents, de configurer les taxes, de calculer automatiquement les impôts selon les caractéristiques des biens, de générer les avis d'imposition et de suivre les paiements. La cartographie interactive s'appuie sur Leaflet et OpenStreetMap pour visualiser les zones couvertes et non couvertes.\n\nLe système intègre également une gestion des accès par rôles et un mécanisme de synchronisation automatique des données collectées sur le terrain. Le projet a été déployé sur Render et Vercel.",
    },
    tags: {
      en: [
        "React",
        "Flutter",
        "Laravel",
        "MySQL",
        "REST API",
        "Leaflet",
        "OpenStreetMap",
        "Offline-first",
      ],
      fr: [
        "React",
        "Flutter",
        "Laravel",
        "MySQL",
        "API REST",
        "Leaflet",
        "OpenStreetMap",
        "Offline-first",
      ],
    },
    category: {
      en: "Full Stack · Mobile · Civic Tech",
      fr: "Full Stack · Mobile · Collectivités",
    },
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
      "/screenshots/impot_app/mobile/Screenshot_20251210-154029.png",
    ],
    featured: true,
    icon: "🏛️",
  },

  // Gestion des doléances — TAKALOU
  {
    id: "complaint-system",
    title: {
      en: "TAKALOU — Complaint Management System",
      fr: "Gestion des doléances — TAKALOU",
    },
    description: {
      en: "Full stack web platform for complaint management with automatic priority scoring, interactive geolocation mapping, and multi-role workflows, built during an internship at TAKALOU Sarl.",
      fr: "Plateforme web full stack de gestion des doléances avec priorisation automatique, cartographie géolocalisée et workflows multi-rôles, développée lors d'un stage chez TAKALOU Sarl.",
    },
    longDescription: {
      en: "Designed and developed during a 3-month internship at TAKALOU Sarl in Fort-Dauphin, this web application digitizes the complaint management lifecycle previously handled on paper.\n\nThree user roles interact with the platform: complainants who submit requests online with geolocation and attachments, technicians who consult and process assigned complaints through interactive maps, and administrators who oversee operations from a real-time dashboard.\n\nThe Laravel and MySQL backend handles automatic priority scoring by complaint type, assignment workflows with status notifications, and role-based access control. The React and Material UI frontend integrates Leaflet and the LocationIQ geocoding API to display color-coded markers on an interactive map. The application follows a 3-tier MVC architecture modeled with UML and the 2TUP method.",
      fr: "Conçue et développée lors d'un stage de trois mois chez TAKALOU Sarl à Fort-Dauphin, cette application web digitalise l'ensemble du cycle de traitement des doléances, auparavant gérées sur papier.\n\nTrois profils d'utilisateurs interagissent sur la plateforme : les plaignants qui soumettent leurs doléances en ligne avec géolocalisation et pièces jointes, les techniciens qui consultent et traitent les demandes qui leur sont affectées via des cartes interactives, et les administrateurs qui supervisent l'activité depuis un tableau de bord.\n\nLe backend Laravel et MySQL prend en charge la priorisation automatique selon le type de doléance, les workflows d'affectation avec notifications à chaque changement de statut ainsi que la gestion des accès par rôles. Le frontend React et Material UI intègre Leaflet et l'API de géocodage LocationIQ pour afficher des marqueurs colorés par niveau de priorité. Le projet repose sur une architecture MVC trois tiers, modélisée avec UML et la méthode 2TUP.",
    },
    tags: {
      en: [
        "React",
        "Laravel",
        "MySQL",
        "REST API",
        "Leaflet",
        "LocationIQ API",
        "Material UI",
        "MVC",
      ],
      fr: [
        "React",
        "Laravel",
        "MySQL",
        "API REST",
        "Leaflet",
        "LocationIQ API",
        "Material UI",
        "MVC",
      ],
    },
    category: { en: "Enterprise", fr: "Entreprise" },
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
    icon: "📋",
  },

  // AgriConnect
  {
    id: "agri-connect",
    title: "AgriConnect",
    description: {
      en: "Academic agritech platform connecting farmers and collectors with product management, map-based discovery, order workflows, and real-time messaging.",
      fr: "Plateforme web agritech académique mettant en relation producteurs et collecteurs avec gestion des produits, recherche cartographique, suivi des commandes et messagerie temps réel.",
    },
    longDescription: {
      en: "AgriConnect is a multi-role agritech web platform developed as an academic project at ENI to facilitate agricultural trade between farmers, collectors, and administrators.\n\nFarmers can publish and manage their products, track availability, and monitor order activity through a dedicated dashboard. Collectors can browse listings on an interactive map, filter by region and distance, create purchase requests, and negotiate through an integrated real-time messaging system. An administration area oversees users, products, orders, and platform analytics.\n\nThe backend is built with NestJS and PostgreSQL, paired with a React, TypeScript, Vite, Tailwind CSS, and Radix UI frontend integrating Leaflet and Socket.IO.",
      fr: "AgriConnect est une plateforme web agritech multi-rôles réalisée dans le cadre d'un projet académique à l'ENI pour faciliter les échanges agricoles entre producteurs, collecteurs et administrateurs.\n\nLes producteurs peuvent publier et gérer leurs produits, suivre leur disponibilité et consulter l'activité liée aux commandes depuis un tableau de bord dédié. Les collecteurs peuvent rechercher des offres sur une carte interactive, filtrer par région et par distance, créer des demandes d'achat et échanger via une messagerie temps réel intégrée. Un espace administrateur permet de superviser les utilisateurs, les produits, les commandes et les indicateurs d'activité.\n\nLe backend repose sur NestJS et PostgreSQL, associé à un frontend React, TypeScript, Vite, Tailwind CSS et Radix UI intégrant Leaflet et Socket.IO.",
    },
    tags: [
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
    category: "Agritech",
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
    featured: true,
    icon: "🌾",
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const EXPERIENCE: ExperienceItem[] = [
  // ── Stage Master 2 ───────────────────────────────────────────────────────────
  {
    id: "hoticket-internship",
    role: {
      en: "Full Stack Developer — Master's Intern",
      fr: "Développeur Full Stack — Stagiaire de Master 2",
    },
    company: "TANJAKAI · HOTICKET",
    period: { en: "In progress", fr: "En cours" },
    description: {
      en: "Full Stack development of a multiservice booking platform as part of my Master's internship in Software Engineering and Databases. Contributing to the design and development of the frontend with Next.js, React, and TypeScript, as well as the backend with Express.js, PostgreSQL, and Prisma.",
      fr: "Développement Full Stack d'une plateforme multiservice de réservation dans le cadre de mon stage de Master 2 en Génie Logiciel et Bases de Données. Contribution à la conception et au développement du frontend avec Next.js, React et TypeScript, ainsi qu'au backend avec Express.js, PostgreSQL et Prisma.",
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma",
    ],
    type: "work",
  },

  // ── Projets Freelance ────────────────────────────────────────────────────────
  {
    id: "netpass-freelance",
    role: {
      en: "Freelance Full Stack Developer — NetPass",
      fr: "Développeur Full Stack Freelance — NetPass",
    },
    company: "Freelance",
    period: { en: "April – May 2026", fr: "Avril – Mai 2026" },
    description: {
      en: "Designed and delivered a Hotspot and PPPoE network management platform in native PHP and MySQL, integrating the MikroTik RouterOS API for device and connection management, subscription billing, and voucher generation. Containerized with Docker and published on GitHub and Docker Hub.",
      fr: "Conception et livraison d'une plateforme de gestion des réseaux Hotspot et PPPoE en PHP natif et MySQL, intégrant l'API MikroTik RouterOS pour la gestion des équipements et connexions, la facturation par abonnement et la génération de tickets. Conteneurisée avec Docker et publiée sur GitHub et Docker Hub.",
    },
    tags: {
      en: [
        "PHP",
        "MySQL",
        "MikroTik RouterOS API",
        "Docker",
        "REST API",
        "Freelance",
      ],
      fr: [
        "PHP",
        "MySQL",
        "MikroTik RouterOS API",
        "Docker",
        "API REST",
        "Freelance",
      ],
    },
    type: "project",
  },

  {
    id: "geohetra-freelance",
    role: {
      en: "Freelance Full Stack Developer — GeoHetra",
      fr: "Développeur Full Stack Freelance — GeoHetra",
    },
    company: "Freelance",
    period: { en: "September – December 2025", fr: "Septembre – Décembre 2025" },
    description: {
      en: "Designed and built a local tax management solution for municipalities combining a React web dashboard, an offline-first Flutter mobile app for field agents with automatic data synchronization, and a Laravel/MySQL REST API with Leaflet and OpenStreetMap mapping. Deployed on Render and Vercel.",
      fr: "Conception et développement d'une solution de gestion des impôts locaux pour les collectivités combinant un tableau de bord web React, une application mobile Flutter offline-first pour les agents de terrain avec synchronisation automatique des données, et une API REST Laravel/MySQL avec cartographie Leaflet et OpenStreetMap. Déployée sur Render et Vercel.",
    },
    tags: [
      "React",
      "Flutter",
      "Laravel",
      "MySQL",
      "Offline-first",
      "Leaflet",
      "Freelance",
    ],
    type: "project",
  },

  // ── Stage de Licence ─────────────────────────────────────────────────────────
  {
    id: "internship-takalou",
    role: {
      en: "Full Stack Developer Intern — Bachelor's Internship",
      fr: "Développeur Full Stack Stagiaire — Stage de Licence",
    },
    company: "TAKALOU Sarl, Fort-Dauphin",
    period: { en: "August – October 2024", fr: "Août – Octobre 2024" },
    description: {
      en: "Developed a web complaint management platform during a 3-month internship: UML and 2TUP modeling, 3-tier MVC architecture with React and Laravel/MySQL, automatic priority scoring, geolocation mapping (Leaflet, LocationIQ), assignment workflows, and multi-role dashboards.",
      fr: "Développement d'une plateforme web de gestion des doléances lors d'un stage de trois mois : modélisation UML et méthode 2TUP, architecture MVC trois tiers avec React et Laravel/MySQL, priorisation automatique, cartographie géolocalisée (Leaflet, LocationIQ), workflows d'affectation et tableaux de bord multi-rôles.",
    },
    tags: {
      en: ["React", "Laravel", "MySQL", "Leaflet", "Bachelor's Internship"],
      fr: ["React", "Laravel", "MySQL", "Leaflet", "Stage de Licence"],
    },
    type: "work",
  },

  // ── Projet Académique ────────────────────────────────────────────────────────
  {
    id: "agriconnect-school",
    role: {
      en: "Full Stack Developer — AgriConnect (Academic Project)",
      fr: "Développeur Full Stack — AgriConnect (Projet académique)",
    },
    company: {
      en: "National School of Informatics (ENI Fianarantsoa)",
      fr: "École Nationale d'Informatique (ENI Fianarantsoa)",
    },
    period: { en: "June 2025", fr: "Juin 2025" },
    description: {
      en: "Multi-role agritech web platform developed as an academic project at ENI, connecting farmers, collectors, and administrators through product management, interactive map search, order workflows, and real-time messaging.",
      fr: "Plateforme web agritech multi-rôles réalisée dans le cadre d'un projet académique à l'ENI, mettant en relation producteurs, collecteurs et administrateurs via la gestion de produits, la recherche cartographique, les workflows de commandes et la messagerie temps réel.",
    },
    tags: {
      en: [
        "React",
        "NestJS",
        "PostgreSQL",
        "TypeScript",
        "Socket.IO",
        "Leaflet",
        "ENI Project",
      ],
      fr: [
        "React",
        "NestJS",
        "PostgreSQL",
        "TypeScript",
        "Socket.IO",
        "Leaflet",
        "Projet ENI",
      ],
    },
    type: "project",
  },

  // ── Formation ────────────────────────────────────────────────────────────────
  {
    id: "master2",
    role: {
      en: "Master's Degree in Software Engineering and Databases",
      fr: "Master 2 en Génie Logiciel et Bases de Données",
    },
    company: {
      en: "National School of Informatics (ENI Fianarantsoa)",
      fr: "École Nationale d'Informatique (ENI Fianarantsoa)",
    },
    period: { en: "2024 – Present", fr: "2024 – Présent" },
    description: {
      en: "Currently completing a Master 2 program in Software Engineering and Databases at ENI Fianarantsoa, focusing on software architecture, database design, and engineering best practices.",
      fr: "Formation de Master 2 en cours à l'ENI Fianarantsoa en Génie Logiciel et Bases de Données, axée sur l'architecture logicielle, la conception de bases de données et les bonnes pratiques d'ingénierie.",
    },
    tags: {
      en: [
        "Master 2",
        "Software Engineering",
        "Databases",
        "ENI Fianarantsoa",
      ],
      fr: [
        "Master 2",
        "Génie Logiciel",
        "Bases de Données",
        "ENI Fianarantsoa",
      ],
    },
    type: "education",
  },

  {
    id: "licence",
    role: {
      en: "Professional Bachelor's Degree in Software Engineering",
      fr: "Licence Professionnelle en Génie Logiciel",
    },
    company: {
      en: "National School of Informatics (ENI Fianarantsoa)",
      fr: "École Nationale d'Informatique (ENI Fianarantsoa)",
    },
    period: { en: "2021 – 2024", fr: "2021 – 2024" },
    description: {
      en: "Completed a Professional Bachelor's degree in Computer Science at ENI Fianarantsoa, specializing in Software Engineering and Databases, concluded with a final-year internship at TAKALOU Sarl.",
      fr: "Licence Professionnelle en Informatique obtenue à l'ENI Fianarantsoa, spécialisation Génie Logiciel et Bases de Données, conclue par un stage de fin de cycle chez TAKALOU Sarl.",
    },
    tags: {
      en: [
        "Bachelor's Degree",
        "Software Engineering",
        "Databases",
        "ENI Fianarantsoa",
      ],
      fr: [
        "Licence Professionnelle",
        "Génie Logiciel",
        "Bases de Données",
        "ENI Fianarantsoa",
      ],
    },
    type: "education",
  },

  {
    id: "bac",
    role: {
      en: "Scientific Baccalauréat (Série C)",
      fr: "Baccalauréat série C",
    },
    company: "SJC Ambalavao",
    period: { en: "2020 – 2021", fr: "2020 – 2021" },
    description: {
      en: "Obtained the scientific Baccalauréat (série C — Mathematics and Physics) before enrolling at ENI Fianarantsoa.",
      fr: "Obtention du Baccalauréat scientifique série C (Mathématiques et Physique) avant d'intégrer l'ENI Fianarantsoa.",
    },
    tags: {
      en: ["Baccalauréat", "Série C", "Mathematics & Physics", "SJC Ambalavao"],
      fr: [
        "Baccalauréat",
        "Série C",
        "Mathématiques & Physique",
        "SJC Ambalavao",
      ],
    },
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
  resume: {
    en: {
      href: "/cv/Mahens-Raz-CV-EN.pdf",
      filename: "Mahens-Raz-CV-EN.pdf",
    },
    fr: {
      href: "/cv/Mahens-Raz-CV-FR.pdf",
      filename: "Mahens-Raz-CV-FR.pdf",
    },
  },
};
