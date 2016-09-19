'use strict';

angular.module('echo.filters.lastModifiedBy', [
  'echo.filters.firstCharacter'
])
  .filter('lastModifiedBy', function ($filter) {
    return function (model) {
      var formattedText = '';

      if(_.get(model, 'firstName')) {
        formattedText = _.template('By ${firstName} ${lastName} ')({
          firstName: model.firstName,
          lastName: $filter('firstCharacter')(model.lastName)
        });
      }

      if(_.get(model, 'actionPerformedOn')) {
        if(!_.isEmpty(formattedText)){
          formattedText+= _.template('at ${date}')({
            date: model.actionPerformedOn
          });
        }else {
          formattedText+= model.actionPerformedOn;
        }
      }
      
      return _.trim(formattedText);
    };
  });