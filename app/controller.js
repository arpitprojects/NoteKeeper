newApp.controller('mainController' , [ '$scope' , '$log'  , function($scope , $log ){
    $scope.title = "Design Bids";
}]);
newApp.controller('homeController' , [ '$scope' , '$log'  , function($scope , $log ){
    $scope.title = 'HomePage';
}]);

newApp.controller('loginController' , [ '$scope' , '$log', '$firebaseAuth','$location', function($scope , $log, $firebaseAuth,$location){
    $scope.title = "Login Page";
    $scope.showe  = false;
    $scope.submit = function(){
        $log.info('Going on!');
        var username = $scope.username;
        var password = $scope.password;
        var firebaseObj = new Firebase("https://blazing-torch-844.firebaseio.com/"); 
        var auth = $firebaseAuth(firebaseObj);
        
        auth.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
            console.log('Authentication successful');
            
             $location.path('/User');
        }, function(error) {
            // Failure callback
            alert('Login/Password does not matched!!');
        });
        
    }
}]);

newApp.controller('userController' , [ '$scope' , '$log','$firebaseAuth','$firebaseObject' ,'$location' , '$localStorage' , '$filter' , function($scope , $log , $firebaseAuth ,$firebaseObject , $location , $localStorage , $filter){
  
   $scope.alert = "Click For More Post";
   $scope.multiple_del_array = [];
    $scope.noting = [];
    $scope.showing = true;
    $scope.count = true;
    $scope.title = "Suceess Buddy!!";
    // $scope.temp = false;
    $scope.limiting = 4;
    // var new_array = [];
    $scope.notes = [];
    var firebaseObj = new Firebase("https://blazing-torch-844.firebaseio.com/"); 
    var auth = $firebaseAuth(firebaseObj);
    auth.$onAuth(function(authUser){
       //recieve the object
       if(authUser){
           var userRef = new Firebase("https://blazing-torch-844.firebaseio.com/" + authUser.uid);
           var userObj = $firebaseObject(userRef);  
           $scope.title = "Hi User!!!";
           //All the codes of the user area will go here
            $scope.submitit = function(){
                var title1 = $filter('uppercase')($scope.title1);
                var message = $filter('uppercase')($scope.message);
                var temp_object = {
                 "title1" : title1 , 
                 "messsage" : message   
                }
                if($scope.count == true){
               if($localStorage.data1){
                   $scope.showdel = true;
                   console.log($localStorage.data1);
                   $scope.notes = $localStorage.data1;
                   $scope.notes.unshift(temp_object);
                   $localStorage.data1 = $scope.notes;
                   console.log($localStorage.data1);
               }else{
                 $scope.showdel = false;
                   console.log('Sec');
                    $scope.notes.push(temp_object);
                    $localStorage.data1 = $scope.notes;
                    console.log($localStorage.data1);
                       
               }
              document.noteForm.reset();
           }else{//when the 
             var temp = {
                 "title1" : title1,
                 "messsage" : message
                  
             }  
             $scope.noting[$scope.audi] = temp;
           }
        }//submit closed
            
            //this is only to retive all the data
            if($localStorage.data1){ 
                
                $scope.noting = $localStorage.data1;
                console.log($scope.noting);
            }else{
              
            } 
          //delet the particular note
          
            $scope.delete = function(note){
            var index = $scope.noting.indexOf(note);
            $scope.noting.splice(index ,1); 
            } 
        
        $scope.edit = function(note){
            $scope.count = false;
            var index = $scope.noting.indexOf(note);
            console.log(index);
            $scope.title1 = $scope.noting[index].title1;
            $scope.message = $scope.noting[index].messsage;
            $scope.audi = index;      
        }
        
        //update the current record
       
        
        $scope.multiple_del = function(note){
            
            var index = $scope.noting.indexOf(note);
            
            if($scope.multiple_del_array.indexOf(note) == -1){
                console.log(note.title1);
                var checki = document.getElementById(note.messsage).checked;
                console.log(checki);
                if(checki){
                console.log('Element is being pushing down');
                $scope.multiple_del_array.push(index);
                }else{
                   $scope.multiple_del_array.pop(); 
                }
            }
            console.log($scope.multiple_del_array); 
        }
        
        $scope.mul = function(){
            console.log($scope.multiple_del_array);
            console.log($scope.multiple_del_array.length);
            for(var i = 0 ; i < $scope.multiple_del_array.length; ++i ){
                $scope.noting.splice($scope.multiple_del_array[i] ,1);
            }
            $scope.multiple_del_array = [];
        }
        
        //red color function
        $scope.red = function(note){
           
             angular.element('#'+note.title1).addClass('red').removeClass('orange').removeClass('green');
        }
        
        //ornage color function
        $scope.orange = function(note){

             angular.element('#'+note.title1).addClass('orange').removeClass('red').removeClass('green');
        }
        
        //green color function 
        
        
        $scope.green = function(note){
           
            angular.element('#'+note.title1).addClass('green').removeClass('orange').removeClass('red');
        }
        
        
        $scope.load = function(){
           var len =  $scope.noting.length;
           if(len  > $scope.limiting){
            $scope.limiting = $scope.limiting + 4;
             
           }else{
               $scope.alert = "No more Posts!!";
               
           }
        }
        
        
       } else{
           $scope.title = "You are not logged in!!";
           $scope.showing = false;
       }
    });
    
    $scope.logout = function(){
        return auth.$unauth();
        
        
         
    }//logout the things
}]);
