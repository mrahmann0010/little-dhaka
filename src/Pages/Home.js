import MenuCard from "../Components/MenuCard";


const lunchMenu = [
  { name: 'Chicken Nanban', description: 'Biryani & Polao', price: '120' },
  { name: 'Grilled Paneer', description: 'Served with mint chutney', price: '100' },
  { name: 'Butter Chicken', description: 'Creamy tomato curry with naan', price: '130' },
  { name: 'Veg Pulao', description: 'Flavored rice with mixed vegetables', price: '90' },
  { name: 'Spicy Lamb Kebab', description: 'Chargrilled lamb skewers, onion salad', price: '140' },
  { name: 'Fish Curry Meal', description: 'Served with steamed rice and pickle', price: '125' }
];

const dinnerMenu = [
  { name: 'Tandoori Chicken', description: 'Smoky grilled chicken, served with raita', price: '150' },
  { name: 'Paneer Butter Masala', description: 'Rich curry with soft paneer cubes', price: '110' },
  { name: 'Beef Biryani', description: 'Fragrant basmati rice with spiced beef', price: '145' },
  { name: 'Chole Bhature', description: 'Spiced chickpeas with fluffy bhature', price: '95' },
  { name: 'Mutton Rogan Josh', description: 'Kashmiri-style curry with rice', price: '160' },
  { name: 'Egg Fried Rice', description: 'Stir-fried rice with egg and veggies', price: '85' }
];



function Home() {
    return (
        <main className="bg-main-bg font-notoserif">
            <MenuCard menuTitle='Lunch Menu' menu={lunchMenu}/>
            <MenuCard menuTitle='Lunch Menu' menu={dinnerMenu}/>


        </main>
    )
}

export default Home;
