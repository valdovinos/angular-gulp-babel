var app = angular.module('Dashboard');

app.controller('MainCtrl', function($scope,$timeout,homeService) {
    $scope.stock=0;
    $scope.missing=0;
    $scope.total=0;
    $scope.getStock =getStock;
    $scope.update = update;
    $scope.filtro = null;
    $scope.setFilter=setFilter;
    $scope.myObj = {};
    $scope.selected=selected;
    $scope.searchErase = searchErase;
    $scope.items = [];

    function selected(obj){
        console.log(obj);
        $scope.items = [];
        if(typeof obj === "undefined"){
            $scope.items = _.cloneDeep($scope.items_raw);
        }else{
            $scope.items.push(_.cloneDeep(obj.originalObject));
        }
        getStock.call(this);
    }
   
    const countStock = class countS {
        getStockFull(items, filtro) {
            var stock = 0;
            var total = 0;
            var missing = 0;
            items.filter( ( item )=> {
            if(filtro === null){
                item.active ? stock ++ : missing++;
                total++;
            }else{
               if(filtro && item.active){
                   stock ++;
                   total++;
               }
                if(!filtro && !item.active){
                    missing ++;
                    total++;
                }
            }
        });
            return [stock,missing,total];
        }
    };
    let inst = new countStock();

    function setFilter(type){
        $scope.filtro = type;
        getStock.call(this);
    }
    function update(){
        searchErase();
        $scope.filtro = null;
        $scope.items_aux = $scope.items;
        $scope.items = [];
        remoteItem.call($scope);
        getStock.call($scope);
    }
    function getStock () {
        [$scope.stock , $scope.missing, $scope.total] = inst.getStockFull( $scope.items, $scope.filtro ) ;
    }
    (function getItems(){
        getStock.call(this);
    })(this);

    function searchErase(){     
      $scope.$broadcast('angucomplete-alt:clearInput');
    }


     function remoteItem(){
        homeService.getData().then((response) => {
         //JSON------------------------------
        $scope.items_raw =_.cloneDeep(response);
        $scope.items = response;
         getStock.call($scope);
        }).catch(function (err){
            console.warn(err);
        });
    }
    //inicio
    remoteItem.call($scope);  
});


