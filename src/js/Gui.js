export default class Gui {
  constructor() {
    this.btn = document.querySelector('.btn');
    this.itemsAll = document.querySelectorAll('.items');
    this.cols = document.querySelectorAll('.column');
    this.input = document.querySelector('.input');
    this.todo = document.querySelector('.todo');
    this.close = document.querySelector('.close');
    this.taskAll = document.querySelectorAll('.items-item');
    this.container = document.querySelector('.container');
  }

  createTask(value) {
    const task = document.createElement('li');
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.classList.add('hidden');
    task.classList.add('items-item');
    task.textContent = value;
    task.append(closeBtn);
    this.todo.append(task);
    return task;
  }

  getTasksListObjFromDom() {
    const tasksList = {};
    this.itemsAll.forEach((ul) => {
      const lis = [...ul.children];
      const h3 = ul.closest('.column').children[0].innerText;
      tasksList[h3] = [];
      lis.forEach((li) => {
        tasksList[h3].push(li.innerText);
      });
    });
    return tasksList;
  }

  tasksListFromLS() {
    if (!localStorage.dragNdrops) return;
    const tasksList = JSON.parse(localStorage.dragNdrops);

    for (const title in tasksList) {
      if (Object.prototype.hasOwnProperty.call(tasksList, title)) {
        this.cols.forEach((col) => {
          if (col.children[0].innerText === title) {
            const ul = col.children[1];
            tasksList[title].forEach((li) => {
              ul.append(this.createTask(li));
            });
          }
        });
      }
    }
  }
}
