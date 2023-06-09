const { User } = require('../models');


const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};


const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};


const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndRemove(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json(err);
    }
};

const addFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or friend not found' });
        }

        user.friends.push(friendId);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const removeFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const friendIndex = user.friends.indexOf(friendId);

        if (friendIndex === -1) {
            return res.status(404).json({ message: 'Friend not found in the user\'s friend list' });
        }

        user.friends.splice(friendIndex, 1);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};