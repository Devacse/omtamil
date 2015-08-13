
angular.module('omtamil', ['ionic', 'omtamil.controllers', 'omtamil.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
   
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      
      StatusBar.styleDefault();
      
    }

    $ionicPlatform.setupDiscovery();
  });
})



.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.posts', {
    url: "/posts",
    views: {
      'menuContent': {
        templateUrl: "templates/posts.html",
        controller: 'PostsCtrl'
      }
    }
  })

  .state('app.thirukkural', {
    url: "/thirukkural",
    views: {
      'menuContent': {
        templateUrl: "templates/thirukkural.html",
        controller: 'ThiruCtrl'
      }
    }
  })

  .state('app.interview', {
    url: "/interview",
    views: {
      'menuContent': {
        templateUrl: "templates/interview.html",
        controller: 'InterCtrl'
      }
    }
  })

  .state('app.tholkaapiyam', {
    url: "/tholkaapiyam",
    views: {
      'menuContent': {
        templateUrl: "templates/tholkaapiyam.html",
        controller: 'TholCtrl'
      }
    }
  })

  .state('app.tamilthuli', {
    url: "/tamilthuli",
    views: {
      'menuContent': {
        templateUrl: "templates/tamilthuli.html",
        controller: 'TamThuCtrl'
      }
    }
  })

  .state('app.vizhithelu', {
    url: "/vizhithelu",
    views: {
      'menuContent': {
        templateUrl: "templates/vizhithelu.html",
        controller: 'VizhiCtrl'
      }
    }
  })

  .state('app.tamil-versol', {
    url: "/tamil-versol",
    views: {
      'menuContent': {
        templateUrl: "templates/tamil-versol.html",
        controller: 'TamVerCtrl'
      }
    }
  })

  .state('app.nenjodu-tamilisai', {
    url: "/nenjodu-tamilisai",
    views: {
      'menuContent': {
        templateUrl: "templates/nenjodu-tamilisai.html",
        controller: 'NeTamCtrl'
      }
    }
  })

  .state('app.property', {
    url: "/property",
    views: {
      'menuContent': {
        templateUrl: "templates/property.html",
        controller: 'PropCtrl'
      }
    }
  })

  .state('app.opinion', {
    url: "/opinion",
    views: {
      'menuContent': {
        templateUrl: "templates/opinion.html",
        controller: 'OpinionCtrl'
      }
    }
  })

  .state('app.talk', {
    url: "/talk",
    views: {
      'menuContent': {
        templateUrl: "templates/talk.html",
        controller: 'TalkCtrl'
      }
    }
  })

  .state('app.drama', {
    url: "/drama",
    views: {
      'menuContent': {
        templateUrl: "templates/drama.html",
        controller: 'DramaCtrl'
      }
    }
  })

  .state('app.pattimandram', {
    url: "/pattimandram",
    views: {
      'menuContent': {
        templateUrl: "templates/pattimandram.html",
        controller: 'PattCtrl'
      }
    }
  })

  .state('app.events', {
    url: "/events",
    views: {
      'menuContent': {
        templateUrl: "templates/events.html",
        controller: 'EventsCtrl'
      }
    }
  })

  .state('app.infographic', {
    url: "/infographic",
    views: {
      'menuContent': {
        templateUrl: "templates/infographic.html",
        controller: 'InfogCtrl'
      }
    }
  })


.state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html",
        controller: 'AboutCtrl'
      }
    }
  })




  .state('app.post', {
    url: "/posts/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/post.html",
        controller: 'PostCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/posts');
})

.setupDiscovery=function () {
    ConnectSDK.discoveryManager.startDiscovery();
}

.showDevicePicker=function () {
    ConnectSDK.discoveryManager.pickDevice();
}