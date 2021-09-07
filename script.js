// ======================================================================================= live search
(function () {
  const inputFilter = document.querySelector("[data-filter]");
  inputFilter.addEventListener("keyup", function () {
    let inputValue = this.value,
      i;
    const filterList = document.getElementById(this.dataset.filter);
    const filterItem = filterList.querySelectorAll("li");
    for (i = 0; i < filterItem.length; i++) {
      const _this = filterItem[i];
      const phrase = _this.innerHTML;
      if (phrase.search(new RegExp(inputValue, "i")) < 0) {
        _this.style.opacity = "0.4";
      } else {
        _this.style.opacity = "1";
      }
    }
  });
})();

// ============================================================================================ Кнока удаления 2 столбика

function deleteTask(del1) {
  const result1 = confirm(
    "Вы уверены, что хотите удалить? Запись будет удалена безвозвратно"
  );
  if (result1) {
    del1.parentNode.remove();
  }
}

// ============================================================================================ Перенос задачи
const thirdColumn = document.querySelectorAll(".thirdColumnOl")[0];
const secondeColumn = document.querySelectorAll(".secondeColumnOl")[0];
function completed(taskList) {
  const checkedSecondeColumn = taskList.parentNode;
  const checkedThirdColumn = taskList.parentNode;

  if (
    checkedSecondeColumn.parentNode ===
    document.getElementsByClassName("secondeColumnOl")[0]
  ) {
    taskList.defaultChecked = "true";
    const taskCompleted = taskList.parentNode;
    thirdColumn.insertAdjacentHTML(
      "beforeend",
      "" + taskCompleted.outerHTML + ""
    );
    taskCompleted.remove();
  }
  if (
    checkedThirdColumn.parentNode ===
    document.getElementsByClassName("thirdColumnOl")[0]
  ) {
    const taskBack = taskList.parentNode;
    taskBack.childNodes[0].removeAttribute("checked");
    secondeColumn.insertAdjacentHTML("beforeend", "" + taskBack.outerHTML + "");
    taskBack.remove();
  }
}

// ============================================================================================ Кнопка добавления таски
const main = secondeColumn
function btnAddTag() {
  const inputElem = document.querySelectorAll(".placeNewTag")[0];
  const inputValue = inputElem.value.split(";");
  for (let i = 0; i < inputValue.length; i++) {
    (function (i) {
      textContent = inputValue[i];
      if (textContent !== "") {
        main.insertAdjacentHTML("beforeend", '<li class="list-group-item rounded-3"><input class="form-check-input"  type="checkbox" value="" aria-label="Checkbox for following text input" onclick="completed(this)"> '+[textContent]+' <img src="./img/trash-can.svg" class="deleteBtn" alt="" width="23px" height="23px" onclick="deleteTask(this)"></li>');
        inputElem.value = "";
    }})(i);
  }
}

// ============================================================================================ Удалить весь список
function deleteLeftList() {
  for (let i = 0; i < secondeColumn.children.length; i = 0) { 
    secondeColumn.children[0].remove()
  };
}

function deleteRightList() {
  for (let i = 0; i < thirdColumn.children.length; i = 0) { 
    thirdColumn.children[0].remove()
  };
}

//---------------------------------------------------- ФУНКЦИЯ ДОБАВЛЕНИЯ ТЕГА ЧЕРЕЗ ENTER
window.onkeydown = function (event) {
  if (event.keyCode == 13) {
    btnAddTag();
  }
};