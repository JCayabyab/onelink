export default function handler(req, res) {
  const { username, password } = req.body;

  if (username === 'username' && password === 'password') {
    res.status(200).json({ user: { username } });
    return;
  }
  res.status(401).send('Incorrect credentials');
}
