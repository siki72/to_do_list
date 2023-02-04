import { createHtmlElement } from "./assets/img/js/function.js";
import { appenChildTasks } from "./assets/img/js/function.js";
import { dateParser } from "./assets/img/js/function.js";
import { getTaches } from "./assets/img/js/api.js";
const containerTasks = document.querySelector(".insert-container");
const date = document.getElementById("date");
const inputAddTache = document.getElementById("type-input");
const form = document.querySelector("form");
const entreiesInput = document.getElementById("type-input");
const sendBtn = document.getElementById("send");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search");

sendBtn.addEventListener("click", addDataFromInput);

async function addDataFromInput() {
  try {
    if (entreiesInput.value <= 0) {
      return;
    }
    const tacheFrominput = {
      id: "",
      tache: entreiesInput.value,
      action: "En cours",
    };
    await fetch(`https://alimissoum.app.3wa.io/taches`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(tacheFrominput),
    })
      .then((resp) => resp.json())
      .then((r) => {
        console.log("retour depuis la méthode addinput -> ", r);
        return r;
      })
      .then((data) => {
        console.log(data);

        addTasks(data);
      });
  } catch (err) {
    console.log(err);
  }
}

export function addTasks(tache) {
  const newEntry = createHtmlElement("div", { classList: "task" });
  const myId = createHtmlElement("h4", { innerText: tache.id });
  const myTache = createHtmlElement("h4", { innerText: tache.tache });
  const myAction = createHtmlElement("h4", {
    innerText: tache.action.split(" "),
  });

  const myDate = createHtmlElement("h4", {
    innerText: dateParser(tache.created_at),
  });
  const myInputEditTask = createHtmlElement("input", {
    innerText: myTache.innerText,
    classList: "edit",
  });
  myInputEditTask.style.display = "none";
  const myInputEditAction = createHtmlElement("input", {
    innerText: myAction.innerText,
    classList: "edit",
  });
  myInputEditAction.style.display = "none";
  const myEditBtn = createHtmlElement("input", {
    type: "button",
    value: "edit",
    id: "edit",
  });
  const myDoneButton = createHtmlElement("input", {
    type: "button",
    value: "Done",
    id: "done",
  });
  const myDeleteBtn = createHtmlElement("input", {
    type: "button",
    value: "delete",
    id: "delete",
  });
  const mySaveBtn = createHtmlElement("input", {
    type: "button",
    value: "save",
    id: "save",
  });

  mySaveBtn.addEventListener("click", async () => {
    tache.tache = myInputEditTask.value;

    await fetch(`https://alimissoum.app.3wa.io/taches/${tache.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(tache),
    })
      .then((resp) => resp.json())
      .then((r) => console.log("retour du put" + r));

    save();
  });

  myDeleteBtn.addEventListener("click", async () => {
    await fetch(`https://alimissoum.app.3wa.io/taches/${tache.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log("retour du delete" + data));
    deleteTache(newEntry);
  });

  mySaveBtn.style.display = "none";

  myEditBtn.addEventListener("click", () => {
    edit();
  });

  /*   try {
    await fetch(`https://alimissoum.app.3wa.io/tasks?like=${search}`)
      .then((resp) => resp.json())
      .then((data) => {
        tableContainer.innerHTML = "";

        for (let i of data) {
          addTask(i);
        }
      });
  } catch (error) {
    console.error(error);
  }
});
 */

  searchBtn.addEventListener("click", async () => {
    try {
      let searche = searchInput.value;

      await fetch(`https://alimissoum.app.3wa.io/taches?like=${searche}`)
        .then((data) => data.json())
        .then((resp) => {
          console.log(resp);
          containerTasks.innerHTML = "";
          for (let i of resp) {
            addTasks(i);
          }
        });
    } catch (error) {
      console.log(error);
    }
  });

  appenChildTasks(newEntry, [
    myId,
    myTache,
    myInputEditTask,
    myAction,
    myInputEditAction,
    myDate,
    myEditBtn,
    mySaveBtn,
    myDoneButton,
    myDeleteBtn,
  ]);

  containerTasks.appendChild(newEntry);
  function edit() {
    myTache.style.display = "none";
    myInputEditTask.style.display = "inline-block";
    myEditBtn.style.display = "none";
    mySaveBtn.style.display = "inline-block";
    myInputEditTask.value = myTache.innerText;
  }
  function save() {
    myTache.innerText = myInputEditTask.value;
    myTache.style.display = "block";
    myInputEditTask.style.display = "none";
    myEditBtn.style.display = "inline-block";
    mySaveBtn.style.display = "none";
    myTache.innerText;
  }

  myDoneButton.addEventListener("click", async () => {
    try {
      if (confirm("Avez vous terminé cette tache ? ")) {
        myAction.innerText = "Terminé";
        let a = tache.action;
        tache.action = `Terminé`;
        myTache.style.textDecoration = "line-through";
        console.log("cest la tache" + tache);
        await fetch(`https://alimissoum.app.3wa.io/taches/${tache.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(tache),
        })
          .then((resp) => resp.json())
          .then((r) => console.log("retour du put DONE", r));
      }
    } catch (error) {
      console.log(eroor);
    }
  });

  function deleteTache(tache) {
    if (confirm("etre vous sur de vouloir supprimer cette tache ? ")) {
      containerTasks.removeChild(tache);
    }
  }
}

getTaches();
