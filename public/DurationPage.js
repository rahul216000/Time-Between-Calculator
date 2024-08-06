auto()
function auto() {
    MakeCommonLinks()
}

function calculateDuration() {
    let startDate = new Date(document.getElementById('start-date').value);
    let endDate = new Date(document.getElementById('end-date').value);
    const includeEndDate = document.getElementById('include-end-date').checked;
    const messageDiv = document.getElementById('message');

    if (!isNaN(startDate) && !isNaN(endDate)) {
        if (startDate > endDate) {
            [startDate, endDate] = [endDate, startDate];
            messageDiv.style.display = "block"
            messageDiv.innerHTML = `Start date was greater than end date, so the dates were <strong>swapped</strong>.`;
        } else {
            messageDiv.style.display = "none"
            messageDiv.innerHTML = '';
        }

        let diffTime = endDate - startDate;
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (includeEndDate) {
            diffDays += 1;
        }

        let years = Math.floor(diffDays / 365);
        let months = Math.floor((diffDays % 365) / 30);
        let days = diffDays - (years * 365) - (months * 30);

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p><strong>From and including:</strong> ${startDate.toDateString()}</p>
            <p><strong>To ${includeEndDate ? 'and including' : 'but not including'}:</strong> ${endDate.toDateString()}</p>
            <p><strong>Result:</strong> ${diffDays} day${diffDays !== 1 ? 's' : ''}</p>
            <p>It is <strong>${diffDays} day${diffDays !== 1 ? 's' : ''}</strong> from the start date to the end date${includeEndDate ? ', including' : ', but not including'} the end date.</p>
            <strong>${years > 0 ? `<p>Or ${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}, ${days} day${days !== 1 ? 's' : ''}</strong> including the end date.</p>` : ''}
            ${years === 0 && months > 0 ? `<p>Or <strong>${months} month${months !== 1 ? 's' : ''}, ${days} day${days !== 1 ? 's' : ''}</strong> including the end date.</p>` : ''}
            <h3>Alternative time units</h3>
            <ul>
                <li><strong>${diffDays * 24 * 60 * 60} seconds</strong></li>
                <li><strong>${diffDays * 24 * 60} minutes</strong></li>
                <li><strong>${diffDays * 24} hours</strong></li>
                <li><strong>${diffDays} day${diffDays !== 1 ? 's' : ''}</strong></li>
                <li><strong>${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} and ${diffDays % 7} day${diffDays % 7 !== 1 ? 's' : ''}</strong></li>
            </ul>
        `;

        document.getElementById("ResultContainer").style.display = "block"
    } else {
        document.getElementById("ResultContainer").style.display = "none"
        return alert("Please select valid start and end dates.")
    }
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

