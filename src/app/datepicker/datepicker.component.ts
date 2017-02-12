import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

	todayDate = new Date();

	months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	minYear = (this.todayDate.getFullYear() - 100);
	maxYear = (this.todayDate.getFullYear() + 100);

	currentYear: number = this.todayDate.getFullYear();

	years: Array<number> = this.getYearRange(this.minYear, this.maxYear);

	currentMonth: number = this.todayDate.getMonth();
	currentDate: number = this.todayDate.getDate();
	currentDay: string;

	daysInCurrentMonth: number;
	currentMonthObj;

	// Positioning Variables
	positionX: string;
	positionY: string;
	opacity = '0';
	displayToggle = false;

	constructor() { }

	ngOnInit() {
		this.currentMonthObj = this.buildMonthObject(this.currentMonth, this.currentYear);
	}

	show() {
		this.displayToggle = true;
		setTimeout(() => {
			this.opacity = '100';
		}, 100);
	}

	hide() {
		this.opacity = '0';
		setTimeout(() => {
			this.displayToggle = false;
		}, 600);
	}

	getDaysInMonth(month: number, year: number) {
		return new Date(year, (month + 1), 0).getDate();
	}

	getYearRange(min: number, max: number) {
		const years: Array<number> = [];
		for (let i = min; i < max; i++) {
			years.push(i);
		}

		return years;
	}

	selectDay(day) {
		this.currentDate = day;
		setTimeout(() => {
			this.hide();
		}, 500);
	}

	toggleCalendar(event) {
		this.positionX = event.layerX + 'px';
		this.positionY = event.layerY + 'px';

		if (this.displayToggle) {
			this.hide();
		} else {
			this.show();
		}
	}

	buildMonthObject(month: number, year: number) {
		const daysInMonth = this.getDaysInMonth(month, year);

		const weeks = new Array(5);
		let week = new Array(7);
		let currentWeek = 0;

		let startDate = 1;
		let endDate = 7;

		let monthLoop = false;

		while (monthLoop === false) {
			// console.group('Week ' + currentWeek);

			let currentDay = 1;
			week = new Array(7);

			// console.log('Week Start Day: ', startDate);
			// console.log('Week End Day: ', endDate);

			for (let day = startDate; day <= endDate; day++) {
				currentDay = day;
				// console.group('Current Day: ' + currentDay);

				if (currentDay > daysInMonth) {
					// console.groupEnd();
					break;
				}

				const theDate = new Date(year, month, day);
				const weekday = theDate.getDay();
				// console.log('Weekday: ', weekday);

				week[weekday] = day;
				if (weekday === 6) {
					// console.log('End of week reached');
					// console.log('Week Array', week);
					// console.groupEnd();
					break;
				}
				// console.log('Week Array', week);
				// console.groupEnd();
			}

			weeks[currentWeek] = week;
			// console.log('Array of Weeks: ', weeks);

			// console.groupEnd();
			currentWeek++;
			startDate = currentDay + 1;
			endDate = startDate + 7;

			if (currentDay >= daysInMonth) {
				monthLoop = true;
			}
		}

		return weeks;
	}

}
