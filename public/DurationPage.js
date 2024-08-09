
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
