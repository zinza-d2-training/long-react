import {
  Autocomplete,
  Box,
  colors,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import StatisticTable from 'components/StatisticTable';
import StyledButton from 'components/Button';
import { IDistrict, IProvince, ITableData, IWard } from 'models';
import { useEffect, useState } from 'react';
import { styleInputMedium } from 'theme';
import { addressData } from 'utils/addressData';
import SearchIcon from '@mui/icons-material/Search';
import { AutocompleteChangeReason } from '@mui/core';
import * as _ from 'lodash';

interface IProps {
  data: ITableData;
}

const search = (
  data: ITableData,
  options: {
    provinceName?: string;
    districtName?: string;
    wardName?: string;
  }
): ITableData => {
  const { provinceName, districtName, wardName } = options;
  const result = _.cloneDeep(data);
  result.dataSet = result.dataSet.filter((record) => {
    if (!wardName) {
      if (!districtName) {
        return record[5] === provinceName;
      } else {
        return record[4] === districtName && record[5] === provinceName;
      }
    } else {
      return (
        record[3] === wardName &&
        record[4] === districtName &&
        record[5] === provinceName
      );
    }
  });
  return result;
};

const SearchTable = (props: IProps) => {
  const { data } = props;
  const [tableData, setTableData] = useState<ITableData>(data);
  const [provinceOptions] = useState<IProvince[]>(addressData);
  const [districtOptions, setDistrictOptions] = useState<IDistrict[]>([]);
  const [wardOptions, setWardOptions] = useState<IWard[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<IProvince | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<IDistrict | null>(
    null
  );
  const [selectedWard, setSelectedWard] = useState<IWard | null>(null);
  const [inputProvince, setInputProvince] = useState('');
  const [inputDistrict, setInputDistrict] = useState('');
  const [inputWard, setInputWard] = useState('');

  useEffect(() => {
    if (selectedProvince) {
      setDistrictOptions((prevState) => {
        const provinceIndex = provinceOptions.findIndex(
          (province) => province.id === selectedProvince.id
        );
        if (provinceIndex > -1) {
          return provinceOptions[provinceIndex].children;
        } else {
          return [];
        }
      });
    } else {
      setInputProvince('');
      setInputDistrict('');
      setInputWard('');
    }
    setSelectedDistrict(null);
  }, [provinceOptions, selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      setWardOptions((prevState) => {
        const districtIndex = districtOptions.findIndex(
          (district) => district.id === selectedDistrict.id
        );
        if (districtIndex > -1) {
          return districtOptions[districtIndex].children;
        } else {
          return [];
        }
      });
    } else {
      setInputDistrict('');
      setInputWard('');
    }
    setSelectedWard(null);
  }, [districtOptions, selectedDistrict]);

  useEffect(() => {
    if (!selectedWard && !selectedDistrict && !selectedProvince) {
      setTableData(data);
    }
  }, [data, selectedDistrict, selectedProvince, selectedWard]);

  const handleChangeProvince = (
    event: React.SyntheticEvent<Element, Event>,
    value: IProvince | null,
    reason: AutocompleteChangeReason
  ) => {
    setSelectedProvince(value);
  };

  const handleChangeDistrict = (
    event: React.SyntheticEvent<Element, Event>,
    value: IDistrict | null,
    reason: AutocompleteChangeReason
  ) => {
    setSelectedDistrict(value);
  };

  const handleChangeWard = (
    event: React.SyntheticEvent<Element, Event>,
    value: IWard | null,
    reason: AutocompleteChangeReason
  ) => {
    setSelectedWard(value);
  };

  const handleSearch = () => {
    setTableData(
      search(data, {
        provinceName: selectedProvince?.label,
        districtName: selectedDistrict?.label,
        wardName: selectedWard?.label
      })
    );
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} px={2} pb={2}>
        <Autocomplete
          options={provinceOptions}
          value={selectedProvince}
          onChange={handleChangeProvince}
          onInputChange={(e, newValue) => {
            setInputProvince(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                value: inputProvince
              }}
              sx={{ ...styleInputMedium, minWidth: '260px' }}
              placeholder="Tỉnh/Thành phố"
            />
          )}
        />
        <Autocomplete
          options={districtOptions}
          value={selectedDistrict}
          disabled={!selectedProvince}
          onChange={handleChangeDistrict}
          onInputChange={(e, newValue) => {
            setInputDistrict(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                value: inputDistrict
              }}
              sx={{ ...styleInputMedium, minWidth: '260px' }}
              placeholder="Quận/Huyện"
            />
          )}
        />
        <Autocomplete
          value={selectedWard}
          options={wardOptions}
          disabled={!selectedDistrict}
          onInputChange={(e, newValue) => {
            setInputWard(newValue);
          }}
          onChange={handleChangeWard}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                value: inputWard
              }}
              sx={{ ...styleInputMedium, minWidth: '260px' }}
              placeholder="Xã/Phường"
            />
          )}
        />
        <StyledButton
          disabled={!selectedWard && !selectedProvince && !selectedDistrict}
          startIcon={<SearchIcon />}
          variant="contained"
          sx={{ backgroundColor: colors.indigo[700] }}
          onClick={handleSearch}>
          Tìm kiếm
        </StyledButton>
      </Stack>
      <Divider />
      <StatisticTable data={tableData} />
    </Box>
  );
};

export default SearchTable;
