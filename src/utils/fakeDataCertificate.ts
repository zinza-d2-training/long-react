import { ICertificate } from 'models';

export const certificateData: ICertificate = {
  fullName: 'Bùi Đức Long',
  dob: new Date('11/05/2000'),
  citizenId: '123456789',
  healthInsuranceCardNumber: '987654321',
  phone: '0922334556',
  provinceId: 2,
  districtId: 1,
  wardId: 1,
  vaccinate: [
    {
      id: 'vaccine-sfsaf',
      number: 1,
      time: new Date('09/11/2021 14:00'),
      vaccinationName: 'COVID-19 Vaccine AstraZeneca',
      shipmentNumber: 'NJ0342',
      vaccinationSite: 'TYT Dịch Vọng Hậu'
    },
    {
      id: 'vaccine-fghfgh',
      number: 2,
      time: new Date('10/11/2021 14:00'),
      vaccinationName: 'COVID-19 Vaccine AstraZeneca',
      shipmentNumber: 'NJ0342',
      vaccinationSite: 'TYT Dịch Vọng Hậu'
    }
  ]
};
