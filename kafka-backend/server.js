var connection =  new require('./kafka/Connection');
require('dotenv').config();
const { dbConnect } = require('./Utils/dbConnection');
//const CircularJSON = require('circular-json');

//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
var userSignup = require('./services/userSignup.js');
var restSignup = require('./services/restSignup.js');
var restLists = require('./services/restLists.js');
var menuLists = require('./services/menuList.js');
var findDishById = require('./services/findDishById.js');
var findCustomerById = require('./services/findCustomerById.js');
var findRestaurantById = require('./services/findRestaurantById.js');
var addFavorites = require('./services/addFavorites.js');
var getFavorites = require('./services/getFavorites.js');
var createOrder = require('./services/createOrder.js');
var updateUser = require('./services/updateUser.js');

dbConnect();
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
handleTopicRequest("user_signup",userSignup)
handleTopicRequest("restaurant_signup",restSignup)
handleTopicRequest("restaurant_lists",restLists)
handleTopicRequest("list_menu",menuLists)
handleTopicRequest("find_dishById",findDishById)
handleTopicRequest("find_customerById",findCustomerById)
handleTopicRequest("find_restaurantById",findRestaurantById)
handleTopicRequest("add_favorites",addFavorites)
handleTopicRequest("get_favorites",getFavorites)
handleTopicRequest("create_order",createOrder)
handleTopicRequest("update_customerdetails",updateUser)