/**
 * pirate {
 *   name: string,
 *   age: number,
 *   description: string,
 *   game: string,
 *   image: string,
 *   ship: {
 *     name: string,
 *     type: string,
 *     cannons: number
 *   }
 * }
 */


export const pirates = [
  {
    name: 'Guybrush Threepwood',
    age: Math.floor(Math.random() * 20) + 20,
    image: 'placeholder_guybrush.png',
    description:
      'The mighty pirate protagonist, known for his wit, clumsiness, and ability to hold his breath for ten minutes.',
    game: 'The Secret of Monkey Island',
    ship: {
      name: 'Sea Monkey',
      type: 'Sloop',
      cannons: Math.floor(Math.random() * 6) + 2
    }
  },
  {
    name: 'Elaine Marley',
    age: Math.floor(Math.random() * 20) + 25,
    image: 'placeholder_elaine.png',
    description:
      "The capable and often-exasperated governor of the Tri-Island Area, and Guybrush's love interest.",
    game: 'The Secret of Monkey Island',
    ship: {
      name: 'Governor’s Yacht',
      type: 'Brigantine',
      cannons: Math.floor(Math.random() * 6) + 2
    }
  },
  {
    name: 'LeChuck',
    age: Math.floor(Math.random() * 50) + 40,
    image: 'placeholder_lechuck.png',
    description:
      'The fearsome ghost/zombie/demon pirate antagonist, relentlessly pursuing Elaine and seeking to eliminate Guybrush.',
    game: 'The Secret of Monkey Island',
    ship: {
      name: 'The Ghost Ship',
      type: 'Galleon',
      cannons: Math.floor(Math.random() * 10) + 10
    }
  },
  {
    name: 'Murray',
    age: Math.floor(Math.random() * 10) + 5,
    image: 'placeholder_murray.png',
    description:
      'A demonic talking skull with delusions of grandeur and a desire for world domination, despite his lack of a body.',
    game: 'The Curse of Monkey Island',
    ship: {
      name: 'Skull Barge',
      type: 'Raft',
      cannons: Math.floor(Math.random() * 2) + 1
    }
  }
]

