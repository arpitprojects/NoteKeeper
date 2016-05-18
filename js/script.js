   $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
     
  $('.button-collapse').sideNav('show');
  // Hide sideNav
  $('.button-collapse').sideNav('hide');
        
 
 $(document).ready(function(){
      $('.slider').slider({full_width: true});
    }); 
    
      $(document).ready(function() {
    $('#textarea1').characterCounter();
  });
   
 
             $(document).ready(function() {
    $('input#title1, textarea#textarea1').characterCounter();
  });
      
