const AuthModel = require('../models/authModel');

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await AuthModel.findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    let redirectPage = '';
    let renterId = null;
    let userId = null;

    if (user.user_role_id === 1) {
      renterId = await AuthModel.getRenterIdByUsername(username);
      console.log("Renter ID:", renterId);  // Debug log
      if (!renterId) return res.status(404).json({ error: 'Renter ID not found' });
      redirectPage = `B1a_RenterDashboard.html?renterId=${renterId}`;
    } else if (user.user_role_id === 2 || user.user_role_id === 3) {
      userId = await AuthModel.getUserIdByUsername(username);
      console.log("User ID:", userId);  // Debug log
      if (!userId) return res.status(404).json({ error: 'User ID not found' });
      redirectPage = user.user_role_id === 2 
        ? `C1a_DashBoard.html?userId=${userId}` 
        : `D1a_MDashboard.html?userId=${userId}`;
    } else {
      return res.status(403).json({ error: 'Unauthorized role' });
    }

    res.json({ message: 'Login successful', redirect: redirectPage, renterId, userId });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { loginUser };
