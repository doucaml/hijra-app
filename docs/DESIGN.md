# Hijra — Design system

**Version : 0.2 — direction validée pour la V1**  
**Statut : prête à être appliquée à l'UI**

Hijra est un calendrier centré sur le temps islamique : il doit aider à se repérer dans les mois, à reconnaître les fêtes et, progressivement, à découvrir les événements qui ont marqué l'histoire de l'islam.

Le design doit donner envie de consulter le calendrier régulièrement, sans transformer les dates religieuses en simple liste d'événements décoratifs.

### Décisions validées

- **Langue V1 :** anglais uniquement.
- **Nom :** Hijra.
- **Calendriers :** le calendrier hégirien reste principal ; le grégorien reste secondaire.
- **Contenu religieux :** fêtes communes uniquement pour le moment.
- **Navigation :** écran calendrier unique, sans barre de navigation inférieure.
- **Notifications :** hors périmètre prioritaire.
- **Implémentation :** la logique existante et les données ne sont pas modifiées ; la première passe porte uniquement sur les classes Tailwind et les styles UI.

---

## 1. Direction artistique

### Idée directrice : le temps sacré, calme et lisible

Hijra ne cherche pas à reproduire une esthétique « orientale » attendue. Son caractère musulman vient d'abord du contenu, du calendrier hégirien et de la qualité du contexte fourni autour des dates — pas d'un croissant de lune, d'un motif arabisant ou d'une dominante verte.

L'interface s'inspire de Samsung Calendar pour :

- la lecture immédiate du mois ;
- la grille très lisible ;
- la distinction entre date courante, date sélectionnée et date avec événement ;
- la carte de détail placée directement sous le calendrier ;
- l'action principale accessible sans quitter l'écran d'accueil.

Elle reprend de Deel :

- un fond ivoire très léger, avec une nuance bleu minéral utilisée comme atmosphère ;
- des surfaces blanches qui structurent le contenu ;
- des cartes généreuses mais peu nombreuses ;
- une hiérarchie visuelle forte et peu de décoration.

Elle reprend d'Apple :

- la priorité donnée au contenu et à la lisibilité ;
- des composants prévisibles ;
- des états interactifs explicites ;
- le respect des conventions de chaque plateforme plutôt qu'une imitation d'iOS.

### Ce que le système doit éviter

- les dégradés sur chaque carte ;
- les ombres épaisses et les effets glassmorphism ;
- les formes « blob », les illustrations 3D et les icônes générées ;
- l'utilisation simultanée de plusieurs couleurs identitaires et de motifs islamiques ;
- les cartes arrondies qui font toutes la même taille ;
- le texte en capitales pour donner artificiellement une impression premium ;
- la couleur comme unique moyen de signaler une information.

### Principes UX

1. **La date avant la décoration.** Un utilisateur doit comprendre le mois, la date active et les fêtes en moins de trois secondes.
2. **Une action, une conséquence visible.** Après un tap sur une date, le calendrier et le panneau de détail doivent évoluer ensemble.
3. **La densité est contextuelle.** La grille est dense et régulière ; les explications historiques sont plus aérées.
4. **Le calme est fonctionnel.** Le fond doux réduit la fatigue visuelle, mais les surfaces et le contraste gardent une structure nette.
5. **Pas d'ornement sans information.** Chaque couleur, icône ou ligne doit indiquer un état ou faciliter une action.
6. **La confiance avant la fausse précision.** Les informations de dates doivent pouvoir afficher leur source ou une note de variation lorsque nécessaire.
7. **Le contenu est inclusif.** Le système doit pouvoir accueillir les conventions de calcul et les traditions différentes sans en privilégier une implicitement.

---

## 2. Palette de couleurs

La palette est basée sur un ivoire chaud, un indigo profond et un bleu minéral. Elle est plus sobre et intemporelle que la première piste lilas. Le bleu minéral sert de repère temporel sans reconduire le vert comme couleur identitaire de l'application. Le corail reste réservé aux fêtes ou points importants.

### Couleurs primitives

