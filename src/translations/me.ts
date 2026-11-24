import type { Dict } from './en'

const me: Dict = {
  meta: {
    home: {
      title: 'Red Taxi Kotor i Tivat | Taxi i aerodromski transferi, Crna Gora',
      description:
        'Red Taxi – taxi služba u Kotoru (19719) i Tivtu (19729). Transferi sa aerodroma Tivat od 30 €, privatni transferi i izleti širom Crne Gore. Poziv, Viber ili WhatsApp.',
    },
    taxi: {
      title: 'Taxi Kotor i Taxi Tivat – lokalni taxi prevoz | Red Taxi',
      description:
        'Lokalni taxi u opštinama Kotor i Tivat. Gradske vožnje, hoteli, poslovni i grupni prevoz uz profesionalne vozače. U Kotoru 19719, u Tivtu 19729.',
    },
    airport: {
      title: 'Transfer aerodrom Tivat i aerodrom Podgorica | Red Taxi',
      description:
        'Privatni transferi sa aerodroma Tivat i Podgorica do Kotora, Budve, Perasta, Herceg Novog i drugih mjesta. Objavljene cijene po relaciji. Rezervacija putem WhatsApp-a.',
    },
    excursions: {
      title: 'Privatni izleti iz Kotora – Lovćen, Perast, Cetinje | Red Taxi',
      description:
        'Privatni taxi izleti iz Kotora: Perast i panorama, Lovćen, Sveti Stefan, Skadarsko jezero, Njeguši i Cetinje. Izleti od 80 € po vožnji.',
    },
    prices: {
      title: 'Cjenovnik taxi usluga Kotor i Tivat – cijene transfera | Red Taxi',
      description:
        'Cjenovnik Red Taxi: transferi sa aerodroma Tivat, međugradski transferi do Podgorice i Dubrovnika i privatni izleti iz Kotora. Sve cijene u eurima.',
    },
    about: {
      title: 'O nama – Red Taxi, taxi kompanija iz Kotora i Tivta',
      description:
        'Red Taxi je taxi i transfer kompanija koja pokriva opštine Kotor i Tivat – siguran, tačan i udoban prevoz, 24/7.',
    },
    contact: {
      title: 'Kontakt Red Taxi – Kotor 19719 · Tivat 19729 | Viber i WhatsApp',
      description:
        'Kontakt Red Taxi: Kotor 19719 / +382 67 019 719, Tivat 19729 / +382 67 019 729. Poziv, Viber ili WhatsApp – izaberite opštinu u kojoj se nalazite.',
    },
    excursionDetail: {
      title: '{name} – privatni izlet iz Kotora | Red Taxi',
      description: '{name}: privatni taxi izlet sa Red Taxi za {price} € po vožnji. {short}',
    },
    notFound: { title: 'Stranica nije pronađena | Red Taxi', description: 'Ova stranica ne postoji.' },
  },

  nav: {
    home: 'Početna',
    taxi: 'Taxi usluge',
    airport: 'Aerodromski transferi',
    excursions: 'Izleti',
    prices: 'Cjenovnik',
    about: 'O nama',
    contact: 'Kontakt',
  },

  common: {
    callTaxi: 'Pozovite taxi',
    bookTransfer: 'Rezervišite transfer',
    call: 'Pozovi',
    viber: 'Viber',
    whatsapp: 'WhatsApp',
    kotor: 'Kotor',
    tivat: 'Tivat',
    kotorMunicipality: 'Opština Kotor',
    tivatMunicipality: 'Opština Tivat',
    hotline: 'Taxi centrala',
    mobile: 'Mobilni · Viber · WhatsApp',
    priceOnRequest: 'Na upit',
    durationOnRequest: 'Trajanje na upit',
    perTrip: 'po vožnji',
    from: 'od',
    viewFullPriceList: 'Pogledajte cijeli cjenovnik',
    viewAllExcursions: 'Pogledajte sve izlete',
    discoverMore: 'Saznajte više',
    learnMore: 'Saznajte više',
    menu: 'Meni',
    close: 'Zatvori',
    language: 'Jezik',
    skipToContent: 'Preskoči na sadržaj',
    optional: 'neobavezno',
    available247: 'Dostupni 24/7',
    openInMaps: 'Otvori u Google mapama',
    allPricesEur: 'Sve cijene su izražene u eurima (EUR).',
    callUsAt: 'Pozovite',
  },

  location: {
    question: 'U kojoj opštini se nalazite?',
    rule: 'Izaberite opštinu u kojoj se trenutno fizički nalazite — ne onu u koju želite da idete.',
    ruleShort: 'Pozovite broj opštine u kojoj se sada nalazite.',
    kotorDesc: 'Taxi služba za opštinu Kotor — Stari grad, Dobrota, Muo, Prčanj, Risan, Perast i ostatak opštine.',
    tivatDesc: 'Taxi služba za opštinu Tivat — grad Tivat, aerodrom Tivat, Porto Montenegro, Luštica i ostatak opštine.',
    callHotline: 'Pozovi {n}',
    fromForeignSim: 'Zovete sa strane SIM kartice? Pozovite {m}',
    youAreIn: 'Nalazite se u',
    change: 'Promijeni',
    pick: 'Gdje se sada nalazite?',
  },

  header: {
    dropdownTitle: 'U kojoj opštini se nalazite?',
    dropdownHint: 'Broj zavisi od mjesta gdje se sada nalazite, a ne od odredišta.',
  },

  footer: {
    tagline: 'Taxi, aerodromski transferi i privatni izleti u Kotoru, Tivtu i širom Crne Gore.',
    quickLinks: 'Brzi linkovi',
    contact: 'Kontakt',
    email: 'Email',
    rights: 'Sva prava zadržana.',
    credits: 'Autori fotografija',
  },

  home: {
    hero: {
      eyebrow: 'Kotor · Tivat · Crna Gora',
      title1: 'Vaša vožnja.',
      title2: 'Po vašoj mjeri.',
      subtitle:
        'Pouzdana taxi služba, aerodromski transferi i privatni prevoz u Kotoru, Tivtu i širom Crne Gore.',
      badge: 'Aerodrom Tivat → Kotor, Stari grad',
    },
    services: {
      eyebrow: 'Naše usluge',
      title: 'Prevoz za svako putovanje',
      items: [
        { title: 'Lokalni taxi', text: 'Brze vožnje u opštinama Kotor i Tivat, danju i noću.' },
        { title: 'Aerodromski transferi', text: 'Aerodromi Tivat i Podgorica — unaprijed objavljene cijene po relaciji.' },
        { title: 'Privatni izleti', text: 'Lovćen, Perast, Cetinje, Sveti Stefan i Skadarsko jezero.' },
        { title: 'Poslovni prevoz i događaji', text: 'Tačan prevoz za sastanke, hotele i posebne prilike.' },
      ],
    },
    airport: {
      eyebrow: 'Aerodromski transferi',
      title: 'Popularne relacije sa aerodroma Tivat',
      subtitle: 'Jasne cijene, objavljene unaprijed. Bez iznenađenja kada sletite.',
    },
    destinations: {
      eyebrow: 'Popularne destinacije',
      title: 'Kuda vas Crna Gora vodi',
      subtitle: 'Transferi sa aerodroma Tivat do najposjećenijih mjesta na primorju.',
    },
    excursions: {
      eyebrow: 'Privatni izleti',
      title: 'Upoznajte Crnu Goru uz lokalnog vozača',
      subtitle: 'Planine, stara prijestonica i Bokokotorski zaliv — vašim tempom, u privatnom vozilu.',
    },
    why: {
      eyebrow: 'Zašto Red Taxi',
      title: 'Zašto izabrati nas?',
      items: [
        { title: 'Usluga 24/7', text: 'Danju i noću, naša centrala je dostupna u obje opštine.' },
        { title: 'Sigurno i pouzdano', text: 'Profesionalni vozači, pažljiva vožnja i tačan dolazak.' },
        { title: 'Lokalni stručnjaci', text: 'Vozači koji poznaju svaku ulicu Kotora i Tivta.' },
        { title: 'Udobne vožnje', text: 'Moderna bijela vozila Toyota Corolla za grad i duže relacije.' },
      ],
    },
    reviews: {
      eyebrow: 'Utisci',
      title: 'Vozili ste se sa Red Taxi?',
      text: 'Vaše mišljenje pomaže drugim putnicima da izaberu s povjerenjem. Napišite nam kakva je bila vožnja — čitamo svaku poruku.',
      cta: 'Pošaljite nam utisak',
    },
    contact: {
      title: 'Spremni smo kad ste vi spremni',
      text: 'Pozovite, pošaljite poruku na Viber ili pišite na WhatsApp — izaberite opštinu u kojoj se nalazite.',
    },
  },

  taxi: {
    hero: {
      eyebrow: 'Taxi usluge',
      title: 'Lokalni taxi u Kotoru i Tivtu',
      subtitle: 'Brze i udobne vožnje oko Bokokotorskog zaliva — od Starog grada do Tivta, hotela, plaža i marina.',
    },
    intro: {
      title: 'Dvije opštine, dvije direktne linije',
      text: 'Red Taxi ima odvojene centrale za Kotor i Tivat. Da bi vam najbliže vozilo stiglo što prije, uvijek kontaktirajte centralu opštine u kojoj se trenutno nalazite.',
    },
    kotor: {
      title: 'Taxi Kotor — 19719',
      text: 'Pokriva opštinu Kotor: Stari grad, zonu kruzerskog pristaništa, Dobrotu, Muo, Prčanj, Risan, Perast i okolna mjesta.',
    },
    tivat: {
      title: 'Taxi Tivat — 19729',
      text: 'Pokriva opštinu Tivat: centar Tivta, aerodrom Tivat, Porto Montenegro, Kalimanj, Donju Lastvu i stranu prema Luštici.',
    },
    types: {
      eyebrow: 'Usluge',
      title: 'Svaka vrsta vožnje',
      items: [
        { title: 'Gradski prevoz', text: 'Kratke vožnje po gradu, do plaže, restorana ili marine.' },
        { title: 'Prevoz do hotela', text: 'Dolazak i odvoz iz hotela, vila i apartmana.' },
        { title: 'Poslovni prevoz', text: 'Pouzdane i diskretne vožnje za sastanke, konferencije i poslovne goste.' },
        { title: 'Grupni prevoz', text: 'Putujete zajedno? Javite nam broj putnika i organizovaćemo vozila.' },
        { title: 'Profesionalni vozači', text: 'Ljubazni vozači koji odlično poznaju lokalne puteve.' },
        { title: 'Udobna vozila', text: 'Čista i moderna bijela vozila Toyota Corolla sa mjestom za vaš prtljag.' },
      ],
    },
    how: {
      eyebrow: 'Kako funkcioniše',
      title: 'Vaš taxi u tri koraka',
      steps: [
        { title: 'Provjerite gdje ste', text: 'U opštini Kotor? Pozovite 19719. U opštini Tivat? Pozovite 19729.' },
        { title: 'Pozovite ili pišite', text: 'Pozovite centralu ili pošaljite poruku na mobilni broj putem Vibera ili WhatsApp-a.' },
        { title: 'Uživajte u vožnji', text: 'Recite nam gdje vas čekamo i vozač kreće po vas.' },
      ],
    },
  },

  airport: {
    hero: {
      eyebrow: 'Aerodromski transferi',
      title: 'Transferi sa aerodroma Tivat i Podgorica',
      subtitle: 'Privatni transferi od dolaznog terminala direktno do vašeg smještaja u Kotoru, Budvi, Perastu, Herceg Novom i dalje.',
    },
    services: {
      eyebrow: 'Transfer usluge',
      title: 'Od slijetanja do vaših vrata',
      items: [
        { title: 'Doček na aerodromu', text: 'Preuzimanje na dolascima aerodroma Tivat i aerodroma Podgorica.' },
        { title: 'Privatni transferi', text: 'Vaše vozilo — bez zajedničkih šatlova i čekanja drugih putnika.' },
        { title: 'Transferi do hotela', text: 'Od vrata do vrata, između aerodroma i vašeg hotela, vile ili apartmana.' },
        { title: 'Transferi iz kruzerske luke', text: 'Transferi iz kruzerskog pristaništa u Kotoru do aerodroma ili duž primorja.' },
        { title: 'Informacije o letu', text: 'Unesite broj leta u rezervaciju kako bi vozač znao koji dolazak da sačeka.' },
        { title: 'Udobna Toyota Corolla', text: 'Moderna i čista vozila i profesionalni vozači za opušten početak odmora.' },
      ],
    },
    routes: {
      eyebrow: 'Cijene',
      title: 'Destinacije transfera',
      subtitle: 'Cijene koje je objavio Red Taxi. Destinacije koje nisu navedene dostupne su na upit.',
      tivat: 'Sa aerodroma Tivat',
      other: 'Podgorica, Dubrovnik i međugradski',
    },
    book: {
      eyebrow: 'Rezervacija',
      title: 'Rezervišite transfer',
      subtitle: 'Popunite podatke i pošaljite zahtjev direktno našoj centrali putem WhatsApp-a. Rezervaciju ćemo potvrditi u poruci.',
    },
  },

  form: {
    municipalityLabel: 'Gdje se sada nalazite?',
    municipalityHint: 'Zahtjev se šalje centrali opštine u kojoj se sada nalazite.',
    pickup: 'Mjesto polaska',
    pickupPh: 'npr. Aerodrom Tivat',
    destination: 'Odredište',
    destinationPh: 'npr. Kotor, Stari grad',
    date: 'Datum',
    time: 'Vrijeme',
    passengers: 'Broj putnika',
    flight: 'Broj leta',
    flightPh: 'npr. JU 170',
    name: 'Ime i prezime',
    namePh: 'Vaše ime',
    phone: 'Broj telefona',
    phonePh: '+382 …',
    email: 'Email',
    emailPh: 'vi@primjer.com',
    notes: 'Dodatne informacije',
    notesPh: 'Prtljag, dječje sjedište, posebni zahtjevi…',
    message: 'Poruka',
    messagePh: 'Kako vam možemo pomoći?',
    submitWhatsApp: 'Pošaljite zahtjev na WhatsApp',
    submitEmail: 'Pošaljite email',
    sendTo: 'Šalje se na Red Taxi {m} · {n}',
    errors: {
      municipality: 'Izaberite opštinu u kojoj se nalazite.',
      required: 'Ovo polje je obavezno.',
      phone: 'Unesite ispravan broj telefona.',
      email: 'Unesite ispravnu email adresu.',
      datePast: 'Izaberite datum u budućnosti.',
    },
    success: 'WhatsApp se otvara sa vašim zahtjevom. Pritisnite „pošalji” u WhatsApp-u da ga dostavite.',
    successEmail: 'Vaša email aplikacija se otvara sa porukom. Pritisnite „pošalji” da je dostavite.',
    privacy: 'Ovaj sajt ne čuva vaše podatke — poruka se šalje direktno putem WhatsApp-a ili vaše email aplikacije.',
    msg: {
      bookingTitle: 'Zahtjev za transfer – Red Taxi',
      contactTitle: 'Poruka – Red Taxi sajt',
      location: 'Lokacija klijenta',
      pickup: 'Polazak',
      destination: 'Odredište',
      date: 'Datum',
      time: 'Vrijeme',
      passengers: 'Putnika',
      flight: 'Let',
      name: 'Ime',
      phone: 'Telefon',
      email: 'Email',
      notes: 'Napomena',
      message: 'Poruka',
      excursion: 'Izlet',
    },
  },

  excursions: {
    hero: {
      eyebrow: 'Privatni izleti',
      title: 'Otkrijte Crnu Goru',
      subtitle: 'Privatni taxi izleti iz Kotora do najljepših mjesta u zemlji. Jedna cijena po vožnji, vaš vozač, vaš tempo.',
    },
    listTitle: 'Naši izleti',
    listSubtitle: 'Polasci iz Kotora. Preuzimanje na drugim lokacijama u Kotoru ili Tivtu na upit.',
    items: {
      'kotor-perast-panorama': {
        name: 'Kotor – Panorama – Perast',
        short: 'Bokokotorski zaliv iz visine, a zatim barokni Perast na samoj obali.',
        long: 'Opuštena ruta duž najfotografisanijeg zaliva na Jadranu. Zastanite na panoramskom vidikovcu iznad zaliva, a zatim nastavite do Perasta — malog baroknog grada kamenih palata naspram ostrva Gospa od Škrpjela i Sveti Đorđe.',
        highlights: ['Panoramski pogled na Bokokotorski zaliv', 'Barokna obala Perasta', 'Pogled na ostrvo Gospa od Škrpjela'],
      },
      'kotor-lovcen': {
        name: 'Kotor – Lovćen',
        short: 'Planinskim putem iznad Kotora do Nacionalnog parka Lovćen.',
        long: 'Popnite se čuvenim serpentinama iznad Kotora uz veličanstven pogled na zaliv i nastavite u Nacionalni park Lovćen — planinu po kojoj je Crna Gora dobila ime, sa Njegoševim mauzolejom na vrhu.',
        highlights: ['Serpentine iznad Bokokotorskog zaliva', 'Nacionalni park Lovćen', 'Njegošev mauzolej na Jezerskom vrhu'],
      },
      'kotor-sveti-stefan': {
        name: 'Kotor – Sveti Stefan',
        short: 'Čuveni grad-ostrvo na Budvanskoj rivijeri.',
        long: 'Vožnja duž obale do Svetog Stefana, utvrđenog naselja na ostrvu povezanog sa kopnom uskim prevlakom — jednog od najprepoznatljivijih prizora Crne Gore.',
        highlights: ['Primorski put Budvanske rivijere', 'Vidikovci iznad Svetog Stefana', 'Plaže rivijere'],
      },
      'kotor-skadar-lake': {
        name: 'Kotor – Skadarsko jezero',
        short: 'Najveće jezero na Balkanu, nacionalni park vode i planina.',
        long: 'Putujte u unutrašnjost do Nacionalnog parka Skadarsko jezero — prostranog jezera okruženog planinama, ribarskim selima i močvarama bogatim pticama.',
        highlights: ['Nacionalni park Skadarsko jezero', 'Sela na obali jezera', 'Pejzaž planina i jezera'],
      },
      'kotor-njegusi-cetinje': {
        name: 'Kotor – Njeguši – Cetinje',
        short: 'Planinsko selo Njeguši i Cetinje, stara prijestonica Crne Gore.',
        long: 'Krenite u planine do Njeguša, sela poznatog po pršuti i siru, i nastavite do Cetinja — istorijske prijestonice sa manastirom, muzejima i zgradama nekadašnjih ambasada.',
        highlights: ['Planinsko selo Njeguši', 'Cetinje, stara prijestonica', 'Pogledi sa lovćenskog puta'],
      },
      'kotor-sveti-stefan-budva-perast': {
        name: 'Kotor – Sveti Stefan – Budva – Perast',
        short: 'Kompletna primorska tura: Sveti Stefan, Stari grad Budva i Perast u jednom danu.',
        long: 'Naša najpotpunija primorska ruta. Vidite Sveti Stefan, prošetajte Starim gradom u Budvi i završite u Perastu u Bokokotorskom zalivu prije povratka u Kotor.',
        highlights: ['Sveti Stefan', 'Stari grad Budva', 'Perast u Bokokotorskom zalivu'],
      },
    },
    detail: {
      about: 'O izletu',
      route: 'Ruta',
      price: 'Cijena',
      duration: 'Trajanje',
      highlights: 'Izdvajamo',
      book: 'Rezervišite izlet',
      bookText: 'Pošaljite nam željeni datum, vrijeme i broj putnika. Detalje ćemo potvrditi putem WhatsApp-a.',
      other: 'Ostali izleti',
      back: 'Svi izleti',
      note: 'Cijena po vožnji, sa privatnim Red Taxi vozilom i vozačem.',
    },
  },

  prices: {
    hero: {
      eyebrow: 'Cjenovnik',
      title: 'Jasne cijene, bez iznenađenja',
      subtitle: 'Objavljene cijene aerodromskih transfera, međugradskih transfera i privatnih izleta.',
    },
    route: 'Relacija',
    price: 'Cijena',
    julyAugust: 'Jul–avgust',
    local: {
      title: 'Lokalni taxi',
      text: 'Vožnje unutar opština Kotor i Tivat.',
      rows: { start: 'Start', perKm: 'Cijena po km', waiting: 'Čekanje (po satu)', night: 'Noćna tarifa' },
      note: 'Lokalne tarife dostupne su na upit — pozovite centralu opštine u kojoj se nalazite.',
    },
    airport: { title: 'Aerodromski transferi', text: 'Transferi sa aerodroma Tivat.' },
    intercity: { title: 'Međugradski transferi', text: 'Podgorica, Dubrovnik i drugi duži transferi.' },
    excursions: { title: 'Privatni izleti', text: 'Polasci iz Kotora.' },
    ctaTitle: 'Imate pitanje o cijeni?',
    ctaText: 'Kontaktirajte centralu opštine u kojoj se nalazite.',
  },

  about: {
    hero: {
      eyebrow: 'O nama',
      title: 'Vaša lokalna taxi kompanija u Kotoru i Tivtu',
      subtitle: 'Siguran, tačan i udoban prevoz oko Bokokotorskog zaliva i širom Crne Gore.',
    },
    intro: {
      title: 'Red Taxi',
      paragraphs: [
        'Red Taxi je taxi i transfer kompanija iz Kotora koja pokriva cijelu opštinu Kotor i opštinu Tivat. Svakodnevno vozimo mještane, turiste i poslovne goste — od kratkih gradskih vožnji do aerodromskih transfera i cjelodnevnih izleta.',
        'Naš cilj je jednostavan: sigurna, kvalitetna i tačna usluga — vozilo koje stiže kada vam treba i vozač koji zna put.',
      ],
    },
    areas: {
      eyebrow: 'Gdje radimo',
      title: 'Kotor i Tivat',
      text: 'Imamo dvije centrale — 19719 za opštinu Kotor i 19729 za opštinu Tivat — kako bi vam najbliže vozilo stiglo brzo. Transferima i izletima vozimo vas bilo gdje u Crnoj Gori i do Dubrovnika u Hrvatskoj.',
    },
    values: {
      eyebrow: 'Naše vrijednosti',
      title: 'Kako radimo',
      items: [
        { title: 'Profesionalan prevoz', text: 'Ljubazni vozači, čista vozila i vožnja na koju se možete osloniti.' },
        { title: 'Poznavanje terena', text: 'Ovdje živimo i radimo — znamo puteve, prečice i najljepše vidikovce.' },
        { title: 'Briga o klijentima', text: 'Poziv, Viber ili WhatsApp — laka komunikacija na crnogorskom i engleskom.' },
        { title: 'Sigurnost i pouzdanost', text: 'Pažljiva vožnja i tačan dolazak, svaki put.' },
        { title: 'Udobnost vozila', text: 'Moderna bijela vozila Toyota Corolla, udobna za grad i duže relacije.' },
        { title: 'Uvijek dostupni', text: 'Naša centrala je dostupna 24/7, tokom cijele godine.' },
      ],
    },
  },

  contact: {
    hero: {
      eyebrow: 'Kontakt',
      title: 'Kontaktirajte nas',
      subtitle: 'Dvije opštine, dvije direktne linije. Izaberite onu u kojoj se trenutno nalazite.',
    },
    location: 'Lokacija',
    kotorArea: 'Opština Kotor, Crna Gora',
    tivatArea: 'Opština Tivat, Crna Gora',
    form: {
      title: 'Pošaljite nam poruku',
      subtitle: 'Za pitanja, grupne rezervacije ili utiske. Pošaljite putem WhatsApp-a odgovarajućoj centrali ili emailom.',
    },
    faq: {
      title: 'Najčešća pitanja',
      items: [
        {
          q: 'Koji broj da pozovem — 19719 ili 19729?',
          a: 'Zavisi od toga gdje se sada nalazite, a ne kuda idete. Ako ste u opštini Kotor, pozovite 19719. Ako ste u opštini Tivat (uključujući aerodrom Tivat), pozovite 19729.',
        },
        {
          q: 'Kratki broj ne radi sa mog telefona. Šta da radim?',
          a: 'Kratki brojevi možda neće raditi sa nekih stranih SIM kartica. Pozovite puni mobilni broj: Kotor +382 67 019 719, Tivat +382 67 019 729.',
        },
        {
          q: 'Mogu li vas kontaktirati putem Vibera ili WhatsApp-a?',
          a: 'Da. Oba mobilna broja dostupna su na Viberu i WhatsApp-u. Koristite dugmad na ovoj stranici da direktno otvorite razgovor.',
        },
        {
          q: 'Kako da rezervišem aerodromski transfer?',
          a: 'Koristite formular na stranici Aerodromski transferi. On priprema WhatsApp poruku sa svim podacima; pritisnite „pošalji” i naša centrala će potvrditi rezervaciju.',
        },
        {
          q: 'Da li da navedem broj leta?',
          a: 'Da, ako ga imate. Tako vozač zna koji dolazak da sačeka.',
        },
        {
          q: 'Da li vozite do Dubrovnika?',
          a: 'Da. Transferi do Dubrovnika i aerodroma Dubrovnik (Čilipi) nalaze se u našem cjenovniku.',
        },
      ],
    },
  },

  notFound: {
    title: 'Stranica nije pronađena',
    text: 'Stranica koju tražite ne postoji ili je premještena.',
    back: 'Nazad na početnu',
  },
}

export default me
