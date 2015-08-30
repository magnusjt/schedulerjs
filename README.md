# Schedulerjs

A jQuery plugin that let's you display a schedule,
and move time pickers within the schedule to find a time where everyone is free.

### Demo
http://magnustovslid.com/projects/schedulerjs

### Dependencies
* jQuery
* Hogan.js (from twitter)

### Basic usage
See the examples folder for usage.

The basic setup is shown below. Note that currently all times must be represented in the format hh:ss.
The class property refers to a css class of your choice. It allows you to set a different background
color based on the type of appointment.

````
var list = [
    {
        'name': 'Chewbacca',
        'appointments': [
            {'start': '08:05', 'end': '09:00', 'title': 'Make strange noises', 'class': 'meeting', 'payload': {myId: 1}},
        ]
    },
    {
        'name': 'Darth Vader',
        'appointments': [
            {'start': '12:00', 'end': '13:30', 'title': 'Swing lightsaber in anger', 'class': 'meeting'},
            {'start': '14:30', 'end': '15:30', 'title': 'Test the death star superlaser', 'class': 'meeting'},
            {'start': '14:00', 'end': '14:30', 'title': 'Strangle people with lack of faith', 'class': 'meeting'}
        ]
    }
];

// Customize what time steps are shown in the scheduler
var steps = [
    '08:05',
    '09:00',
    '10:00',
    '11:30',
    '12:05',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
];

// Set the granularity of the time selectors (what nearest time they snap to)
var snapTo = 5; // 5 minutes
var pixelsPerHour = 180; // How wide an hour should be, in pixels
var headName = 'Names'; // Text displayed on top of the list of names
var defaultStartTime = '09:00';
var defaultEndTime = '11:00';
var onClickAppointment = function(payload){
    // Do something with the payload
};

var $scheduler = $("#scheduler").schedulerjs({
    'list': list,
    'steps': steps,
    'snapTo': snapTo,
    'pixelsPerHour': pixelsPerHour,
    'start': defaultStartTime,
    'end': defaultEndTime,
    'headName': headName,
    'onClickAppointment': onClickAppointment
});
````

Retrieve the selected times:

````
var times = $scheduler.schedulerjs('selected');
$("#times").html(times.start + ' - ' + times.end);


// Alternatively:
var start = $scheduler.schedulerjs('start');
var end = $scheduler.schedulerjs('end');
````

Change selected times programmatically:

````
var startTime = $scheduler.schedulerjs('start', '11:00');
var endTime = $scheduler.schedulerjs('end', '11:30');

// The return values are what time was actually set
// Should equal what you put in
````

Update list content:

````
$scheduler.schedulerjs('update', list);
````

Show/hide/toggle time selector:

````
$scheduler.schedulerjs('toggleSelector');
$scheduler.schedulerjs('showSelector');
$scheduler.schedulerjs('hideSelector');
````