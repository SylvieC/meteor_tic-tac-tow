var winningCombos = [[1,2,3], [1,5,9],[3,5,7],[4,5,6], [7,8,9],[1,4,7],[2,5,8],[3,6,9]];
 //At each turn, I need to check if it is a valid move. 
var team = [
      {
      name:      'Darth',
      full_name: 'Darth Vader',
      img_url:   '/darthvador.jpeg',
      id:         '1', 
      current:    'true',
      sign:        'X',
      wins:        {1: [], 2: [], 3: [], 4: [], 5:[], 6: [], 7: [], 8: [], 9: []},
      bigwins:     []
      // indicator: $(status_indicators[0])
    },
    {
      name:      'Obi',
      full_name:  'Obi Wan Kenobi',
      img_url:   '/obi.jpeg',
      id:         '2' ,
      current:    'false',
      sign:       'O',
      wins:        {1: [], 2: [], 3: [], 4: [], 5:[], 6: [], 7: [], 8: [], 9: []},
      bigwins:     [] 

      // indicator: $(status_indicators[1])
    }];
var used = {1: [], 2: [], 3: [], 4: [], 5:[], 6: [], 7: [], 8: [], 9: []};
var tie = {1: false, 2: false, 3: false, 4: false, 5:false, 6: false, 7: false, 8: false, 9: false};
// var sign = "";  
var sign = true;

var current_player = team[0];
var update_current_player = function(){
  if (current_player === team[0]){
    current_player = team[1];
  }else{
    current_player = team[0];
  }
};

var switch_current = function(name){
  var value = $('#' + name).attr('class');
  if (value === 'true'){
    $('#' + name).removeClass('true').addClass('false');
  }else{
     $('#' + name).removeClass('false').addClass('true');
  }
};

//method to check that an array is a subarray of another array (to check if there is a winning combo)
function isSubArray(subArray, array){
  for (var i = 0, len = subArray.length; i < len; i++){
    if (array.indexOf(subArray[i]) < 0){
      return false;
    }
  }
  return true;
}

function checkWin(player, boardNum){
    for(var i = 0; i < winningCombos.length; i++){
      if (isSubArray(winningCombos[i], player.wins.boardNum)){ 
        return true;
      }
    }
    return false
  }     

if (Meteor.isClient) {
  Meteor.startup(function(){
    Session.set('winnerBoard1', true);
  })
  // Template.mainBoard.todos = function () {
  //  return [
  //   {title: 'make myself lunch'},
  //   {title: 'eat lunch'}
  //  ] ;
  Template.teams.helpers({
    players: function(){
      return team;
       }
     });


   //action onload
  Template.innerBoard1.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      // $('#newWin').hide();
   }
}

 Template.innerBoard1.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie.boardNum === false){

          //if the tile hasn't already been clicked
        if (used.boardNum.indexOf(value) === -1){
            used.boardNum.push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins.boardNum.push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins.boardNum);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins.boardNum, winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used.boardNum.length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie.boardNum = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);

              }else{
                //the game continues if there aren't nine tiles used yet
                switch_current('Darth');
                switch_current('Obi');
                update_current_player();
              }
             //if there is a winner
            }else{
              alert(current_player.name + ' wins!');
              $('#winnerBoard').html(current_player.sign);
              // $('#firstBoard').hide();
              // $('#newWin').show();
              Session.set("winnerBoard1",false);
              current_player.bigwins.push(boardNum);
              // Template.innerBoard1.noWinner(false);
              
            
           }
          }
       }
    }
  });

  Template.innerBoard1.noWinner = function(){
    //answer is a boolean true or false
    return Session.get("winnerBoard1");

  }

  Template.innerBoard1.showWinner = function(){

     var result = true;

     if (result)
     {
      return "X";
     }
     else if (result == "draw"){
       return "XO";
     }
     else {

      return "O";
     }

  }

 }

    
  if (Meteor.isServer) {
    // code to run on server at startup
  
}