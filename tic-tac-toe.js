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
var BoardNum;

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
      if (isSubArray(winningCombos[i], player.wins[boardNum])){ 
        return true;
      }
    }
    return false
  }     

if (Meteor.isClient) {
  Meteor.startup(function(){
    Session.set('winnerBoard1', true);
    Session.set('winnerBoard2', true);
    Session.set('winnerBoard3', true);
    Session.set('winnerBoard4', true);
    Session.set('winnerBoard5', true);
    Session.set('winnerBoard6', true);
    Session.set('winnerBoard7', true);
    Session.set('winnerBoard8', true);
    Session.set('winnerBoard9', true);   
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

 Template.innerBoard2.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      // $('#newWin').hide();
   }
}
 Template.innerBoard3.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      // $('#newWin').hide();
   }
}
 Template.innerBoard4.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      // $('#newWin').hide();
   }
}
 Template.innerBoard5.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      // $('#newWin').hide();
   }
}
 Template.innerBoard6.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      // $('#newWin').hide();
   }
}
 Template.innerBoard7.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      // $('#newWin').hide();
   }
}
 Template.innerBoard8.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      // $('#newWin').hide();
   }
}
 Template.innerBoard9.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      // $('#newWin').hide();
   }
}

// board 1

 Template.innerBoard1.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie[boardNum] === false){

          //if the tile hasn't already been clicked
        if (used[boardNum].indexOf(value) === -1){
            used[boardNum].push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins[boardNum].push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins[boardNum]);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins[boardNum], winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used[boardNum].length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie[boardNum] = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);
                alert('this is a tie');
                Session.set("winnerBoard1", false);

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

     if (result){
      // alert (current_player.name);
      if(tie[1] == true){
        return 'XO';
      }else if (current_player.name == 'Darth'){
        return 'X';
      }else if (current_player.name == 'Obi'){
        return 'O';
      }
    
     }

  }

  // board 2
  Template.innerBoard2.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie[boardNum] === false){

          //if the tile hasn't already been clicked
        if (used[boardNum].indexOf(value) === -1){
            used[boardNum].push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins[boardNum].push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins[boardNum]);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins[boardNum], winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used[boardNum].length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie[boardNum] = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);
                alert('this is a tie');
                Session.set("winnerBoard2", false);

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
              Session.set("winnerBoard2",false);
              current_player.bigwins.push(boardNum);
              // Template.innerBoard1.noWinner(false);
              
            
           }
          }
       }
    }
  });

  Template.innerBoard2.noWinner2 = function(){
    //answer is a boolean true or false
    return Session.get("winnerBoard2");

  }

  Template.innerBoard2.showWinner2 = function(){

     var result = true;

     if (result){
      // alert (current_player.name);
      if(tie[2] == true){
        return 'XO';
      }else if (current_player.name == 'Darth'){
        return 'X';
      }else if (current_player.name == 'Obi'){
        return 'O';
      }
    
     }

  }
  //board 3
  Template.innerBoard3.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie[boardNum] === false){

          //if the tile hasn't already been clicked
        if (used[boardNum].indexOf(value) === -1){
            used[boardNum].push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins[boardNum].push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins[boardNum]);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins[boardNum], winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used[boardNum].length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie[boardNum] = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);
                alert('this is a tie');
                Session.set("winnerBoard3", false);

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
              Session.set("winnerBoard3",false);
              current_player.bigwins.push(boardNum);
              // Template.innerBoard1.noWinner(false);
              
            
           }
          }
       }
    }
  });

  Template.innerBoard3.noWinner3 = function(){
    //answer is a boolean true or false
    return Session.get("winnerBoard3");

  }

  Template.innerBoard3.showWinner3 = function(){

     var result = true;

     if (result){
      // alert (current_player.name);
      if(tie[3] == true){
        return 'XO';
      }else if (current_player.name == 'Darth'){
        return 'X';
      }else if (current_player.name == 'Obi'){
        return 'O';
      }
    
     }

  }
//board 4
 Template.innerBoard4.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie[boardNum] === false){

          //if the tile hasn't already been clicked
        if (used[boardNum].indexOf(value) === -1){
            used[boardNum].push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins[boardNum].push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins[boardNum]);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins[boardNum], winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used[boardNum].length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie[boardNum] = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);
                alert('this is a tie');
                Session.set("winnerBoard4", false);

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
              Session.set("winnerBoard4",false);
              current_player.bigwins.push(boardNum);
              // Template.innerBoard1.noWinner(false);
              
            
           }
          }
       }
    }
  });

  Template.innerBoard4.noWinner4 = function(){
    //answer is a boolean true or false
    return Session.get("winnerBoard4");

  }

  Template.innerBoard4.showWinner4 = function(){

     var result = true;

     if (result){
      // alert (current_player.name);
      if(tie[4] == true){
        return 'XO';
      }else if (current_player.name == 'Darth'){
        return 'X';
      }else if (current_player.name == 'Obi'){
        return 'O';
      }
    
     }

  }
//board5
  Template.innerBoard5.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie[boardNum] === false){

          //if the tile hasn't already been clicked
        if (used[boardNum].indexOf(value) === -1){
            used[boardNum].push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins[boardNum].push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins[boardNum]);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins[boardNum], winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used[boardNum].length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie[boardNum] = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);
                alert('this is a tie');
                Session.set("winnerBoard5", false);

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
              Session.set("winnerBoard5",false);
              current_player.bigwins.push(boardNum);
              // Template.innerBoard1.noWinner(false);
              
            
           }
          }
       }
    }
  });

  Template.innerBoard5.noWinner5 = function(){
    //answer is a boolean true or false
    return Session.get("winnerBoard5");

  }

  Template.innerBoard5.showWinner5 = function(){

     var result = true;

     if (result){
      // alert (current_player.name);
      if(tie[5] == true){
        return 'XO';
      }else if (current_player.name == 'Darth'){
        return 'X';
      }else if (current_player.name == 'Obi'){
        return 'O';
      }
    
     }

  }


