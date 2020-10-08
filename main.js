const numOfUsers = prompt(
  "Enter number of players:"
);

const bingo = document.querySelector("#bingo");
const users = document.querySelector("#users");

// Building bingo table
for (let i = 0; i < 76; i++) {
  const cell = document.createElement("div");
  cell.innerText = i + 1;
  cell.classList.add("cell");
  bingo.appendChild(cell);
}

// Building users bingo table
for (let i = 0; i < numOfUsers; i++) {
  const table = document.createElement("div");
  users.appendChild(table);
  for (let j = 0; j < 24; j++) userCell(i);
}

function userCell(index) {
  // Select random cell from bingo table
  const cell =
    bingo.children[
      Math.floor(
        Math.random() * bingo.children.length
      )
    ];

  // Check if bingo cell already exists
  const dup = [
    ...users.children[index].children,
  ].find(
    (el) => el.textContent === cell.innerText
  );

  // If it does, return and try again
  if (dup) return userCell(index);

  // Clone selected cell
  const copy = cell.cloneNode(true);

  copy.classList.add("cell");

  users.children[index].appendChild(copy);

  //  If it's the last call, sort the numbers
  if (
    users.children[index].children.length === 24
  ) {
    [...users.children[index].children]
      .sort((a, b) =>
        +a.innerText > +b.innerText ? 1 : -1
      )
      .forEach((node) =>
        users.children[index].appendChild(node)
      );
  }
}

// Register click
document
  .querySelector("#random")
  .addEventListener("click", addNumber);

function addNumber() {
  // Select cells that are yet to be selected
  const remaining = document.querySelectorAll(
    "#bingo>.cell:not(.selected)"
  );

  // Stop if no cells remain
  if (remaining.length === 0) return;

  // Select random cells of the remaining
  const selection =
    remaining[
      Math.floor(Math.random() * remaining.length)
    ];

  // Add selected class to all tables it
  selection.classList.add("selected");

  // Loop through all players and select the number
  for (let i = 0; i < numOfUsers; i++) {
    const userCell = [
      ...users.children[i].children,
    ].find(
      (el) =>
        el.textContent === selection.innerText
    );

    if (userCell)
      userCell.classList.add("selected");
  }
}
