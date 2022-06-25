import { getElementForInsert } from './function';

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
      this.gui.select.classList.remove('hidden');
    } else if (this.gui.input.value.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please, write title task');
    } else if (this.gui.select.value.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please, write status task');
    } else {
      this.el = this.gui.createTask(this.gui.input.value, this.gui.select.value);
      this.gui.input.value = '';
      this.gui.select.value = '';
      this.addEvent(this.el);
      this.gui.input.classList.add('hidden');
      this.gui.select.classList.add('hidden');
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
    let shiftX = null;
    let shiftY = null;
    let insertOption = null;
    const insertElem = document.createElement('li');
    insertElem.classList.add('place');
    insertElem.classList.add('items-item');

    itemsEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (!e.target.classList.contains('items-item')) {
        return;
      }
      shiftX = e.clientX - e.target.getBoundingClientRect().left;
      shiftY = e.clientY - e.target.getBoundingClientRect().top;
      draggedEl = e.target;
      insertOption = getElementForInsert(e.clientX, e.clientY);
      ghostEl = e.target.cloneNode(true);
      ghostEl.classList.add('dragged');
      document.body.appendChild(ghostEl);
      ghostEl.style.left = `${e.pageX - shiftX}px`;
      ghostEl.style.top = `${e.pageY - shiftY}px`;
    });

    itemsEl.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (!draggedEl) {
        return;
      }
      insertOption = getElementForInsert(e.clientX, e.clientY);
      insertOption.parent.insertBefore(insertElem, insertOption.child);
      ghostEl.style.left = `${e.pageX - shiftX}px`;
      ghostEl.style.top = `${e.pageY - shiftY}px`;
    });
    itemsEl.addEventListener('mouseleave', () => {
      if (!draggedEl) {
        return;
      }
      document.body.removeChild(ghostEl);
      ghostEl = null;
      draggedEl = null;
    });
    itemsEl.addEventListener('mouseup', () => {
      if (!draggedEl) {
        return;
      }
      insertOption.parent.insertBefore(draggedEl, insertOption.child);
      if (document.querySelector('.place')) {
        insertOption.parent.removeChild(insertElem);
      }
      document.body.removeChild(ghostEl);
      localStorage.dragNdrops = JSON.stringify(this.gui.getTasksListObjFromDom());
      ghostEl = null;
      draggedEl = null;
    });
  }
}
