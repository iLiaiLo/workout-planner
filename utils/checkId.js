import { isValidObjectId } from "mongoose";

const isGivenIdValidObjectId = (id) => isValidObjectId(id);

export default isGivenIdValidObjectId;