| Token | Hex | Usage |
|---|---|---|
| `ink-950` | `#1E2935` | Texte principal, icônes principales |
| `ink-800` | `#35323E` | Texte secondaire fort |
| `ink-600` | `#66727D` | Métadonnées, texte secondaire |
| `ink-400` | `#9AA4AA` | Placeholder, éléments désactivés |
| `paper-50` | `#FAF8F3` | Canvas ivoire principal |
| `paper-0` | `#FFFFFF` | Surfaces et cartes |
| `mist-100` | `#F4F5F2` | Surface secondaire, séparateurs doux |
| `blue-mist-100` | `#E8F0F2` | Fond teinté, état sélectionné très léger |
| `blue-mist-300` | `#C7DDE1` | Fond d'ambiance et bordure colorée |
| `indigo-700` | `#273D68` | Action principale, sélection forte |
| `indigo-800` | `#1B2C4F` | Variante pressée / contraste élevé |
| `mineral-600` | `#2F7D8A` | Date du jour, repère temporel |
| `mineral-800` | `#1F5F6C` | Texte sur fond bleu minéral clair |
| `mineral-100` | `#E0EEF0` | Fond d'événement ordinaire |
| `coral-600` | `#C7674F` | Fête importante, attention non destructive |
| `coral-100` | `#FBE8E1` | Fond de fête importante |
| `line` | `#E2E6E8` | Bordures et séparateurs |

### Couleurs sémantiques — thème clair

| Token | Valeur | Rôle |
|---|---|---|
| `color.canvas` | `paper-50` | Fond général de l'écran |
| `color.canvas-tinted` | `#F1F4F3` | Zone supérieure atmosphérique |
| `color.surface` | `paper-0` | Carte, grille, panneau de détail |
| `color.surface-secondary` | `mist-100` | Contrôle secondaire, état neutre |
| `color.text-primary` | `ink-950` | Titres, dates, actions |
| `color.text-secondary` | `ink-600` | Labels, calendrier grégorien, descriptions |
| `color.text-disabled` | `ink-400` | Contenu indisponible |
| `color.border` | `line` | Bordure discrète |
| `color.action` | `indigo-700` | Bouton principal, lien, focus |
| `color.action-pressed` | `indigo-800` | État pressé |
| `color.today` | `mineral-600` | Date du jour |
| `color.event` | `mineral-100` | Événement courant |
| `color.event-text` | `mineral-800` | Texte / icône d'événement courant |
| `color.holiday` | `coral-100` | Fête ou date à forte importance |
| `color.holiday-text` | `#8D3E2E` | Texte / icône de fête |

### Dégradé d'ambiance

Le dégradé inspiré de Deel est réservé au **canvas**, jamais au texte ni aux éléments porteurs d'une information :

```text
background-atmosphere:
  linear-gradient(180deg, #C7E0E4 0%, #EDF0E9 52%, #FAF8F3 100%)
```

Usage validé pour le test : le dégradé couvre tout le canvas avec une progression verticale, du bleu minéral très pâle en haut vers l'ivoire en bas, via `expo-linear-gradient`. La grille et les cartes restent opaques (`color.surface`) afin de préserver le contraste et la lisibilité, tandis que le dégradé reste visible dans les espaces autour des surfaces. Il ne porte aucune information et ne doit jamais remplacer un contraste ou un état fonctionnel.

### Contraste et mode sombre

- `ink-950` sur `paper-50` : texte courant.
- `paper-0` sur `indigo-700` : action principale.
- `paper-0` sur `mineral-600` : date du jour.
- Les fonds `mineral-100`, `coral-100` et `blue-mist-100` ne servent jamais de fond à un texte de petite taille sans utiliser leur token texte foncé.
- Le mode sombre doit être prévu dès la création des tokens, mais pas obtenu par simple inversion des couleurs.

Proposition sombre : canvas `#171B21`, surface `#232A33`, surface secondaire `#2D3742`, texte principal `#F7F8F8`, texte secondaire `#B8C1C7`, action `#9FB5E0`, bleu minéral `#73B8C2`, corail `#F08B72`.

---

## 3. Typographie

### Rôles

Le système utilise **Open Sans** pour l'interface : elle est disponible dans le projet, lisible dans la grille et suffisamment neutre pour laisser le contenu religieux porter l'identité. `Oldenburg` peut être utilisé avec parcimonie pour un titre éditorial ou une citation, mais ne doit pas devenir la police de toute l'application. `Oleo Script` est réservé à une éventuelle signature de marque, pas aux données du calendrier.

