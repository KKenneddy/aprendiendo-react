export async function getQuestions () {
  const res = await fetch('http://localhost:5173/data.json')
  return await res.json()
}
