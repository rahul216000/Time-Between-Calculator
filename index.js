const express = require('express');
const PORT = process.env.PORT || 5001;
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res) => {
    res.render('HomePage');
});

app.get('/about-us', (req, res) => {
    res.render('AboutUs');
});

app.get('/privacy-policy', (req, res) => {
    res.render('PrivacyPolicy');
});


app.get('/terms-and-conditions', (req, res) => {
    res.render('Terms');
});

app.get('/contact', (req, res) => {
    res.render('ContactUs');
});


app.get('/duration', (req, res) => {
    res.render('Duration');
});



app.post('/calculate', (req, res) => {
    const { startTime, endTime } = req.body;

    const timeDifference = calculateTimeDifference(startTime, endTime);

    res.render('HomePage', { result: timeDifference, startTime, endTime});
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

function isValidTimeFormat(time) {
    return /^([1-9]|1[0-2])(am|pm)$/.test(time);
}

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
    res.render('TimePage', { startTime, endTime, timeDifference });
});

app.use((req, res) => {
    res.status(404).render('NotFound');
});


app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    } else {
        console.log('Server not started ' + error);
    }

});