| Style | Police | Taille / interligne | Poids | Usage |
|---|---|---:|---:|---|
| `display` | Open Sans | 32 / 38 | Bold | Mois dans une zone d'accueil si nécessaire |
| `title-1` | Open Sans | 24 / 30 | SemiBold | Titre de page, détail d'une fête |
| `title-2` | Open Sans | 20 / 26 | SemiBold | Titre de section, date sélectionnée |
| `body-large` | Open Sans | 17 / 24 | Regular | Résumé ou introduction |
| `body` | Open Sans | 15 / 22 | Regular | Texte courant, nom d'événement |
| `label` | Open Sans | 13 / 18 | SemiBold | Mois, boutons, états |
| `caption` | Open Sans | 12 / 16 | Regular | Date grégorienne, source, aide |
| `calendar-day` | Open Sans | 16 / 20 | Medium | Numéro dans la grille |
| `calendar-weekday` | Open Sans | 12 / 16 | SemiBold | Jours de la semaine |

Règles :

- ne pas écrire les mois entièrement en capitales ;
- utiliser les chiffres tabulaires si la plateforme le permet ;
- garder le numéro de jour plus contrasté que le nom de l'événement ;
- ne jamais descendre sous 12 px pour une information utile ;
- prévoir l'agrandissement du texte système sans couper les noms de fêtes.

---

## 4. Mesures, grille et formes

### Échelle d'espacement

Base de 4 px : `4, 8, 12, 16, 20, 24, 32, 40, 48`.

- marge horizontale d'écran : **20 px** (16 px minimum sur petit écran) ;
- séparation entre sections : **24 px** ;
- espace interne d'une carte : **16 px** ;
- espace entre un titre et ses métadonnées : **6 à 8 px** ;
- espace entre cellules : **4 px maximum**, idéalement aucun filet visible.

### Grille calendrier

- 7 colonnes de largeur égale ;
- hauteur de cellule recommandée : **48 px**, zone interactive incluse ;
- marge intérieure de la grille : 8 à 12 px ;
- numéro centré dans une zone de 36 à 40 px ;
- la grille ne doit pas être forcée à occuper la hauteur restante : elle doit garder sa densité naturelle ;
- les dates des mois adjacents sont désactivées visuellement et ne sont pas interactives dans la première version.

### Rayon

| Token | Valeur | Usage |
|---|---:|---|
| `radius-xs` | 8 px | Badge, petit contrôle |
| `radius-sm` | 12 px | Bouton icône, sélecteur |
| `radius-md` | 16 px | Carte d'événement, panneau |
| `radius-lg` | 24 px | Carte d'accueil ou bottom sheet |
| `radius-pill` | 999 px | Chip, indicateur compact uniquement |

Les rayons ne doivent pas tous être `rounded-full`. Une forme arrondie signale un regroupement ou une cible d'action ; la sobriété vient de la répétition cohérente des quelques rayons, pas d'une absence totale de géométrie.

### Bordures et profondeur

- bordure standard : 1 px `color.border` ;
- pas de bordure autour de chaque cellule du calendrier ;
- élévation uniquement pour une carte flottante ou un bouton flottant ;
- ombre très douce : `0 4px 16px rgba(29, 27, 36, 0.08)` ;
- sur Android, respecter l'élévation native si elle facilite la perception ; sur iOS, privilégier bordure + ombre légère.

---

## 5. Anatomie de l'écran d'accueil

### Hiérarchie proposée

```text
Safe area
└── App bar : Hijra / accès recherche ou réglages / bouton Aujourd'hui
    └── Atmosphère en dégradé léger
        ├── Month navigator : précédent · mois · année AH · suivant
        ├── Lien secondaire : À propos de [mois]
        └── Calendar surface
            ├── En-têtes des jours
            ├── Grille du mois
            └── Légende discrète si plusieurs types d'événements existent
        └── Selected date panel
            ├── Date hégirienne prioritaire
            ├── Date grégorienne secondaire
            └── Événement(s), ou état vide utile
```

