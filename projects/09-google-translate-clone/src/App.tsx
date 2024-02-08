import { useStore } from './hooks/useStore'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Button, Col, Row, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'

function App () {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    setResult,
    setFromText,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage
  } = useStore()

  return (
    <div className='App'>
      <h1>Google Translate</h1>

      <Row>
        <Col>
        <Stack gap={2}>
          <LanguageSelector
          type={SectionType.From}
          value={fromLanguage}
          onChange={setFromLanguage}
          />

          <TextArea
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
          />
        </Stack>
        </Col>

        <Col xs='auto'>
        <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
          <ArrowsIcon />
        </Button>
        </Col>

        <Col>
        <Stack gap={2}>
          <LanguageSelector
          type={SectionType.To}
          value={toLanguage}
          onChange={setToLanguage}
          />
          <TextArea
            type={SectionType.To}
            value={result}
            onChange={setResult}
            loading={loading}
          />
        </Stack>
        </Col>
      </Row>
    </div>
  )
}

export default App
