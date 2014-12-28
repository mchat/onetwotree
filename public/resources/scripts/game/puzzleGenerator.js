define([
    'jquery',
    'game/dataStructures/operation',
],
function($, Operation) {

    'use strict';

    function Easy() {
        return {
            initValues: [100, 50],
            initOps: []
        };
    }

    function Medium() {
    	var initValues = [100, 0, 25, 15, 0, 0, 0, 7, 0, 0, 24, 3, 4, 2, 5];
	    var initOps = [0, 0, 0, 0, 0, 0, 0, Operation.ADD(), 0, 0];

	    return {
	    	initValues: initValues,
	    	initOps: initOps
	    };
    }

    function Hard() {

        return {
            initValues: [100],
            initOps: []
        };

    }

    return {
        Easy: Easy,
    	Medium: Medium,
        Hard: Hard
    };

});