Le bouton « Aujourd'hui » doit être une action compacte dans l'app bar, et non un élément décoratif isolé en haut à droite. Il doit annoncer clairement son action avec `Aujourd'hui` lorsque l'espace le permet ; le numéro seul peut rester le contenu visuel du bouton.

Le contrôle actuel composé de deux rectangles (« mois » et « année ») fonctionne, mais doit être lu comme un seul sélecteur de période. Sur mobile, le mois est le texte dominant et l'année `1448 AH` est une métadonnée alignée à droite ou un second contrôle compact.

### App bar

- hauteur de contenu : 56 px, hors safe area ;
- titre court : `Hijra` ou le mois courant selon la stratégie de navigation ;
- 1 à 2 actions maximum ;
- icônes Lucide de 24 px, trait 2 px ;
- cible tactile minimum : 44 × 44 px ;
- ne pas utiliser une icône sans label accessible.

### Navigation mensuelle

- flèches précédent / suivant dans deux boutons de 44 à 48 px ;
- mois et année dans une zone stable afin que la grille ne saute pas ;
- swipe horizontal optionnel, toujours doublé par les boutons ;
- animation de transition courte (180–240 ms), désactivée avec « réduire les mouvements ».

### Panneau de date sélectionnée

Le panneau remplace les grandes zones grises actuelles par une surface blanche clairement séparée de la grille :

- padding : 16 px horizontal, 20 px vertical ;
- date hégirienne : `title-2` ;
- date grégorienne : `body` ou `caption` selon la place ;
- nom de la fête dans une carte d'événement ou une ligne avec icône ;
- si aucune fête : `Aucune fête enregistrée pour cette date.` plutôt qu'un espace vide ;
- si plusieurs événements : liste verticale, sans concaténer les noms dans une seule ligne.

Le contenu historique long doit ouvrir une page ou un bottom sheet dédié. Le calendrier reste une surface de repérage, pas un article.

### Navigation inférieure

Samsung Calendar justifie une navigation inférieure parce qu'il possède plusieurs espaces. Pour Hijra, elle n'est pas nécessaire tant qu'il n'existe que le calendrier et les fêtes. Ajouter une barre uniquement pour remplir l'écran introduirait une navigation artificielle.

Lorsqu'il y aura plusieurs destinations réelles, la proposition est :

- `Calendrier` — vue mensuelle ;
- `Fêtes` — liste et recherche des fêtes ;
- `Histoire` — contenus historiques ;
- `Réglages` — méthode de calcul, langue, apparence.

Maximum 4 destinations, avec libellé toujours visible et icônes simples.

---

## 6. États de la cellule de calendrier

Une date peut appartenir à plusieurs états. Leur combinaison doit rester compréhensible sans dépendre uniquement de la couleur.

| État | Traitement visuel | Information portée |
|---|---|---|
| Date normale | numéro `calendar-day`, texte principal | date disponible |
| Date du mois adjacent | numéro `ink-400`, opacité réduite | hors période active |
| Aujourd'hui | cercle plein `mineral-600`, texte blanc | repère temporel actuel |
| Date avec événement | petit point ou trait bleu minéral sous le numéro | événement disponible |
| Fête importante | point / trait corail + libellé dans le détail | fête prioritaire |
| Date sélectionnée | contour 2 px `indigo-700` ou fond `blue-mist-100` | date dont le détail est affiché |
| Aujourd'hui + sélectionnée | cercle bleu minéral avec anneau indigo | deux états simultanés |
| Pressée | surface `blue-mist-100`, légère réduction visuelle | feedback immédiat |
| Désactivée | texte `ink-400`, aucun feedback | non disponible |

Recommandation : ne pas remplir toutes les dates d'événement de cercles colorés. Le cercle est réservé à l'état du jour ou à une sélection forte ; un point ou un trait suffit à signaler une fête.

La cellule sélectionnée doit conserver une forme distincte même en monochrome. La date du jour ne doit pas disparaître lorsqu'une autre date est sélectionnée.

---

## 7. Composants

### `CalendarDay`

**Responsabilité :** afficher un numéro et ses états, sans connaître le contenu complet de l'événement.

- zone tactile min. 44 × 44 px ;
- numéro centré ;
- indicateur d'événement sous le numéro ;
- `accessibilityLabel` complet, par exemple : « 27 Rajab 1448, Laylat al-Mi'raj, date sélectionnée » ;
- focus visible au clavier sur web et tablettes.

