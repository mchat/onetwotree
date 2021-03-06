define([
    'jquery',
    'hbs!/onetwotree/public/resources/templates/board_funnel',
    'hbs!/onetwotree/public/resources/templates/gameOver',
    'app.config'
], function ($, _BoardFunnelTemplate, _GameOverTemplate,
    Config) {

    'use strict';

    /** The maximum number of nodes in the bottom row of the puzzle. */
    var maxNodesPerRow;

    /**
     * Set the size of each node box relative to the width of the workspace.
     */
    Config.setNodeBoxSize = function () {
        var maxWidth, maxHeight,
            workspaceWidth = $('#workspace').width();

        maxWidth = Math.floor(workspaceWidth / (
            maxNodesPerRow + 1));
        maxHeight = Math.floor(maxWidth * 1.4);


        $('.nodeBox').css({
            'width': maxWidth + 'px'
        });
        $('.nodeBox .node').css({
            'height': (maxHeight * 0.65) + 'px'
        });
        $('.nodeBox .op').css({
            'height': (maxHeight * 0.35) + 'px'
        });

        /* Adjust alert size as well. */
        $('#alert').css({
            'width': workspaceWidth
        });
    };

    /**
     * Constructor for the view of the game MVC.
     * @param {string} el - CSS selector of element in which to display view
     * @param {GameModel} model - the model of the game MVC
     */
    return function GameView(el, model) {

        /**
         * Render the game view.
         */
        this.render = function () {

            var boardData = {},
                i;

            /* Gather data for each node. */
            for (i = 0; i < model.puzzle.numNodes; i++) {
                var node = model.puzzle.nodes[i];
                boardData['node' + i] = {
                    index: i,
                    node: node,
                    Config: Config
                };
            }

            /* Set the difficulty level of the puzzle. */
            boardData.easy = model.puzzle.numNodes === 10;
            boardData.medium = model.puzzle.numNodes === 15;
            boardData.hard = model.puzzle.numNodes === 21;

            /* Inject HTML from Handlebars template into the given element. */
            $(el).html(_BoardFunnelTemplate(boardData));

            for (i = 0; i < model.puzzle.numNodes; i++) {
                if (!model.puzzle.nodes[i].op) {
                    break;
                }
                $('#' + i + 'op').val(model.puzzle.nodes[i].op.symbol);
            }

            /* Render the points view. */
            this.renderPoints();

            /* Set the maximum number of nodes per row for later reference. */
            if (model.puzzle.numNodes === 10) {
                maxNodesPerRow = 4;
            } else if (model.puzzle.numNodes === 15) {
                maxNodesPerRow = 5;
            } else if (model.puzzle.numNodes === 21) {
                maxNodesPerRow = 6;
            }

            Config.setNodeBoxSize();

            window.scrollTo(0, 0);
        };

        /**
         * Render the points view.
         */
        this.renderPoints = function () {
            $('#points').html('Points: ' + model.points);

            /* If game is over, display notification. */
            if (model.gameOver) {
                $('.nodeBox.node').attr('disabled', 'disabled');
                $('.nodeBox.op').attr('disabled', 'disabled');

                $('#board').attr('class', 'gameOver');

                $('#alert').html(_GameOverTemplate(model));
            }
        };

    };

});