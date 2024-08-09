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
    document.getElementById("ContentContainer").style.display = "none"
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