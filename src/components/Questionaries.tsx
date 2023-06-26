import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { SxProps } from '@mui/system';

import { generateUniqueKey } from '../helpers';
import Question from './Question';
import { Button, Container, Fab, Zoom } from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import Confetti from 'react-dom-confetti';

import { IQuestions } from '../interfaces/IQuestions';
import { IQuestion } from '../interfaces/IQuestion';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FormDialog from './FormDialog';

interface IProps {
  data: IQuestions;
  questionaryName: string;
  setMessage: any;
}

const fabStyle = {
  position: 'sticky',
  bottom: 16,
  right: 16,
  marginLeft: 'auto'
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

const config = {
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "100px",
  height: "100px",
  perspective: "300px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const Questionaries = (props: IProps) => {
  const theme = useTheme();
  const { data } = props;
  const [ isExploding, setIsExploding ] = useState(false);
  const [ result, setResult ] = useState(0);
  const [ formData, setFormData ] = useState(data);
  const [ showUpIcon, setShowUpIcon ] = useState(false);
  const [ showValidate, setShowValidate ] = useState(false);
  const [ showResult, setShowResult ] = useState(false);
  const [ reportDisabled, setReportDisabled ] = useState(false);
  const [ open, setOpen ] = useState(false);
  
  const handleClickPopup = (isOpen: boolean) => setOpen(isOpen);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const saveQuestionData = (question: IQuestion) => {
    const questions = {
      ...formData,
      questions: formData.questions.map((questionState: IQuestion) =>
        questionState.id === question.id ? question : questionState
      )
    };
    setFormData(questions);
  };

  const checkSolutions = () => {
    setShowResult(true);
    scrollToTop();
    const correctAnswers = formData.questions.filter(q => q.selected === q.valid).length;
    const incorrectAnswers = formData.questions.filter(q => q.selected !== q.valid && q.selected !== null).length;
    const result = ((correctAnswers - (incorrectAnswers * 0.25)) / formData.questions.length) * 100;
    setIsExploding(result > 70);
    setResult(result);
  };  

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setShowUpIcon(true);
      } else if (scrolled <= 300) {
        setShowUpIcon(false);
      }
      if (scrolled > 4600) {
        setShowValidate(true);
      }
    };

    window.addEventListener('scroll', toggleVisible, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  const renderShowResult = () => 
    <div style={{ width: '100%', height: '250px' }}>
      <p>Resultado de la prueba:</p>
      <CircularProgressbar
          styles={buildStyles({
              pathColor: result > 100 ? '#DC2626' : '#3B82F6',
              trailColor: '#F5F5F5',
              textColor: result > 100 ? '#DC2626' : '#3B82F6'
          })}
          value={result}
          text={`${result}%`}
      />
      <Confetti active={isExploding} config={config}/>
    </div>;

  const renderButtoms = () => 
  <Fragment>
       <Zoom
        id="upIcon"
        key="inherit"
        timeout={transitionDuration}
        unmountOnExit
        in={!!showUpIcon}
      >
        <Fab
          sx={{ ...fabStyle, ...fabGreenStyle, float: 'right' } as SxProps}
          aria-label={'Expand'}
          color={'inherit'}
          onClick={scrollToTop}
        >
          <UpIcon />
        </Fab>
      </Zoom>
      <Zoom id="validate" key="validate" timeout={transitionDuration} unmountOnExit in={!!showValidate}>
        <Button 
            variant="contained"
            onClick={checkSolutions}
        >
            Validar respuestas
        </Button>
      </Zoom>
    </Fragment>;

  return (
    <Container>
      {showResult && renderShowResult()}
      <main>
        <FormDialog 
          open={open} 
          setMessage={props.setMessage} 
          handleClose={handleClickPopup} 
          setReportDisabled={setReportDisabled} 
          questionaryName={props.questionaryName}
        />
        <Fab variant="extended" color="error" aria-label="report" onClick={() => handleClickPopup(true)} disabled={reportDisabled}>
          <MailOutlineIcon sx={{ mr: 1 }} />
          Reportar
        </Fab>
        {formData &&
          formData.questions.map((val: any, index: number) => (
            <Question
              key={generateUniqueKey()}
              data={val}
              index={index}
              showResult={showResult}
              saveQuestion={saveQuestionData}
            />
          ))}
      </main>
      {renderButtoms()}
    </Container>
  );
};

export default Questionaries;
