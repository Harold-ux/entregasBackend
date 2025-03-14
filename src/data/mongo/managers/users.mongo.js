import User from "../models/users.models.js";
import Manager from "../manager.mongo.js";


const usersManager = new Manager(User);
export default usersManager;