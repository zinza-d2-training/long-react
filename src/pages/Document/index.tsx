import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  colors,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { PageTitle, StyledButton } from 'components';
import { useCallback, useRef } from 'react';
import { AppLayout } from 'theme/layout';

const documents = [
  {
    id: 'document_id-sdfsdf',
    label: 'Giới thiệu nền tảng quản lý tiêm chủng vắc xin phòng Covid-19'
  },
  {
    id: 'document_id-sdfsdfa',
    label:
      'HD Chuẩn hóa dữ iệu và import danh sách đối tượng tiêm chủng Covid-19, danh sách nhập hồi cứu'
  },
  {
    id: 'document_id-asdasd',
    label: 'HD cài đặt và sử dụng ứng dụng SSKĐT dành cho người dân'
  },
  {
    id: 'document_id-qweqwe',
    label:
      'HD phê duyệt và phân bố yêu cầu đăng ký tiêm chủng vắc xin phòng Covid-19'
  },
  {
    id: 'document_id-ghjgh',
    label: 'HD đăng ký cơ sở tiêm chủng Covid-19'
  },
  {
    id: 'document_id-fdbdfb',
    label: 'HD đăng ký tiêm chủng Covid-19'
  },
  {
    id: 'document_id-werer',
    label: 'HD đăng ký tiêm chủng Covid-19 dành cho cơ quan, tổ chức'
  },
  {
    id: 'document_id-axsxz',
    label: 'HD đăng ký tiêm chủng Covid-19 dành cho người dân'
  },
  {
    id: 'document_id-dfgdfg',
    label: 'HDSD ứng dụng SSKĐT trong quá trình tiêm chủng Covid-19'
  },
  {
    id: 'document_id-mbnmb',
    label: 'Quy trình ứng dụng nền tảng quản lý điều hành tiêm chủng Covid-19'
  }
];

export const Document = () => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const handleDownload = useCallback(() => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  }, []);

  return (
    <AppLayout>
      <a
        ref={linkRef}
        href="no_link"
        download="document.txt"
        style={{ display: 'none' }}>
        link
      </a>
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
                  <StyledButton
                    startIcon={<FileDownloadOutlinedIcon />}
                    onClick={handleDownload}>
                    Download
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </AppLayout>
  );
};
