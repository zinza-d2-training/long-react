import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  Button,
  colors,
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { PageTitle } from 'components';
import { AppLayout } from 'theme/layout';

const documents = [
  {
    id: 'document_id-sdfsdf',
    label: 'Giới thiệu nền tảng quản lý tiêm chủng vắc xin phòng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-sdfsdfa',
    label:
      'HD Chuẩn hóa dữ iệu và import danh sách đối tượng tiêm chủng Covid-19, danh sách nhập hồi cứu',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-asdasd',
    label: 'HD cài đặt và sử dụng ứng dụng SSKĐT dành cho người dân',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-qweqwe',
    label:
      'HD phê duyệt và phân bố yêu cầu đăng ký tiêm chủng vắc xin phòng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-ghjgh',
    label: 'HD đăng ký cơ sở tiêm chủng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-fdbdfb',
    label: 'HD đăng ký tiêm chủng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-werer',
    label: 'HD đăng ký tiêm chủng Covid-19 dành cho cơ quan, tổ chức',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-axsxz',
    label: 'HD đăng ký tiêm chủng Covid-19 dành cho người dân',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-dfgdfg',
    label: 'HDSD ứng dụng SSKĐT trong quá trình tiêm chủng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-mbnmb',
    label: 'Quy trình ứng dụng nền tảng quản lý điều hành tiêm chủng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  }
];

export const Document = () => {
  return (
    <AppLayout>
      <PageTitle>Tài liệu</PageTitle>
      <Container maxWidth="xl">
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: colors.grey[100] }}>
              <TableCell sx={{ py: 1 }} align="center">
                <Typography variant="body1" fontWeight="500">
                  STT
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <Typography variant="body1" fontWeight="500">
                  Tên tài liệu
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 1 }} align="center">
                <Typography variant="body1" fontWeight="500">
                  Thao tác
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document, index) => (
              <TableRow
                key={document.id}
                sx={{
                  backgroundColor: index % 2 !== 0 ? colors.grey[100] : 'unset'
                }}>
                <TableCell sx={{ py: 1 }} align="center">
                  <Typography variant="body1">{index + 1}</Typography>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body1">{document.label}</Typography>
                </TableCell>
                <TableCell sx={{ py: 1 }} align="center">
                  <Button
                    component={Link}
                    href={document.linkDocument}
                    target="_blank"
                    startIcon={<FileDownloadOutlinedIcon />}>
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </AppLayout>
  );
};
