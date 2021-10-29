import { IAddress } from 'models/address';

export const addressData: IAddress[] = [
  {
    id: 'thanh_pho_ha_noi',
    label: 'Thành phố Hà Nội',
    value: 'thanh_pho_ha_noi',
    children: [
      {
        id: 'quan_ba_dinh',
        label: 'Quận Ba Đình',
        value: 'quan_ba_dinh',
        children: [
          {
            id: 'phuong_phuc_xa',
            label: 'Phường Phúc Xá',
            value: 'phuong_phuc_xa'
          },
          {
            id: 'phuong_truc_bach',
            label: 'Phường Trúc Bạch',
            value: 'phuong_truc_bach'
          }
        ]
      },
      {
        id: 'quan_hoan_kiem',
        label: 'Quận Hoàn Kiếm',
        value: 'quan_hoan_kiem',
        children: [
          {
            id: 'phuong_phuc_tan',
            label: 'Phường Phúc Tân',
            value: 'phuong_phuc_tan'
          },
          {
            id: 'phuong_dong_xuan',
            label: 'Phường Đồng Xuân',
            value: 'phuong_dong_xuan'
          }
        ]
      }
    ]
  },
  {
    id: 'tinh_nam_dinh',
    label: 'Tỉnh Nam Định',
    value: 'tinh_nam_dinh',
    children: [
      {
        id: 'huyen_vu_ban',
        label: 'Huyện Vụ Bản',
        value: 'huyen_vu_ban',
        children: [
          {
            id: 'xa_trung_thanh',
            label: 'Xã Trung Thành',
            value: 'xa_trung_thanh'
          },
          {
            id: 'xa_minh_tan',
            label: 'Xã Minh Tân',
            value: 'xa_minh_tan'
          }
        ]
      },
      {
        id: 'huyen_y_yen',
        label: 'Huyện Ý Yên',
        value: 'huyen_y_yen',
        children: [
          {
            id: 'xa_yen_xa',
            label: 'Xã Yên Xá',
            value: 'xa_yen_xa'
          },
          {
            id: 'xa_yen_ninh',
            label: 'Xã Yên Ninh',
            value: 'xa_yen_ninh'
          }
        ]
      }
    ]
  }
];
