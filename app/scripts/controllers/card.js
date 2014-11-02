'use strict';
angular.module('Trendicity')

.controller('CardViewCtrl', function ($scope, $ionicSideMenuDelegate) {
  console.log('Inside CardViewCtrl...');
  // Disable side-menu drag so that it doesnt interfere with our swipe cards functionality
  $ionicSideMenuDelegate.canDragContent(false);
})

.controller('CardCtrl', function ($scope, InstagramService) {
  console.log('Inside CardCtrl....');

  $scope.cardTransitionedLeft = function(index) {
    console.log('cardTransitionedLeft called with index:' + index);
    var post = $scope.posts[index];

    if (post.user_has_liked) { // jshint ignore:line
      InstagramService.dislikePost(post.id)
        .success(function(data) {
          console.log('you disliked it!  data:', angular.toJson(data,true));
        });
    }
  };

  $scope.cardTransitionedRight = function(index) {
    console.log('cardTransitionedRight called with index:' + index);
    var post = $scope.posts[index];

    InstagramService.likePost(post.id)
    .success(function(data) {
      console.log('you liked it!  data:', angular.toJson(data,true));
    });
  };

  $scope.cardDestroyed = function(index) {
    $scope.posts.splice(index, 1);
  };
});