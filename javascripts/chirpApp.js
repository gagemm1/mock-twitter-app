var app = angular.module('chirpApp', []);
//below is the empty controller, called mainController
app.controller('mainController', function($scope){
  
	$scope.posts = [];
  	$scope.newPost = {created_by: '', text: '', created_at: ''};//these are your models, the name of this model is create_by and it's empty at the moment.
																	//the create at we will fill with a timestamp of the posts
																	//and the text variable is what is in the body with the create_by as in who posted.

  	$scope.post = function(){ //$scope.post calls the form ng-submit in main.html, and it's name is post so that's why it's scope.post
    	$scope.newPost.created_at = Date.now(); //adds created at, we change the model here
    	$scope.posts.push($scope.newPost); //then we push the info to post
    	$scope.newPost = {created_by: '', text: '', created_at: ''}; //then this resets new post, so you can post again. But we haven't created something to display the feed yet. 
  	};
});	

app.controller('authController', function($scope){
  $scope.user = {username: '', password: ''};
  $scope.error_message = [];

  postService.getAll().success(function(data){
    $scope.posts = data;
  });

  $scope.login = function(){
    $scope.error_message = 'login request for ' + $scope.user.username;
  };

  $scope.register = function(){
    $scope.error_message = 'registeration request for ' + $scope.user.username;
  };
});