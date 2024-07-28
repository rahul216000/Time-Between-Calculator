const express = require('express');
const PORT = process.env.PORT || 5001;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const timeRanges = [
    '6am-3pm', '8am-2pm', '1pm-7am', '10am-6pm', '9am-5pm', '7pm-6pm', '12am-1am',
    '4am-12am', '11am-1am', '5am-2pm', '12am-11pm', '12am-7am', '11pm-7pm',
    '11pm-9pm', '8pm-8am'
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function isValidTimeFormat(time) {
    return /^([1-9]|1[0-2])(am|pm)$/.test(time);
}

app.get('/', (req, res) => {
    const shuffledTimeRanges = shuffle([...timeRanges]);
    res.render('HomePage', { result: null, startTime: null, endTime: null, timeRanges: shuffledTimeRanges });
});

app.post('/calculate', (req, res) => {
    const { startTime, endTime } = req.body;

    const timeDifference = calculateTimeDifference(startTime, endTime);
    const shuffledTimeRanges = shuffle([...timeRanges]);

    res.render('HomePage', { result: timeDifference, startTime, endTime, timeRanges: shuffledTimeRanges });
});


function calculateTimeDifference(startTime, endTime) {
    // Parse the start and end times
    let start = new Date(`1970-01-01T${startTime}Z`);
    let end = new Date(`1970-01-01T${endTime}Z`);

    // Calculate the difference in milliseconds
    let difference = end - start;

    // Handle cases where the end time is before the start time (assuming end time is on the next day)
    if (difference < 0) {
        end.setDate(end.getDate() + 1);
        difference = end - start;
    }

    // Convert the difference to hours and minutes
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let totalMinutes = Math.floor(difference / (1000 * 60));

    return { hours, minutes, totalMinutes };
}

// app.get('/:startTime-to-:endTime', (req, res) => {
//     const { startTime, endTime } = req.params;

//     // Convert times to 24-hour format for calculation
//     const convertTo24Hour = (time) => {
//         let [hour, period] = time.match(/(\d+)(am|pm)/).slice(1, 3);
//         hour = parseInt(hour, 10);
//         if (period === 'pm' && hour !== 12) hour += 12;
//         if (period === 'am' && hour === 12) hour = 0;
//         return `${hour.toString().padStart(2, '0')}:00`;
//     };

//     const startTime24 = convertTo24Hour(startTime);
//     const endTime24 = convertTo24Hour(endTime);

//     const timeDifference = calculateTimeDifference(startTime24, endTime24);

//     res.render('TimePage', { startTime, endTime, timeDifference });
// });

app.get('/:startTime-:endTime', (req, res) => {
    const { startTime, endTime } = req.params;

    if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
        return res.status(404).render('notfound');
    }


    const convertTo24Hour = (time) => {
        let [hour, period] = time.match(/(\d+)(am|pm)/).slice(1, 3);
        hour = parseInt(hour, 10);
        if (period === 'pm' && hour !== 12) hour += 12;
        if (period === 'am' && hour === 12) hour = 0;
        return `${hour.toString().padStart(2, '0')}:00`;
    };

    const startTime24 = convertTo24Hour(startTime);
    const endTime24 = convertTo24Hour(endTime);

    const timeDifference = calculateTimeDifference(startTime24, endTime24);
    const shuffledTimeRanges = shuffle([...timeRanges]);

    res.render('TimePage', { startTime, endTime, timeDifference });
});

app.use((req, res) => {
    res.status(404).render('NotFound');
});

// https://docs.google.com/document/d/1w97-e9zU05xrFiIfYlKN8YmQTlny5LKypXMGYeOyVpk/edit
// https://docs.google.com/document/d/1VDql9iV6o_cUdCN42HU9mR1HcuhmBfgO1YLHcJgtHa8/edit#heading=h.z9h7sa1kmbso


app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    } else {
        console.log('Server not started ' + error);
    }

});