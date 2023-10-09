import { useEffect, useState } from 'react';
import { getRandomNumber, sendMessageByEmail } from '../helpers';
import { IQuestions } from '../interfaces/IQuestions';
import Solutions from '../../public/data/Miscelanea Solutions.json';
import { IMessage } from '../interfaces/IMesagge';

const useFetchJsonData = () => {
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questionaryName, setQuestionaryName] = useState('');
  const [message, setMessage] = useState({} as IMessage);
  const [jsonData, setJsonData] = useState({} as IQuestions);

  const fetchData = async () => {
    if (fetching) return;

    const randomNumber = getRandomNumber();
    setFetching(true);
    const currentQuestionaryName = `Miscelanea ${randomNumber}`;

    try {
      const response = await fetch(`data/${currentQuestionaryName}.json`);
      const data = await response.json();
      const file: any = Solutions.questions.find((f: any) => f.file === `M-${randomNumber}`);
      const newFormData = {
        ...data,
        questions: data.questions.map((el: any, index: number) => ({
          ...el,
          id: index,
          selected: '',
          valid: file?.solutions[index],
        })),
      };
      setJsonData(newFormData);
    } catch (error) {
      console.error('Error al cargar el JSON:', error);
      sendMessageByEmail(currentQuestionaryName).then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    } finally {
      setTimeout(() => setLoading(false), 3500);
    }

    setQuestionaryName(`Miscelanea ${randomNumber}`);
    setFetching(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, questionaryName, jsonData, message, setLoading, setMessage, fetchData };
};

export default useFetchJsonData;
