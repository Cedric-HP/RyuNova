import type { Language, LanguageData } from "./types/contenteType";

const languageEnglish: LanguageData = {
    titles:{
        content: "CONTENT",
        copyrightNotification: "Copyright Notification",
        events: "Events",
        featuredArticles: "Featured Articles",
        featuredPicturesGallery: "Featured Pictures Gallery",
        gallery: "Gallery",
        home: "Home",
        homeMainTitle: "Connect to infinity!",
        homeSecondTitle: "Join a community of astronomers, dreamers and the curious united by the passion for stars.",
        intellectualPropertyRights: "Intellectual Property Rights",
        legalInformation: "LEGAL INFORMATION",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms Of Service",
        upcommingAstronomicalEvents: "Upcoming astronomical events"
    },
    contentType:{
        article: {
            singular: "Article",
            plural: "Articles"
        },
        comment: {
            singular: "Comment",
            plural: "Comments"
        },
        date: {
            singular: "Date",
            plural: "Dates"
        },
        follower: {
            singular: "Follower",
            plural: "Followers"
        },
        image: {
            singular: "Image",
            plural: "Images"
        },
        like: {
            singular: "Like",
            plural: "Likes"
        },
        reply: {
            singular: "Reply",
            plural: "Replies"
        },
        result: {
            singular: "Result",
            plural: "Results"
        },
        tag: {
            singular: "Tag",
            plural: "Tags"
        },
        user: {
            singular: "User",
            plural: "Users"
        },
        view: {
            singular: "View",
            plural: "Views"
        }
    },
    button:{
        addComment: "Add Comment",
        apply: "Apply",
        cancel: "Cancel",
        follow: "Follow",
        hide: {
            singular: "Hide",
            plural: "Hide"
        },
        logIn: "Log In",
        previous: "Previous",
        readMore: "Read More",
        respond: "Reply",
        seeLess: "See Less",
        seeMore: "See More",
        signUp: "Sign Up",
        sortBy: "Sort By",
        type: "Type",
        unfollow: "Unfollow"
    },
    date:{
        year: {
            singular: "year",
            plural: "years"
        },
        month: {
            singular: "month",
            plural: "months"
        },
        week: {
            singular: "week",
            plural: "weeks"
        },
        day: {
            singular: "day",
            plural: "days"
        },
        hour: {
            singular: "hour",
            plural: "hours"
        },
        minute: {
            singular: "minute",
            plural: "minutes"
        },
        second: {
            singular: "second",
            plural: "seconds"
        },
        justNow: "just now",
        prefix: "",
        sufix: "ago"
    },
    placeHolders:{
        search: "Search",
        tagsPlaceholder: "Tags (Separate tags with spaces)"
    },
    alt:{
        button: "Button",
        by: "by",
        link: "Link"
    },
    message: {
        notification: {
            noTag: "No Tag"
        },
        error: {
            imageNotFound: "Image not found",
            noResultFound: "No result found"
        }
    }
}

const languageFrancais: LanguageData = {
    titles:{
        content: "CONTENU",
        copyrightNotification: "Copyright Notification",
        events: "Événements",
        featuredArticles: "Articles en vedette",
        featuredPicturesGallery: "Galerie d’images en vedette",
        gallery: "Galerie",
        home: "Accueil",
        homeMainTitle: "Connectez-vous à l’infini!",
        homeSecondTitle: "Rejoignez une communauté d’astronomes, de rêveurs et de curieux unis par la passion des étoiles.",
        intellectualPropertyRights: "Droits de propriété intellectuelle",
        legalInformation: "INFORMATION LEGAL",
        privacyPolicy: "Politique de confidentialité",
        termsOfService: "Conditions d'utilisation",
        upcommingAstronomicalEvents: "Événements astronomiques à venir"
    },
    contentType:{
        article: {
            singular: "Article",
            plural: "Articles"
        },
        comment: {
            singular: "Commentaire",
            plural: "Commentaires"
        },
        date: {
            singular: "Date",
            plural: "Dates"
        },
        follower: {
            singular: "Abonné",
            plural: "Abonnés"
        },
        image: {
            singular: "Image",
            plural: "Images"
        },
        like: {
            singular: "Like",
            plural: "Likes"
        },
        reply: {
            singular: "Réponse",
            plural: "Réponses"
        },
        result: {
            singular: "Resultat",
            plural: "Resultats"
        },
        tag: {
            singular: "Tag",
            plural: "Tags"
        },
        user: {
            singular: "Utilisateur",
            plural: "Utilisateurs"
        },
        view: {
            singular: "Vue",
            plural: "Vues"
        }
    },
    button:{
        addComment: "Ajouter un commentaire",
        apply: "Appliquer",
        cancel: "Annuler",
        follow: "S'abonner",
        hide: {
            singular: "Masquer la",
            plural: "Masquer les"
        },
        logIn: "Se Connecter",
        previous: "Précédent",
        readMore: "Lire la suite",
        respond: "Répondre",
        seeLess: "Voir moins",
        seeMore: "Voir plus",
        signUp: "S'inscrire",
        sortBy: "Trier par",
        type: "Type",
        unfollow: "Se Désabonner"
    },
    date:{
        year: {
            singular: "an",
            plural: "ans"
        },
        month: {
            singular: "mois",
            plural: "mois"
        },
        week: {
            singular: "semaine",
            plural: "semaines"
        },
        day: {
            singular: "jour",
            plural: "jours"
        },
        hour: {
            singular: "heure",
            plural: "heures"
        },
        minute: {
            singular: "minute",
            plural: "minutes"
        },
        second: {
            singular: "seconde",
            plural: "secondes"
        },
        justNow: "à l'instant",
        prefix: "Il y a",
        sufix: ""
    },
    placeHolders:{
        search: "Rechercher",
        tagsPlaceholder: "Tags (Séparez les Tags avec des espaces)"
    },
    alt:{
        button: "Bouton",
        by: "par",
        link: "Lien"
    },
    message: {
        notification: {
            noTag: "Aucun Tag"
        },
        error: {
            imageNotFound: "Image introuvable",
            noResultFound: "Aucun résultat trouvé"
        }
    }
}

const languageList: Language = {
    en: languageEnglish,
    fr: languageFrancais
}

export default languageList