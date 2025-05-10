export class SeatSelectionService {
    constructor() {
        this.availableSeats = [];
        this.bookedSeats = new Set();
    }

    initializeSeats(rows, cols) {
        this.availableSeats = Array.from({ length: rows }, () => Array(cols).fill(true));
    }

    selectSeat(row, col) {
        if (this.availableSeats[row][col]) {
            this.availableSeats[row][col] = false;
            this.bookedSeats.add(`${row}-${col}`);
            return true;
        }
        return false;
    }

    deselectSeat(row, col) {
        if (this.bookedSeats.has(`${row}-${col}`)) {
            this.availableSeats[row][col] = true;
            this.bookedSeats.delete(`${row}-${col}`);
            return true;
        }
        return false;
    }

    getAvailableSeats() {
        return this.availableSeats;
    }

    getBookedSeats() {
        return Array.from(this.bookedSeats);
    }

    clearSelections() {
        this.availableSeats.forEach((row, rowIndex) => {
            row.forEach((seat, colIndex) => {
                if (!seat) {
                    this.availableSeats[rowIndex][colIndex] = true;
                }
            });
        });
        this.bookedSeats.clear();
    }
}