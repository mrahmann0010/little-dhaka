// Placeholder restaurant details until a real data source exists.

export const hours = [
  { days: 'Monday – Friday', time: '8:00 am – 10:30 pm', weekdays: [1, 2, 3, 4, 5] },
  { days: 'Saturday – Sunday', time: '9:00 am – 11:00 pm', weekdays: [0, 6] },
];

export const contact = {
  phone: '02 3863 3737',
  tel: '+880238633737',
  address: 'Park Street Avenue',
  email: 'hello@littledhaka.com',
};

export const hoursToday = () =>
  hours.find(({ weekdays }) => weekdays.includes(new Date().getDay()));
