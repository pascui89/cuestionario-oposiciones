import { useEffect, useState, CSSProperties, Fragment } from 'react'
import './App.css'
import { getRandomNumber } from './helpers';
import ClockLoader from "react-spinners/ClockLoader";
import Questionaries from './components/Questionaries';

import { IQuestions } from './interfaces/IQuestions';

import Solutions from './assets/miscelaneas/data/Miscelanea Solutions.json';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  color: "#36d7b7",
};

function App() {

  const [ fetching, setFetching ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ jsonData, setJsonData ] = useState({} as IQuestions);
  const [ questionaryName, setQuestionaryName ] = useState('');

  useEffect(() => {
    if (fetching) return;
    const randomNumber = getRandomNumber();
    setFetching(true);
    const currentQuestionaryName = `Miscelanea ${randomNumber}`;
    const fetchJsonData = async () => {
      try {
        const response = await fetch(`data/${currentQuestionaryName}.json`);
        const data = await response.json();
        const file = Solutions.questions.find(f => f.file === `M-${randomNumber}`);
        const newFormData = {
          ...data,
          questions: data.questions.map((el: any, index: number) => ({ ...el, id: index, selected: '', valid: file?.solutions[index] }))
        };
        setJsonData(newFormData);
      } catch (error) {
        console.error('Error al cargar el JSON:', error);
      } finally {
        setTimeout(() => setLoading(false), 3500);
      }
    };
    
    setQuestionaryName(`Miscelanea ${randomNumber}`);
    setFetching(false);
    fetchJsonData();
    return () => {
      // Función de limpieza, no realizará ninguna acción
    };
  }, []);

  return (
    <main>
      <h1>Cuestionario Oposiciones</h1>
      <div className="card">
        {loading && 
          <Fragment>
            <ClockLoader
              color={"#36d7b7"}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p>Estamos cargando las preguntas aleatoriamente</p>
          </Fragment>}
        {!loading && <Questionaries data={jsonData} questionaryName={questionaryName}/>}
      </div>
    </main>
  )
}

export default App
