document.addEventListener('DOMContentLoaded', function() {
    const movieSelect = document.getElementById('movie-select');
    const theaterSelect = document.getElementById('theater-select');
    const seatSelect = document.getElementById('seat-select');
    const paymentButton = document.getElementById('payment-button');

    movieSelect.addEventListener('change', function() {
        const movieId = this.value;
        fetch(`/api/theaters?movieId=${movieId}`)
            .then(response => response.json())
            .then(data => {
                theaterSelect.innerHTML = '';
                data.forEach(theater => {
                    const option = document.createElement('option');
                    option.value = theater.id;
                    option.textContent = theater.name;
                    theaterSelect.appendChild(option);
                });
            });
    });

    theaterSelect.addEventListener('change', function() {
        const theaterId = this.value;
        fetch(`/api/seats?theaterId=${theaterId}`)
            .then(response => response.json())
            .then(data => {
                seatSelect.innerHTML = '';
                data.forEach(seat => {
                    const option = document.createElement('option');
                    option.value = seat.id;
                    option.textContent = seat.number;
                    seatSelect.appendChild(option);
                });
            });
    });

    paymentButton.addEventListener('click', function() {
        const seatId = seatSelect.value;
        fetch('/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seatId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Payment successful!');
            } else {
                alert('Payment failed: ' + data.message);
            }
        });
    });
});