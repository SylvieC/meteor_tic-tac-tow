if (Meteor.isClient) {
  // Template.mainBoard.todos = function () {
  //  return [
  //   {title: 'make myself lunch'},
  //   {title: 'eat lunch'}
  //  ] ;
  Template.teams.helpers({
    players: function(){
      return [
      {
      name:      'Ernie',
      marker:    '&times;',
      img_url:   '/ernie.jpg',
      id:         '1', 
      current:    'true'
      // indicator: $(status_indicators[0])
    },
    {
      name:      'Bert',
      marker:    '&oslash;',
      img_url:   '/bert.jpg',
      id:         '2' ,
      current:    'false'      

      // indicator: $(status_indicators[1])
    }

      ]
    }
  })
 }

    
  if (Meteor.isServer) {
    // code to run on server at startup
}

