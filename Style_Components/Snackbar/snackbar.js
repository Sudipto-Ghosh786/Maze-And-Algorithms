let lnk = document.createElement("link");
lnk.className = "snackbar-stylsheet";
lnk.href = "./Material components/Snackbar/snackbar.css";
lnk.rel = "stylesheet";
window.addEventListener("DOMContentLoaded", () => document.head.append(lnk));

const SNCAKBAR_TIME_LONG = 6000;
const SNCAKBAR_TIME_MEDIUM = 4000;
const SNACKBAR_TIME_SHORT = 2000;

let activeSnackbar = [];

class Snackbar {

    constructor(titleTxt, actionBtnText, actionBtnCallbacks, tm) {
        this.id = "";
        this.root = null;
        this.active = false;
        this.title = titleTxt;
        this.actionBtnText = actionBtnText;
        this.actionBtnCallbacks = actionBtnCallbacks;
        this.time = tm;
    }

    build() {
        this.root = document.createElement("div");
        this.id = window.btoa(Math.random());
        this.root.className = "snackbar-surface";
        this.root.id = this.id;
        let text = `<div class="snackbar-title">${this.title}</div>`;
        for (let actionBtnText of this.actionBtnText) text += `<div class="snackbar-action-btn ${window.btoa(Math.random())}">${actionBtnText}</div>`;
        this.root.innerHTML = text;

        let abs = this.root.getElementsByClassName("snackbar-action-btn");
        console.log(abs);
        if (abs.length !== 0) {
            for (let itr in abs) {
                abs[itr].addEventListener("click", () => this.actionBtnCallbacks[itr]());
            }
        }

        return this;
    }
    show() {
        this.root.style.opacity = 0;
        document.body.append(this.root);
        activeSnackbar.unshift(this);
        this.active = true;

        for (let idx in activeSnackbar) {
            let dy = 60 * idx;
            let snackbar = activeSnackbar[idx].root;
            snackbar.style.transform = `translate(0, -${dy}px)`;
        }

        setTimeout(() => {
            this.root.style.opacity = 1;
            setTimeout(() => {
                this.remove();
            }, this.time);
        }, 200);
        return this;
    }
    remove() {
        this.root.style.opacity = 0;
        setTimeout(() => {
            this.root.remove();
            this.active = false;
            activeSnackbar.splice(activeSnackbar.indexOf(this.root), 1);
        }, 400);
        return this;
    }

    clone() {
        return new Snackbar(this.title, this.actionBtnText, this.actionBtnCallbacks);
    }
    static clone(snackbar) {
        return new Snackbar(snackbar.title, snackbar.actionBtnText, snackbar.actionBtnCallbacks);
    }
}