### `MonthNavigator`

**Responsabilité :** changer de mois et annoncer la période courante.

- boutons nommés « Mois précédent » et « Mois suivant » ;
- le mois et l'année ne doivent pas être confondus avec une action si ce n'est pas un sélecteur ;
- possibilité future d'ouvrir un sélecteur de mois/année, sans ajouter cette complexité au MVP.

### `EventMarker`

**Responsabilité :** signaler la présence d'un événement.

- point ou trait de 4 à 6 px ;
- couleur sémantique seulement ;
- le nom de l'événement reste dans le panneau de détail, jamais uniquement dans le marqueur.

### `EventCard`

**Responsabilité :** rendre une fête identifiable et lisible.

- icône 20–24 px dans une pastille claire ;
- nom en `body` ;
- type ou précision en `caption` ;
- date alignée à droite uniquement dans une liste, jamais au détriment du nom ;
- utiliser `event` pour une date générale et `holiday` pour une fête prioritaire ;
- une seule action principale par carte.

### `AboutMonth`

**Responsabilité :** apporter du contexte au mois hégirien.

- ouvre un bottom sheet sur mobile lorsque le contenu est court ;
- ouvre une page lorsque le contenu devient éditorial ;
- titre : `À propos de Rajab` ;
- poignée, bouton fermer et geste de retour selon les conventions de la plateforme ;
- le scrim doit rendre le contexte visible mais non lisible : `rgba(29, 27, 36, 0.32)`.

### `TodayButton`

**Responsabilité :** revenir à la date réelle.

- libellé accessible « Revenir à aujourd'hui » ;
- état pressé explicite ;
- ne pas le confondre avec la date actuellement sélectionnée.

### Icônes

Utiliser Lucide de façon cohérente : `ChevronLeft`, `ChevronRight`, `CalendarDays`, `BookOpen`, `Search`, `Settings`, `Info`. Les icônes ont un rôle fonctionnel ; elles ne remplacent pas un titre ni un texte explicatif.

---

## 8. Interaction et feedback

- Tap sur une date : mise à jour simultanée de la sélection et du panneau de détail.
- Tap sur une fête : ouverture du contexte de cette fête, pas changement silencieux de page.
- Navigation de mois : mise à jour du titre, de la grille et du contenu sélectionné ; la sélection par défaut devient le premier jour du mois ou le jour courant si le mois courant est affiché.
- Retour à aujourd'hui : feedback haptique léger uniquement si disponible, jamais obligatoire.
- Erreur de chargement ou données absentes : message inline dans la zone concernée, pas une alerte bloquante.
- Les transitions servent à montrer la continuité du temps ; elles ne doivent pas ralentir une consultation répétée.

---

## 9. Accessibilité et internationalisation

- contraste WCAG AA pour le texte courant et les contrôles ;
- cibles tactiles minimum 44 × 44 px ;
- navigation clavier sur web et tablette ;
- support du lecteur d'écran pour chaque date, son mois, son année et ses événements ;
- ne jamais exprimer « fête » uniquement par la couleur ;
- gérer les tailles de texte système et les noms de fêtes longs ;
- prévoir RTL dès les composants de navigation et les alignements ;
- éviter les abréviations ambiguës des jours (`M`, `T`, etc.) lorsque la langue les rend confuses ;
- stocker les dates comme données structurées, jamais comme chaînes présentées uniquement en anglais ;
- prévoir la locale pour les chiffres, les noms de mois et le calendrier grégorien.

L'anglais est la seule langue livrée dans la V1. Les chaînes doivent néanmoins rester localisables afin de pouvoir ajouter le français et l'arabe plus tard. L'arabe devra être traité comme une vraie expérience RTL, pas comme une simple traduction.

---

## 10. Données, confiance et contenu religieux

Le design ne doit pas masquer les incertitudes propres au calendrier hégirien. Une préférence de méthode de calcul et une éventuelle variation d'un jour doivent être visibles dans les réglages ou dans une note contextuelle, sans alourdir la grille.

Chaque événement devrait pouvoir porter :

