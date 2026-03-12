export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogoUrl?: string; // Tùy chọn logo công ty
  salary: string; // Mức lương
  quantity: number; // Số lượng cần tuyển
  hours: string; // Giờ làm việc (ví dụ: Hành chính, Ca luân phiên)
  location: string; // Địa điểm làm việc
  description: string; // Mô tả công việc chi tiết
  postedAt: string; // Ngày đăng
}

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Công Nhân Lắp Ráp Linh Kiện Điện Tử',
    companyId: 'Samsung-SEV',
    companyName: 'Công ty TNHH Samsung Electronics Việt Nam',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    salary: '8.000.000 - 12.000.000 VNĐ',
    quantity: 500,
    hours: 'Làm mâm xoay (2 ca: Ngày/Đêm)',
    location: 'KCN Yên Phong, Bắc Ninh',
    description: 'Lắp ráp chi tiết các linh kiện điện tử, smartphone theo dây chuyền. Có xe đưa đón từ Hà Nội, Bắc Giang.',
    postedAt: '2023-10-01T08:00:00Z'
  },
  {
    id: '2',
    title: 'Thợ Hàn Xì / Vận Hành Máy CNC',
    companyId: 'vinfast-vf1',
    companyName: 'Tổ Hợp Sản Xuất Ô Tô VinFast',
    salary: '12.000.000 - 18.000.000 VNĐ',
    quantity: 150,
    hours: 'Ca hành chính / Làm thêm ngoài giờ',
    location: 'KCN Đình Vũ, Hải Phòng',
    description: 'Hàn xì các chi tiết khung vỏ ô tô, vận hành máy CNC theo quy trình tiêu chuẩn.',
    postedAt: '2023-10-05T09:30:00Z'
  },
  {
    id: '3',
    title: 'Nhân Viên Đóng Gói Và Kiểm Tra',
    companyId: 'foxconn-bn',
    companyName: 'Tập đoàn Khoa học Kỹ thuật Hồng Hải (Foxconn)',
    salary: '7.500.000 - 10.000.000 VNĐ',
    quantity: 300,
    hours: 'Ca 12 tiếng luân phiên',
    location: 'KCN Quế Võ, Bắc Ninh',
    description: 'Kiểm tra ngoại quan sản phẩm sau quá trình gia công và thực hiện đóng gói theo tiêu chuẩn.',
    postedAt: '2023-10-10T14:15:00Z'
  }
];
