import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FadeInUp } from '@/components/ui/FadeInUp';

const VALEURS = [
  "Excellence et rigueur professionnelle",
  "Solidarité",
  "Intégrité",
  "Transmission et héritage",
];

const STATS = [
  {
    value: '200+',
    label: 'Organisations accompagnées',
    description: "Structures féminines renforcées dans plus de 15 pays africains",
  },
  {
    value: '85%',
    label: 'Taux de pérennité',
    description: "Des organisations accompagnées restent actives 3 ans après",
  },
  {
    value: '2000+',
    label: 'Femmes formées',
    description: "Leaders, entrepreneures et responsables d'organisations",
  },
  {
    value: '50+',
    label: 'Partenaires institutionnels',
    description: "Bailleurs, agences et institutions partenaires à travers l'Afrique",
  },
];

const DOMAINES_INTERVENTION = [
  "Renforcement des capacités de gouvernance",
  "Accès aux financements et mobilisation de ressources",
  "Plaidoyer et représentation institutionnelle",
  "Création de réseaux et mise en relation",
];

const ACTIONS_IMPACTS = [
  {
    badge: "Politiques publiques",
    title: "Structuration de politiques publiques pour 34 collectivités territoriales",
    description:
      "Accompagnement à l'élaboration et à la structuration de politiques publiques et de stratégies de développement de l'emploi et de l'entrepreneuriat des jeunes et des femmes au sein de 34 collectivités territoriales de 10 pays africains (Cameroun, Gabon, Sénégal, Mali, Niger, Bénin, Togo, Congo, Burkina Faso), membres de l'Association Internationale des Régions Francophones (AIRF).",
  },
  {
    badge: "Stratégie nationale",
    title: "Élaboration de la Stratégie Nationale de l'Entrepreneuriat au Cameroun",
    description:
      "Appui à l'élaboration de la Stratégie Nationale de l'Entrepreneuriat du Cameroun, une action du Gouvernement à travers le Ministère des Petites et Moyennes Entreprises, de l'Économie Sociale et de l'Artisanat, pour transformer structurellement l'économie informelle.",
  },
  {
    badge: "Climat des affaires",
    title: "Amélioration du climat des affaires, ZLECAF et sensibilisation aux APE",
    description:
      "Mission d'étude pour l'amélioration du cadre juridique et règlementaire dans le cadre du Dispositif d'appui à la compétitivité du Cameroun. Contribution au Cameroon Business Forum (CBF) avec le Mouvement des Entrepreneurs du Cameroun (MECAM). Ateliers de sensibilisation sur la Zone de Libre Échange Continentale Africaine (ZLECAF) et les Accords de Partenariat Économique (APE) Cameroun–Union Européenne.",
  },
  {
    badge: "Formation",
    title: "Formation et structuration des organisations de femmes",
    description:
      "Formation et accompagnement des femmes entrepreneures dans le cadre du programme « Meet Ladies » de EDEN AFRICA, et structuration des activités des femmes du secteur informel dans le cadre du programme « Solidarités Plurielles » avec le soutien de la Mairie de Douala 3ème (Cameroun) et Angel's Sprint (Angleterre).",
  },
  {
    badge: "Plaidoyer francophone",
    title: "Plaidoyer de la société civile francophone au sein des instances de la Francophonie",
    description:
      "Portage du plaidoyer de la société civile francophone lors du XIXe Sommet des Chefs d'État et de Gouvernement de Villers-Cotterêts, de la Conférence Ministérielle de la Francophonie et du Conseil Permanent de la Francophonie, via EDEN AFRICA et la Conférence des Organisations Internationales de la Francophonie (COING) de l'OIF, dont Diane assurait la présidence.",
  },
  {
    badge: "Réseautage",
    title: "Plateformes collaboratives et structuration de l'écosystème associatif francophone",
    description:
      "Ateliers, formations et soirées de réseautage avec les responsables d'OSC de plus de 25 pays, dont 22 pays francophones, en présentiel et en ligne, pour la mise en place de plateformes nationales des OSC et la création de synergies entre organisations.",
  },
  {
    badge: "Observatoire",
    title: "Lancement de l'Observatoire de la Société Civile Francophone (OSCF)",
    description:
      "Plateforme internationale dédiée à l'analyse des dynamiques citoyennes, à la production de connaissances comparatives et à la valorisation des contributions des OSC dans l'espace francophone.",
  },
  {
    badge: "Gouvernance d'Internet",
    title: "Conférence Internationale sur la Gouvernance d'Internet comme bien public",
    description:
      "Communication écrite contributive sur l'éducation aux médias et à l'information pour le compte de l'Organisation Internationale de la Francophonie, dans le cadre de la conférence internationale organisée par l'UNESCO.",
  },
  {
    badge: "Développement durable",
    title: "Conférences internationales sur le développement durable",
    description:
      "Participation à la Conférence 3 ZEROS à Paris avec CONVERGENCES, au programme Nexus à Marseille avec le CAWTAR de Tunisie sur le rôle des femmes, et à la Conférence de la Francophonie scientifique de l'Agence Universitaire de la Francophonie.",
  },
  {
    badge: "Intelligence Artificielle",
    title: "Lancement de MAMIZA IA — l'intelligence artificielle inclusive pour les femmes",
    description:
      "Formation, échanges et réseautage face à la sous-représentation des femmes dans les métiers de l'IA, où elles ne représentent que 22% des professionnels à l'échelle mondiale. Contribution au panel consultatif du UNCDF sur les services financiers numériques pour l'inclusion financière des femmes en Afrique Centrale.",
  },
  {
    badge: "Publications",
    title: "Guide du Jeune Entrepreneur & Manuel sur les métiers du développement durable",
    description:
      "Guide publié avec l'appui de l'OIF et de l'AUF pour accompagner les jeunes entrepreneurs. Manuel répertoriant les métiers et opportunités dans le secteur de l'environnement.",
  },
  {
    badge: "Statut Étudiant-Entrepreneur",
    title: "Mise en place du Statut d'Étudiant-Entrepreneur au Cameroun et en RDC",
    description:
      "Appui à la mise en place du Statut d'Étudiant-Entrepreneur au Cameroun et en République Démocratique du Congo, en collaboration avec les ministères sectoriels de l'enseignement supérieur, des PME et les universités.",
  },
];

