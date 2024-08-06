auto()
function auto() {
    MakeCommonLinks()
}

function Calculate() {

    let StartTimeHH = document.getElementById("hourInput").value
    let StartTimeMM = document.getElementById("minuteInput").value

    let EndTimeHH = document.getElementById("hourInputEnd").value
    let EndTimeMM = document.getElementById("minuteInputEnd").value

    let StartTimeAMPM = document.getElementById("StartTimeAMPM").value
    let EndTimeAMPM = document.getElementById("EndTimeAMPM").value

    if(!StartTimeHH || !StartTimeMM || !EndTimeHH || !EndTimeMM){
        return alert("Please enter the timings")
    }

    let StartTime = StartTimeHH + ":" + StartTimeMM + StartTimeAMPM
    let EndTime = EndTimeHH + ":" + EndTimeMM + EndTimeAMPM
    console.log(StartTime);

    let timeDifference = calculateTimeDifference(StartTime, EndTime)


    let container = document.getElementById("ResultContainer")
    container.style.display = "block !important"

    container.innerHTML = `

        <div class="container mt-5 d-flex justify-content-center" id="ResultContainer">
        <div class="result-box">
            <div>
                <h4>${StartTime} to ${EndTime} is how many hours?</h4>
            <p>${StartTime} to ${EndTime} is <strong>${timeDifference.hours} hours,</strong> and <strong>${timeDifference.minutes} minutes.</strong> </p>
            </div>
            <div class="mt-3">
                <h3>${StartTime} to ${EndTime} is how many minutes?</h3>
            <p>${StartTime} to ${EndTime} is <strong>${timeDifference.totalMinutes} minutes.</strong> </p>
            </div>
        </div>
    </div>
    `

    container.scrollIntoView()
}

function calculateTimeDifference(startTime, endTime) {
    // Convert am/pm to 24-hour format
    const start = new Date(`1970-01-01T${convertTo24Hour(startTime)}Z`);
    const end = new Date(`1970-01-01T${convertTo24Hour(endTime)}Z`);

    // Adjust for times that span across midnight
    if (end <= start) {
        end.setDate(end.getDate() + 1);
    }

    let difference = end - start;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const totalMinutes = Math.floor(difference / (1000 * 60));

    return { hours, minutes, totalMinutes };
}

function convertTo24Hour(time) {
    let [hour, minute, period] = time.match(/(\d{1,2}):(\d{2})(am|pm)/).slice(1);
    hour = parseInt(hour, 10);
    minute = parseInt(minute, 10);

    if (period === 'pm' && hour !== 12) hour += 12;
    if (period === 'am' && hour === 12) hour = 0;
    if (period === 'pm' && hour === 12) hour = 12; 

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}



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

    document.getElementById("CommonLinksContainer").innerHTML = content


}


const hourInput = document.getElementById('hourInput');
const minuteInput = document.getElementById('minuteInput');

// Select input content on focus
hourInput.addEventListener('focus', function () {
    this.select(); // Select the content on focus
});

minuteInput.addEventListener('focus', function () {
    this.select(); // Select the content on focus
});

// Clear input content on first input and automatically shift focus to minute input when hour is entered
hourInput.addEventListener('input', function () {
    if (this.selectionStart === 0 && this.selectionEnd === this.value.length) {
        this.value = ''; // Clear the field only if it was fully selected
    }
    if (this.value.length === 2) {
        minuteInput.focus();
    }
});

// Ensure valid hour input and prepend with zero if needed
hourInput.addEventListener('blur', function () {
    let value = parseInt(this.value, 10);
    if (value > 12) {
        this.value = '12';
    } else if (value < 1 || isNaN(value)) {
        this.value = '01';
    } else {
        this.value = value.toString().padStart(2, '0');
    }
});

// Prevent input of values greater than 59 in real-time
minuteInput.addEventListener('input', function () {
    if (this.selectionStart === 0 && this.selectionEnd === this.value.length) {
        this.value = ''; // Clear the field only if it was fully selected
    }
    let value = parseInt(this.value, 10);
    if (value > 59) {
        this.value = '59';
    }
});

// Ensure valid minute input and prepend with zero if needed
minuteInput.addEventListener('blur', function () {
    let value = parseInt(this.value, 10);
    if (value < 10 && value >= 0) {
        this.value = value.toString().padStart(2, '0');
    }
});


const hourInputEnd = document.getElementById('hourInputEnd');
const minuteInputEnd = document.getElementById('minuteInputEnd');

// Select input content on focus
hourInputEnd.addEventListener('focus', function () {
    this.select(); // Select the content on focus
});

minuteInputEnd.addEventListener('focus', function () {
    this.select(); // Select the content on focus
});

// Clear input content on first input and automatically shift focus to minute input when hour is entered
hourInputEnd.addEventListener('input', function () {
    if (this.selectionStart === 0 && this.selectionEnd === this.value.length) {
        this.value = ''; // Clear the field only if it was fully selected
    }
    if (this.value.length === 2) {
        minuteInputEnd.focus();
    }
});

// Ensure valid hour input and prepend with zero if needed
hourInputEnd.addEventListener('blur', function () {
    let value = parseInt(this.value, 10);
    if (value > 12) {
        this.value = '12';
    } else if (value < 1 || isNaN(value)) {
        this.value = '01';
    } else {
        this.value = value.toString().padStart(2, '0');
    }
});

// Prevent input of values greater than 59 in real-time
minuteInputEnd.addEventListener('input', function () {
    if (this.selectionStart === 0 && this.selectionEnd === this.value.length) {
        this.value = ''; // Clear the field only if it was fully selected
    }
    let value = parseInt(this.value, 10);
    if (value > 59) {
        this.value = '59';
    }
});

// Ensure valid minute input and prepend with zero if needed
minuteInputEnd.addEventListener('blur', function () {
    let value = parseInt(this.value, 10);
    if (value < 10 && value >= 0) {
        this.value = value.toString().padStart(2, '0');
    }
});