
export function showMenu() {
    if(!this.dataset.close) {
        this.children[1].classList.add("open")
        this.dataset.close = true
    } else if (this.dataset.close) {
        this.children[1].classList.remove("open")
        this.dataset.close = ""
    }

}
