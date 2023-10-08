import { CSSProperties, Fragment } from 'react';
import './App.css';
import ClockLoader from 'react-spinners/ClockLoader';
import { Alert } from '@mui/material';
import useFetchJsonData from './hooks/useFetchJsonData';
import Questionaries from './components/Questionaries';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  color: '#36d7b7',
};

function App() {
  const { loading, questionaryName, jsonData, message, setMessage } = useFetchJsonData();
  return (
    <main>
      <h1>Cuestionario Oposiciones</h1>
      {message.showMessage && (
        <Alert variant="filled" severity={message.severity} onClose={() => setMessage({ ...message, showMessage: false })}>
          {message.message}
        </Alert>
      )}
      <div className="card">
      {loading ? (
          <Fragment>
            <ClockLoader
              color={'#36d7b7'}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p>Estamos cargando las preguntas aleatoriamente</p>
          </Fragment>
        ) : (
          <Questionaries data={jsonData} questionaryName={questionaryName} setMessage={setMessage} />
        )}
      </div>
    </main>
  );
}

export default App;
