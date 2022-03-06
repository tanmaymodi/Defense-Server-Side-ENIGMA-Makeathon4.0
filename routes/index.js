const authController = require("../controllers/auth_controller");
const { Data } = require('../models/beml_data');
const express = require('express');
const checkAuth = require("../middlewares/auth");
const router = express.Router();


router.route('/')
.get(async(req, res) => {
    // try{
    //     q =  {
    //         title: "Vasu",
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, nam ullam repudiandae possimus laboriosam placeat inventore sit pariatur delectus laborum sequi libero tempore voluptatibus laudantium incidunt. Hic minus tenetur repudiandae quibusdam minima veniam, omnis expedita necessitatibus, laborum voluptatibus voluptate quidem placeat dolore, ad non consectetur sapiente? Facilis quisquam, numquam quae porro eum blanditiis incidunt perspiciatis? Aperiam, maiores at? In repudiandae deserunt unde laborum inventore maxime corporis commodi doloribus vel pariatur dolores quibusdam voluptates omnis aliquid rem quaerat saepe laudantium fugit quisquam, id adipisci, quas dicta temporibus! Molestiae vitae quasi omnis necessitatibus ad, voluptate, tenetur qui cum quas perspiciatis quaerat. Quod tempora quibusdam sequi distinctio nisi vel ratione dignissimos, excepturi cum assumenda dolore dolorem necessitatibus consequatur impedit, perferendis facilis? Tempore sed dolor repudiandae fugit, ipsa animi nemo vitae sunt expedita accusantium! Vero debitis dicta officia optio nisi numquam, minus harum eius quasi voluptates delectus nesciunt illum ratione recusandae rem, accusantium vel? Tempora expedita qui id labore. Soluta architecto pariatur adipisci atque excepturi quis recusandae incidunt, consequuntur quod aut neque ad voluptatibus dignissimos eveniet, vero corporis! Laboriosam quasi, non fugit blanditiis quam accusantium dolor quaerat temporibus dicta. Molestiae ratione impedit suscipit iure vitae hic dolores totam nihil nobis quod, reiciendis quam, facilis ad vel distinctio repudiandae quis quia. Ex aliquam beatae quam. Blanditiis possimus quasi dolor nihil tempore animi, impedit quibusdam sit, deserunt cupiditate sunt ad? Esse pariatur, neque quo ex sapiente recusandae delectus dolorem doloremque magni animi tempora numquam, ipsa sequi quod ad molestias illum nemo velit adipisci aliquid saepe! Et perferendis magni tenetur repellendus deserunt? Impedit architecto perspiciatis, at eaque aliquid, natus laboriosam necessitatibus cumque molestias, est quam? Ex odio, facere sapiente quia fugit minima soluta, libero cumque molestias maiores quasi mollitia aut inventore beatae fugiat consequatur eveniet voluptatum quaerat repellendus neque ratione. Nemo unde dolorem eum rem veritatis. Molestias.",
    //         extra: [
    //             {
    //                 "title": "head_a",
    //                 "value": "val_a"
    //             },
    //             {
    //                 "title": "head_a",
    //                 "value": "val_a"
    //             },
    //             {
    //                 "title": "head_a",
    //                 "value": "val_a"
    //             }
    //         ],
    //         images: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstylecaster.com%2Feminem-net-worth%2F&psig=AOvVaw3Eq1EEvr4I5ZkYKMUhX9Zw&ust=1646587249159000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiOyNK9r_YCFQAAAAAdAAAAABAN"
    //     }
    //     const io = new Data(q);
    //     await io.save();
    //     console.log("data saved\n" + q);
    //     res.render('home.ejs');
    // }
    // catch(err){
    //     console.log("not saved");
    //     res.render('home.ejs');
    // }
    res.render('home.ejs');
});

router.route('/dashboard')
.get(async(req, res) => {

    res.render('dashboard.ejs');
});




router.route('/fetch')
.post(async(req, res) => {
    try{
        const d = await Data.find({});
        var n = Object.keys(d).length;
        console.log(n);

        if(!n){
            return res.send({msg:"no data exists",isData: false,data:d});
        }else{
            return res.send({msg:"data fetched successfully",isData:true,data:d});
        }    
    }
    catch(err){
        return res.send({msg: "eroor occured in fetching data",isData:false});
    }
});



router.route('/login')
.get(async(req, res) => {
    res.render('login.ejs');
})
.post(authController.login.post);

router.route('/register')
.get(async(req, res) => {
    res.render('register.ejs');
})
.post(authController.register.post);

router.route('/verifyOtp')
.get(async(req, res) => {
    res.render('verifyOtp.ejs');
})
.post(authController.verifyOtp.post);


module.exports = router;