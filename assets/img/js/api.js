import { addTasks } from "../../../index.js";
import { dateParser } from "./function.js";

export async function getTaches() {
  try {
    await fetch("https://alimissoum.app.3wa.io/taches")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        for (let tache of data) {
          addTasks(tache);
          date.innerText = dateParser(new Date());
        }
      });
  } catch (error) {
    console.log(error);
  }
}
