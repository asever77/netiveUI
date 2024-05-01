//EXE
class DragDrop2 {
    constructor(opt) {
        console.log(opt)
        this.id = opt.id;
        this.drop = document.querySelector('[data-drag-id="'+ this.id +'"]');
        this.targets = this.drop.querySelectorAll('[data-drag-target');
        this.objects = this.drop.querySelectorAll('[data-drag-object');
        this.dragged;
        this.target_value;
        this.object_value;
        this.init();
    }
    init() {
        const actStart = (event) => {
            const _this  = event.target;

            this.dragged = _this;
            _this.dataset.dragState = "dragging";
            this.object_value = _this.dataset.dragObject;
            console.log('actStart', this.object_value);
        }
        const actEnd = (event) => {
            const _this  = event.target;

            _this.dataset.dragState = "";
            console.log('actEnd');
        }
        const actOver = (event) => {
            const _this  = event.target;
            this.dragged = _this;

            if (_this.dataset.dragTarget) {
                _this.dataset.dragState = "dragover";
            }
            console.log('actOver');
        }
        const actleave = (event) => {
            const _this  = event.target;
            this.dragged = _this;

            if (_this.dataset.dragTarget) {
                _this.dataset.dragState = "";
            }
            console.log('actleave');
        }

        this.drop.addEventListener('drag', () => {
            console.log('dragging');
        });

        //EVENT
        this.drop.addEventListener('dragstart', actStart);
        this.drop.addEventListener("dragend", actEnd);
          
        // 드롭을 허용하기 위해 기본 동작 취소
        this.drop.addEventListener("dragover", (event) => {
            event.preventDefault();
        }, false);
        // 드래그 가능한 요소가 대상 위로 오면 강조
        this.drop.addEventListener("dragenter", actOver);
        this.drop.addEventListener("dragleave", actleave);
        
        this.drop.addEventListener("drop", (event) => {
            // 일부 요소의 링크 열기와 같은 기본 동작 취소
            event.preventDefault();
            // 드래그한 요소를 선택한 드롭 대상으로 이동

            console.log(event.target, this.dragged);

            if (event.target.dataset.dragTarget) {
                event.target.classList.remove("dragover");
                // this.dragged.parentNode.removeChild(this.dragged);
                event.target.appendChild(this.dragged);
            }
            if (event.target.dataset.dragWrap) {

                console.log(1111111111111);

                event.target.classList.remove("dragover");
                // this.dragged.parentNode.removeChild(this.dragged);
                event.target.appendChild(this.dragged);
            }
        });
          
    }
}
UI.exe.dragdrop2_2 = new DragDrop2({
    id: 'test2'
})