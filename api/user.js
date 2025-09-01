const { MongoClient } = require('mongodb');



const client = new MongoClient(process.env.REACT_APP_MONGO_URI);


module.exports = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }


  try {
    await client.connect();
    const database = client.db('buyfromromania');
    const users = database.collection('users');

    const { action, username, password, currentPassword, newPassword } = req.body;
    

    const normalizedUsername = username.toLowerCase();


    if (action === 'register') {

      const existingUser = await users.findOne({ username: normalizedUsername });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this username already exists.' });
      }

      const newUser = {
        username: normalizedUsername,
        password, 
        createdAt: new Date(),
        hasPremium: false
      };
      
      await users.insertOne(newUser);
      return res.status(201).json({ message: 'User registered successfully!' });

    } 

    else if (action === 'login') {

      const user = await users.findOne({ username: normalizedUsername });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials. User not found or incorrect password.' });
      }


      return res.status(200).json({ message: 'Login successful!', username: user.username, hasPremium: user.hasPremium });
    }

    else if (action === 'buyPremium') {

      const user = await users.findOne({ username: normalizedUsername });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }


      await users.updateOne(
        { username: user.username },
        { $set: { hasPremium: true } }
      );

      return res.status(200).json({ message: 'Premium activated successfully!', hasPremium: true });
    }
    
    else if (action === 'changePassword') {
        const user = await users.findOne({ username: normalizedUsername });

        if (!user || user.password !== currentPassword) {
            return res.status(401).json({ message: 'Parolă curentă incorectă.' });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({ message: 'Noua parolă nu poate fi aceeași cu parola curentă.' });
        }
        
        await users.updateOne(
            { username: user.username },
            { $set: { password: newPassword } }
        );

        return res.status(200).json({ message: 'Parolă schimbată cu succes!' });
    }

    return res.status(400).json({ message: 'Invalid action specified.' });

  } catch (error) {
    console.error('Database or API error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  } finally {
    await client.close();
  }
};
