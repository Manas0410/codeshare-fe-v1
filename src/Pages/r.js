function* fridaysGenerator(startDate) {
  let currentDate = new Date(startDate);

  while (true) {
    console.log(currentDate.toISOString(), "chotu is MY Pyar");
    const command = yield currentDate.toISOString().split("T")[0];
    console.log(command, "cmd");
    if (command === "start") {
      currentDate = new Date(startDate);
    } else if (command === "end") {
      return currentDate.toISOString().split("T")[0];
    } else {
      currentDate.setDate(currentDate.getDate() + 7);
    }
  }
}

// Example usage:
const fridays = fridaysGenerator("2024-08-02");
// console.log(fridays.next().value); // '2024-08-02'
// console.log(fridays.next().value); // '2024-08-09'
// console.log(fridays.next().value); // '2024-08-16'
console.log(fridays.next("start").value); // '2024-08-02'
// console.log(fridays.next().value); // '2024-08-09'
// console.log(fridays.next("end").value); // '2024-08-16'
