const fr = {
  nav: {
    home:           'Accueil',
    about:          'À Propos',
    expertises:     'Expertises',
    ecosystem:      'Écosystème',
    resources:      'Ressources',
    blog:           'Blog',
    directory:      'Annuaire',
    partnerships:   'Partenariats',
    media:          'Médias',
    contact:        'Contact',
    diagnostic:     'Diagnostic',
  },
  home: {
    hero_title:     'Architecte de Systèmes Organisationnels',
    hero_subtitle:  'Leadership féminin africain — Structurer pour durer',
    cta_contact:    'Prendre Contact',
    cta_diagnostic: 'Auto-diagnostic gratuit',
  },
  contact: {
    title:              'Contactez-nous',
    name_label:         'Nom complet',
    email_label:        'Adresse email',
    subject_label:      'Sujet',
    message_label:      'Message',
    submit:             'Envoyer le message',
    success:            'Message envoyé avec succès !',
    error:              'Une erreur est survenue. Veuillez réessayer.',
    name_required:      'Nom requis',
    email_invalid:      'Email invalide',
    subject_required:   'Sujet requis',
    message_required:   'Message requis',
    message_too_short:  'Message trop court (20 caractères minimum)',
  },
  newsletter: {
    title:       'Rejoignez notre communauté',
    placeholder: 'Votre adresse email',
    subscribe:   'S\'abonner',
    success:     'Vérifiez votre email pour confirmer votre inscription.',
    already:     'Cette adresse est déjà inscrite.',
  },
  auth: {
    login:              'Se connecter',
    register:           'Créer un compte',
    email:              'Adresse email',
    password:           'Mot de passe',
    confirm_password:   'Confirmer le mot de passe',
    name:               'Nom complet',
    forgot_password:    'Mot de passe oublié ?',
    no_account:         'Pas encore de compte ?',
    already_account:    'Déjà un compte ?',
    creating:           'Création...',
    logging_in:         'Connexion...',
  },
  footer: {
    tagline:    '« L\'Afrique n\'a pas besoin d\'héroïnes. Elle a besoin de systèmes. »',
    legal:      'Tous droits réservés',
    privacy:    'Politique de confidentialité',
    terms:      'Mentions légales',
  },
  errors: {
    not_found:      'Page introuvable',
    server_error:   'Erreur serveur',
    back_home:      'Retour à l\'accueil',
  },
  common: {
    loading:      'Chargement...',
    see_more:     'Voir plus',
    read_more:    'Lire la suite',
    download:     'Télécharger',
    share:        'Partager',
    close:        'Fermer',
    cancel:       'Annuler',
    save:         'Enregistrer',
    delete:       'Supprimer',
    edit:         'Modifier',
    publish:      'Publier',
    unpublish:    'Dépublier',
    published:    'Publié',
    draft:        'Brouillon',
    back:         'Retour',
    next:         'Suivant',
    previous:     'Précédent',
    of:           'sur',
  },
}

export default fr

export interface Dictionary {
  nav: {
    home: string; about: string; expertises: string; ecosystem: string
    resources: string; blog: string; directory: string; partnerships: string
    media: string; contact: string; diagnostic: string
  }
  home: {
    hero_title: string; hero_subtitle: string; cta_contact: string; cta_diagnostic: string
  }
  contact: {
    title: string; name_label: string; email_label: string; subject_label: string
    message_label: string; submit: string; success: string; error: string
    name_required: string; email_invalid: string; subject_required: string
    message_required: string; message_too_short: string
  }
  newsletter: { title: string; placeholder: string; subscribe: string; success: string; already: string }
  auth: {
    login: string; register: string; email: string; password: string
    confirm_password: string; name: string; forgot_password: string
    no_account: string; already_account: string; creating: string; logging_in: string
  }
  footer: { tagline: string; legal: string; privacy: string; terms: string }
  errors: { not_found: string; server_error: string; back_home: string }
  common: {
    loading: string; see_more: string; read_more: string; download: string
    share: string; close: string; cancel: string; save: string; delete: string
    edit: string; publish: string; unpublish: string; published: string
    draft: string; back: string; next: string; previous: string; of: string
  }
}
