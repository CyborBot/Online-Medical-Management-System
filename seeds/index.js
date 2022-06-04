const mongoose = require('mongoose');
const Medical = require('../models/medical');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')



mongoose.connect('mongodb://localhost:27017/medicalmanagement');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async() => {
    await Medical.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const phone = Math.floor(Math.random() * 3000) + 9999;
        const med = new Medical({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: `${cities[random1000].price}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Magni in facilis harum animi exercitationem amet dolor cupiditate accusantium.Earum dolores voluptatibus ut quos, veritatis similique laboriosam eveniet iure ratione dolor!',
            phone,
            image: 'https://images.unsplash.com/photo-1634714465560-57e9bf8feb88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lZGljYWwlMjBzaG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
        })
        await med.save();
    }
}
seedDB();