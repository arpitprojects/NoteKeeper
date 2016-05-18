
newApp.config(function($routeProvider){
    $routeProvider
     .when('/Home' , {
        templateUrl : 'includes/home.html',
        controller : 'homeController'
    })   
    .when('/Login' , {
        templateUrl : 'includes/login.html',
        controller : 'loginController'
    })    
       .when('/User' , {
        templateUrl : 'includes/user.html',
        controller : 'userController',
    }) 
    .otherwise({
       redirectTo :  '/Home'
    }); 
});