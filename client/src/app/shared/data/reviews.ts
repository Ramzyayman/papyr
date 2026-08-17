import { Review } from '../models/review';


export const REVIEWS_BY_BOOK: Record<number, Review[]> = {


  1: [

    {
      id: 1,
      username: 'Ramzy',
      date: '2 Aug 2023',
      rating: 5,
      text:
        'A gripping and beautifully written story that kept me hooked from the very first page.'
    },

    {
      id: 2,
      username: 'Natalie',
      date: '14 Sep 2023',
      rating: 4,
      text:
        'A timeless story with incredible characters and a fascinating atmosphere.'
    },

    {
      id: 3,
      username: 'Amr',
      date: '21 Oct 2023',
      rating: 4,
      text:
        'Beautifully written and surprisingly engaging. Definitely worth reading.'
    }

  ],



  2: [

    {
      id: 4,
      username: 'Kyrollos',
      date: '5 Jul 2023',
      rating: 5,
      text:
        'One of the most unsettling books I have ever read. Still feels relevant today.'
    },

    {
      id: 5,
      username: 'Maya',
      date: '18 Aug 2023',
      rating: 4,
      text:
        'A fascinating dystopian world with an unforgettable atmosphere.'
    }

  ],



  3: [

    {
      id: 6,
      username: 'James',
      date: '11 Jun 2023',
      rating: 5,
      text:
        'An incredibly fun adventure. Tolkien creates such a memorable world.'
    },

    {
      id: 7,
      username: 'Emma',
      date: '3 Nov 2023',
      rating: 5,
      text:
        'A wonderful fantasy classic that is just as enjoyable as an adult.'
    }

  ]

};