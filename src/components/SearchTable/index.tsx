import { AutocompleteChangeReason } from '@mui/core';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, Divider, Stack, TextField } from '@mui/material';
import { StatisticTable, StyledButton } from 'components';
import * as _ from 'lodash';
import {
  IDistrict,
  IProvince,
  IStatisticVaccinationByArea,
  ITableData,
  IWard
} from 'models';
import { useEffect, useState } from 'react';
import { styleInputMedium } from 'theme';
import { addressData, getDistrict, getProvince, getWard } from 'utils';

const convertData = (input: IStatisticVaccinationByArea[]): ITableData => {
  return {
    heading: [
      'STT',
      'Tên điểm tiêm',
      'Số nhà. tên đường',
      'Xã/Phường',
      'Quận/Huyện',
      'Tỉnh/Thành Phố',
      'Người đứng đầu cơ sở tiêm chủng',
      'Số bàn tiêm'
    ],
    dataSet: input.map((record, index) => {
      const { provinceId, districtId, wardId } = record;
      return [
        index + 1,
        record.injectionSiteName,
        record.apartmentNumber,
        getWard(provinceId, districtId, wardId)?.label,
        getDistrict(provinceId, districtId)?.label,
        getProvince(provinceId)?.label,
        record.leader,
        record.numberOfInjectionTables
      ];
    })
  };
};
interface IProps {
  data: IStatisticVaccinationByArea[];
  onLoadMoreData?: () => void;
}

const search = (
  data: IStatisticVaccinationByArea[],
  options: {
    provinceId?: number;
    districtId?: number;
    wardId?: number;
  }
): IStatisticVaccinationByArea[] => {
  const { provinceId, districtId, wardId } = options;
  const result = _.cloneDeep(data);
  return result.filter((record) => {
    if (!wardId) {
      if (!districtId) {
        return record.provinceId === provinceId;
      } else {
        return (
          record.districtId === districtId && record.provinceId === provinceId
        );
      }
    } else {
      return (
        record.wardId === wardId &&
        record.districtId === districtId &&
        record.provinceId === provinceId
      );
    }
  });
};

export const SearchTable = (props: IProps) => {
  const { data, onLoadMoreData } = props;
  const [tableData, setTableData] = useState<ITableData>(convertData(data));
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
  const [hasLoadMore, setHasLoadMore] = useState(true);

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
      setHasLoadMore(true);
      setTableData(convertData(data));
    }
  }, [data, selectedDistrict, selectedProvince, selectedWard]);

  useEffect(() => {
    setTableData(convertData(data));
  }, [data]);

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
    setHasLoadMore(false);
    setTableData(
      convertData(
        search(data, {
          provinceId: selectedProvince?.id,
          districtId: selectedDistrict?.id,
          wardId: selectedWard?.id
        })
      )
    );
  };

  return (
    <Box px={2}>
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
          onClick={handleSearch}>
          Tìm kiếm
        </StyledButton>
      </Stack>
      <Divider />
      <StatisticTable
        data={tableData}
        onLoadMoreData={onLoadMoreData}
        options={{
          maxHeight: '500px',
          hasLoadMore
        }}
      />
    </Box>
  );
};