//board 6
  Template.innerBoard6.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie[boardNum] === false){

          //if the tile hasn't already been clicked
        if (used[boardNum].indexOf(value) === -1){
            used[boardNum].push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins[boardNum].push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins[boardNum]);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins[boardNum], winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used[boardNum].length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie[boardNum] = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);
                alert('this is a tie');
                Session.set("winnerBoard6", false);

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
              Session.set("winnerBoard6",false);
              current_player.bigwins.push(boardNum);
              // Template.innerBoard1.noWinner(false);
              
            
           }
          }
       }
    }
  });

  Template.innerBoard6.noWinner6 = function(){
    //answer is a boolean true or false
    return Session.get("winnerBoard6");

  }

  Template.innerBoard6.showWinner6 = function(){

     var result = true;

     if (result){
      // alert (current_player.name);
      if(tie[6] == true){
        return 'XO';
      }else if (current_player.name == 'Darth'){
        return 'X';
      }else if (current_player.name == 'Obi'){
        return 'O';
      }
    
     }

  }


  //board 7
    Template.innerBoard3.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie[boardNum] === false){

          //if the tile hasn't already been clicked
        if (used[boardNum].indexOf(value) === -1){
            used[boardNum].push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins[boardNum].push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins[boardNum]);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins[boardNum], winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used[boardNum].length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie[boardNum] = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);
                alert('this is a tie');
                Session.set("winnerBoard7", false);

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
              Session.set("winnerBoard7",false);
              current_player.bigwins.push(boardNum);
              // Template.innerBoard1.noWinner(false);
              
            
           }
          }
       }
    }
  });

  Template.innerBoard7.noWinner7 = function(){
    //answer is a boolean true or false
    return Session.get("winnerBoard7");

  }

  Template.innerBoard7.showWinner7 = function(){

     var result = true;

     if (result){
      // alert (current_player.name);
      if(tie[7] == true){
        return 'XO';
      }else if (current_player.name == 'Darth'){
        return 'X';
      }else if (current_player.name == 'Obi'){
        return 'O';
      }
    
     }

  }

//board 8 
  Template.innerBoard8.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie[boardNum] === false){

          //if the tile hasn't already been clicked
        if (used[boardNum].indexOf(value) === -1){
            used[boardNum].push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins[boardNum].push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins[boardNum]);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins[boardNum], winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used[boardNum].length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie[boardNum] = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);
                alert('this is a tie');
                Session.set("winnerBoard8", false);

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
              Session.set("winnerBoard8",false);
              current_player.bigwins.push(boardNum);
              // Template.innerBoard1.noWinner(false);
              
            
           }
          }
       }
    }
  });

  Template.innerBoard8.noWinner8 = function(){
    //answer is a boolean true or false
    return Session.get("winnerBoard8");

  }

  Template.innerBoard8.showWinner8 = function(){

     var result = true;

     if (result){
      // alert (current_player.name);
      if(tie[8] == true){
        return 'XO';
      }else if (current_player.name == 'Darth'){
        return 'X';
      }else if (current_player.name == 'Obi'){
        return 'O';
      }
    
     }

  }

  //board 9
    Template.innerBoard9.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[5];
        console.log('the tile is tile number ' + value);
        var boardNum = $(e.currentTarget).attr('id')[4];
        console.log('the board clicked is: ' + boardNum);
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if(tie[boardNum] === false){

          //if the tile hasn't already been clicked
        if (used[boardNum].indexOf(value) === -1){
            used[boardNum].push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins[boardNum].push(value);
            if(!checkWin(current_player,boardNum)){
              console.log(current_player.name + ' loses ')
              console.log('array of wins for board ' + boardNum + ' ' + current_player.wins[boardNum]);
              console.log('wins' + current_player.wins);
              console.log(isSubArray(current_player.wins[boardNum], winningCombos));
              //if all the tiles have been used and there is no winner it is a tie, the board is replace 
              //but the two signs
              if (used[boardNum].length === 9){
                // $('#winnerBoard').html('XO').css('font-size','330px');
                // $('#firstBoard').hide();
                // $('#newWin').show();
                tie[boardNum] = true;
                team[0].bigwins.push(boardNum);
                team[1].bigwins.push(boardNum);
                alert('this is a tie');
                Session.set("winnerBoard9", false);

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
              Session.set("winnerBoard9",false);
              current_player.bigwins.push(boardNum);
              // Template.innerBoard1.noWinner(false);
              
            
           }
          }
       }
    }
  });

  Template.innerBoard9.noWinner9 = function(){
    //answer is a boolean true or false
    return Session.get("winnerBoard9");

  }

  Template.innerBoard9.showWinner9 = function(){

     var result = true;

     if (result){
      // alert (current_player.name);
      if(tie[9] == true){
        return 'XO';
      }else if (current_player.name == 'Darth'){
        return 'X';
      }else if (current_player.name == 'Obi'){
        return 'O';
      }
    
     }

  }
  //




 }

    
  if (Meteor.isServer) {
    // code to run on server at startup
  
}