;(function($, window, document, undefined){
    function Scheduler(element, options){
        this.element = element;
        this.opts = $.extend({}, Scheduler.defaults, options);

        /** Smallest time step in minutes */
        this.minMinutes = 0;

        /** Largest time step in minutes */
        this.maxMinutes = 1440;

        /** Selected start time in minutes */
        this.selectedStartTime = 0;

        /** Selected end time in minutes */
        this.selectedEndTime = 0;

        /** List of time steps given in minutes */
        this.stepsMinutes = [];

        /** List of names with appointments */
        this.nameList = [];

        this.createView();
        this.setListeners();

        this.selectedStartTime = this.minMinutes + 60;
        this.selectedEndTime = this.minMinutes + 120;
        this.updateSelectors();
    }

    Scheduler.defaults = {
        'pixelsPerHour': 200,
        'snapTo': 5,
        'steps': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
        'list': []
    };

    Scheduler.prototype.public = {
        "selected": function(){
            return {
                'start': this.minutesToTimeStr(this.selectedStartTime),
                'end': this.minutesToTimeStr(this.selectedEndTime)
            }
        }
    };

    Scheduler.prototype.setListeners = function(){
        var that = this;
        var $dragging = null;

        this.element.on("mousemove", function(e) {
            if ($dragging) {
                that.moveSelector($dragging, e.pageX);
            }
        });

        this.element.on("mousedown", ".sjs-selector", function (e) {
            $dragging = $(this);
        });

        this.element.on("mouseup", function (e) {
            if($dragging){
                that.snapSelector($dragging);
            }
            $dragging = null;
        });
        this.element.on("mouseleave", function(e){
            if($dragging){
                that.snapSelector($dragging);
            }
            $dragging = null;
        });
    };

    Scheduler.prototype.updateSelectors = function(){
        this.moveSelector(this.element.find('.sjs-selector[data-selector="start"]'), this.minutesToPageOffset(this.selectedStartTime));
        this.moveSelector(this.element.find('.sjs-selector[data-selector="end"]'), this.minutesToPageOffset(this.selectedEndTime));
    };

    Scheduler.prototype.moveSelector = function(selector, pageOffset){
        selector.offset({
            left: pageOffset
        });

        var minutes = this.pageOffsetToMinutes(pageOffset);
        selector.find('.sjs-selector-text').html(this.minutesToTimeStr(minutes));

        if(selector.data('selector') == 'start'){
            this.selectedStartTime = minutes;
        }else{
            this.selectedEndTime = minutes;
        }

        if(this.selectedStartTime < this.minMinutes){
            this.selectedStartTime = this.minMinutes;
            this.updateSelectors();
        }else if(this.selectedStartTime > this.maxMinutes){
            this.selectedStartTime = this.maxMinutes;
            this.updateSelectors();
        }

        if(this.selectedEndTime < this.minMinutes){
            this.selectedEndTime = this.minMinutes;
            this.updateSelectors();
        }else if(this.selectedEndTime > this.maxMinutes){
            this.selectedEndTime = this.maxMinutes;
            this.updateSelectors();
        }

        if(this.selectedStartTime > this.selectedEndTime){
            this.selectedEndTime = this.selectedStartTime;
            this.updateSelectors();
        }
    };

    Scheduler.prototype.snapSelector = function(selector){
        var pageOffset, snapOffset, snapAmount;
        if(selector.data('selector') == 'start'){
            snapOffset = this.selectedStartTime%this.opts.snapTo;
            if(snapOffset > this.opts.snapTo/2){
                snapAmount = snapOffset - this.opts.snapTo;
            }else{
                snapAmount = snapOffset;
            }
            this.selectedStartTime -= snapAmount;
            pageOffset = this.minutesToPageOffset(this.selectedStartTime);
        }else{
            snapOffset = this.selectedEndTime%this.opts.snapTo;
            if(snapOffset > this.opts.snapTo/2){
                snapAmount = snapOffset - this.opts.snapTo;
            }else{
                snapAmount = snapOffset;
            }
            this.selectedEndTime -= snapAmount;
            pageOffset = this.minutesToPageOffset(this.selectedEndTime);
        }

        this.moveSelector(selector, pageOffset);
    };

    Scheduler.prototype.pageOffsetToMinutes = function(pageOffset){
        var elementOffset = this.element.find('.sjs-grid').first().offset().left;
        return Math.round(60*(pageOffset - elementOffset)/this.opts.pixelsPerHour) + this.minMinutes;
    };

    Scheduler.prototype.minutesToPageOffset = function(minutes){
        var elementOffset = this.element.find('.sjs-grid').first().offset().left;
        return this.minutesToPixels(minutes - this.minMinutes) + elementOffset;
    };

    /**
     * Converts amount of pixels to number of minutes
     */
    Scheduler.prototype.minutesToPixels = function(minutes){
        return Math.round(minutes*this.opts.pixelsPerHour/60);
    };

    /**
     * Converts time string to number of minutes
     */
    Scheduler.prototype.timeStrToMinutes = function(str){
        var split = str.split(':');
        return parseInt(split[0]) * 60 + parseInt(split[1]);
    };

    Scheduler.prototype.minutesToTimeStr = function(minutes){
        var hours = Math.floor(minutes/60);
        var minutesInHour = minutes - hours*60;
        var str = '';

        if(hours < 10){
            str = '0' + String(hours);
        }else{
            str = String(hours);
        }

        if(minutesInHour < 10){
            str += ':0' + String(minutesInHour);
        }else{
            str += ':' + String(minutesInHour);
        }

        return str;
    };

    /**
     * Creates the grid overlay row data that will be used when rendering the layout
     */
    Scheduler.prototype.getGridOverlayRowData = function(){
        var gridOverlayRows = [];
        for (var i = 0; i <  this.opts.list.length; i++) {
            var prevEnd = this.minMinutes;

            var gridOverlayCols = [];
            for (var j = 0; j <  this.opts.list[i].appointments.length; j++) {
                var appointment =  this.opts.list[i].appointments[j];

                var minutesStart = this.timeStrToMinutes(appointment.start);
                var minutesEnd = this.timeStrToMinutes(appointment.end);

                if(minutesEnd < minutesStart){
                    continue;
                }

                if(minutesEnd > this.maxMinutes){
                    minutesEnd = this.maxMinutes;
                }

                if(minutesStart < this.minMinutes){
                    minutesStart = this.minMinutes;
                }

                var length = minutesEnd - minutesStart;

                var lengthSinceLast = minutesStart - prevEnd;
                prevEnd = minutesEnd;

                gridOverlayCols.push({
                    'width': this.minutesToPixels(length),
                    'margin': this.minutesToPixels(lengthSinceLast),
                    'title': appointment.title,
                    'start': appointment.start,
                    'end': appointment.end
                });
            }

            gridOverlayRows.push({
                'grid-overlay-cols': gridOverlayCols
            });
        }

        return gridOverlayRows;
    };

    Scheduler.prototype.createView = function(){
        this.nameList= this.opts.list.map(function(elem){
            return {name: elem.name};
        });

        this.stepsMinutes = this.opts.steps.map(this.timeStrToMinutes);
        this.minMinutes = Math.min.apply(Math, this.stepsMinutes);
        this.maxMinutes = Math.max.apply(Math, this.stepsMinutes);

        var gridColsHead = [];
        var gridCols = [];
        for (var i = 0; i < this.stepsMinutes.length - 1; i++) {
            var length = this.stepsMinutes[i + 1] - this.stepsMinutes[i];
            gridColsHead.push({'width': this.minutesToPixels(length), 'time': this.opts.steps[i]});
            gridCols.push({'width': this.minutesToPixels(length)});
        }

        var gridRows = [];
        for(i = 0; i < this.opts.list.length; i++){
            gridRows.push({'grid-cols': gridCols});
        }

        this.element.html(schedulerjsTemplates.layout({
            'names': this.nameList,
            'grid-cols-head': gridColsHead,
            'grid-rows': gridRows,
            'grid-overlay-rows': this.getGridOverlayRowData()
        }));

        // Since the grid and grid overlay are absolutely positioned, they
        // don't take up any height. Therefore we find the height of the grid here,
        // and use a dummy div to fill the area with that height
        // Also adding some pixels to accommodate the selectors
        var gridHeight = this.element.find('.sjs-grid').first().height();
        var extraHeightForSelectors = 30; /* Should be big enough to make room for the selector boxes */
        var selectorsMarginTop = 15; /* Should equal the margin-top of the selectors */
        this.element.find('.sjs-fill-height').first().height(gridHeight + extraHeightForSelectors);
        this.element.find('.sjs-selector').height(gridHeight + extraHeightForSelectors - selectorsMarginTop);
    };

    $.fn.schedulerjs = function(opts){
        var args = arguments;
        var retVal;
        var pluginName = 'schedulerjs';

        this.each(function () {
            var plugin;

            if (!$.data(this, pluginName)) {
                if(typeof opts !== 'object'){
                    $.error(pluginName + " needs an options object for initialization.");
                    return;
                }
                $.data(this, pluginName,
                    new Scheduler( $(this), opts ));
            }

            plugin = $.data(this, pluginName);

            if(typeof opts !== 'object') {
                if(plugin.public[opts]){
                    retVal = plugin.public[opts].apply(plugin, Array.prototype.slice( args, 1 ));
                }else{
                    $.error( 'Method ' +  opts + ' does not exist in ' + pluginName );
                }
            }
        });

        if(retVal !== undefined){
            return retVal;
        }

        return this;
    };
})(jQuery, window, document);
