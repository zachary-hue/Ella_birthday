// ---------------------------------------------------------------------------
// EDIT ME. Everything Ella will actually read lives in this one file.
// Nothing here is load-bearing for the animations -- change any of it freely.
// ---------------------------------------------------------------------------

export const hero = {
  greeting: 'Happy Birthday,',
  name: 'Ella',
  age: 20,
  ageLabel: 'years old today',
  tagline: "Two years of college together, and somehow we got all of this done.",
  scrollCue: 'keep scrolling',
}

export const wish = {
  heading: 'Blow out the candles',
  body: 'You have to. Those are the rules.',
  button: 'Make a wish',
  granted: 'Wish granted',
  again: 'okay, one more',
  counter: (n) => (n === 1 ? '1 wish made' : `${n} wishes made`),
}

// The scroll-driven timeline. `photo` is an id from photos.js.
export const timeline = [
  {
    photo: 'p14',
    date: "Most nights",
    title: "Somebody's floor, again",
    body: "Anime in a dorm room with just Titus and Adrian, or the whole group piled in at once. No plan, and it never needed one.",
  },
  {
    photo: 'p01',
    date: "Every week",
    title: "Studying, technically",
    body: "We sat at that table for hours. I don't think either of us actually finished anything.",
  },
  {
    photo: 'p04',
    date: "Game days",
    title: "Blue and white",
    body: "You out there with the squad. I still don't know how you keep track of all of it.",
  },
  {
    photo: 'p11',
    date: "California",
    title: "Matcha and ice cream",
    body: "You came out with your parents, so I took you for matcha and ice cream and toured you around Stanford, a school neither of us goes to.",
  },
  {
    photo: 'p08',
    date: "Sacramento",
    title: "The flight home",
    body: "You actually came to Quidditch nationals. I thought you were kidding. Flying back to Cleveland with you ended up being the best part of the trip.",
  },
]

export const traitsSection = {
  heading: 'Things that are true about you',
}

export const traits = [
  {
    label: "Down for anything",
    body: "People call it people pleasing. I think you're just genuinely open, and you actually like doing things with your friends.",
  },
  {
    label: "Grounded",
    body: "When Adrian and I get out of control, you're the one who keeps us honest.",
  },
  {
    label: "Relatable",
    body: "It's a big part of why people like being around you. It's part of why I do.",
  },
  {
    label: "Someone I respect",
    body: "Your extracurriculars, your values, the way you treat people. I admire all of it.",
  },
]

// Everything not pinned to the timeline shows up in the gallery grid.
export const galleryPhotos = ['p02', 'p05', 'p06', 'p07', 'p09', 'p10', 'p12', 'p13', 'p15']

export const gallery = {
  heading: 'The receipts',
  body: 'Two years, mostly food and dorm rooms. Tap any of them.',
}

export const letter = {
  heading: 'Okay, the actual letter',
  greeting: 'Hey Ella,',
  paragraphs: [
    "It's really nice to be your friend. Looking back at the two years we've had in college, we've done a lot.",
    "What I keep noticing is how many different versions of hanging out we've gotten to do. An anime session in a dorm room with just Titus and Adrian. You and the girls, Hannah and Valerie and Catherine. The whole group at once. You fit into all of them.",
    "Then there was California. You came out with your parents, and I got to take you for matcha and ice cream, and tour you around Stanford, which neither of us goes to and which I still think is funny. I taught you golf, one of my favorite things in the world, and you were down for it.",
    "That's the thing about you. People call you a people pleaser. I don't see it that way. I think you're genuinely open to things, and you actually enjoy doing them with your friends. It's why I was so surprised when you signed up for Quidditch nationals. At first I thought you were kidding, and then you really came to Sacramento with us.",
    "I don't know how often people tell you this, but it's just nice whenever you're around. Even last night, when Adrian and I were talking trash about half the school, you stayed grounded and kept us in check. You do that more than you probably realize.",
    "Flying back from Sacramento to Cleveland with you was great, and so was having you in the car while we drove around the Bay. We both like Karate Kid. You're one of the most relatable people I know, and I think that's a big part of why people like being around you. It's part of why I do.",
    "Beyond being an excellent friend, you're someone I respect. Your extracurriculars, your values, the way you treat people. I admire all of it.",
    "But honestly, if you asked me, I'd just say that I love being your friend and having you around.",
    "Congratulations on turning 20. These photos are some of the best memories I've had in the last two years.",
  ],
  signoff: 'Happy 20th, Ella.',
  signature: '— Zachary',
  footerNote: 'made with an unreasonable number of animations',
}
