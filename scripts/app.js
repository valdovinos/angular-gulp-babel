'use_strict'
var routerApp = angular.module('Dashboard', ['ui.router', 'angucomplete-alt']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller:'MainCtrl'
        })
});

routerApp.run(function() {
   

window.onload = function(){

    //Estilos
    var btnSearch               = document.querySelector('#btn-search'),
        btnDelete               = document.querySelector('#btn-delete'),
        btnFilter               = document.querySelector('#btn-filter'),
        filterContainer         = document.querySelector('#filter-container'),
        searchContainer         = document.querySelector('#search-container'),
        searchInput             = document.querySelector('#search-input_value'),
        transparentContainer    = document.querySelector('#transparent-container'),
        filterOptions           = document.querySelectorAll('#filter-container li');

    btnSearch.addEventListener('click', function() {
        searchContainer.classList.add('visible');
        transparentContainer.classList.add('visible');
    });

    btnFilter.addEventListener('click', function() {
        filterContainer.classList.add('visible');
        transparentContainer.classList.add('visible');
    });

    btnDelete.addEventListener('click', function() {
        if(searchInput.value == '') {
            searchContainer.classList.remove('visible');
            transparentContainer.classList.remove('visible');
        }
        else {
            searchInput.value = '';
        }
    });

    for (var i = 0; i < filterOptions.length; i++) {
        filterOptions[i].addEventListener('click', function(){
            filterContainer.classList.remove('visible');
            transparentContainer.classList.remove('visible');
        });
    }

    transparentContainer.addEventListener('click', function() {
        filterContainer.classList.remove('visible');
        searchContainer.classList.remove('visible');
        transparentContainer.classList.remove('visible');
    });
};


});

routerApp.config( function() {
    console.log("app config");
});