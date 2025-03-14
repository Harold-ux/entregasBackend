import { faker } from "@faker-js/faker";

class UsersManager {
  #all = [];
  // method to create a new user
  create = () => {
    try {
      const fullName = faker.person.fullName().toLocaleLowerCase().split(" ");
      const email = faker.internet.email();
      const address = faker.location.streetAddress();
      const user = {
        _id: faker.database.mongodbObjectId(),
        name: fullName[0],
        lastName: fullName[1],
        email: email,
        address: address,
        password: "hello1234",
        avatar: faker.image.avatar(),
        role: faker.helpers.arrayElement(["user", "admin", "premium"]),
      };
      this.#all.push(user);
      console.log("New user created:", user);
      return user;
    } catch (error) {
      throw new Error("Error creating user");
    }
  };
  read = () => {
    try {
      return this.#all;
    } catch (error) {
      throw error;
    }
  };
}

const usersManager = new UsersManager();

export default UsersManager;
