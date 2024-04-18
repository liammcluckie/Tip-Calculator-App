import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

const store = reactive({
    bill: 0,
    tip: 0,
    pax: 0,
    tipPerPerson: 0,
    totalPerPerson: 0,
    getTip(dataTip) {
        this.tip = dataTip;
    },
    customTip(event) {
        const input = event.target;
        const siblings = input.parentElement.children;
        // remove the active class from buttons
        this.removeActiveClass(siblings);
        // reset tip amount
        this.tip = 0;
        this.tip = event.target.value;
    },
    isActive(event) {
        const btn = event.target;
        // get all the siblings
        const allBtns = btn.parentElement.children;
        // we need to remove the current active class
        this.removeActiveClass(allBtns);
        btn.classList.add('active');
    },
    removeActiveClass(collection) {
        Array.from(collection).forEach(el => {
            el.classList.remove('active');
        });
    },
    calculate() {
        if (this.bill && this.tip && this.pax) {
            const percentage = this.bill / 100 * this.tip;
            const total = this.bill + percentage;
            // Round totals to two decimal places
            this.tipPerPerson = Math.round(percentage / this.pax * 100) / 100;
            this.totalPerPerson = Math.round(total / this.pax * 100) / 100;
        } else {
            this.tipPerPerson = 0;
            this.totalPerPerson = 0;
        }
    },
    reset() {
        this.tipPerPerson = 0;
        this.totalPerPerson = 0;
    }
});

createApp({ store }).mount('#calculatorApp');
