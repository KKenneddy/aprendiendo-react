import SyntaxHighlight from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import { Card, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

import { useGame } from '../hooks/useGame'

import { type Question as QuestionType } from '../type'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { useSelectedAnswer, correctAnswer } = info

  if (useSelectedAnswer == null) return 'transparent'

  if (index !== correctAnswer && index !== useSelectedAnswer) return 'transparent'

  if (index === correctAnswer) return 'green'

  if (index === useSelectedAnswer) return 'red'

  return 'trasnparent'
}

export const Question = ({ info }: { info: QuestionType }) => {
  const { selectAnswer } = useGame()

  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', mt: 4 }}>
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlight language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlight>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {
          info.answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={info.useSelectedAnswer != null}
                onClick={handleClick(index)}
                sx={{
                  backgroundColor: getBackgroundColor(info, index)
                }}
              >
                <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Card>
  )
}
