import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

const store = reactive({
    bill: '',
    tip: '',
    pax: '',
    setPlaceholder: 0,
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
    validate() {
        const validatePax = document.querySelector('.pax-input-container');

        if (this.pax === '') {
            setTimeout(() => {
                validatePax.classList.add('error');
                this.setPlaceholder = "This can't be zero";
            }, 300);
        } else {
            validatePax.classList.remove('error');
            this.setPlaceholder = 0;
        }
    },
    reset() {
        this.removeActiveClass(document.querySelectorAll('.tip-btn'));
        document.querySelector('#calculatorApp').reset();

        this.bill = '';
        this.tip = '';
        this.pax = '';
        this.tipPerPerson = 0;
        this.totalPerPerson = 0;
    },
    isDisabled() {
        if (this.bill !== '' || this.tip !== '' || this.pax !== '') {
            return false;
        }

        return true;
    }
});

createApp({ store }).mount('#calculatorApp');
