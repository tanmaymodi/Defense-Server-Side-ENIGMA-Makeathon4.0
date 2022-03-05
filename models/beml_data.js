const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// temp, humidity, ws
const data = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String
    },
    extra: Object,
    images: Object
});

/*
{
    title: "Title",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, nam ullam repudiandae possimus laboriosam placeat inventore sit pariatur delectus laborum sequi libero tempore voluptatibus laudantium incidunt. Hic minus tenetur repudiandae quibusdam minima veniam, omnis expedita necessitatibus, laborum voluptatibus voluptate quidem placeat dolore, ad non consectetur sapiente? Facilis quisquam, numquam quae porro eum blanditiis incidunt perspiciatis? Aperiam, maiores at? In repudiandae deserunt unde laborum inventore maxime corporis commodi doloribus vel pariatur dolores quibusdam voluptates omnis aliquid rem quaerat saepe laudantium fugit quisquam, id adipisci, quas dicta temporibus! Molestiae vitae quasi omnis necessitatibus ad, voluptate, tenetur qui cum quas perspiciatis quaerat. Quod tempora quibusdam sequi distinctio nisi vel ratione dignissimos, excepturi cum assumenda dolore dolorem necessitatibus consequatur impedit, perferendis facilis? Tempore sed dolor repudiandae fugit, ipsa animi nemo vitae sunt expedita accusantium! Vero debitis dicta officia optio nisi numquam, minus harum eius quasi voluptates delectus nesciunt illum ratione recusandae rem, accusantium vel? Tempora expedita qui id labore. Soluta architecto pariatur adipisci atque excepturi quis recusandae incidunt, consequuntur quod aut neque ad voluptatibus dignissimos eveniet, vero corporis! Laboriosam quasi, non fugit blanditiis quam accusantium dolor quaerat temporibus dicta. Molestiae ratione impedit suscipit iure vitae hic dolores totam nihil nobis quod, reiciendis quam, facilis ad vel distinctio repudiandae quis quia. Ex aliquam beatae quam. Blanditiis possimus quasi dolor nihil tempore animi, impedit quibusdam sit, deserunt cupiditate sunt ad? Esse pariatur, neque quo ex sapiente recusandae delectus dolorem doloremque magni animi tempora numquam, ipsa sequi quod ad molestias illum nemo velit adipisci aliquid saepe! Et perferendis magni tenetur repellendus deserunt? Impedit architecto perspiciatis, at eaque aliquid, natus laboriosam necessitatibus cumque molestias, est quam? Ex odio, facere sapiente quia fugit minima soluta, libero cumque molestias maiores quasi mollitia aut inventore beatae fugiat consequatur eveniet voluptatum quaerat repellendus neque ratione. Nemo unde dolorem eum rem veritatis. Molestias.",
    extra: [
        {
            "title": "head_a",
            "value": "val_a"
        },
        {
            "title": "head_a",
            "value": "val_a"
        },
        {
            "title": "head_a",
            "value": "val_a"
        }
    ],
    images: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstylecaster.com%2Feminem-net-worth%2F&psig=AOvVaw3Eq1EEvr4I5ZkYKMUhX9Zw&ust=1646587249159000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiOyNK9r_YCFQAAAAAdAAAAABAN"
}

*/

const Data = mongoose.model("Data", data);
module.exports = {Data};