// ---------------------------------------------------------------------------
// EDIT ME. Everything Ella will actually read lives in this one file.
// Nothing here is load-bearing for the animations -- change any of it freely.
// ---------------------------------------------------------------------------

export const hero = {
  greeting: 'Happy Birthday,',
  name: 'Ella',
  age: 20,
  ageLabel: 'years of being the best',
  tagline: 'Twenty years old and somehow still the funniest person in every room.',
  scrollCue: 'scroll, there is more',
}

export const wish = {
  heading: 'Blow out the candles',
  body: 'Go on. Press it. It works every time.',
  button: 'Make a wish',
  granted: 'Wish granted',
  again: 'okay, one more',
  counter: (n) => (n === 1 ? '1 wish made' : `${n} wishes made`),
}

// Five moments on the scroll-driven timeline. `photo` is an id from photos.js.
export const timeline = [
  {
    photo: 'p01',
    date: 'The late nights',
    title: 'Studying, allegedly',
    body: 'Four hours at that table and I think we finished one problem set between us. Worth it.',
  },
  {
    photo: 'p04',
    date: 'Game days',
    title: 'Pom-poms and pure noise',
    body: 'You out there in blue and white, somehow louder than the entire student section.',
  },
  {
    photo: 'p08',
    date: 'The trip',
    title: 'Window seat, obviously',
    body: 'Three of us crammed into one row and you still made it feel like the best flight ever.',
  },
  {
    photo: 'p12',
    date: 'Peace signs forever',
    title: 'Your signature move',
    body: 'I do not think there is a single photo of you without one. Never change it.',
  },
  {
    photo: 'p14',
    date: 'Doing nothing',
    title: "The floor of somebody's dorm room",
    body: 'No plan, no reason, everybody just there. Still some of my favorite nights.',
  },
]

// Everything else goes in the gallery grid.
export const galleryPhotos = ['p02', 'p05', 'p06', 'p07', 'p09', 'p10', 'p11', 'p13', 'p15']

export const gallery = {
  heading: 'The receipts',
  body: 'A completely unscientific sample of the last couple of years. Tap any of them.',
}

export const closing = {
  heading: 'Okay, actually sappy part',
  lines: [
    'Twenty is a weird one. It is the first birthday where people start asking what you are going to do with your life, as if you have not already been doing it.',
    'For what it is worth, you are one of the easiest people I know to be around. You make the boring parts of a week funny, and you show up for people without making it a whole thing.',
    'Whatever this year throws at you, you have got it. And if you do not, you have got people. Me included.',
  ],
  signoff: 'Happy 20th, Ella.',
  signature: '— Zachary',
  footerNote: 'made with an unreasonable number of animations',
}
