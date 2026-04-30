export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  views: number;
  featured?: boolean;
}

export const articles: Record<string, Article> = {
  "irict-2025": {
    id: 1,
    slug: "irict-2025",
    title: "IRICT 2025 : 8e Conférence Internationale à l'Université Hassan II",
    excerpt: "Contribution majeure du Master ISI à la 8th International Conference on Reliable Information and Communication Technology.",
    content: `
      <p>Le Master Ingénierie des Systèmes Intelligents (ISI) est fier d'annoncer sa participation active à l'<strong>IRICT 2025</strong>, la 8ème édition de la prestigieuse Conférence Internationale sur les Technologies de l'Information et de la Communication Fiables, accueillie par l'Université Hassan II de Casablanca.</p>
      
      <h2>Innovation et Recherche de Pointe</h2>
      <p>Cet événement scientifique de premier plan a été l'occasion pour nos chercheurs et étudiants de présenter des travaux novateurs. Les présentations ont porté sur l'optimisation des algorithmes d'Intelligence Artificielle et l'intégration de la blockchain pour la conformité PCI DSS dans des environnements cloud sécurisés.</p>
      <p>Ces recherches abordent des problématiques critiques telles que :</p>
      <ul>
        <li>La détection automatisée d'anomalies par Machine Learning.</li>
        <li>L'intégrité des données via des registres distribués.</li>
        <li>Le reporting de conformité automatisé pour les secteurs financiers.</li>
        <li>La souveraineté numérique et la cyber-résilience des infrastructures cloud.</li>
      </ul>
      
      <h2>Un Leadership Visionnaire</h2>
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic">
        "Notre objectif est de faire progresser des solutions technologiques cyber-résilientes et souveraines, propulsées par l'IA, pour répondre aux défis numériques de l'Afrique et du reste du monde."
      </blockquote>
      <p>Nous tenons à exprimer notre profonde gratitude aux co-présidents Med Amine Errais et Faical Saïd pour leur leadership exemplaire et leur vision qui continue d'inspirer les futures générations d'ingénieurs ISI. Cette conférence renforce la position du Master ISI comme acteur majeur de la recherche technologique au Maroc.</p>
    `,
    category: "Conférence",
    date: "Mars 2025",
    readTime: "4 min",
    author: "Équipe de Recherche ISI",
    image: "/images/events/event-irict-2025.jpg",
    views: 0,
    featured: true,
  },
  "cyber-women-awards-2025": {
    id: 2,
    slug: "cyber-women-awards-2025",
    title: "Excellence : Distinction aux Cyber Women Global Awards 2025",
    excerpt: "Une chercheuse de l'équipe Master ISI honorée dans la catégorie Monde lors d'une cérémonie prestigieuse à Paris.",
    content: `
      <p>C'est avec une immense fierté que le Master ISI annonce la distinction exceptionnelle de l'une de ses chercheuses éminentes, honorée lors des <strong>Cyber Women Global Awards 2025</strong> à Paris.</p>
      
      <h2>Une Reconnaissance Internationale</h2>
      <p>Organisés par le CEFCYS (Cercle des Femmes de la Cybersécurité), ces trophées célèbrent les parcours remarquables des femmes leaders dans le domaine de la sécurité numérique. Notre chercheuse a été distinguée dans la catégorie "Monde", soulignant l'impact global de ses travaux sur la sécurité des systèmes complexes.</p>
      
      <h2>Le Master ISI : Un Berceau de Talents</h2>
      <p>Cette récompense témoigne de l'excellence académique cultivée au sein de notre formation. Elle démontre que la recherche marocaine en cybersécurité se hisse au plus haut niveau international. C'est également un message inspirant pour toutes nos étudiantes : le domaine de la cybersécurité est un terrain d'excellence et d'avenir.</p>
      <p>Le Master ISI continue d'encourager la parité et le leadership féminin dans les filières technologiques de pointe, préparant ainsi des profils capables de relever les défis de la guerre numérique moderne.</p>
    `,
    category: "Distinction",
    date: "Mars 2025",
    readTime: "3 min",
    author: "Administration FSAC",
    image: "/images/events/event-cyber-women.jpg",
    views: 0,
    featured: true,
  },
  "formation-ia-agentique": {
    id: 3,
    slug: "formation-ia-agentique",
    title: "Formation Intensive : L'Ère des Agents Autonomes (IA Agentique)",
    excerpt: "Immersion dans les nouvelles frontières de l'IA avec une formation dédiée aux systèmes décisionnels autonomes.",
    content: `
      <p>L'intelligence artificielle entre dans une nouvelle phase : celle de l'<strong>IA Agentique</strong>. Le Master ISI a récemment organisé une session de formation intensive dédiée aux systèmes autonomes, marquant une étape clé dans l'actualisation continue de son programme pédagogique.</p>
      
      <h2>Au-delà de la Générativité</h2>
      <p>Contrairement aux modèles d'IA classiques, les agents autonomes sont capables de planifier, d'interagir et d'agir de manière indépendante pour atteindre des objectifs complexes. La formation a permis de décortiquer :</p>
      <ul>
        <li>Les architectures multi-agents (Multi-Agent Systems).</li>
        <li>Les mécanismes de planification et de raisonnement (Chain-of-Thought).</li>
        <li>L'intégration des LLMs comme moteurs de décision.</li>
        <li>Le déploiement industriel des agents intelligents.</li>
      </ul>
      
      <h2>Préparer les Ingénieurs de Demain</h2>
      <p>Encadrée par des experts, cette session a combiné théorie rigoureuse et ateliers pratiques sur les frameworks de pointe comme LangChain et AutoGPT. En maîtrisant ces technologies, les étudiants du Master ISI se positionnent aux avant-postes du marché du travail, là où l'automatisation intelligente devient la norme.</p>
      <p>Le Master ISI réaffirme ainsi son engagement à fournir une formation d'avant-garde, en phase avec les révolutions technologiques mondiales.</p>
    `,
    category: "Formation",
    date: "10 Mars 2025",
    readTime: "5 min",
    author: "Pr. DEHBI",
    image: "/images/events/event-ia-agentique.jpg",
    views: 0,
  },
  "oracle-office-tour": {
    id: 4,
    slug: "oracle-office-tour",
    title: "Oracle Office Tour : Immersion et Networking Professionnel",
    excerpt: "Une journée d'échanges privilégiés entre les étudiants du Master ISI et les experts d'Oracle Maroc.",
    content: `
      <p>Dans le cadre de son programme d'ouverture sur le monde professionnel, les étudiants du Master ISI ont été accueillis dans les locaux d'<strong>Oracle Maroc</strong> pour une journée d'immersion riche en enseignements et en opportunités.</p>
      
      <h2>Découvrir l'Excellence Technologique</h2>
      <p>Le "Kick-off" officiel, animé par Pascal Sero et Fatima Zahra Mouak, a permis aux étudiants de découvrir les coulisses de l'un des leaders mondiaux du cloud et des bases de données. Les présentations ont mis en lumière les projets innovants portés par Oracle au Maroc et en Afrique.</p>
      
      <h2>Networking et Carrière</h2>
      <p>L'un des moments forts de la visite a été la rencontre avec les équipes de recrutement et les managers techniques. Les échanges ont porté sur :</p>
      <ul>
        <li>Les métiers du Cloud et de la Data chez Oracle.</li>
        <li>Le programme d'ambassadeurs OMAP.</li>
        <li>Les opportunités de stages de fin d'études et d'emplois.</li>
      </ul>
      <p>Cette initiative souligne la force du partenariat entre le Master ISI et les grands acteurs de l'industrie numérique. Elle offre à nos étudiants un accès direct au marché de l'emploi et une vision concrète des défis technologiques actuels.</p>
    `,
    category: "Événement",
    date: "Mars 2025",
    readTime: "4 min",
    author: "Relations Entreprises",
    image: "/images/events/event-oracle.jpg",
    views: 0,
  },
  "admission-2025-2026": {
    id: 5,
    slug: "admission-2025-2026",
    title: "Admissions 2025-2026 : Rejoignez l'Élite de l'IA au Maroc",
    excerpt: "Ouverture des candidatures pour la prochaine promotion du Master en Ingénierie des Systèmes Intelligents.",
    content: `
      <p>Le Master en <strong>Ingénierie des Systèmes Intelligents (ISI)</strong> de la Faculté des Sciences Aïn Chock (FSAC) annonce l'ouverture officielle de sa campagne de recrutement pour l'année universitaire 2025-2026.</p>
      
      <h2>Pourquoi choisir le Master ISI ?</h2>
      <p>Le Master ISI n'est pas seulement une formation académique, c'est un accélérateur de carrière. Accrédité par l'État et soutenu par un corps professoral de haut niveau, il offre un équilibre parfait entre fondements théoriques (Mathématiques appliquées, Algorithmique) et compétences pratiques (Big Data, Deep Learning, Cybersécurité).</p>
      
      <h2>Critères de Sélection</h2>
      <p>L'admission est ouverte aux étudiants titulaires d'une Licence en Informatique ou en Mathématiques-Informatique. Le processus est rigoureux pour garantir le haut niveau de la promotion :</p>
      <ul>
        <li><strong>Présélection :</strong> Basée sur les notes obtenues durant le cursus de licence.</li>
        <li><strong>Épreuves Écrites :</strong> Évaluation des connaissances en algorithmique, programmation et mathématiques.</li>
        <li><strong>Entretien Oral :</strong> Évaluation de la motivation et du projet professionnel du candidat.</li>
      </ul>
      
      <p><strong>Calendrier Important :</strong> Le dépôt des dossiers en ligne se fait via la plateforme de l'université jusqu'au mois de juin. Nous invitons tous les candidats passionnés par l'innovation à préparer leurs dossiers dès maintenant.</p>
    `,
    category: "Admission",
    date: "15 Mars 2025",
    readTime: "3 min",
    author: "Direction Master ISI",
    image: "/images/hero-neural.jpg",
    views: 0,
  },
};
