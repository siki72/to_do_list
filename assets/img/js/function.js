export function createHtmlElement(element, attributes = {}) {
  const el = document.createElement(element);
  for (const [key, value] of Object.entries(attributes)) {
    el[key] = value;
  }
  return el;
}

export function appenChildTasks(father, childrens = []) {
  for (let child of childrens) {
    father.appendChild(child);
  }
}

export function dateParser(chaine) {
  let newDate = new Date(chaine).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  });
  return newDate;
}
