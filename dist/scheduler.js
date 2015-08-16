/* global Hogan */
var schedulerjsTemplates = (function() {
  
var t = {
  /* jshint ignore:start */
  'layout' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"sjs-wrapper\">\r");t.b("\n" + i);t.b("    <div class=\"sjs-name-col\">\r");t.b("\n" + i);t.b("        <div class=\"sjs-name-head\"></div>\r");t.b("\n" + i);if(t.s(t.f("names",c,p,1),c,p,0,120,180,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <div class=\"sjs-name\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>\r");t.b("\n" + i);});c.pop();}t.b("    </div>\r");t.b("\n" + i);t.b("    <div class=\"sjs-app-col\">\r");t.b("\n" + i);t.b("        <div class=\"sjs-grid\">\r");t.b("\n" + i);t.b("            <div class=\"sjs-grid-row-head\">\r");t.b("\n" + i);if(t.s(t.f("grid-cols-head",c,p,1),c,p,0,347,507,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                    <div class=\"sjs-grid-col-head\" style=\"width:");t.b(t.v(t.f("width",c,p,0)));t.b("px;\">\r");t.b("\n" + i);t.b("                        ");t.b(t.v(t.f("time",c,p,0)));t.b("\r");t.b("\n" + i);t.b("                    </div>\r");t.b("\n" + i);});c.pop();}t.b("            </div>\r");t.b("\n" + i);if(t.s(t.f("grid-rows",c,p,1),c,p,0,574,813,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                <div class=\"sjs-grid-row\">\r");t.b("\n" + i);if(t.s(t.f("grid-cols",c,p,1),c,p,0,654,761,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                        <div class=\"sjs-grid-col\" style=\"width:");t.b(t.v(t.f("width",c,p,0)));t.b("px;\"></div>\r");t.b("\n" + i);});c.pop();}t.b("                </div>\r");t.b("\n" + i);});c.pop();}t.b("        </div>\r");t.b("\n" + i);t.b("        <div class=\"sjs-grid-overlay\">\r");t.b("\n" + i);t.b("            <div class=\"sjs-grid-overlay-row-head\"></div>\r");t.b("\n" + i);if(t.s(t.f("grid-overlay-rows",c,p,1),c,p,0,978,1553,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                <div class=\"sjs-grid-overlay-row\">\r");t.b("\n" + i);if(t.s(t.f("grid-overlay-cols",c,p,1),c,p,0,1074,1493,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                        <div class=\"sjs-grid-overlay-col\" style=\"width:");t.b(t.v(t.f("width",c,p,0)));t.b("px;margin-left:");t.b(t.v(t.f("margin",c,p,0)));t.b("px;\" title=\"");t.b(t.v(t.f("title",c,p,0)));t.b(" ");t.b(t.v(t.f("start",c,p,0)));t.b("-");t.b(t.v(t.f("end",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("                            <span class=\"sjs-grid-overlay-col-title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("                            <br />\r");t.b("\n" + i);t.b("                            <span class=\"sjs-grid-overlay-col-time\">");t.b(t.v(t.f("start",c,p,0)));t.b("-");t.b(t.v(t.f("end",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("                        </div>\r");t.b("\n" + i);});c.pop();}t.b("                </div>\r");t.b("\n" + i);});c.pop();}t.b("        </div>\r");t.b("\n" + i);t.b("        <div class=\"sjs-fill-height\"></div>\r");t.b("\n" + i);t.b("        <div class=\"sjs-selector\" data-selector=\"start\">\r");t.b("\n" + i);t.b("            <div class=\"sjs-selector-inner\">\r");t.b("\n" + i);t.b("                <div class=\"sjs-selector-text\">Start</div>\r");t.b("\n" + i);t.b("            </div>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div class=\"sjs-selector\" data-selector=\"end\">\r");t.b("\n" + i);t.b("            <div class=\"sjs-selector-inner\">\r");t.b("\n" + i);t.b("                <div class=\"sjs-selector-text\">End</div>\r");t.b("\n" + i);t.b("            </div>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }})
  /* jshint ignore:end */
},
r = function(n) {
  var tn = t[n];
  return function(c, p, i) {
    return tn.render(c, p || t, i);
  };
};
return {
  'layout' : r('layout')
};
})();
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

        if(this.opts.start !== undefined){
            this.selectedStartTime = this.timeStrToMinutes(this.opts.start);
        }else{
            this.selectedStartTime = this.minMinutes + 60;
        }
        if(this.opts.end !== undefined){
            this.selectedEndTime = this.timeStrToMinutes(this.opts.end);
        }else{
            this.selectedEndTime = this.minMinutes + 120;
        }

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
        },
        "start": function(startTime){
            if(startTime !== undefined){
                this.selectedStartTime = this.timeStrToMinutes(startTime);
                this.updateSelectors();
            }

            return this.minutesToTimeStr(this.selectedStartTime);
        },
        "end": function(endTime){
            if(endTime !== undefined){
                this.selectedEndTime = this.timeStrToMinutes(endTime);
                this.updateSelectors();
            }

            return this.minutesToTimeStr(this.selectedEndTime);
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
        var args = Array.prototype.slice.call(arguments, 1);
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
                    retVal = plugin.public[opts].apply(plugin, args);
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
