var express = require('express');
var router = express.Router();

//api for all posts
router.route('/posts')

    //create a new post
    .post(function(req, res){ 

        //TODO create a new post in the database
        res.send({message:"TODO post a new post in the database"});
    })

    .get(function(req, res){

        //TODO get all the posts in the database
        res.send({message:"TODO get all the posts in the database"});
    })

router.route('/posts/:id') //id is a resource? it parses the path and pass id as a parameter  
	//returns a particular post
	.get(function(req,res){
		res.send({message: 'TODO return post with ID ' + req.params.id});
	})

	//update existing post
	.put(function(req,res){
		res.send({message: 'TODO modify post with ID ' + req.params.id});
	})

	//delete existing post
	.delete(function(req,res){
		res.send({message: 'TODO delete post with ID ' + req.params.id});
	})

	//this router.route is a fully restful API, which means that you can do all of get put (update) and delete things

module.exports = router;