export default function AProposPage() {
  return (
    <>
      {/* ───────── BIO / HERO À PROPOS ───────── */}
      <section className="section bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <FadeInUp>
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-200 to-gold-400 p-[2.5px] shadow-card-lg overflow-hidden">
              <div className="relative w-full h-full rounded-[14px] bg-burgundy-900 overflow-hidden">
                <img
                  src="/images/Diane1.jpg"
                  alt="Diane Ndeuna"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeInUp>

          <FadeInUp>
            <span className="text-xs font-body font-bold tracking-widest text-gold-600 uppercase">
              À Propos
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-burgundy-700 leading-tight mt-3 mb-6">
              « Je transforme l'engagement utile en systèmes autonomes capables de dialoguer avec les institutions »
            </h1>

            <div className="space-y-4 font-body text-text text-sm md:text-base leading-relaxed">
              <p>
                Diane NDEUNA est architecte de structuration des organisations et projets féminins à potentiel institutionnel en Afrique, avec plus de 20 ans d'expérience.
              </p>
              <p>
                Son travail se situe à un point précis : aider des initiatives portées par des femmes à sortir de la fragilité, de la dépendance et de l'informel pour devenir des organisations capables de tenir — gouvernance, modèle économique, mesure, conformité, capacité à contractualiser. C'est dans cette logique qu'elle a lancé deux autres initiatives : l'Agence de Développement de l'Entrepreneuriat Féminin (ADEF) et son corollaire MAMIZA Intelligence Artificielle (MIA AFRICA).
              </p>
              <p>
                Présidente Exécutive d'EDEN AFRICA et Secrétaire Permanente du Mouvement des Entrepreneurs du Cameroun, elle a contribué à structurer des projets et des réseaux dans plusieurs pays, touchant directement plusieurs milliers de bénéficiaires. Son approche repose sur trois piliers non négociables : intégrité, culture du résultat, autonomie des organisations.
              </p>
              <p>
                Elle a collaboré avec des réseaux et institutions de l'espace francophone, des collectivités territoriales, des universités et des dirigeants d'entreprise, et prépare un ouvrage dédié au management des OSC/ONG, avec un objectif clair : sortir les organisations du registre « émotion » pour les faire entrer dans le registre « système ».
              </p>
              <p>
                Convaincue que l'admiration ne change pas les règles, Diane NDEUNA défend une approche exigeante du leadership féminin : moins de symboles, plus de décisions ; moins de dépendance, plus de cadre ; moins de présence, plus de citabilité.
              </p>
              <p>
                Sa diversité linguistique et culturelle est un atout précieux pour son travail : elle s'exprime avec aisance en anglais, en français, et pratique l'espagnol. Ces atouts favorisent sa capacité à travailler dans un environnement multiculturel, multiethnique et intergénérationnel, fruit de son expérience intercontinentale en Afrique, en Europe et aux États-Unis.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ───────── VISION & VALEURS ───────── */}
      <section className="section bg-surface border-y border-rose-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeInUp>
            <Card className="h-full">
              <SectionTitle title="Ma Vision" align="left" />
              <p className="font-quote italic text-burgundy-700 text-lg md:text-xl leading-relaxed mt-4">
                « Bâtir des organisations de femmes structurées, influentes et fondées sur le socle de la performance durable en Afrique. »
              </p>
            </Card>
          </FadeInUp>

          <FadeInUp>
            <Card className="h-full">
              <SectionTitle title="Mes Valeurs" align="left" />
              <ul className="space-y-3 mt-4">
                {VALEURS.map((valeur, index) => (
                  <li key={index} className="flex items-center gap-3 font-body text-text text-sm md:text-base">
                    <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                    {valeur}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeInUp>
        </div>
      </section>

      {/* ───────── ACTIONS & IMPACTS — STATS ───────── */}
      <section className="section bg-cream">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Nos Actions & Impacts"
            subtitle="J'ai accompagné des centaines d'organisations et de projets féminins à travers le continent africain. Mes actions s'inscrivent dans une logique de transformation institutionnelle durable, avec des résultats concrets et mesurables."
            align="center"
          />

          <FadeInUp className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-center">
            {STATS.map((stat, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                <span className="font-display text-5xl font-bold text-gradient-gold mb-2 tracking-tight">
                  {stat.value}
                </span>
                <h3 className="font-body text-base font-semibold text-burgundy-700 uppercase tracking-wide mb-1">
                  {stat.label}
                </h3>
                <p className="font-body text-sm text-text-muted max-w-[220px]">
                  {stat.description}
                </p>
              </div>
            ))}
          </FadeInUp>

          {/* Domaines d'intervention */}
          <FadeInUp className="mt-16 max-w-3xl mx-auto">
            <Card>
              <h3 className="font-display text-xl font-bold text-burgundy-700 mb-4">
                Domaines d'intervention
              </h3>
              <ul className="space-y-2">
                {DOMAINES_INTERVENTION.map((domaine, index) => (
                  <li key={index} className="flex items-start gap-3 font-body text-sm md:text-base text-text">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                    {domaine}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeInUp>

          {/* Approche d'impact */}
          <FadeInUp className="mt-8 max-w-3xl mx-auto">
            <Card className="bg-gradient-burgundy text-white">
              <h3 className="font-display text-xl font-bold text-gold-300 mb-3">
                Notre approche d'impact
              </h3>
              <p className="font-body text-sm md:text-base text-rose-100 leading-relaxed">
                Chaque intervention est évaluée selon des indicateurs précis : viabilité financière, qualité de la gouvernance, rayonnement institutionnel et impact social. Je produis des rapports d'impact transparents pour nos partenaires et bénéficiaires.
              </p>
            </Card>
          </FadeInUp>
        </div>
      </section>

      {/* ───────── ACTIONS & IMPACTS — RÉALISATIONS DÉTAILLÉES ───────── */}
      <section className="section bg-surface border-y border-rose-100">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Ces actions qui laissent des empreintes indélébiles…"
            align="center"
          />

          <FadeInUp className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {ACTIONS_IMPACTS.map((action, index) => (
              <Card key={index} className="flex flex-col h-full">
                <div className="mb-3">
                  <Badge variant={index % 2 === 0 ? "burgundy" : "gold"}>
                    {action.badge}
                  </Badge>
                </div>
                <h3 className="font-display text-lg font-bold text-burgundy-700 mb-2 leading-snug">
                  {action.title}
                </h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {action.description}
                </p>
              </Card>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ───────── MÉDIAS — APERÇU ───────── */}
      <section className="section bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            title="Médias & Communication"
            subtitle="Je crois que la visibilité est un levier de légitimité institutionnelle. Ma présence médiatique contribue à amplifier la voix des femmes leaders africaines et à valoriser leurs accomplissements sur la scène nationale et internationale."
            align="center"
          />

          <FadeInUp className="mt-8">
            
              href="/medias"
              className="btn-gold inline-flex items-center gap-2"
            <a>
              Découvrir nos médias &amp; actualités
            </a>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}