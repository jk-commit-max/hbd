/**
 * ====================================================================
 * 🎂 BIRTHDAY WEBSITE CONFIGURATION
 * ====================================================================
 * Customize everything about your cousin's special website right here!
 * - Replace the cousin's name
 * - Change the intro and story copy
 * - Add/edit fictional legends and their funny quotes
 * - Update the list of reasons why they are so sweet
 * - Customize memories, era labels, and photo paths
 * - Modify the funny quiz questions and answers
 * - Customize the heartfelt birthday wishes & surprise envelope letter
 * ====================================================================
 */

export const birthdayConfig = {
  // Cousin's Name (used throughout the website)
  name: "Sai Bharath",

  // Relationship or sender title
  sender: "Your Favorite Cousin",

  // Music & Sound effects enabled by default (uses lightweight Web Audio synth)
  soundEnabled: true,

  // STEP 1 — WELCOME SCREEN
  intro: {
    badge: "Special Delivery 💌",
    greeting: "Hey",
    title: "This little website is 100% about you.",
    subtitle: "And yes… you have absolutely no escape. 😌",
    buttonText: "Enter Your Birthday Story",
    // hint: "Sound on for the best experience 🎧",
  },

  // STEP 2 — EVEN LEGENDS ADMIRE HIM
  legendsSection: {
    heading: "Even Legends Admire Him",
    subheading: "We asked a few legends what they think about you… The reports came back unanimous.",
    cards: [
      {
        id: "modi",
        persona: "PM Narendra Modi",
        emoji: "🇮🇳",
        badge: "Special Address",
        quote: "Mitron! Aaj Sai Barath ka birthday hai. The entire nation is proud of your sweetness. Bhaiyo aur behno, aaj cake par zero percent GST!",
        image: "/images/legend-modi.jpg",
        objectPosition: "center center",
        accent: "linear-gradient(135deg, #FF9933 0%, #138808 100%)",
      },
      {
        id: "mahesh-babu",
        persona: "Mahesh Babu",
        emoji: "😎",
        badge: "Superstar",
        quote: "Eppudu free untavo cheppu, Multistarrer tidham, eesari poolakundi nuvve thannu",
        image: "/images/legend-maheshbabu.jpg",
        objectPosition: "center center",
        accent: "linear-gradient(135deg, #FF512F 0%, #F09819 100%)",
      },
      {
        id: "rajamouli",
        persona: "Director Rajamouli",
        emoji: "🎬",
        badge: "Maverick Director",
        quote: "I decided to cast sai barath as hero in varanasi 2, Hope i will get the dates",
        image: "/images/legend-rajamouli.jpg",
        objectPosition: "center center",
        accent: "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
      },
      {
        id: "sai-barath-legend",
        persona: "Jugan",
        emoji: "👑",
        badge: "",
        quote: "Such a sweet person",
        image: "/images/cousin-sweet.jpg",
        objectPosition: "center center",
        accent: "linear-gradient(135deg, #FF6B6B 0%, #FFA07A 100%)",
      },
    ],
  },

  // STEP 3 — WHY HE'S SO SWEET
  reasonsSection: {
    heading: "Okay, But Why Is He So Sweet?",
    subheading: "We thoroughly investigated. The evidence is simply overwhelming.",
    reasons: [
      {
        id: "reason-1",
        emoji: "❤️",
        tag: "Exhibit A",
        title: "Reliable to the core",
        text: "Always there when someone needs a hand, advice, or just someone to listen.",
      },
      {
        id: "reason-2",
        emoji: "😂",
        tag: "Exhibit B",
        title: "Effortless humor",
        text: "Can turn an ordinary, awkward moment into something genuinely hilarious.",
      },
      {
        id: "reason-3",
        emoji: "🤝",
        tag: "Exhibit C",
        title: "Pure golden kindness",
        text: "Treats people with genuine respect, warmth, and humility everywhere he goes.",
      },
      {
        id: "reason-4",
        emoji: "😊",
        tag: "Exhibit D",
        title: "Instant comfort zone",
        text: "Makes everyone feel comfortable, included, and valued the second he walks in.",
      },
      {
        id: "reason-6",
        emoji: "✨",
        tag: "Verdict",
        title: "The family heartbeat",
        text: "Simply makes family feel more like family. Life is just brighter with you.",
      },
    ],
  },

  // STEP 4 — PHOTO EXHIBITION
  exhibitionSection: {
    heading: "The Photo Exhibition 🖼️",
    subheading: "A world-class curated gallery celebrating the iconic eras, moods, and charm of Sai Barath.",
    badge: "Exclusive Exhibition 🏛️",
    artworks: [
      {
        id: "art-1",
        number: "Exhibition 01",
        title: "The Centerpiece: Pure Sweetness",
        medium: "Digital Masterpiece on Canvas",
        image: "/images/cousin-sweet.jpg",
        objectPosition: "center 15%",
        year: "Current Masterpiece",
        caption: "Notice the warm smile, the iconic purple-tint glasses, and the undeniable aura of pure goodness.",
        critique: "⭐⭐⭐⭐⭐ 'A monumental achievement in sweetness. 10/10.' — Global Art Council",
        likes: 124,
      },
      {
        id: "art-2",
        number: "Exhibition 02",
        title: "The Tiny Troublemaker",
        medium: "Nostalgic Childhood Archives",
        image: "/images/memory-1.svg",
        objectPosition: "center center",
        year: "The Beginning",
        caption: "Back when innocent looks hid master plans for causing harmless family chaos.",
        critique: "⭐⭐⭐⭐⭐ 'Early signs of pure legend status.' — Family Historians",
        likes: 98,
      },
      {
        id: "art-3",
        number: "Exhibition 03",
        title: "The Swagger Era",
        medium: "High-Definition Cinema Still",
        image: "/images/memory-2.svg",
        objectPosition: "center center",
        year: "Prime Time",
        caption: "Effortless confidence and natural charm that makes everyone in the room smile.",
        critique: "⭐⭐⭐⭐⭐ 'Main character energy in every single pixel.' — Vogue Cousin",
        likes: 142,
      },
      {
        id: "art-4",
        number: "Exhibition 04",
        title: "The Golden Heart",
        medium: "Timeless Emotion",
        image: "/images/memory-3.svg",
        objectPosition: "center center",
        year: "Forever & Always",
        caption: "Always looking out for others, always spreading kindness wherever he walks.",
        critique: "⭐⭐⭐⭐⭐ 'Priceless. Belongs in the Louvre.' — The Entire Family",
        likes: 210,
      },
    ],
  },

  // STEP 4 — QUIZ
  quizSection: {
    heading: "The Ultimate Question 🍯",
    subheading: "Only one answer can satisfy universal truth. Choose wisely!",
    questions: [
      {
        id: "q1",
        question: "Most Sweetest? 🍯",
        options: [
          "Gulab Jamun dipped in sugar syrup 🍮",
          "Belgian Triple Chocolate Cake 🍫",
          "Organic Strawberries & Wild Honey 🍓",
          "Sai Bharath (Undisputed sweetest! 👑❤️)",
        ],
        correctIndex: 3,
        explanation: "100% CERTIFIED! Nobody in the entire universe is sweeter than Sai Bharath! 🏆✨",
      },
    ],
    result: {
      badge: "100% Certified Sweetest Person ❤️",
      highScoreCommentary: "Official verdict: Even honey and chocolate bow down to Sai Bharath's sweetness!",
      standardCommentary: "Official verdict: Sai Bharath is certified 100% the sweetest person alive!",
      buttonText: "Proceed to Make a Wish 🎂 →",
    },
  },

  // STEP 5 — MAKE A WISH
  wishSection: {
    heading: "Make a Wish…",
    subheading: "Take a quiet moment. Think of your biggest, wildest dream for this upcoming year.",
    candleInstruction: "Tap the candle flame when you are ready to blow it out 🕯️",
    birthdayHeadline: "HAPPY BIRTHDAY,",
    birthdayMessage: [
      "I hope this year brings you everything you truly deserve — pure happiness, deep peace, exciting milestones, and endless reasons to smile every single morning.",
      "You are genuinely one of the sweetest, kindest people I know.",
      "Keep shining, keep laughing, and never stop being your wonderful self. ❤️",
    ],
    buttonText: "Wait… There's One More Thing →",
  },

  // STEP 7 — ONE LAST SURPRISE
  surpriseSection: {
    heading: "Wait… one more thing.",
    subheading: "Before you leave, you have a private sealed envelope waiting for you.",
    buttonPrompt: "Open Your Surprise 🎁",
    envelopeSeal: "💌",
    letterTitle: "A Note from the Heart",
    photo: "/images/surprise-photo.jpg",
    photoCaption: "Such a sweet person ❤️",
    letterBody: [
      "Happy Birthday, Bava! ✨",
      "May your days be filled with dreams worth chasing, your path with moments worth remembering, and your journey with reasons to keep moving forward.",
      "May every year bring you closer to the life you’ve imagined.",
      "Keep shining, keep growing, and let your story unfold beautifully. ❤️🎂"
    ],
    signature: "",
    replayButtonText: "Replay the Birthday Story ↻",
  },
};
