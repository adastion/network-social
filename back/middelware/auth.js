const Auth = async (req, res) => {
  const { token } = await req.body

  if (!token) {
    return res.status(400).json({ error: "Not valid token " })
  }

  try {
    res.status(200)
    res.json(token)
  } catch (error) {
    console.error("Auth error", error)
    res.status(500).json({ error: "Internal server error" })
  }
}