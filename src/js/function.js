// eslint-disable-next-line import/prefer-default-export
export function getElementForInsert(clientX, clientY) {
  let placeEl = null;
  let insert = null;
  const currentEl = document.elementFromPoint(clientX, clientY);
  if (currentEl.classList.contains('container')) {
    if (clientX > 300 && clientX < 350) {
      placeEl = currentEl.children[1].querySelector('.items');
    } else {
      placeEl = currentEl.children[2].querySelector('.items');
    }
    insert = placeEl.lastElementChild;
  } else if (currentEl.classList.contains('column')) {
    placeEl = currentEl.querySelector('.items');
    insert = placeEl.lastElementChild;
  } else if (currentEl.classList.contains('header')) {
    placeEl = currentEl.closest('.column').querySelector('.items');
    insert = placeEl.firstElementChild;
  } else if (currentEl.classList.contains('items')) {
    placeEl = currentEl;
    insert = placeEl.lastElementChild;
  } else if (currentEl.classList.contains('items-item')) {
    insert = currentEl;
    placeEl = currentEl.closest('.items');
  } else {
    placeEl = currentEl.closest('.items');
    insert = currentEl.closest('.items-item');
  }
  return { parent: placeEl, child: insert };
}
