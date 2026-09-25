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
    buttonText: "Start the Journey",
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
        objectPosition: "center 15%",
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
        objectPosition: "center 15%",
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
      buttonText: "Walk Down Memory Lane 📸 →",
    },
  },

  // STEP 5 — CHERISHED MEMORIES (ONE BY ONE AUTO SLIDESHOW)
  memoriesSection: {
    heading: "Down Memory Lane 📸",
    badge: "Memories 🎞️",
    memories: [
      {
        id: "mem-1",
        title: "The Royal Thrones 👑",
        image: "/images/memories/memory-1-chairs.jpg",
        objectPosition: "center 22%",
        message: "Look at us sitting on our royal red chairs! Innocent eyes, traditional fits, and already plotting how to raid the snack counter together.",
        reactionEmoji: "👑",
        accentColor: "#FF6B6B",
        glowColor: "rgba(255, 107, 107, 0.35)",
      },
      {
        id: "mem-2",
        title: "Double Braids & Big Smiles ☀️",
        image: "/images/memories/memory-2-smiles.png",
        objectPosition: "center 25%",
        message: "That iconic, bright smile hasn't changed a single bit! Having you by my side always meant endless giggles, comfort, and zero worries.",
        reactionEmoji: "🥰",
        accentColor: "#4ECDC4",
        glowColor: "rgba(78, 205, 196, 0.35)",
      },
      {
        id: "mem-3",
        title: "The Zoo Safari 🦌🌿",
        image: "/images/memories/memory-3-deerpark.jpg",
        objectPosition: "center 42%",
        message: "Peeking at the deer through the fence! Who knew back then that this little boy would grow up to have a heart even gentler and warmer than those graceful deer?",
        reactionEmoji: "🦌",
        accentColor: "#845EC2",
        glowColor: "rgba(132, 94, 194, 0.35)",
      },
      {
        id: "mem-4",
        title: "Effortless Swag & Warm Heart 😎",
        image: "/images/memories/memory-4-grownup-chill.jpg",
        objectPosition: "center 18%",
        message: "From sitting on plastic chairs to rocking the casual king look! You've grown into the most chill, dependable, and genuinely golden-hearted person ever.",
        reactionEmoji: "🔥",
        accentColor: "#FF9671",
        glowColor: "rgba(255, 150, 113, 0.35)",
      },
      {
        id: "mem-5",
        title: "Hero Entry 🌟",
        image: "/images/memories/memory-5-grownup-dapper.jpg",
        objectPosition: "center 15%",
        message: "Director Rajamouli was totally right — pure hero material right here! Wishing you a future as bright, sharp, and spectacular as you look today. Keep shining, Bava!",
        reactionEmoji: "💖",
        accentColor: "#2C73D2",
        glowColor: "rgba(44, 115, 210, 0.35)",
      },
      {
        id: "mem-6",
        title: "Denim & Shades 😎🌿",
        image: "/images/memories/memory-6-denim-sunglasses.jpg",
        objectPosition: "center 22%",
        reactionEmoji: "🕶️",
        accentColor: "#2A9D8F",
        glowColor: "rgba(42, 157, 143, 0.35)",
      },
      {
        id: "mem-7",
        title: "Squad Forever 🤝",
        image: "/images/memories/memory-7-squad.jpg",
        objectPosition: "center 25%",
        message: "Some bonds are just built different. With this amazing squad by your side, every moment becomes a memory worth keeping. Here's to many more like this! 🥰",
        reactionEmoji: "🤝",
        accentColor: "#E040FB",
        glowColor: "rgba(224, 64, 251, 0.35)",
      },
    ],
    proceedButton: "Proceed to Make a Wish 🎂 →",
  },

  // STEP 5 — MAKE A WISH
  wishSection: {
    heading: "Make a Wish…",
    subheading: "Take a quiet moment. Think of your biggest, wildest dream for this upcoming year.",
    candleInstruction: "Tap the candle flame when you are ready to blow it out 🕯️",
    birthdayHeadline: "HAPPY BIRTHDAY,",
    birthdayMessage: [
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
    signature: "Made with lots of love ❤️",
    replayButtonText: "Replay the Birthday Story ↻",
  },
};
