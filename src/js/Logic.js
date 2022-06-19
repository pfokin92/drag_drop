export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.addTask = this.addTask.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.moveTask = this.moveTask.bind(this);
  }

  init() {
    this.gui.btn.addEventListener('click', (e) => this.addTask(e));
    this.moveTask(this.gui.container);
    this.gui.tasksListFromLS();
    const taskNewAll = document.querySelectorAll('.items-item');
    taskNewAll.forEach((el) => {
      this.addEvent(el);
    });
  }

  addTask(e) {
    e.preventDefault();
    if (this.gui.input.classList.contains('hidden')) {
      this.gui.input.classList.remove('hidden');
    } else if (this.gui.input.value.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please, write title task');
    } else {
      this.el = this.gui.createTask(this.gui.input.value);
      this.gui.input.value = '';
      this.addEvent(this.el);
      this.gui.input.classList.add('hidden');
      localStorage.dragNdrops = JSON.stringify(this.gui.getTasksListObjFromDom());
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addEvent(el) {
    const closeBtn = el.querySelector('.close');
    el.addEventListener('mouseover', () => {
      closeBtn.classList.remove('hidden');
    });
    el.addEventListener('mouseout', () => {
      closeBtn.classList.add('hidden');
    });
    closeBtn.addEventListener('click', () => {
      closeBtn.parentElement.remove();
      localStorage.dragNdrops = JSON.stringify(this.gui.getTasksListObjFromDom());
    });
  }

  // eslint-disable-next-line class-methods-use-this
  moveTask(itemsEl) {
    let draggedEl = null;
    let ghostEl = null;
    itemsEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (!e.target.classList.contains('items-item')) {
        return;
      }
      draggedEl = e.target;
      ghostEl = e.target.cloneNode(true);
      ghostEl.classList.add('dragged');
      document.body.appendChild(ghostEl);
      ghostEl.style.left = `${e.pageX - ghostEl.offsetWidth / 2}px`;
      ghostEl.style.top = `${e.pageY - ghostEl.offsetHeight / 2}px`;
    });

    itemsEl.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (!draggedEl) {
        return;
      }
      ghostEl.style.left = `${e.pageX - ghostEl.offsetWidth / 2}px`;
      ghostEl.style.top = `${e.pageY - ghostEl.offsetHeight / 2}px`;
    });
    itemsEl.addEventListener('mouseleave', () => {
      if (!draggedEl) {
        return;
      }
      document.body.removeChild(ghostEl);
      ghostEl = null;
      draggedEl = null;
    });
    itemsEl.addEventListener('mouseup', (e) => {
      if (!draggedEl) {
        return;
      }
      const closest = document.elementFromPoint(e.clientX, e.clientY);
      if (closest.classList.contains('column')) {
        closest.querySelector('.items').appendChild(draggedEl);
      }
      document.body.removeChild(ghostEl);
      localStorage.dragNdrops = JSON.stringify(this.gui.getTasksListObjFromDom());
      ghostEl = null;
      draggedEl = null;
    });
  }
}
