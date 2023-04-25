// import userDtos from "../dtos/user-dtos.js";
import User from "../models/user.js";
// import userDtos from "../dtos/user-dtos.js";
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
    // else res.status(500).json({msg: "user does not exist"});
    console.log(user)
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserConnects = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const connects = await Promise.all(user.connects.map((id) => User.findById(id).select("_id firstName lastName picturePath")));
    // console.log(connects);
    const formattedConnects = connects.map(
      ({ _id, firstName, lastName, picturePath }) => {
        return { _id, firstName, lastName, picturePath };
      }
    );
    res.status(200).json(formattedConnects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateConnect = async (req, res) => {
  try {
    const { id, connectId } = req.params;
    const user = await User.findById(id);
    const connect = await User.findById(connectId);

    if (user.connects.includes(connectId)) {
      user.connects = user.connects.filter((id) => id !== connectId);
      connect.connects = connect.connects.filter((id) => id !== id);
    } else {
      user.connects.push(connectId);
      connect.connects.push(id);
    }
    await user.save();
    await connect.save();
    // res.status(200).json({ user });

    const newconnects = await Promise.all(
      user.connects.map((id) => User.findById(id))
    );
    const formattedConnects = newconnects.map(
      ({ _id, firstName, lastName, picturePath }) => {
        return { _id, firstName, lastName, picturePath };
      }
    );
    console.log(formattedConnects);
    res.status(200).json(formattedConnects);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};