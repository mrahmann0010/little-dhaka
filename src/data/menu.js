// Placeholder menu content until a real data source exists.

export const menuSections = [
  {
    id: 'breakfast',
    title: 'Breakfast Menu',
    hours: '8:00 – 11:30 am',
    note: 'Warm parathas, slow-simmered dal and sweet milky tea to start the day.',
    items: [
      { name: 'Paratha & Dal', description: 'Flaky layered flatbread with yellow lentils', price: '180', img: '/fp1.jpeg', tags: ['Vegetarian'] },
      { name: 'Bhuna Khichuri', description: 'Rice and lentils cooked with ghee and spices', price: '220', img: '/f2.webp', tags: [] },
      { name: 'Egg Bhurji', description: 'Spiced scrambled eggs, green chilli, coriander', price: '160', img: '/f3.jpg', tags: ['Spicy'] },
      { name: 'Chana Puri', description: 'Crisp puffed bread with spiced chickpeas', price: '170', img: '/f6.webp', tags: ['Vegetarian'] },
    ],
  },
  {
    id: 'lunch',
    title: 'Lunch Menu',
    hours: '12:00 – 3:30 pm',
    note: 'Our midday plates, cooked fresh in small batches every morning.',
    items: [
      { name: 'Chicken Nanban', description: 'Crisp fried chicken with tangy house sauce', price: '420', img: '/f1.jpg', tags: [] },
      { name: 'Grilled Paneer', description: 'Served with mint chutney', price: '360', img: '/fp2.png', tags: ['Vegetarian'] },
      { name: 'Butter Chicken', description: 'Creamy tomato curry with naan', price: '450', img: '/f4.jpg', tags: ['Chef’s pick'] },
      { name: 'Veg Pulao', description: 'Flavoured rice with mixed vegetables', price: '290', img: '/fp3.jpg', tags: ['Vegetarian'] },
      { name: 'Spicy Lamb Kebab', description: 'Chargrilled lamb skewers, onion salad', price: '520', img: '/f3.jpg', tags: ['Spicy'] },
      { name: 'Fish Curry Meal', description: 'Served with steamed rice and pickle', price: '440', img: '/download.jpeg', tags: [] },
    ],
  },
  {
    id: 'dinner',
    title: 'Dinner Menu',
    hours: '6:30 – 10:30 pm',
    note: 'Richer curries and charcoal-grilled dishes for slower evenings.',
    items: [
      { name: 'Tandoori Chicken', description: 'Smoky grilled chicken, served with raita', price: '550', img: '/f4.jpg', tags: ['Spicy'] },
      { name: 'Paneer Butter Masala', description: 'Rich curry with soft paneer cubes', price: '390', img: '/fp2.png', tags: ['Vegetarian'] },
      { name: 'Kacchi Biryani', description: 'Fragrant basmati layered with spiced mutton', price: '620', img: '/f1.jpg', tags: ['Chef’s pick'] },
      { name: 'Chole Bhature', description: 'Spiced chickpeas with fluffy bhature', price: '320', img: '/fp1.jpeg', tags: ['Vegetarian'] },
      { name: 'Mutton Rogan Josh', description: 'Kashmiri-style curry with rice', price: '640', img: '/f6.webp', tags: [] },
      { name: 'Egg Fried Rice', description: 'Stir-fried rice with egg and vegetables', price: '280', img: '/fp3.jpg', tags: [] },
    ],
  },
];

export const heroImages = ['/f1.jpg', '/fp2.png', '/f3.jpg', '/f4.jpg', '/fp3.jpg', '/f6.webp'];
