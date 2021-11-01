import { IAddress } from 'models/address';

export const addressData: IAddress[] = [
  {
    id: 1,
    label: 'Thành phố Hà Nội',
    value: 'thanh_pho_ha_noi',
    children: [
      {
        id: 1,
        label: 'Quận Ba Đình',
        value: 'quan_ba_dinh',
        children: [
          {
            id: 1,
            label: 'Phường Phúc Xá',
            value: 'phuong_phuc_xa'
          },
          {
            id: 2,
            label: 'Phường Trúc Bạch',
            value: 'phuong_truc_bach'
          }
        ]
      },
      {
        id: 2,
        label: 'Quận Hoàn Kiếm',
        value: 'quan_hoan_kiem',
        children: [
          {
            id: 1,
            label: 'Phường Phúc Tân',
            value: 'phuong_phuc_tan'
          },
          {
            id: 2,
            label: 'Phường Đồng Xuân',
            value: 'phuong_dong_xuan'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Tỉnh Nam Định',
    value: 'tinh_nam_dinh',
    children: [
      {
        id: 1,
        label: 'Huyện Vụ Bản',
        value: 'huyen_vu_ban',
        children: [
          {
            id: 1,
            label: 'Xã Trung Thành',
            value: 'xa_trung_thanh'
          },
          {
            id: 2,
            label: 'Xã Minh Tân',
            value: 'xa_minh_tan'
          }
        ]
      },
      {
        id: 2,
        label: 'Huyện Ý Yên',
        value: 'huyen_y_yen',
        children: [
          {
            id: 1,
            label: 'Xã Yên Xá',
            value: 'xa_yen_xa'
          },
          {
            id: 2,
            label: 'Xã Yên Ninh',
            value: 'xa_yen_ninh'
          }
        ]
      }
    ]
  }
];
