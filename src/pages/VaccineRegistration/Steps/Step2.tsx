import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { StyledButton } from 'components';
import { Answer, IMedicalHistory } from 'models';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styleInputMedium } from 'theme';
import { medicalHistoryTemplate } from 'utils';

interface IProps {
  onNextStep: () => void;
  onBackStep: () => void;
  onChangeMedicalHistory: (report: IMedicalHistory[]) => void;
}

export const Step2 = (props: IProps) => {
  const { t } = useTranslation();

  const [medicalHistoryReport, setMedicalHistoryReport] = useState<
    IMedicalHistory[]
  >(medicalHistoryTemplate);
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    setDisabledButton((prevState) => {
      const invalid = medicalHistoryReport.some((record) => !record.answer);
      return invalid;
    });
  }, [medicalHistoryReport]);

  const tags = useMemo(
    () => [t('Tiền sử'), t('Triệu chứng'), t('Có'), t('Không'), t('Không rõ')],
    [t]
  );

  const handleChangeDiseaseSymptoms = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const question = e.target.name;
      const recordIndex = medicalHistoryReport.findIndex(
        (item) => item.question === question
      );
      if (recordIndex > -1) {
        setMedicalHistoryReport((prevState) => {
          const newState = [...prevState];
          if (newState[recordIndex].diseaseSymptoms !== undefined) {
            newState[recordIndex].diseaseSymptoms = e.target.value;
          }
          return newState;
        });
      }
    },
    [medicalHistoryReport]
  );

  const handleChangeAnswer = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const question = e.target.name;
      const recordIndex = medicalHistoryReport.findIndex(
        (item) => item.question === question
      );
      if (recordIndex > -1) {
        setMedicalHistoryReport((prevState) => {
          const newState = [...prevState];
          newState[recordIndex].answer = e.target.value as Answer;
          return newState;
        });
      }
    },
    [medicalHistoryReport]
  );

  const handleNextStep = useCallback(() => {
    props.onChangeMedicalHistory(medicalHistoryReport);
    props.onNextStep();
  }, [medicalHistoryReport, props]);
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            {tags.map((label) => (
              <TableCell align="center" key={label}>
                <Typography variant="body1" fontWeight="bold">
                  {label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {medicalHistoryReport.map((item) => (
            <TableRow
              key={'' + item.id + item.question}
              sx={{ backgroundColor: 'rgba(238, 238, 238, 0.4)' }}>
              <TableCell sx={{ maxWidth: '300px', py: 1 }}>
                <Typography variant="body2">
                  {item.id}. {t(item.question)}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: '450px', py: 1 }}>
                {item.diseaseSymptoms !== undefined && (
                  <TextField
                    placeholder={t('Nếu có, ghi rõ loại tác nhân dị ứng')}
                    sx={{
                      ...styleInputMedium,
                      width: '372px',
                      'input::placeholder': { textAlign: 'center' }
                    }}
                    name={item.question}
                    value={item.diseaseSymptoms}
                    onChange={handleChangeDiseaseSymptoms}
                  />
                )}
              </TableCell>
              <TableCell sx={{ py: 1 }} align="center">
                <Checkbox
                  name={item.question}
                  value={Answer.YES}
                  checked={item.answer === Answer.YES}
                  onChange={handleChangeAnswer}
                />
              </TableCell>
              <TableCell sx={{ py: 1 }} align="center">
                <Checkbox
                  name={item.question}
                  value={Answer.NO}
                  checked={item.answer === Answer.NO}
                  onChange={handleChangeAnswer}
                />
              </TableCell>
              <TableCell sx={{ py: 1 }} align="center">
                <Checkbox
                  name={item.question}
                  value={Answer.NOT_SURE}
                  checked={item.answer === Answer.NOT_SURE}
                  onChange={handleChangeAnswer}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <StyledButton
          variant="outlined"
          onClick={props.onBackStep}
          startIcon={<ArrowBackIcon />}>
          {t('Quay lại')}
        </StyledButton>
        <StyledButton
          disabled={disabledButton}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNextStep}>
          {t('Tiếp tục')}
        </StyledButton>
      </Stack>
    </Box>
  );
};
