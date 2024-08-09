const express = require('express');
const PORT = process.env.PORT || 5001;
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
});


app.get('/', (req, res) => {
    let CommonLinks = MakeCommonLinks()
    res.render('HomePage', {CommonLinks});
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


app.get('/days-between-dates-calculator', (req, res) => {
    let CommonLinks = MakeCommonLinks()
    res.render('Duration',{CommonLinks});
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
    const currentUrl = `https://${req.get('host')}${req.originalUrl}`;

    let CommonLinks = MakeCommonLinks()
    res.render('TimePage', { startTime, endTime, timeDifference, currentUrl, CommonLinks });
});


function generateTimeFrames(startHour, endHour) {
    const timeFrames = [];
    const formatTime = (hour) => {
        const suffix = hour >= 12 ? 'pm' : 'am';
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${displayHour}${suffix}`;
    };

    for (let start = startHour; start < endHour; start++) {
        for (let end = start + 1; end <= endHour; end++) {
            const startTime = formatTime(start);
            const endTime = formatTime(end);
            timeFrames.push(`${startTime}-${endTime}`);
        }
    }

    return timeFrames;
}

function getRandomElements(arr, count) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function replaceDashWithTo(timeFrames) {
    return timeFrames.map(frame => frame.replace('-', ' to '));
}

function MakeCommonLinks() {
    const timeFrames = generateTimeFrames(1, 23);
    const randomTimeFrames = getRandomElements(timeFrames, 27);
    const formattedTimeFrames = replaceDashWithTo(randomTimeFrames);

    let content = `
        <div class="row mt-4 margin5px">
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[0]}">${formattedTimeFrames[0]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[1]}">${formattedTimeFrames[1]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[2]}">${formattedTimeFrames[2]}</a></div>
        </div>

        <div class="row mt-4 margin5px">
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[3]}">${formattedTimeFrames[3]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[4]}">${formattedTimeFrames[4]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[5]}">${formattedTimeFrames[5]}</a></div>
        </div>

        <div class="row mt-4 margin5px">
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[6]}">${formattedTimeFrames[6]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[7]}">${formattedTimeFrames[7]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[8]}">${formattedTimeFrames[8]}</a></div>
        </div>

        <div class="row mt-4 margin5px">
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[9]}">${formattedTimeFrames[9]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[10]}">${formattedTimeFrames[10]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[11]}">${formattedTimeFrames[11]}</a></div>
        </div>

        <div class="row mt-4 margin5px">
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[12]}">${formattedTimeFrames[12]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[13]}">${formattedTimeFrames[13]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[14]}">${formattedTimeFrames[14]}</a></div>
        </div>


        <div class="row mt-4 margin5px">
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[15]}">${formattedTimeFrames[15]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[16]}">${formattedTimeFrames[16]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[17]}">${formattedTimeFrames[17]}</a></div>
        </div>

        <div class="row mt-4 margin5px">
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[18]}">${formattedTimeFrames[18]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[19]}">${formattedTimeFrames[19]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[20]}">${formattedTimeFrames[20]}</a></div>
        </div>

        <div class="row mt-4 margin5px">
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[21]}">${formattedTimeFrames[21]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[22]}">${formattedTimeFrames[22]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[23]}">${formattedTimeFrames[23]}</a></div>
        </div>

        <div class="row mt-4 margin5px">
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[24]}">${formattedTimeFrames[24]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[25]}">${formattedTimeFrames[25]}</a></div>
            <div class="col-12 col-md-4 item"> <a href="/${randomTimeFrames[26]}">${formattedTimeFrames[26]}</a></div>
        </div>

        
        `

    return content

}

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