```text
id
name
hijriDate
category: historical | religious | public-holiday
importance: standard | major
shortDescription
longDescription
source
traditionOrConvention (si nécessaire)
```

Les noms de fêtes doivent être normalisés et traduits séparément de la date. Par exemple, `Mawlid an-Nabi` ne devrait pas être figé dans le composant d'interface. Le contenu doit pouvoir expliquer lorsqu'une date est contestée, régionale ou dépendante d'une convention.

---

## 11. Tokens d'implémentation

Les tokens ci-dessous sont la source de vérité à transformer en variables React Native / Uniwind. Les composants ne doivent pas utiliser directement des couleurs arbitraires de type `emerald-500` ou `cyan-500`.

```ts
export const colors = {
  light: {
    canvas: '#FAF8F3',
    canvasTinted: '#F1F4F3',
    surface: '#FFFFFF',
    surfaceSecondary: '#F3F0F5',
    textPrimary: '#1E2935',
    textSecondary: '#66727D',
    textDisabled: '#9AA4AA',
    border: '#E2E6E8',
    action: '#273D68',
    actionPressed: '#1B2C4F',
    today: '#2F7D8A',
    event: '#E0EEF0',
    eventText: '#1F5F6C',
    holiday: '#FBE8E1',
    holidayText: '#8D3E2E',
  },
  dark: {
    canvas: '#17151D',
    canvasTinted: '#26213A',
    surface: '#24212C',
    surfaceSecondary: '#302B3A',
    textPrimary: '#F8F6FA',
    textSecondary: '#B9B3C1',
    textDisabled: '#77717F',
    border: '#3D3748',
    action: '#A995DC',
    actionPressed: '#C4B5EF',
    today: '#55C7BA',
    event: '#1F4946',
    eventText: '#8DE0D5',
    holiday: '#512C2B',
    holidayText: '#F3A18D',
  },
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const

export const radii = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  pill: 999,
} as const
```

Ces valeurs sont proposées pour cadrer la direction, pas pour empêcher les ajustements liés aux plateformes. Les tailles des cibles tactiles, le safe area et les comportements natifs restent prioritaires.

---

## 12. Priorité de livraison

### V1 — calendrier et fêtes

1. Canvas + zone atmosphérique.
2. App bar et action « Aujourd'hui ».
3. Navigation mensuelle.
4. Grille avec les états normal / aujourd'hui / événement / sélectionné.
5. Panneau de détail d'une date.
6. Bottom sheet « À propos du mois ».
7. Mode sombre, contraste, lecteurs d'écran et états pressés.

### V1.1 — confiance et exploration

1. Filtre ou légende des types de fêtes.
2. Fiche d'une fête avec source.
3. Préférence de méthode de calcul.
4. Liste des fêtes et recherche.

### Plus tard — histoire de l'islam

1. Timeline ou vue « événements historiques ».
2. Contenus éditoriaux par mois et par fête.
3. Favoris et rappels.
4. Support arabe RTL complet.

---

## 13. Questions restantes avant enrichissement

Ces points n'empêchent pas l'application de la direction UI actuelle, mais influencent les prochaines fonctionnalités :

1. **Méthode de calendrier :** quelle méthode de calcul doit être affichée, et faut-il laisser l'utilisateur choisir entre plusieurs méthodes ou un décalage de ±1 jour ?
2. **Contenu :** dispose-t-on déjà de textes fiables pour `About the month` et les fêtes, avec leurs sources ?
3. **Thème :** le mode sombre doit-il suivre le système, être choisi manuellement, ou être repoussé après la V1 ?
4. **Marque visuelle :** faut-il concevoir un logo ou seulement conserver une identité typographique autour de Hijra ?

---

## Prochaine étape recommandée

Appliquer directement la direction « **ivoire + indigo profond + bleu minéral** » avec des classes Tailwind, sans toucher à la logique de navigation, de calcul des dates ou de récupération des événements. Le lilas reste éventuellement un accent secondaire. L'absence de bottom bar est conservée dans le MVP. Valider l'UI dans trois états :

1. mois courant avec aujourd'hui ;
2. mois contenant plusieurs fêtes ;
3. bottom sheet d'information sur le mois.

Ces trois états suffisent à valider la hiérarchie, les couleurs et la combinaison des états de cellule avant de construire tous les composants.
