const { User, Thought } = require('../models');

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.aggregate([
      {
        $lookup: {
          from: 'thoughts',
          localField: 'reactions',
          foreignField: '_id',
          as: 'reactions',
        },
      },
    ]);

    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getThoughtById = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.aggregate([
      {
        $lookup: {
          from: 'thoughts',
          localField: 'reactions',
          foreignField: '_id',
          as: 'reactions',
        },
      },
    ]).findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createThought = async (req, res) => {
  const { username, thoughtText } = req.body;
  try {
    // Create the thought
    const thought = await Thought.create({ thoughtText, username });

    // Update the associated user's thoughts array
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.status(201).json({ thought, user });
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
      const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
      if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
  } catch (err) {
      res.status(400).json(err);
  }
};

const deleteThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
      const thought = await Thought.findByIdAndRemove(thoughtId);
      if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
      res.status(400).json(err);
  }
};
