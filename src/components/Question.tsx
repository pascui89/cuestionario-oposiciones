import { generateUniqueKey } from "../helpers";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { red } from '@mui/material/colors';
import { IQuestion } from "../interfaces/IQuestion";

interface IProps {
    data: IQuestion;
    index: number;
    showResult: boolean;
    saveQuestion: (question: any) => void;
}

const Question = (props: IProps) => {

    const { data, showResult, saveQuestion } = props;

    return (<main style={{textAlign: 'initial'}}>
        <p key={generateUniqueKey()}>{data.question}</p>
        <FormControl>
            <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                name="radio-buttons-group"
                value={data.selected}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    saveQuestion({
                        ...data,
                        selected: (event.target as HTMLInputElement).value
                    });
                }}
            >
                {data.options.map((option: string) => 
                    <FormControlLabel 
                        key={generateUniqueKey()} 
                        value={option.charAt(0)} 
                        control={<Radio color={!showResult ? 'primary' : data.valid !== data.selected ? 'warning' : 'success'}/>} 
                        label={option} 
                    />)}
                 {showResult && 
                    data.selected && 
                    data.valid !== data.selected && <p style={{ color: red[500] }}>La respuesta correcta es {data.valid}</p>}
            </RadioGroup>
        </FormControl>
    </main>);
}

export default Question;