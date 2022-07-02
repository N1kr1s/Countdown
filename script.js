class Countdown {
  constructor() {
    this.inputContainer = document.getElementById('input-container');
    this.countdownForm = document.getElementById('countdownFrom');
    this.dateEl = document.getElementById('date-picker');
    this.setMinimumDate();
    this.countdownTitle = '';
    this.countdownDate = '';
    this.countdownValue = Date;
    this.countdownEl = document.getElementById('countdown');
    this.countdownElTitle = document.getElementById('countdown-title');
    this.countdownBtn = document.getElementById('countdown-button');
    this.timeElements = document.getElementsByTagName('span');
    this.completeEl = document.getElementById('complete');
    this.completeElInfo = document.getElementById('complete-info');
    this.completeBtn = document.getElementById('complete-button');
    this.interval;
    //*Time conversion variables
    this.second = 1000;
    this.minute = this.second * 60;
    this.hour = this.minute * 60;
    this.day = this.hour * 24;

    this.getLocalStor();

    this.countdownForm.addEventListener(
      'submit',
      this.updateCountdown.bind(this)
    );
    this.countdownBtn.addEventListener('click', this.reset.bind(this));
    this.completeBtn.addEventListener('click', this.newCount.bind(this));
  }

  setMinimumDate() {
    const today = new Date().toISOString().split('T')[0];
    this.dateEl.setAttribute('min', today); //*Cant be < than todays date
  }

  //*Values from form input
  updateCountdown(e) {
    e.preventDefault();
    this.countdownTitle = e.srcElement[0].value;
    this.countdownDate = e.srcElement[1].value;

    if (!this.countdownDate) return;
    this.countdownValue = new Date(this.countdownDate).getTime();

    this.saveLocalStor(this.countdownTitle, this.countdownDate);
    this.updateDOM();
    this.interval = setInterval(this.updateDOM.bind(this), 1000);
  }
  //*Populate Countdown/Convert Time-->from milliseconds to normal/Display Completed Screen
  updateDOM() {
    const now = new Date().getTime();
    const distance = this.countdownValue - now;

    if (distance < 0) {
      clearInterval(this.interval);
      this.inputContainer.style.display = 'none';
      this.completeEl.style.display = 'flex';
      this.completeElInfo.innerText = `${this.countdownTitle} finished on ${this.countdownDate}`;
    } else {
      const daysLeft = Math.floor(distance / this.day);
      const hoursLeft = Math.floor((distance % this.day) / this.hour);
      const minutesLeft = Math.floor((distance % this.hour) / this.minute);
      const secondsLeft = Math.floor((distance % this.minute) / this.second);

      this.countdownElTitle.innerText = `${this.countdownTitle}`;
      this.timeElements[0].innerText = `${daysLeft}`;
      this.timeElements[1].innerText = `${hoursLeft}`;
      this.timeElements[2].innerText = `${minutesLeft}`;
      this.timeElements[3].innerText = `${secondsLeft}`;

      // * Hide Input
      this.inputContainer.style.display = 'none';
      // * Show Countdown
      this.countdownEl.style.display = 'flex';
    }
  }

  reset() {
    // * Show Input
    this.inputContainer.style.display = 'flex';
    // * Hide Countdown
    this.countdownEl.style.display = 'none';
    clearInterval(this.interval);
    localStorage.clear();
  }

  newCount() {
    this.completeEl.style.display = 'none';
    this.inputContainer.style.display = 'flex';
    localStorage.clear();
  }

  saveLocalStor(title, date) {
    localStorage.setItem('title', title);
    localStorage.setItem('date', date);
  }

  getLocalStor() {
    if (localStorage.getItem('date')) {
      this.countdownTitle = localStorage.getItem('title');
      this.countdownDate = localStorage.getItem('date');
      this.countdownValue = new Date(this.countdownDate).getTime();
      this.updateDOM();
      this.interval = setInterval(this.updateDOM.bind(this), 1000);
    }
  }
}

const countdown = new Countdown();
