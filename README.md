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

````
var list = [
    {
        'name': 'Chewbacca',
        'appointments': [
            {'start': '08:05', 'end': '09:00', 'title': 'Make strange noises'},
        ]
    },
    {
        'name': 'Darth Vader',
        'appointments': [
            {'start': '12:00', 'end': '13:30', 'title': 'Swing lightsaber in anger'},
            {'start': '14:30', 'end': '15:30', 'title': 'Test the death star superlaser'},
            {'start': '14:00', 'end': '14:30', 'title': 'Strangle people with lack of faith'}
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

var $scheduler = $("#scheduler").schedulerjs({
    'list': list,
    'steps': steps
});
````

To retrieve the selected times:

````
var times = $scheduler.schedulerjs('selected');
$("#times").html(times.start + ' - ' + times.end);
````