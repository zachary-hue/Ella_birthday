// ---------------------------------------------------------------------------
// EDIT ME. Everything Ella will actually read lives in this one file.
// `tilt` values are degrees -- nothing is meant to sit perfectly straight.
// ---------------------------------------------------------------------------

export const hero = {
  greeting: 'happy birthday',
  name: 'Ella',
  age: 20,
  tagline: 'two years of college together, and somehow we got all of this done',
  photoCaption: 'the birthday girl',
  scrollCue: 'keep going',
}

export const wish = {
  aside: 'you have to. rules are rules.',
  button: 'blow them out',
  granted: 'wish granted',
  again: 'okay, one more',
  counter: (n) => (n === 1 ? '1 wish so far' : `${n} wishes so far`),
}

// The photos down the middle of the page, in order.
export const moments = [
  {
    photo: 'p14',
    tilt: -2.5,
    when: "most nights",
    title: "somebody's floor, again",
    body: "Anime in a dorm room with just Titus and Adrian, or the whole group piled in at once. No plan, and it never needed one.",
  },
  {
    photo: 'p01',
    tilt: 2,
    when: "every week",
    title: "studying, technically",
    body: "We sat at that table for hours. I don't think either of us actually finished anything.",
  },
  {
    photo: 'p04',
    tilt: -1.8,
    when: "game days",
    title: "blue and white",
    body: "You out there with the squad. I still don't know how you keep track of all of it.",
  },
  {
    photo: 'p11',
    tilt: 2.4,
    when: "california",
    title: "matcha and ice cream",
    body: "You came out with your parents, so I took you for matcha and ice cream and toured you around Stanford, a school neither of us goes to.",
  },
  {
    photo: 'p08',
    tilt: -2.2,
    when: "sacramento",
    title: "the flight home",
    body: "You actually came to Quidditch nationals. I thought you were kidding. Flying back to Cleveland with you ended up being the best part of the trip.",
  },
]

export const notesAside = 'things that are true about you, in no order:'

export const notes = [
  {
    label: "down for anything",
    body: "People call it people pleasing. I think you're just genuinely open, and you actually like doing things with your friends.",
    tilt: -2.5,
  },
  {
    label: "grounded",
    body: "When Adrian and I get out of control, you're the one who keeps us honest.",
    tilt: 1.8,
  },
  {
    label: "relatable",
    body: "It's a big part of why people like being around you. It's part of why I do.",
    tilt: -1.4,
  },
  {
    label: "someone I respect",
    body: "Your extracurriculars, your values, the way you treat people. I admire all of it.",
    tilt: 2.2,
  },
]

export const galleryAside = 'the rest of the evidence'

export const galleryPhotos = [
  { photo: 'p02', caption: "the peach", tilt: -3 },
  { photo: 'p13', caption: "no idea what I'm doing here", tilt: 2.5 },
  { photo: 'p07', caption: "food truck run", tilt: -1.5 },
  { photo: 'p10', caption: "waterpark", tilt: 2 },
  { photo: 'p12', caption: "peace signs, obviously", tilt: -2.5 },
  { photo: 'p09', caption: "wandering around again", tilt: 1.6 },
  { photo: 'p06', caption: "another \"study\" night", tilt: -2 },
  { photo: 'p15', caption: "snack acquired", tilt: 2.8 },
  { photo: 'p05', caption: "no context for this one", tilt: -1.8 },
]

export const letter = {
  greeting: 'hey Ella,',
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
  signoff: 'happy 20th, Ella',
  signature: '— Zachary',
  encore: 'one more for the road',
  footerNote: 'made with an unreasonable number of animations',
}
