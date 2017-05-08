(function(_win, $){

    'use strict';

    /*global window: false */

    var utils = {};

    utils.init = function () {
        //initialize the applcation

        utils.start();
    };

    utils.start = function () {
        //start the application

        $(document).ready(function () {
            utils.getAlllUsers();
            utils.setupEventHandlers();
        });
    };

    utils.setupEventHandlers = function () {
        utils.bindRefreshDataButton();
    };

    utils.bindRefreshDataButton = function () {
        $('.refresh-button-container .refresh-button').on('click', function () {
            utils.getAlllUsers();
        });
    };

    utils.getAlllUsers  = function () {
        //start the application
        
        $('.box.data-container .ajax-spinner-container').addClass('show');

        $.ajax({
            url: '/json',
            success: function (jsonData) {
                utils.renderList(jsonData);
            },
            error: function (err) {
                console.error(err);
            }
        });
    };

    utils.renderList = function (jsonData) {
        var $list = $('.box.data-container .data-list'),
            itemTemplate = '<li class="data-item"></li>';

        $('.box.data-container .ajax-spinner-container').removeClass('show');

        $list.html('');   

        $.each(jsonData, function(index, element) {
            var $item = $(itemTemplate);

            $item.append('<b>Name: </b>');
            $item.append('<span>' + element.name.first +  '</span>');
            $item.append('<span>' + element.name.last +  '</span>');
            $item.append('<b>Phone: </b>');
            $item.append('<span>' + element.phone +  '</span>');

            $list.append($item);
        });
    };

    //initialize the applcation
    utils.init();
})(window, window.jQuery);