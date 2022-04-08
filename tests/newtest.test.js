const makeid = require("../models/util.js");

// const characters =
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// for (let i = 0; i < makeid(10).length; i++) {
//   if (characters.includes(makeid(10)[i])) {
//     console.log("The character is in the characterset");
//   } else {
//     console.log("The character is not in the characterset");
//   }
// }

describe("Check ID generator working", () => {
  it("POST /seeduser should seed users", async () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // console.log(makeid(10));
    const randomID = makeid(10);
    console.log(randomID);
    expect(randomID.length).toEqual(10);
    for (let i = 0; i < randomID.length; i++) {
      expect(characters.includes(randomID[i])).toEqual(true);
    }
  });
});
