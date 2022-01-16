export function modal(options) {
    function _createModal(options) {
        const DEFAULT_WIDTH = "600"
        const modal = document.createElement("div");
        modal.style.width = `${options.width}`;
        modal.classList.add("modal");
        modal.innerHTML = `
        
            <div class="modal-overlay" data-close = "true">
                <div class="modal-window" style = "width:${options.width || DEFAULT_WIDTH}px">
                <div class = "modal-container ${options.modalStyle}">
                    <div class="modal-header ${options.modalStyle}">
                        <h3 class="modal-title">${options.title || ""}</h3>
                        ${options.subtitle && (`<span class="modal-subtitle">${options.subtitle}</span>` ) || "" }
                        ${options.closable && (`<span class="modal-close" data-close = "true">&times</span>` ) || "" }
                    </div>
                    <div class="modal-body ${options.modalStyle}">
                        ${options.content || ""}
                    </div>
                    <div class="modal-footer">
                        ${options.footer}
                    </div>
                </div>
            </div>
        </div>`

        document.body.appendChild(modal)
        return modal
    }
    const $modal = _createModal(options)
    const ANIMATION_SPEED = 500;
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                return console.log("modal is destroyed")
            }!closing && $modal.classList.add("open")

        },
        close() {
            closing = true
            $modal.classList.remove("open")
            $modal.classList.add("hide")
            setTimeout(() => {
                $modal.classList.remove("hide")
                closing = false
            }, ANIMATION_SPEED)
        },

    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
            modal.destroy()
        }
    }

    $modal.addEventListener("click", listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener("click", listener)
            destroyed = true
        }
    })

}