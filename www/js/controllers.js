angular.module('omtamil.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $sce, DataLoader, $rootScope ) {
  
  // Enter your site url here. You must have the Reactor Core plugin activated on this site
  $rootScope.url = 'http://omtamil.tv';
  
  $rootScope.callback = '_jsonp=JSON_CALLBACK';

 
   
  $scope.alert=function(){
      //chrome.cast.requestSession();
       var message = {
    text: "Image test",
    image: "http://cordova.apache.org/images/cordova_bot.png"
    };
    window.socialmessage.send(message);
    }
  

})

.controller('PostCtrl', function($scope, $stateParams, DataLoader, $ionicLoading, $rootScope, $sce ) {

  $ionicLoading.show({
      noBackdrop: true
    });

  var singlePostApi = $rootScope.url + '/wp-json/posts/' + $stateParams.postId + '?' + $rootScope.callback;

  DataLoader.get( singlePostApi ).success(function(data, status, headers, config) {
      $scope.post = data;
      // Don't strip post html
      console.log(data);
      //$scope.content = $sce.trustAsHtml(data.content);
      var old= data.content;
      var newstr= old.replace("<iframe src=\"http:\/\/www.youtube.com\/watch?v=","<iframe src=\"http:\/\/www.youtube.com\/embed\/");
      
      $scope.content=$sce.trustAsHtml(newstr);
      $ionicLoading.hide();
    }).
    error(function(data, status, headers, config) {
      console.log('error');
    });
    

})

.controller('PostsCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate,$ionicListDelegate, $rootScope ) {

  

    var postsApi = $rootScope.url + '/wp-json/posts?' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }
     
    
    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;
    
    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl = $rootScope.url + '/wp-json/posts';

        DataLoader.all( apiurl + '?page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicViewService) {

  $ionicViewService.nextViewOptions({
    disableBack: true
  });
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('app.posts');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

})

//Thirukkural Controller

.controller('ThiruCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=tirukkural&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=tirukkural&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})


//Interview Controller

.controller('InterCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate,$ionicPlatform, $rootScope ) {

    
    $scope.deviceReady=false;

    $ionicPlatform.ready(function(){
       $scope.$apply(function(){
          $scope.deviceReady=true;
          moreDataExists();
       });
    });

    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=interview&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=interview&filter[posts_per_page]=9&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
            console.log('Load More Called');
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

//Tholkaapiyam Controller

.controller('TholCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=tolkappiyam&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=tolkappiyam&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})


//TamilThuli Controller

.controller('TamThuCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=tamil-thuli&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=tamil-thuli&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})


//Vizhithelu Controller

.controller('VizhiCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=vilithelu-tamiliname&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=vilithelu-tamiliname&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

//tamil-versol Controller

.controller('TamVerCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=tamil-versol&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=tamil-versol&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

//nenjodu-tamilisai Controller

.controller('NeTamCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=nenjodu-tamilisai&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=nenjodu-tamilisai&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

//property Controller

.controller('PropCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {




    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=property&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=property&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

//OpinionCtrl Controller

.controller('OpinionCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=opinion&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=opinion&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

// talk cotroller

.controller('TalkCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=talk&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=talk&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})


// drama cotroller

.controller('DramaCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=drama&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=drama&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

// pattimandram cotroller

.controller('PattCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=pattimandram&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=pattimandram&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})


// events cotroller

.controller('EventsCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=events&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=events&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

// infographic cotroller

.controller('InfogCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=infographic&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=infographic&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

// about cotroller

.controller('AboutCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {



    var postsApi = $rootScope.url + '/wp-json/posts?filter[category_name]=about&filter[posts_per_page]=9&' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        console.log( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl =$rootScope.url + '/wp-json/posts?filter[category_name]=about&';

        DataLoader.all( apiurl + 'page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

