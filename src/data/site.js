// Placeholder restaurant details until a real data source exists.

export const hours = [
  // opens/closes are minutes after midnight, used for booking slots
  { days: 'Monday – Friday', time: '8:00 am – 10:30 pm', weekdays: [1, 2, 3, 4, 5], opens: 8 * 60, closes: 22 * 60 + 30 },
  { days: 'Saturday – Sunday', time: '9:00 am – 11:00 pm', weekdays: [0, 6], opens: 9 * 60, closes: 23 * 60 },
];

export const contact = {
  phone: '02 3863 3737',
  tel: '+880238633737',
  address: 'Park Street Avenue',
  email: 'hello@littledhaka.com',
};

export const hoursToday = () =>
  hours.find(({ weekdays }) => weekdays.includes(new Date().getDay()));
