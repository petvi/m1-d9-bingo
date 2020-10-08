const bingo = document.querySelector("#bingo");
const user = document.querySelector("#user");

// Building bingo table
for (let i = 0; i < 76; i++) {
  const cell = document.createElement("div");
  cell.innerText = i + 1;
  cell.classList.add("cell");
  bingo.appendChild(cell);
}

// Building users bingo table
for (let i = 0; i < 24; i++) userCell();

function userCell() {
  // Select random cell from bingo table
  const cell =
    bingo.children[
      Math.floor(
        Math.random() * bingo.children.length
      )
    ];

  // Check if bingo cell already exists
  const dup = [...user.children].find(
    (el) => el.textContent === cell.innerText
  );

  // If it does, return and try again
  if (dup) return userCell();

  // Clone selected cell
  const copy = cell.cloneNode(true);

  copy.classList.add("cell");

  user.appendChild(copy);

  //  If it's the last call, sort the numbers
  if (user.children.length === 24) {
    [...user.children]
      .sort((a, b) =>
        +a.innerText > +b.innerText ? 1 : -1
      )
      .forEach((node) => user.appendChild(node));
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

  const userCell = [...user.children].find(
    (el) => el.textContent === selection.innerText
  );

  if (userCell)
    userCell.classList.add("selected");
}
